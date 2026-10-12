# Casos de implementar sitespec

## Uso comum

Tarefa `0003-corrigir-contraste-botao`, `status: draft`, dois itens
pendentes com `{#id}` `a001` e `a002`. Mude `status` para `in_progress`,
atualize `updatedAt`, execute o item `a001` com a skill marcada nele, marque
`- [x]` nessa linha, atualize `updatedAt` de novo, repita para `a002` e, com
os dois marcados, mude `status` para `done`.

## Projeto existente

Antes de tocar no arquivo, rode `astrofy sitespec list --json` e confira
`blockedBy`. Uma tarefa com `blockedBy: ["0001"]` só deveria avançar depois
de confirmar com quem pediu que a dependência pendente não impede o
trabalho — a leitura não bloqueia a edição automaticamente.

## Erro recorrente

Não marque `status: done` com item ainda `[ ]` na checklist. Se faltar
tempo para terminar todos os itens, deixe `status: in_progress` e registre
em `## Notas` o que falta, em vez de declarar conclusão antecipada.

## Conferência

Depois de cada edição, rode `astrofy sitespec list --json` e confirme que a
tarefa continua em `items`, com `progress.done` correspondente aos itens
que você de fato marcou `[x]`.

## Regressão específica

- **Arquivos envolvidos:** `.sitespec/<id>-<slug>/SITEPEC.md`.
- **Alteração sob teste:** marcar um item pelo `{#id}` sem alterar texto ou
  skill da linha, e manter `updatedAt` coerente com a última edição.
- **Falha e resultado esperado:** copiar uma linha de item sem trocar o
  `{#id}` cria um id repetido; `astrofy sitespec list --json` move a tarefa
  para `errors` até a correção.
- **Comando complementar:** `astrofy sitespec list --json`.

Execute a falha deliberada (duplique um `{#id}`) em uma cópia descartável e
confirme o erro relatado. Corrija com um id novo e confirme a volta para
`items`.

## Bloqueio por impedimento externo

Durante a execução de um item, descobre-se que falta uma credencial de API
que só outra pessoa tem. Mude `status` para `blocked`, escreva
`blockedReason: "Falta credencial da API X, solicitada a Fulano em
2026-10-12."`, atualize `updatedAt` e pare — não marque os itens restantes
nem deixe a tarefa em `in_progress` sem indicar o impedimento real.

```bash
astrofy sitespec list --json
```
