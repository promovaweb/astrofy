---
name: astrofy-implementation-planner
description:
  Converte uma especificação de página aprovada em fases e tarefas técnicas
  retomáveis, ligadas às skills Astrofy, aos arquivos reais e às validações.
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

Leia o [modelo de implementação](references/technical.md). Produza fases por
dependência real, não por uma sequência fixa. Reuse componentes e configuração
existentes quando seus contratos atendem a especificação.
O contrato fechado distribuído pelo pacote fica em
`packages/schemas/implementation-plan.schema.json` no checkout do Astrofy.

Para cada tarefa, registre:

- entrega observável;
- skill executora;
- itens da especificação e da checklist que originaram o trabalho;
- arquivos existentes e arquivos previstos;
- dependências;
- estimativa em minutos, marcada como estimativa quando não houver histórico;
- passos técnicos delimitados;
- comandos e verificações manuais;
- condição objetiva para concluir;
- estado `pending`, `ready`, `in_progress`, `completed`, `failed` ou `skipped`.

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

Grave `.astrofy/plans/<slug>/implementation-plan.md` e
`implementation-plan.json`.
O JSON é a fonte do estado; o Markdown apresenta a ordem, as dependências, os
comandos e as pendências para leitura humana.

Ao retomar, compare hash ou data da especificação, Git e arquivos listados. Se
a origem mudou, reabra tarefas consumidoras. Preserve tarefas concluídas sem
relação com a mudança. Consulte os [casos de decomposição](examples/cases.md).

Use `astrofy plan --slug <slug>` para gerar o JSON validado. Durante a
execução, `astrofy apply --slug <slug>` inicia a próxima tarefa pronta;
`--task` e `--status` registram conclusão, falha ou retirada consciente. Uma
dependente passa a `ready` somente depois que todas as predecessoras terminam
como `completed` ou `skipped`.

Apresente o plano antes de executar. A aprovação do plano autoriza somente o
trabalho pedido; push, publicação, compra e alteração externa continuam
dependentes da autorização correspondente.
