/** Contrato de leitura das tarefas em `.sitespec/` e sua apresentação na TUI. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { parseSitespec, listSitespecs, nextSitespecId } from '../dist/core/sitespec.js';
import { sitespecLine, sitespecDetail } from '../dist/cli/sitespec-view.js';

const VALID = `---
schemaVersion: "1.0.0"
id: "0001"
slug: corrigir-contraste-botao
title: Corrigir contraste do botão primário
summary: Botão primário abaixo do contraste minimo em tema claro.
status: in_progress
createdAt: 2026-10-12T14:00:00.000Z
updatedAt: 2026-10-12T15:00:00.000Z
primarySkill: astrofy-design-system
reviewSkills:
  - astrofy-accessibility
relatedFiles:
  - src/components/Button.astro
tags:
  - acessibilidade
priority: high
estimateMinutes: 30
estimateBasis: Ajuste pontual de token, já mapeado.
---

## Descrição

O botão primário usa texto escuro sobre fundo claro demais.

## Checklist

- [x] Medir o contraste atual \`#astrofy-accessibility\` {#a001}
- [ ] Ajustar o token de cor do botão \`#astrofy-design-system\` {#a002}
- [ ] Sem skill própria {#a003}

## Notas

- 2026-10-12: aberto a partir de relato direto.
`;

test('parseSitespec lê front matter, seções, ids e herda a skill principal em itens sem tag', () => {
  const spec = parseSitespec('0001-corrigir-contraste-botao', VALID);
  assert.equal(spec.frontmatter.id, '0001');
  assert.equal(spec.frontmatter.status, 'in_progress');
  assert.equal(spec.frontmatter.priority, 'high');
  assert.equal(spec.frontmatter.estimateMinutes, 30);
  assert.match(spec.description, /texto escuro sobre fundo claro/);
  assert.equal(spec.checklist.length, 3);
  assert.deepEqual(spec.checklist.map(item => item.id), ['a001', 'a002', 'a003']);
  assert.deepEqual(spec.checklist.map(item => item.done), [true, false, false]);
  assert.equal(spec.checklist[0].skill, 'astrofy-accessibility');
  assert.equal(spec.checklist[2].skill, 'astrofy-design-system');
  assert.equal(spec.progress.done, 1);
  assert.equal(spec.progress.total, 3);
  assert.match(spec.notes, /relato direto/);
});

test('parseSitespec recusa front matter fora do schema', () => {
  assert.throws(() => parseSitespec('x', VALID.replace('status: in_progress', 'status: em-andamento')), /sitespec/);
});

test('parseSitespec recusa estimativa sem a base e exige priority dentro do enum', () => {
  assert.throws(() => parseSitespec('x', VALID.replace('estimateBasis: Ajuste pontual de token, já mapeado.\n', '')), /estimateBasis/);
  assert.throws(() => parseSitespec('x', VALID.replace('priority: high', 'priority: urgente')), /sitespec/);
});

test('parseSitespec recusa item de checklist sem id e id repetido', () => {
  const semId = VALID.replace('- [ ] Sem skill própria {#a003}', '- [ ] Sem skill própria');
  assert.throws(() => parseSitespec('x', semId), /sem \{#id\}/);
  const repetido = VALID.replace('{#a003}', '{#a001}');
  assert.throws(() => parseSitespec('x', repetido), /repetido/);
});

test('listSitespecs ordena por diretório, isola tarefas inválidas e resolve dependências', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'astrofy-sitespec-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, '.sitespec/0001-corrigir-contraste-botao'), { recursive: true });
  await writeFile(path.join(root, '.sitespec/0001-corrigir-contraste-botao/SITEPEC.md'), VALID);
  await mkdir(path.join(root, '.sitespec/0002-sem-arquivo'), { recursive: true });
  await mkdir(path.join(root, '.sitespec/0003-invalida'), { recursive: true });
  await writeFile(path.join(root, '.sitespec/0003-invalida/SITEPEC.md'), '---\nschemaVersion: "1.0.0"\n---\n');
  await mkdir(path.join(root, '.sitespec/0004-depende'), { recursive: true });
  await writeFile(path.join(root, '.sitespec/0004-depende/SITEPEC.md'), VALID
    .replace('id: "0001"', 'id: "0004"').replace('slug: corrigir-contraste-botao', 'slug: segunda-etapa')
    .replace('status: in_progress', 'status: draft')
    .replace('relatedFiles:', 'dependsOn:\n  - "0001"\n  - "0009"\nrelatedFiles:'));
  const result = await listSitespecs(root);
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].dir, '0001-corrigir-contraste-botao');
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.some(entry => entry.dir === '0002-sem-arquivo' && /ausente/.test(entry.message)));
  assert.ok(result.errors.some(entry => entry.dir === '0003-invalida'));
  const dependent = result.items.find(item => item.frontmatter.id === '0004');
  assert.deepEqual(dependent.blockedBy, ['0001']);
  assert.deepEqual(dependent.missingDependencies, ['0009']);
});

test('listSitespecs sem diretório .sitespec retorna listas vazias', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'astrofy-sitespec-vazio-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const result = await listSitespecs(root);
  assert.deepEqual(result, { items: [], errors: [] });
});

test('nextSitespecId preenche a primeira lacuna considerando diretórios, mesmo com tarefa inválida', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'astrofy-sitespec-id-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  assert.equal(await nextSitespecId(root), '0001');
  await mkdir(path.join(root, '.sitespec/0001-primeira'), { recursive: true });
  await mkdir(path.join(root, '.sitespec/0003-terceira-invalida'), { recursive: true });
  assert.equal(await nextSitespecId(root), '0002');
});

test('sitespecLine e sitespecDetail apresentam progresso, prioridade, ids e skills sem controles de terminal', () => {
  const spec = parseSitespec('0001-corrigir-contraste-botao', VALID);
  assert.equal(sitespecLine(spec), 'em andamento | alta | 0001-corrigir-contraste-botao | ███░░░░░ 1/3 | Corrigir contraste do botão primário');
  const detail = sitespecDetail({ ...spec, notes: 'Nota\x1b[2Jpreservada' });
  for (const text of ['Progresso: ███░░░░░░░ 1/3 (33%)', 'Prioridade: alta', 'Estimativa: 30 min', 'Skill principal: astrofy-design-system', 'astrofy-accessibility', '[x] Medir o contraste atual', '[ ] Sem skill própria', '{#a003}']) {
    assert.ok(detail.includes(text), text);
  }
  assert.ok(!detail.includes('\x1b'));
});

test('sitespecDetail mostra dependências pendentes e inexistentes', () => {
  const spec = { ...parseSitespec('0004-depende', VALID.replace('relatedFiles:', 'dependsOn:\n  - "0001"\n  - "0009"\nrelatedFiles:')), blockedBy: ['0001'], missingDependencies: ['0009'] };
  const detail = sitespecDetail(spec);
  assert.match(detail, /Depende de: 0001, 0009/);
  assert.match(detail, /Esperando \(ainda não concluída\): 0001/);
  assert.match(detail, /Dependência inexistente: 0009/);
});
