/** Oculta padrões identificáveis de credenciais na representação dos relatórios. */
import type { Report } from './types.js';
const secretField=/^(?:password|passwd|senha|secret|token|client[_-]?secret|api[_-]?key|access[_-]?token|refresh[_-]?token|authorization)$/i;

/** Mantém o contexto textual sem reproduzir credenciais em formatos reconhecidos. */
export function redactText(value: string): string {
  return value
    .replace(/-----BEGIN ([A-Z ]*PRIVATE KEY)-----[\s\S]*?-----END \1-----/g,'[OCULTO]')
    .replace(/\bBearer\s+[^\s"'<>]+/gi,'Bearer [OCULTO]')
    .replace(/(https?:\/\/)[^/\s]+@/gi,'$1[OCULTO]@')
    .replace(/\b((?:password|passwd|senha|secret|token|client[_-]?secret|api[_-]?key|access[_-]?token|refresh[_-]?token)\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^\s,;]+)/gi,'$1[OCULTO]');
}
/** Percorre apenas os dados serializáveis, preservando os objetos de origem. */
function redactValue(value: unknown): unknown {
  if(typeof value==='string')return redactText(value);
  if(Array.isArray(value))return value.map(redactValue);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,entry])=>[key,secretField.test(key)?'[OCULTO]':redactValue(entry)]));
  return value;
}
/** Atualiza a representação do relatório; não modifica configurações ou arquivos-fonte. */
export function redactReport(report: Report): void {
  Object.assign(report,redactValue(report));
}
