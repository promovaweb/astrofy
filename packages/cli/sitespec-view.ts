/** Apresentação textual das tarefas de `.sitespec/` para a aba Specs da TUI. */
import { stripVTControlCharacters } from 'node:util';
import type { Sitespec } from '../core/sitespec.js';

const STATUS_LABEL: Record<Sitespec['frontmatter']['status'], string> = {
  draft: 'rascunho', in_progress: 'em andamento', blocked: 'bloqueada', done: 'concluída', archived: 'arquivada',
};
const PRIORITY_LABEL: Record<NonNullable<Sitespec['frontmatter']['priority']>, string> = {
  low: 'baixa', medium: 'média', high: 'alta',
};

/** Linha única da lista; progresso aparece mesmo com checklist vazia, como 0/0. */
export function sitespecLine(spec: Sitespec): string {
  const { frontmatter, progress, blockedBy } = spec;
  const priority = PRIORITY_LABEL[frontmatter.priority ?? 'medium'];
  const waiting = blockedBy.length ? ` | esperando ${blockedBy.join(',')}` : '';
  return `${STATUS_LABEL[frontmatter.status]} | ${priority} | ${frontmatter.id}-${frontmatter.slug} | ${progress.done}/${progress.total} | ${frontmatter.title}${waiting}`;
}

/** Bloco rolável do painel de detalhe; sanitiza controles de terminal vindos do Markdown. */
export function sitespecDetail(spec: Sitespec): string {
  const { frontmatter, checklist, description, notes, progress, blockedBy, missingDependencies } = spec;
  const items = checklist.length
    ? checklist.map(item => `${item.done ? '[x]' : '[ ]'} ${item.text}${item.skill ? ` (${item.skill})` : ''} {#${item.id}}`).join('\n')
    : 'Sem itens na checklist.';
  const content = [
    frontmatter.title, frontmatter.summary, '',
    `Estado: ${STATUS_LABEL[frontmatter.status]}`,
    `Prioridade: ${PRIORITY_LABEL[frontmatter.priority ?? 'medium']}`,
    `Progresso: ${progress.done}/${progress.total}`,
    frontmatter.estimateMinutes ? `Estimativa: ${frontmatter.estimateMinutes} min (${frontmatter.estimateBasis})` : '',
    `Skill principal: ${frontmatter.primarySkill}`,
    `Skills de revisão: ${frontmatter.reviewSkills.join(', ') || 'nenhuma'}`,
    frontmatter.dependsOn?.length ? `Depende de: ${frontmatter.dependsOn.join(', ')}` : '',
    blockedBy.length ? `Esperando (ainda não concluída): ${blockedBy.join(', ')}` : '',
    missingDependencies.length ? `Dependência inexistente: ${missingDependencies.join(', ')}` : '',
    `Arquivos relacionados: ${frontmatter.relatedFiles.join(', ') || 'nenhum'}`,
    frontmatter.tags?.length ? `Tags: ${frontmatter.tags.join(', ')}` : '',
    frontmatter.source ? `Origem: ${frontmatter.source}` : '',
    frontmatter.status === 'blocked' ? `Motivo do bloqueio: ${frontmatter.blockedReason}` : '',
    frontmatter.status === 'archived' ? `Motivo do arquivamento: ${frontmatter.archivedReason}` : '',
    `Criada em: ${frontmatter.createdAt}`, `Atualizada em: ${frontmatter.updatedAt}`, '',
    'Descrição:', description || 'Sem descrição.', '',
    'Checklist:', items, '',
    'Notas:', notes || 'Nenhuma nota.',
  ].join('\n');
  return stripVTControlCharacters(content).replace(/[\x00-\x08\x0B-\x1F\x7F-\x9F]/g, '');
}
