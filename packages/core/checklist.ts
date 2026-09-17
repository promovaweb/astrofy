/** Reconciliação por identidade estável, histórico e cálculo explícito da cobertura. */
import catalogJson from '../checks/catalog.json' with { type: 'json' };
import { readRuleCatalog } from '../checks/catalog.js';
import { readFile } from 'node:fs/promises';
import { hash, exists, readJson, safePath } from './filesystem.js';
import { validate } from '../schemas/index.js';
import { scopeTarget, sameScope } from './scopes.js';
import { AstrofyError, CATALOG_VERSION, type Checklist, type ChecklistItem, type Configuration, type HistoryEntry, type Scope, type Summary } from './types.js';
export const CATALOG = readRuleCatalog(catalogJson);
export function itemKey(ruleId: string, scope: Scope): string { return `${ruleId}:${scope.type}:${scopeTarget(scope)}`; }
export function snapshot(item: ChecklistItem): HistoryEntry {
  return { status: item.status, checkedAt: item.checkedAt, inputFingerprint: item.inputFingerprint, evidence: structuredClone(item.evidence), reason: item.reason };
}
/** Preserva notas e avaliações de regras conhecidas; regras removidas continuam identificáveis. */
export function reconcile(config: Configuration, scopes: Scope[], old?: Checklist): Checklist {
  const items = new Map((old?.items ?? []).map(item => [itemKey(item.ruleId, item.scope), structuredClone(item)]));
  for (const rule of CATALOG) {
    const targets = rule.scope === 'project' ? [{ type: 'project' as const, target: '.' }] : scopes.filter(scope => scope.type === rule.scope);
    if (!targets.length) targets.push({ type: rule.scope, target: '.' });
    for (const scope of targets) {
      const id = itemKey(rule.id, scope);
      const previous = items.get(id);
      const applicable = !rule.feature || config.features[rule.feature as keyof Configuration['features']];
      if (previous) {
        // Uma regra reintroduzida ou com outro método exige uma nova avaliação.
        // Notas e IDs pertencem ao projeto; metadados pertencem ao catálogo atual.
        if (previous.retired || previous.method !== rule.method) {
          if (previous.checkedAt || previous.inputFingerprint || previous.evidence.length) previous.history.push(snapshot(previous));
          previous.status = applicable ? 'pending' : 'not_applicable';
          previous.reason = applicable ? 'Regra reativada ou método alterado; execute uma nova avaliação.' : `Recurso ${rule.feature} desabilitado na configuração.`;
          previous.checkedAt = null; previous.inputFingerprint = null; previous.evidence = [];
        }
        // A dispensa inicial não é avaliação. Ela acompanha o recurso até o primeiro check.
        if (!previous.checkedAt && !previous.inputFingerprint && !previous.evidence.length &&
            (previous.status === 'pending' || (previous.status === 'not_applicable' && previous.reason === `Recurso ${rule.feature} desabilitado na configuração.`))) {
          const initialStatus = applicable ? 'pending' : 'not_applicable';
          if (previous.status !== initialStatus) {
            previous.status = initialStatus;
            previous.reason = applicable ? 'Verificação ainda não executada.' : `Recurso ${rule.feature} desabilitado na configuração.`;
          }
        }
        delete previous.retired;
        previous.summary = rule.summary; previous.category = rule.category;
        previous.skill = rule.skill; previous.method = rule.method;
        previous.severity = config.policies.severities[rule.id] ?? rule.severity;
        continue;
      }
      items.set(id, { id, ruleId: rule.id, category: rule.category, skill: rule.skill, scope, status: applicable ? 'pending' : 'not_applicable', severity: config.policies.severities[rule.id] ?? rule.severity, method: rule.method, summary: rule.summary,
        checkedAt: null, inputFingerprint: null, evidence: [], reason: applicable ? 'Verificação ainda não executada.' : `Recurso ${rule.feature} desabilitado na configuração.`, notes: [], history: [] });
    }
    if (rule.scope !== 'project' && targets.some(scope => scope.target !== '.')) {
      const placeholder = items.get(itemKey(rule.id, { type: rule.scope, target: '.' }));
      if (placeholder) placeholder.retired = true;
    }
  }
  for (const item of items.values()) if (!CATALOG.some(rule => rule.id === item.ruleId && rule.scope === item.scope.type)) item.retired = true;
  return { schemaVersion: '1.0.0', catalogVersion: CATALOG_VERSION, projectId: config.project.projectId, items: [...items.values()] };
}
export async function loadChecklist(root: string, config: Configuration): Promise<Checklist | undefined> {
  if (!(await exists(await safePath(root, config.paths.checklist)))) return undefined;
  const data = await readJson<Checklist>(root, config.paths.checklist); validate('checklist', data);
  if (data.projectId !== config.project.projectId) throw new AstrofyError('A checklist pertence a outro projectId.');
  const keys = new Set<string>();
  for (const item of data.items) {
    item.history ??= [];
    const key = itemKey(item.ruleId, item.scope);
    if (keys.has(key)) throw new AstrofyError(`Instância duplicada na checklist: ${key}`);
    keys.add(key);
  }
  return data;
}
/** Mudanças nas entradas invalidam a avaliação, mas preservam o resultado anterior no histórico. */
export function invalidate(item: ChecklistItem, fingerprint: string): boolean {
  if (!item.inputFingerprint || item.inputFingerprint === fingerprint || item.status === 'pending') return false;
  item.history.push(snapshot(item)); item.status = 'pending'; item.reason = 'Entradas alteradas desde a avaliação anterior.';
  item.evidence = []; item.checkedAt = null; item.inputFingerprint = null;
  return true;
}
/** Inclui bytes, nomes, ausência de arquivo, política e versão do verificador. */
export async function fingerprint(root: string, files: string[], policy: unknown, version: string): Promise<string> {
  const inputs: [string, string][] = [];
  for (const file of [...new Set(files)].sort()) {
    const absolute = await safePath(root, file);
    inputs.push([file, await exists(absolute) ? hash(await readFile(absolute)) : 'missing']);
  }
  return hash(JSON.stringify({ inputs, policy, version }));
}
export function summarize(items: ChecklistItem[]): Summary {
  const result: Summary = { passed: 0, failed: 0, pending: 0, blocked: 0, not_applicable: 0, applicable: 0, evaluated: 0, coverage: null, approval: null };
  for (const item of items.filter(item => !item.retired)) result[item.status]++;
  result.evaluated = result.passed + result.failed;
  result.applicable = result.evaluated + result.pending + result.blocked;
  result.coverage = result.applicable ? result.evaluated / result.applicable : null;
  result.approval = result.evaluated ? result.passed / result.evaluated : null;
  return result;
}
/** Uma dispensa afeta o código de saída, jamais o estado failed registrado. */
export function policyCode(items: ChecklistItem[], config: Configuration, now = new Date()): 0 | 1 | 3 {
  const active = items.filter(item => !item.retired && !config.exceptions.items.some(exception => exception.ruleId === item.ruleId && sameScope(exception.scope,item.scope) && Date.parse(exception.createdAt) <= +now && Date.parse(exception.expiresAt) > +now));
  const enforced = active.filter(item => config.policies.failOn.includes(item.severity) || config.policies.strictCategories.includes(item.category) || config.project.adoptionMode === 'strict');
  if (enforced.some(item => item.status === 'failed')) return 1;
  if (enforced.some(item => item.status === 'blocked' || (config.policies.requireManual && item.status === 'pending'))) return 3;
  return 0;
}
