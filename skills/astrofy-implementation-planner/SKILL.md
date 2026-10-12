---
name: astrofy-implementation-planner
description:
  Converte uma especificação de página aprovada em tarefas técnicas
  retomáveis em .sitespec/, ligadas às skills Astrofy, aos arquivos reais e
  às validações.
---

# Planejar a implementação da página

Use esta skill depois de `astrofy-page-planner` ou quando já existir uma
especificação equivalente aprovada. Ela produz trabalho técnico; não altera a
página nem executa publicação.

## Entradas

1. Leia `page.md`, `page-spec.json`, instruções locais e estado Git.
2. Confirme rota, layout, componentes, configuração, estilos, testes e scripts
   reais do aplicativo.
3. Consulte `astrofy status --json`, checklist e relatórios citados. Separe
   falha avaliada, revisão humana pendente, execução incompleta e resultado
   vencido.
4. Recuse planejar campos essenciais que continuam `proposed` ou
   `content_pending`. Preserve pendências opcionais declaradas.

## Decomposição

Leia o [modelo de implementação](references/technical.md) e o contrato em
`docs/sitespec.md` no checkout do Astrofy; o schema fechado fica em
`packages/schemas/sitespec.schema.json`. `astrofy plan` já grava três tarefas
mecânicas (`route`, `content`, `check`) como sitespecs; use este processo
para decidir se a página precisa de tarefas adicionais além dessas três.

Para cada tarefa adicional, registre com `astrofy-sitespec-create` (passando
`page: <slug>` e um `task` próprio, kebab-case, diferente de `route`,
`content` e `check`):

- entrega observável, na `## Descrição`;
- skill executora (`primarySkill`) e skills de revisão (`reviewSkills`);
- arquivos existentes e previstos (`relatedFiles`);
- dependências reais, não uma sequência fixa (`dependsOn`, com os `id`s das
  tarefas da mesma página);
- estimativa em minutos com a base do cálculo, quando houver histórico
  (`estimateMinutes`/`estimateBasis`);
- passos técnicos delimitados e comandos de validação, como itens da
  checklist, cada um com `{#id}` próprio.

Não crie tarefa genérica como "fazer responsivo". Nomeie a rota, a região, o
estado e a conferência. Não transforme cada item da checklist em tarefa isolada
quando uma única alteração e uma única validação cobrem o mesmo comportamento.

## Seleção de skills

Use `astrofy-page-design` e `astrofy-sections` para composição; escolha
homepage ou landing-pages somente quando o formato pedir. Acrescente config,
routing, forms, images, accessibility, seo, open-graph, structured-data,
testing, documentation e outras especialistas conforme o trabalho real.

Uma tarefa tem uma skill principal e pode listar skills de conferência. Não
duplique a mesma alteração em fases diferentes.

Quando `page.md` registrar `Voz e redação`, carregue essa orientação nas
tarefas que exibem ou alteram texto. Inclua `astrofy-editorial-review` como
skill de conferência sempre que a tarefa criar ou modificar copy visível.

## Saída e retomada

As tarefas vivem em `.sitespec/<id>-<slug>-<task>/SITEPEC.md`, uma por
tarefa, com `page: <slug>` e `task` no front matter. Não há mais
`.astrofy/plans/` nem `implementation-plan.json` — o Markdown da sitespec é
a única fonte, lida tanto por `astrofy sitespec list`/`progress` quanto pela
aba Specs da TUI, junto das tarefas pontuais de outras páginas e do resto do
site.

Ao retomar, rode `astrofy plan --slug <slug>` de novo: ele reconcilia as três
tarefas mecânicas sem perder `status` nem itens de checklist já marcados, e
atualiza texto e dependências a partir do `page-spec.json` atual. Revise as
tarefas adicionais que você mesmo criou à mão da mesma forma — se a origem
mudou, reabra as que dependiam do que mudou; preserve as concluídas sem
relação com a mudança. Consulte os [casos de decomposição](examples/cases.md).

`astrofy plan --slug <slug>` grava as três tarefas mecânicas. Durante a
execução, `astrofy apply --slug <slug>` inicia a próxima tarefa pronta (sem
dependência pendente); `--task` e `--status` registram conclusão, falha ou
retirada consciente. Uma dependente só perde o `blockedBy` depois que todas
as predecessoras terminam como `completed` ou `skipped`. Tarefas adicionais
que você criou com `astrofy-sitespec-create` são executadas e atualizadas
por `astrofy-sitespec-implement`, não por `apply`.

Apresente o plano antes de executar. A aprovação do plano autoriza somente o
trabalho pedido; push, publicação, compra e alteração externa continuam
dependentes da autorização correspondente.
