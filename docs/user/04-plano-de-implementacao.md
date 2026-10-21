# Plano de implementação

Depois da aprovação da página (capítulo 3), o agente chama
`astrofy-implementation-planner`. Essa skill relê o projeto — rotas
existentes, componentes disponíveis, configuração atual — e relaciona
cada área da especificação aprovada com o trabalho técnico real
necessário para publicá-la. Ela produz trabalho, não conteúdo: nenhuma
palavra do texto aprovado muda aqui.

## O que o plano registra

- rota e modo de renderização;
- direção de voz para tarefas que exibem texto, herdada da entrevista;
- layouts, componentes e conteúdo que podem ser reutilizados em vez de
  recriados;
- arquivos que serão criados ou alterados, por caminho real do projeto;
- integrações e variáveis de ambiente necessárias;
- acessibilidade, SEO e dados estruturados aplicáveis ao tipo de página;
- testes automáticos e pontos que exigem revisão manual;
- revisão editorial, quando a tarefa cria ou altera texto visível;
- documentação afetada pela mudança;
- dependências, ordem de execução e estimativa de cada tarefa.

## Por que isso virou tarefas em `.sitespec/`, e não um arquivo de plano

Antes, esse plano vivia sozinho em
`.astrofy/plans/<slug>/implementation-plan.json` — um formato próprio,
sem relação com qualquer outra tarefa do site. Isso criava um problema
real: uma correção pontual (ajustar um contraste, corrigir um link) e uma
tarefa de implementação de página eram rastreadas em dois lugares
completamente separados, sem nenhuma visão única de progresso.

Hoje cada tarefa do plano **é uma sitespec comum** — o mesmo contrato
descrito em `docs/sitespec.md` e usado pelo capítulo 8 para tarefas
pontuais, com o mesmo schema (`packages/schemas/sitespec.schema.json`).
A única diferença é que uma tarefa de página carrega dois campos extras
no front matter: `page` (o slug da página) e `task` (o papel da tarefa
dentro do plano daquela página — `route`, `content` ou `check`). Isso
significa que `astrofy sitespec list`, `astrofy sitespec progress` e a
aba Specs da TUI (capítulos 7 e 8) mostram as tarefas de página e as
tarefas pontuais juntas, no mesmo resumo — você não precisa consultar
dois lugares para saber o que falta no site inteiro.

## As três tarefas mecânicas

`astrofy plan --slug <slug>` grava sempre três tarefas, nessa ordem de
dependência:

| `task` | O que cobre | Depende de |
| --- | --- | --- |
| `route` | Criar a rota com o layout atual | nada |
| `content` | Aplicar o conteúdo e as seções aprovadas | `route` |
| `check` | Executar `npm run check` e `astrofy check --browser` | `content` |

Cada uma vira um diretório próprio em `.sitespec/<id>-<slug>-<task>/`,
por exemplo `.sitespec/0007-atlas-route/`. A dependência entre elas é
real, não decorativa: `content` só perde a entrada em `blockedBy` depois
que `route` chega a `status: done`; `check` só depois de `content`.
`astrofy-implementation-planner` pode acrescentar tarefas além dessas
três quando a página for grande o suficiente para exigir mais
decomposição — sempre com o mesmo `page` e um `task` próprio, que não
colida com `route`, `content` ou `check` (veja
`skills/astrofy-implementation-planner/references/technical.md` para os
orientações para dividir o trabalho em mais tarefas).

```bash
astrofy plan --slug atlas
```

As tarefas começam em `status: draft` — nenhuma delas é marcada como
"pronta" separadamente; a leitura (`astrofy sitespec list`/`progress`)
calcula `blockedBy` a partir de `dependsOn` a cada consulta. Uma tarefa
`draft` sem `blockedBy` já pode começar; uma tarefa `draft` com
`blockedBy` ainda espera a predecessora.

## Reexecutar o plano não perde trabalho

Se a especificação da página mudar depois que o plano já foi gerado —
uma seção nova, um texto revisado — rode `astrofy plan --slug <slug>` de
novo. O comando reconcilia, não recria do zero:

- o `id` de cada tarefa (o prefixo numérico do diretório) é preservado;
- o `status` atual é preservado — uma tarefa já `done` ou `in_progress`
  não volta para `draft` só porque o plano foi regenerado;
- os itens de checklist já marcados `[x]` permanecem marcados quando o
  texto do passo não mudou; um passo com texto idêntico ao anterior
  mantém o mesmo `{#id}` de item também;
- o que de fato é atualizado é o texto da tarefa, a skill responsável e
  as dependências, a partir do `page-spec.json` atual.

Isso é o que permite ajustar conteúdo sem que o progresso técnico já
feito seja descartado — reexecutar o plano depois de uma mudança pequena
na especificação não é um passo destrutivo.

## Aprovação

Confira se cada tarefa aponta para um resultado observável e uma forma
de conferência — não para uma descrição vaga como "deixar responsivo".
Ajuste o plano antes de executar quando o caminho proposto não combinar
com a arquitetura atual do projeto (por exemplo, se a skill de composição
escolhida não for a certa para o tipo de página). A aprovação do plano
libera as skills técnicas para começar; ela não autoriza push, publicação
ou qualquer alteração fora do que está descrito nas tarefas.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Conversão da página aprovada em trabalho técnico |
| Autoridade | `astrofy-implementation-planner` e o contrato de sitespec |
