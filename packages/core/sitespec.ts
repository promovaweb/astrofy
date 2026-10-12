/** Leitura das tarefas em `.sitespec/<id>-<slug>/SITEPEC.md`; a escrita é feita por quem edita o Markdown. */
import { readFile, readdir } from 'node:fs/promises';
import matter from 'gray-matter';
import { safePath, exists } from './filesystem.js';
import { validate } from '../schemas/index.js';
import { AstrofyError } from './types.js';

export type SitespecStatus = 'draft' | 'in_progress' | 'blocked' | 'done' | 'archived';
export type SitespecPriority = 'low' | 'medium' | 'high';

export interface SitespecFrontmatter {
  schemaVersion: string; id: string; slug: string; title: string; summary: string;
  status: SitespecStatus; createdAt: string; updatedAt: string;
  primarySkill: string; reviewSkills: string[]; relatedFiles: string[];
  tags?: string[]; source?: string; blockedReason?: string; archivedReason?: string;
  dependsOn?: string[]; priority?: SitespecPriority; estimateMinutes?: number; estimateBasis?: string;
}

export interface SitespecChecklistItem { id: string; text: string; done: boolean; skill: string }

export interface Sitespec {
  dir: string; frontmatter: SitespecFrontmatter; description: string; notes: string;
  checklist: SitespecChecklistItem[]; progress: { done: number; total: number };
  blockedBy: string[]; missingDependencies: string[];
}

export interface SitespecLoadError { dir: string; message: string }

const HEADING = /^##\s+(.+?)\s*$/;
const CHECKLIST_LINE = /^-\s\[([ xX])\]\s+(.*)$/;
const ID_TAG = /\s*\{#([a-z0-9]{4})\}\s*$/;
const SKILL_TAG = /\s*`#(astrofy-[a-z0-9-]+)`\s*$/;

/** Agrupa o corpo por `## Título`; texto antes do primeiro título é descartado. */
function sections(body: string): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  let current = '';
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(HEADING);
    if (heading) { current = heading[1]!.trim(); result[current] = []; continue; }
    if (current) result[current]!.push(line);
  }
  return result;
}

/** Cada item exige `{#id}` fixo; item sem id ou id repetido recusa a tarefa inteira. */
function checklist(lines: string[]): SitespecChecklistItem[] {
  const items: SitespecChecklistItem[] = []; const seen = new Set<string>();
  for (const line of lines) {
    const match = line.match(CHECKLIST_LINE);
    if (!match) continue;
    let text = match[2]!.trim();
    const idTag = text.match(ID_TAG);
    if (!idTag) throw new AstrofyError(`Item de checklist sem {#id}: "${text}".`);
    if (seen.has(idTag[1]!)) throw new AstrofyError(`Id de checklist repetido: {#${idTag[1]}}.`);
    seen.add(idTag[1]!);
    text = text.slice(0, idTag.index).trimEnd();
    const skillTag = text.match(SKILL_TAG);
    if (skillTag) text = text.slice(0, skillTag.index).trimEnd();
    items.push({ id: idTag[1]!, text, done: match[1]!.toLowerCase() === 'x', skill: skillTag?.[1] ?? '' });
  }
  return items;
}

/** YAML sem aspas em volta de uma data ISO vira `Date` na leitura; o contrato exige string. */
function isoString(value: unknown): unknown { return value instanceof Date ? value.toISOString() : value; }

/** Recusa front matter fora do schema ou checklist sem id antes de calcular progresso. */
export function parseSitespec(dir: string, raw: string): Sitespec {
  const { data, content } = matter(raw);
  data.createdAt = isoString(data.createdAt); data.updatedAt = isoString(data.updatedAt);
  validate<SitespecFrontmatter>('sitespec', data);
  const frontmatter = data as SitespecFrontmatter;
  const parts = sections(content);
  const items = checklist(parts['Checklist'] ?? []).map(item => ({ ...item, skill: item.skill || frontmatter.primarySkill }));
  return {
    dir, frontmatter,
    description: (parts['Descrição'] ?? []).join('\n').trim(),
    notes: (parts['Notas'] ?? []).join('\n').trim(),
    checklist: items,
    progress: { done: items.filter(item => item.done).length, total: items.length },
    blockedBy: [], missingDependencies: [],
  };
}

/** Preenche `blockedBy` e `missingDependencies` com o conjunto completo de tarefas já carregadas. */
function resolveDependencies(items: Sitespec[]): void {
  const byId = new Map(items.map(item => [item.frontmatter.id, item]));
  for (const item of items) {
    const dependsOn = item.frontmatter.dependsOn ?? [];
    item.missingDependencies = dependsOn.filter(id => !byId.has(id));
    item.blockedBy = dependsOn.filter(id => byId.get(id)?.frontmatter.status !== 'done' && byId.has(id));
  }
}

/** Uma tarefa inválida ou sem `SITEPEC.md` vira erro isolado; as demais continuam listadas. */
export async function listSitespecs(root: string): Promise<{ items: Sitespec[]; errors: SitespecLoadError[] }> {
  const base = await safePath(root, '.sitespec');
  if (!(await exists(base))) return { items: [], errors: [] };
  const entries = (await readdir(base, { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const items: Sitespec[] = []; const errors: SitespecLoadError[] = [];
  for (const entry of entries) {
    const relative = `.sitespec/${entry.name}/SITEPEC.md`;
    try {
      const file = await safePath(root, relative);
      if (!(await exists(file))) { errors.push({ dir: entry.name, message: 'SITEPEC.md ausente.' }); continue; }
      items.push(parseSitespec(entry.name, await readFile(file, 'utf8')));
    } catch (failure) {
      errors.push({ dir: entry.name, message: failure instanceof Error ? failure.message : 'Falha ao ler a tarefa.' });
    }
  }
  resolveDependencies(items);
  return { items, errors };
}

/** Considera nomes de diretório, não só tarefas lidas com sucesso, para não colidir com um id em uso. */
export async function nextSitespecId(root: string): Promise<string> {
  const base = await safePath(root, '.sitespec');
  const used = new Set<number>();
  if (await exists(base)) {
    for (const entry of await readdir(base, { withFileTypes: true })) {
      const prefix = entry.name.match(/^([0-9]{4})-/);
      if (entry.isDirectory() && prefix) used.add(Number(prefix[1]));
    }
  }
  let next = 1; while (used.has(next)) next++;
  return String(next).padStart(4, '0');
}
