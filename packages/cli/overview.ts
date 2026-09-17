/** Resumo da checklist para consulta no painel inicial, sem executar verificações. */
import type { ChecklistItem, Summary } from '../core/types.js';

/** Inclui histórico para não perder a data da última avaliação após invalidar suas entradas. */
export function overviewText(root: string, items: ChecklistItem[], summary: Summary): string {
  const active=items.filter(item=>!item.retired);
  const records=items.flatMap(item=>[...item.evidence,...item.history.flatMap(entry=>entry.evidence)]);
  const latest=records.sort((a,b)=>b.checkedAt.localeCompare(a.checkedAt))[0];
  const stale=active.filter(item=>item.status==='pending'&&item.reason==='Entradas alteradas desde a avaliação anterior.').length;
  const severities=['critical','error','warning','info'].map(severity=>`${severity}: ${active.filter(item=>item.status==='failed'&&item.severity===severity).length}`).join(' | ');
  return [
    `Projeto: ${root}`, '',
    `${summary.passed} passaram     ${summary.failed} falharam`,
    `${summary.pending} pendentes     ${summary.blocked} sem avaliação concluída`, '',
    `Cobertura: ${summary.coverage===null?'sem avaliações':Math.round(summary.coverage*100)+'%'}`,
    `Não aplicáveis: ${summary.not_applicable}`,
    `Resultados com entradas alteradas: ${stale}`, '',
    'Falhas por severidade:', severities, '',
    `Última avaliação: ${latest?.checkedAt??'não registrada'}`,
    `Execução: ${latest?.runId??'não registrada'}`, '',
    'Resultados com entradas alteradas aparecem como pendentes.',
    'Escolha Itens para filtrar, conferir relatórios ou executar uma regra.',
  ].join('\n');
}
