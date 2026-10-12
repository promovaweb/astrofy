# Referência técnica de astrofy-sitespec-implement

> Base técnica conferida para Astro 7.3.3 em 12/10/2026. Revise o contrato em
> `docs/sitespec.md` ao alterar o schema.

## Arquivos e APIs

Leia `docs/sitespec.md` e `packages/schemas/sitespec.schema.json` na raiz do
pacote Astrofy. A edição desta skill é direta no Markdown: não existe
comando de escrita no CLI para `.sitespec/`; `astrofy sitespec list` é
somente leitura e serve para validar o arquivo depois de cada edição.

## Alteração compatível

Ao marcar um item, altere apenas `[ ]` → `[x]` (ou o inverso, com nota
explicando por quê) na linha identificada pelo `{#id}`. Não reescreva texto,
skill ou id do item ao marcá-lo. Ao mudar `status`, atualize `updatedAt` no
mesmo instante; os dois campos não ficam dessincronizados.

## Diagnóstico

Se `astrofy sitespec list --json` mover a tarefa editada para `errors`, a
edição quebrou o contrato — normalmente um `{#id}` apagado ou duplicado por
copiar e colar uma linha sem trocar o id. Desfaça a última edição e reaplique
com cuidado, em vez de tentar corrigir o schema para aceitar o erro.

## Regras do catálogo

| Regra | Método | Escopo | Verificação |
| --- | --- | --- | --- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use `astrofy sitespec list --json` para validar o contrato após editar. |

## Execução de checks

`astrofy sitespec list` recalcula `blockedBy` e `missingDependencies` a cada
chamada, em memória, contra o conjunto atual de arquivos em `.sitespec/`.
Não executa scripts do site e não abre navegador; a skill principal de cada
item da checklist é quem efetivamente altera o site, não esta skill.

## Fontes

Consulta: 12/10/2026.

- **[JSON Schema](https://ajv.js.org/json-schema.html):** dialeto JSON
  Schema e validação Ajv; consulte ao diagnosticar uma edição recusada.
- **[GitHub Flavored Markdown — Task list items](https://github.github.com/gfm/#task-list-items-extension-):**
  sintaxe `- [ ]`/`- [x]` da checklist.

## Transição de status e checklist

`status: done` exige progresso `done === total` na checklist. Antes de
marcar `done`, confira com `astrofy sitespec list --json` que `progress`
mostra os dois números iguais; não marque `done` contando manualmente, já
que um item sem `{#id}` válido não é contado.

```bash
astrofy sitespec list --json
```

## Bloqueio e arquivamento

`blocked` é para impedimento externo à tarefa — não para uma dependência de
outra sitespec ainda não concluída, que já aparece em `blockedBy` sem
precisar de ação manual. Use `blocked` quando a própria execução não pode
continuar por falta de acesso, decisão de terceiro ou recurso indisponível,
e descreva a causa específica em `blockedReason`, não um resumo genérico
como "bloqueado por dependência".

`archived` fecha a tarefa sem completar a checklist — uso raro, para
duplicata ou decisão explícita de não fazer. `archivedReason` precisa
nomear a decisão, não repetir o texto de `summary`.

## Registro em Notas

Uma nota datada (`AAAA-MM-DD: texto`) marca decisão, desvio ou bloqueio.
Não registre uma nota para cada item concluído sem incidente — isso vira
ruído que esconde as notas que de fato importam para quem revisar depois.
