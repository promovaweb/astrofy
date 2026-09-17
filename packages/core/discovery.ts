/** Descoberta do projeto e leitura de versões sem importar configuração executável. */
import path from 'node:path';
import { readFile, realpath } from 'node:fs/promises';
import { parse } from 'yaml';
import { exists, readJson, safePath, walk } from './filesystem.js';
import { compatibility } from '../adapters/index.js';
import { AstrofyError, type Inspection } from './types.js';
type Manifest = { name?: string; dependencies?: Record<string, string>; devDependencies?: Record<string, string> };
/** Busca o manifesto Astro mais próximo; --root nunca escolhe silenciosamente outro pacote. */
export async function discoverRoot(start = process.cwd(), explicit = false): Promise<string> {
  let current = await realpath(path.resolve(start));
  while (true) {
    if (await exists(path.join(current, 'package.json'))) {
      const pkg = await readJson<Manifest>(current, 'package.json');
      if (pkg.dependencies?.astro || pkg.devDependencies?.astro) return current;
    }
    if (explicit || path.dirname(current) === current) throw new AstrofyError('Projeto Astro não encontrado. Informe --root com a raiz que contém package.json.');
    current = path.dirname(current);
  }
}
/** Inspeciona lockfiles e manifests instalados; não instala nem executa dependências. */
export async function inspect(root: string): Promise<Inspection> {
  const pkg = await readJson<Manifest>(root, 'package.json');
  const declared = { ...pkg.dependencies, ...pkg.devDependencies };
  const files = await walk(root);
  const locks = ['package-lock.json','npm-shrinkwrap.json','pnpm-lock.yaml','yarn.lock','bun.lock','bun.lockb'];
  const found: string[] = [];
  for (const file of locks) if (await exists(await safePath(root, file))) found.push(file);
  const versions: Record<string, string> = {};
  const names = ['astro','tailwindcss','react','@astrojs/mdx','@astrojs/react','@tailwindcss/vite'];
  if (found.includes('package-lock.json')) {
    const lock = await readJson<{packages?: Record<string, {version?: string}>}>(root, 'package-lock.json');
    for (const name of names) { const version = lock.packages?.[`node_modules/${name}`]?.version; if (version) versions[name] = version; }
  } else if (found.includes('pnpm-lock.yaml')) {
    const lock = parse(await readFile(await safePath(root, 'pnpm-lock.yaml'), 'utf8'));
    for (const name of names) {
      const value = lock.importers?.['.']?.dependencies?.[name] ?? lock.importers?.['.']?.devDependencies?.[name];
      if (value?.version) versions[name] = String(value.version).split('(')[0]!;
    }
  }
  for (const name of names) {
    // O manifesto da dependência é dado, mesmo quando node_modules usa links do pnpm.
    const installed = path.join(root, 'node_modules', name, 'package.json');
    if (await exists(installed)) {
      const manifest = JSON.parse(await readFile(installed, 'utf8'));
      if (typeof manifest.version === 'string') versions[name] = manifest.version;
    }
  }
  const limitations = compatibility(versions);
  if (found.length > 1) limitations.push(`Lockfiles concorrentes: ${found.join(', ')}.`);
  if (!found.length) limitations.push('Lockfile ausente; dependências não são reproduzíveis.');
  const lockfile = found[0] ?? null;
  return { root, packageManager: lockfile ? lockfile.startsWith('pnpm') ? 'pnpm' : lockfile.startsWith('yarn') ? 'yarn' : lockfile.startsWith('bun') ? 'bun' : 'npm' : null,
    lockfile, versions, declared, files, limitations,
    features: { blog: files.some(file => file.endsWith('.mdx')), react: !!declared['@astrojs/react'], i18n: files.some(file => /(?:config\/i18n|locales\/)/.test(file)), forms: files.some(file => /(?:components\/forms\/|config\/forms\.)/.test(file)) } };
}
