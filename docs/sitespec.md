# Contrato do SITEPEC.md

`.sitespec/` guarda tarefas de desenvolvimento do site como mini specs
independentes. Cada tarefa é um diretório com um único arquivo `SITEPEC.md`.
O contrato existe para que uma tarefa seja editável por uma pessoa no editor
e, ao mesmo tempo, lida de forma confiável por `astrofy sitespec list` e pela
aba Specs da TUI.

`.sitespec/` não substitui `.astrofy/pages/<slug>/` nem `.astrofy/plans/<slug>/`.
Esses dois ficam reservados ao fluxo de entrevista e plano de implementação de
uma página completa. Um SITEPEC cobre qualquer tarefa pontual de
desenvolvimento do site — ajuste de componente, correção, melhoria técnica,
tarefa de SEO ou acessibilidade — sem exigir a entrevista inteira.

Criação e execução são skills, não comandos de escrita do CLI: a skill
`astrofy-sitespec-create` escreve o arquivo seguindo este contrato e a skill
`astrofy-sitespec-implement` o altera conforme o trabalho avança (marca itens,
muda `status`, registra notas). Veja `skills/astrofy-sitespec-create/SKILL.md`
e `skills/astrofy-sitespec-implement/SKILL.md`. `astrofy sitespec list` é
leitura: valida o contrato e resolve dependências, mas não grava nada.

Antes de escrever o arquivo, `astrofy-sitespec-create` mapeia as skills
relacionadas ao pedido e só pergunta o que sobrar sem resposta — zero
perguntas é o resultado mais comum; no máximo três quando o pedido é
realmente ambíguo. Não é uma entrevista fixa.

## Estrutura de diretórios

```text
.sitespec/
  0001-corrigir-contraste-botao-primario/
    SITEPEC.md
  0002-adicionar-schema-jsonld-pagina-precos/
    SITEPEC.md
```

O nome do diretório é `<id>-<slug>`, com `id` e `slug` repetidos no front
matter do arquivo. `id` é sequencial, com quatro dígitos e zero à esquerda
(`0001`, `0002`, ...). `astrofy sitespec list` calcula a primeira lacuna livre
a partir dos nomes de diretório existentes; quem cria a tarefa usa esse valor
como próximo `id`. `slug` é kebab-case e não muda depois de criado; renomear
a tarefa altera apenas `title` e `summary`.

## Front matter

`SITEPEC.md` abre com front matter YAML delimitado por `---`. O schema
fechado fica em `packages/schemas/sitespec.schema.json`. Campo desconhecido,
enum inválido ou tipo errado recusam a leitura antes de qualquer cálculo de
progresso.

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `schemaVersion` | `"1.0.0"` | Sim | Versão fechada do contrato. |
| `id` | string `^[0-9]{4}$` | Sim | Igual ao prefixo do diretório. |
| `slug` | string kebab-case | Sim | Igual ao sufixo do diretório. |
| `title` | string | Sim | Título curto da tarefa. |
| `summary` | string | Sim | Uma frase, usada na listagem da TUI sem abrir o corpo. |
| `status` | enum | Sim | `draft`, `in_progress`, `blocked`, `done`, `archived`. |
| `createdAt` | date-time | Sim | Criação, não editada depois. |
| `updatedAt` | date-time | Sim | Atualizada a cada edição do arquivo. |
| `primarySkill` | string `astrofy-*` | Sim | Skill do catálogo que executa a tarefa. |
| `reviewSkills` | array de `astrofy-*` | Sim | Skills consultadas para compor a checklist com boas práticas. Pode ser vazio. |
| `relatedFiles` | array de string | Sim | Caminhos do site afetados ou esperados. Pode ser vazio antes da análise. |
| `tags` | array de string | Não | Rótulos livres para busca na TUI. |
| `source` | string | Não | Origem do pedido (pessoa, issue, conversa). |
| `blockedReason` | string | Somente com `status: blocked` | Motivo do bloqueio. |
| `archivedReason` | string | Somente com `status: archived` | Motivo do arquivamento sem conclusão. |
| `priority` | enum `low`/`medium`/`high` | Não | Padrão `medium` quando ausente; ordena a listagem. |
| `dependsOn` | array de `id` | Não | Outras sitespecs que precisam estar `done` antes desta começar. |
| `estimateMinutes` | integer ≥ 1 | Somente junto de `estimateBasis` | Estimativa de esforço. |
| `estimateBasis` | string | Somente junto de `estimateMinutes` | Como a estimativa foi calculada. |

As datas aceitam tanto string entre aspas quanto o escalar ISO que o YAML
converte para data na leitura; a leitura normaliza os dois formatos antes de
validar, então qualquer um dos dois é válido ao escrever o arquivo.

## Corpo

Depois do front matter, o corpo segue três seções fixas nesta ordem. A
leitura procura os títulos exatos; texto fora delas é preservado mas não
participa do cálculo de progresso.

### `## Descrição`

Prosa livre em pt-BR explicando o que precisa ser feito e por quê. Sem limite
de tamanho, sem subestrutura obrigatória.

### `## Checklist`

Lista de tarefas no formato GFM, uma por linha, com dois marcadores no fim
em ordem fixa:

```markdown
- [ ] Texto da tarefa `#astrofy-skill-responsavel` {#a3f2}
- [x] Tarefa já concluída `#astrofy-skill-responsavel` {#9c01}
```

- `[ ]` é pendente, `[x]` é concluído. Não existe estado intermediário por
  item; um item em andamento continua `[ ]` até terminar.
- A anotação opcional `` `#astrofy-skill` `` associa o item a uma skill do
  catálogo (`astrofy-seo`, `astrofy-accessibility`, etc.). Um item sem
  anotação herda `primarySkill`.
- `{#id}` é obrigatório em todo item: quatro caracteres `[a-z0-9]`, gerados
  uma vez por quem escreve a linha e fixos depois disso — identidade estável
  do item, independente da posição dele na lista. Item sem `{#id}` ou com
  `{#id}` repetido dentro da mesma checklist recusa a leitura da tarefa
  inteira, do mesmo jeito que um front matter inválido.
- Progresso da tarefa é `concluídos / total` dentro desta seção. Lista vazia
  conta como zero de zero.

### `## Notas`

Registro cronológico opcional, em lista ou parágrafos curtos, para decisões
tomadas durante a execução, bloqueios encontrados e por que a checklist
mudou. A seção precisa existir, mesmo vazia, para manter a ordem fixa.

## Ciclo de vida do `status`

| Estado | Significado |
| --- | --- |
| `draft` | Tarefa registrada, checklist ainda pode estar incompleta ou vazia. |
| `in_progress` | Execução começou; ao menos um item pode já estar `[x]`. |
| `blocked` | Execução parada por dependência externa; exige `blockedReason`. |
| `done` | Todos os itens da checklist estão `[x]`. Uma sitespec com item pendente não pode ser marcada `done`. |
| `archived` | Encerrado sem conclusão (duplicado, decisão de não fazer); exige `archivedReason`. |

A transição é feita por quem edita o arquivo (pessoa ou skill), nunca
automaticamente pela leitura. `astrofy sitespec list` só relata o estado
declarado; não infere `blocked` a partir de dependências pendentes.

## Dependências entre sitespecs

`dependsOn` lista `id`s de outras sitespecs que precisam estar `done` antes
desta começar. Como isso depende do conjunto inteiro de tarefas, a resolução
acontece em `astrofy sitespec list` (e na aba Specs da TUI), não durante a
leitura de um arquivo isolado. Cada tarefa carregada recebe dois campos
derivados, que não existem no Markdown:

- `blockedBy`: entradas de `dependsOn` cuja sitespec referida ainda não está
  `done`.
- `missingDependencies`: entradas de `dependsOn` cujo `id` não corresponde a
  nenhuma sitespec carregada — referência quebrada, não bloqueio.

Isso é informativo. Não força `status` para `blocked` nem impede a edição da
tarefa; quem decide se uma dependência pendente deve de fato interromper o
trabalho é a skill ou a pessoa executando.

## Relação com as skills do Astrofy

`primarySkill` e `reviewSkills` apontam para nomes do catálogo em
`skills/catalog.json`, no mesmo padrão `astrofy-*` usado por
`implementation-plan.schema.json`. Um nome ausente do catálogo recusa a
leitura do arquivo, do mesmo jeito que o catálogo de skills já recusa nomes
desconhecidos na seleção de instalação.

`astrofy-sitespec-create` consulta `SKILL.md` e `references/technical.md` das
skills listadas em `reviewSkills` para derivar os itens da checklist — por
exemplo, uma tarefa que toca acessibilidade consulta `astrofy-accessibility`
antes de escrever os itens, em vez de inventar critérios soltos.
`astrofy-sitespec-implement` executa o trabalho descrito na `## Descrição`
usando `primarySkill` e atualiza o arquivo a cada item concluído.

## Exemplo completo

```markdown
---
schemaVersion: "1.0.0"
id: "0002"
slug: adicionar-schema-jsonld-pagina-precos
title: Adicionar schema JSON-LD na página de preços
summary: Página de preços sem dados estruturados de oferta, afeta rich snippets.
status: in_progress
createdAt: "2026-10-12T14:00:00.000Z"
updatedAt: "2026-10-12T15:30:00.000Z"
primarySkill: astrofy-structured-data
reviewSkills:
  - astrofy-seo
  - astrofy-structured-data
relatedFiles:
  - src/pages/planos/martech.astro
tags:
  - seo
  - preco
priority: high
dependsOn:
  - "0001"
estimateMinutes: 45
estimateBasis: Schema simples, campos já mapeados na tarefa 0001.
---

## Descrição

A página de preços do Plano Martech não publica `schema.org/Offer`. Buscadores
não recebem o preço estruturado, o que reduz a chance de rich snippet na SERP.

## Checklist

- [x] Mapear os campos obrigatórios de `Offer` para o plano atual `#astrofy-structured-data` {#f3a1}
- [x] Confirmar que o preço exibido na página bate com o preço declarado no schema `#astrofy-seo` {#f3a2}
- [ ] Implementar o bloco JSON-LD no componente da página `#astrofy-structured-data` {#f3a3}
- [ ] Validar o schema com o verificador de dados estruturados `#astrofy-structured-data` {#f3a4}

## Notas

- 2026-10-12: iniciado a partir de pedido direto, sem issue associada.
```
