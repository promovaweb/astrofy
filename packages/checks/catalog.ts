/** Leitura do catálogo versionado antes da criação das instâncias de checklist. */
import { validate } from '../schemas/index.js';
import { AstrofyError, CATALOG_VERSION, type Rule } from '../core/types.js';

/** Confere contrato, versão suportada e identidade única de cada regra. */
export function readRuleCatalog(value: unknown): Rule[] {
  validate<{ schemaVersion: string; catalogVersion: string; rules: Rule[] }>('rule-catalog', value);
  if (value.catalogVersion !== CATALOG_VERSION) throw new AstrofyError('Versão do catálogo incompatível com o verificador instalado.');
  const ids = new Set<string>();
  for (const rule of value.rules) {
    if (ids.has(rule.id)) throw new AstrofyError('ID de regra duplicado no catálogo.');
    ids.add(rule.id);
  }
  return value.rules;
}
