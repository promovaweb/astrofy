/** Acesso delimitado ao projeto, substituição atômica e exclusão mútua de escrita. */
import { constants } from 'node:fs';
import { lstat, realpath, readFile, mkdir, open, rename, unlink, readdir } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { hostname } from 'node:os';
import { AstrofyError } from './types.js';

/** Distingue ausência de erros de acesso, que nunca são tratados como arquivo vazio. */
export async function exists(file: string): Promise<boolean> {
  try { await lstat(file); return true; } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
}
const within = (root: string, target: string) => target === root || target.startsWith(root + path.sep);
/** Resolve também ancestrais existentes de destinos novos para rejeitar escapes por symlink. */
export async function safePath(root: string, relative: string): Promise<string> {
  if (!relative || path.isAbsolute(relative) || /^[A-Za-z]:|^[/\\]{2}/.test(relative)) {
    throw new AstrofyError(`Caminho relativo inválido: ${relative}`);
  }
  const canonicalRoot = await realpath(root);
  const target = path.resolve(canonicalRoot, relative.replaceAll('\\', '/'));
  if (!within(canonicalRoot, target)) throw new AstrofyError(`Caminho fora do projeto: ${relative}`);
  let parent = target;
  while (!(await exists(parent))) parent = path.dirname(parent);
  const canonicalParent = await realpath(parent);
  if (!within(canonicalRoot, canonicalParent)) throw new AstrofyError(`Link simbólico sai do projeto: ${relative}`);
  return target;
}
/** Lê JSON sem executar módulos do projeto. */
export async function readJson<T>(root: string, relative: string): Promise<T> {
  const file = await safePath(root, relative);
  try { return JSON.parse(await readFile(file, 'utf8')) as T; }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') throw new AstrofyError(`Arquivo ausente: ${relative}`);
    if (error instanceof SyntaxError) throw new AstrofyError(`JSON inválido: ${relative}`);
    throw error;
  }
}
export function jsonText(value: unknown): string { return JSON.stringify(value, null, 2) + '\n'; }
export function hash(value: string | Buffer): string { return createHash('sha256').update(value).digest('hex'); }
/** Grava no mesmo diretório, sincroniza os bytes e só então substitui o destino. */
export async function atomicWrite(root: string, relative: string, content: string, options: { preserve?: boolean; signal?: AbortSignal } = {}): Promise<boolean> {
  options.signal?.throwIfAborted();
  const file = await safePath(root, relative);
  if (await exists(file)) {
    if (options.preserve || await readFile(file, 'utf8') === content) return false;
  }
  await mkdir(path.dirname(file), { recursive: true });
  await safePath(root, relative);
  const temporary = `${file}.${randomUUID()}.tmp`;
  const handle = await open(temporary, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY, 0o600);
  try {
    await handle.writeFile(content, 'utf8'); await handle.sync(); await handle.close();
    options.signal?.throwIfAborted();
    await safePath(root, relative);
    await rename(temporary, file);
    return true;
  } finally { await handle.close().catch(() => {}); await unlink(temporary).catch(() => {}); }
}
/** Serializa operações mutáveis. Lock de outro host ou processo vivo exige nova tentativa. */
export async function withLock<T>(root: string, task: () => Promise<T>): Promise<T> {
  const dir = await safePath(root, '.astrofy/cache');
  await mkdir(dir, { recursive: true });
  const file = await safePath(root, '.astrofy/cache/write.lock');
  const identity = { pid: process.pid, host: hostname(), token: randomUUID(), createdAt: new Date().toISOString() };
  let handle;
  try { handle = await open(file, 'wx', 0o600); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    // Recuperação automática por PID permite que dois processos removam locks um do outro.
    // A recuperação documentada exige comprovar o término antes de remover o arquivo.
    throw new AstrofyError('Existe .astrofy/cache/write.lock. Confira o processo e siga a recuperação documentada antes de remover o arquivo.', 3);
  }
  if (!handle) throw new AstrofyError('Não foi possível adquirir o lock.', 3);
  await handle.writeFile(jsonText(identity)); await handle.close();
  try { return await task(); }
  finally {
    const owner = await readJson<{ token: string }>(root, '.astrofy/cache/write.lock').catch(() => null);
    if (owner?.token === identity.token) await unlink(file);
  }
}
const excluded = new Set(['node_modules', '.git', '.astro', 'dist', 'coverage', '.vercel', '.netlify']);
/** Lista entradas locais sem atravessar symlinks; saídas e caches ficam fora da análise. */
export async function walk(root: string, relative = '.', includeInternal = false): Promise<string[]> {
  const start = await safePath(root, relative);
  if (!(await exists(start))) return [];
  const results: string[] = [];
  for (const entry of (await readdir(start, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const name = path.posix.join(relative.replaceAll('\\', '/'), entry.name);
    if (entry.isSymbolicLink() || excluded.has(entry.name) || (!includeInternal && entry.name === '.astrofy')) continue;
    if (entry.isDirectory()) results.push(...await walk(root, name, includeInternal));
    else if (entry.isFile()) results.push(name);
  }
  return results;
}
