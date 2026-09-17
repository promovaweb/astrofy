/** Apresentação textual da avaliação atual para o painel rolável da TUI. */
import { stripVTControlCharacters } from 'node:util';
import type { ChecklistItem } from '../core/types.js';

/** Exibe comprovação e entradas sem interpretar controles de terminal vindos dos arquivos. */
export function itemDetail(item: ChecklistItem, root: string): string {
  const evidence = item.evidence.map((entry, index) => [
    `Registro ${index + 1}`,
    `Verificador: ${entry.verifier} (${entry.version})`,
    `Execução: ${entry.runId}`,
    `Data: ${entry.checkedAt}`,
    `Responsável: ${entry.reviewer ?? 'verificador automático'}`,
    `Resultado: ${entry.result}`,
    `Ambiente: ${Object.entries(entry.environment).map(([key, value]) => `${key}=${value}`).join(', ')}`,
    `Relatório: ${entry.report}`,
    'Arquivos verificados:',
    entry.inputs.length ? entry.inputs.join('\n') : 'Nenhum arquivo listado neste registro.',
  ].join('\n')).join('\n\n');
  const content = [
    item.summary, '', `Estado: ${item.status}`, `Método: ${item.method}`,
    `Severidade: ${item.severity}`, `Escopo: ${item.scope.type} ${item.scope.target}`,
    '', item.reason, '', `Skill: ${item.skill}`,
    `Última revisão: ${item.checkedAt ?? 'não avaliado'}`,
    `Fingerprint: ${item.inputFingerprint ?? 'não registrado'}`,
    '', evidence || 'Nenhuma avaliação registrada.',
    '', 'Contexto copiável:', `Execute ${item.skill} em ${root}, escopo ${item.scope.target}.`,
    '', 'Notas:', item.notes.join('\n') || 'Nenhuma nota.',
    '', `Avaliações anteriores no histórico: ${item.history.length}`,
  ].join('\n');
  return stripVTControlCharacters(content).replace(/[\x00-\x08\x0B-\x1F\x7F-\x9F]/g, '');
}
