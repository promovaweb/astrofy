# Tarefas do site com sitespec

Nem toda mudança no site é uma página nova. Um ajuste de componente, uma
correção de contraste, uma pendência de SEO, um link quebrado — nada
disso precisa de uma entrevista de página inteira para ser registrado e
acompanhado. Use `astrofy-page-planner` (capítulo 2) quando o resultado
é uma página completa, com conteúdo a ser aprovado; use sitespec para
qualquer outro trabalho de desenvolvimento do site, incluindo as
próprias tarefas técnicas derivadas de uma página (capítulo 4 explica
como essas duas coisas convivem no mesmo lugar).

## Por que um contrato próprio, em vez de uma issue qualquer

Uma tarefa registrada apenas em texto livre (uma anotação, um comentário
de código, uma mensagem) não tem skill responsável definida, não tem
critério verificável de "pronto", e não aparece em nenhuma consulta
automatizada de progresso. O sitespec resolve isso com um contrato
mínimo, mas fechado: todo arquivo `SITEPEC.md` tem uma skill que executa,
um estado de um conjunto fixo, e uma checklist cujos itens podem ser
contados — o suficiente para `astrofy sitespec list`/`progress` somarem
progresso real do site inteiro, sem depender de cada tarefa estar escrita
de um jeito diferente.

## Criar uma tarefa

Descreva o pedido ao agente, em linguagem natural, do mesmo jeito que
você descreveria uma página. `astrofy-sitespec-create` confere primeiro
se já existe uma tarefa equivalente — ela não cria duplicata para um
pedido que já está registrado sob outro texto. Em seguida, ela mapeia as
skills do catálogo relacionadas ao pedido e só pergunta o que sobrar sem
resposta depois disso: a maioria dos pedidos já é específica o
suficiente (qual arquivo, qual comportamento, o que conta como corrigido)
para não gerar pergunta nenhuma. Quando o pedido é genuinamente ambíguo
em algo que mudaria a tarefa — por exemplo, não está claro se o problema
é de copy, de SEO ou de layout —, a skill faz no máximo três perguntas
objetivas, cada uma com uma opção recomendada, antes de escrever
qualquer arquivo. Isso é deliberado: o objetivo é não ser burocrático,
então o padrão é zero perguntas, não um roteiro fixo repetido para todo
pedido.

```text
Pedido: "o botão primário está com contraste baixo no tema claro"
→ sem pergunta: skill, arquivo e critério de pronto já estão no pedido
→ cria .sitespec/0003-corrigir-contraste-botao/SITEPEC.md
```

A tarefa criada fica em `status: draft`, com `primarySkill` (a skill que
vai efetivamente executar a correção) e `reviewSkills` (as skills cujo
conhecimento moldou os itens da checklist — por exemplo,
`astrofy-accessibility` para um item de contraste, mesmo que a correção
em si seja feita por `astrofy-design-system`).

## Checklist e identidade do item

Cada item da checklist tem um identificador curto e fixo, `{#id}` de
quatro caracteres, e pode marcar a skill responsável por aquele item
específico, quando ela diverge da skill principal da tarefa:

```markdown
- [ ] Ajustar o token de cor do botão `#astrofy-design-system` {#a3f2}
- [x] Medir o contraste atual `#astrofy-accessibility` {#a001}
```

O `{#id}` não muda depois de criado, mesmo que o item seja reordenado
dentro da checklist — isso existe para que uma automação ou um
comentário externo possa apontar para um item exato sem depender da
posição dele na lista, que pode mudar com uma edição manual. Um item
sem `{#id}`, ou com um id repetido na mesma checklist, invalida a tarefa
inteira até a correção, do mesmo jeito que um campo obrigatório ausente
no front matter invalidaria — o contrato completo, com todos os campos
e suas regras, está em `docs/sitespec.md`.

## Acompanhar o progresso

```bash
astrofy sitespec list --json
```

Devolve todas as tarefas existentes — pontuais e de página — com
progresso (`done`/`total` da checklist), o próximo id de quatro dígitos
livre para uma tarefa nova, e, para cada tarefa, `blockedBy` (ids de
dependências ainda não concluídas) e `missingDependencies` (ids
declarados em `dependsOn` que não correspondem a nenhuma tarefa
existente — um sinal de referência quebrada, não de bloqueio real).

Quando você quer um resumo agregado, em vez de cada tarefa em detalhe,
use `astrofy sitespec progress`. Sem `--watch`, é uma única consulta;
com `--watch`, o comando fica rodando e reimprime um novo resumo cada
vez que algo muda em `.sitespec/`, até você interromper com `Ctrl+C`:

```bash
astrofy sitespec progress
astrofy sitespec progress --watch --interval 10
```

Pelo terminal interativo, `astrofy tui` (sem argumentos, já que esse é o
comando padrão — capítulo 1) abre a aba **Specs** (`Ctrl+S`): ela lista
as tarefas com estado, prioridade e uma barra de progresso textual, e
`Enter` abre o detalhe completo de uma tarefa selecionada — descrição,
checklist com a skill de cada item, arquivos relacionados e notas. A aba
é só consulta: nada que você faz nela grava um arquivo, inclusive porque
isso permite usá-la livremente para explorar o estado do projeto sem
risco de alterar algo por engano.

## Executar a tarefa

`astrofy-sitespec-implement` lê a tarefa, muda `status` para
`in_progress` antes de tocar em qualquer arquivo, executa cada item da
checklist com a skill marcada nele (ou a skill principal, quando o item
não tem uma marcação própria) e marca `[x]` pelo `{#id}` correspondente
ao terminar cada um — não em lote ao final, mas item por item, para que
uma interrupção no meio do trabalho deixe o progresso real registrado.
Ao final, três resultados são possíveis:

| Resultado | `status` | O que fica registrado |
| --- | --- | --- |
| Toda a checklist concluída | `done` | Nada além da checklist marcada — a conclusão é objetiva |
| Impedimento externo à tarefa | `blocked` | `blockedReason`, com a causa específica |
| Decisão de não terminar | `archived` | `archivedReason`, com a justificativa |

Decisões e desvios durante a execução — por que um item foi feito
diferente do esperado, por que a tarefa ficou bloqueada numa causa
específica — ficam registrados em `## Notas`, datados. Isso é o que
permite a alguém retomando a tarefa mais tarde (ou revisando depois)
entender o raciocínio, não só o resultado final.

## Dependências entre tarefas

Uma tarefa pode declarar `dependsOn` com o id de outra que precisa
terminar primeiro — por exemplo, uma tarefa de conteúdo que depende de
uma tarefa de rota já concluída. `astrofy sitespec list --json` resolve
isso automaticamente, a cada leitura:

```bash
astrofy sitespec list --json
```

A tarefa dependente aparece com `blockedBy: ["0001"]` enquanto a tarefa
`0001` não estiver `done`. Isso é puramente informativo — a leitura não
muda `status` para `blocked` sozinha nem impede que alguém edite a
tarefa dependente mesmo assim; a pessoa ou a skill que está executando
decide se uma dependência pendente de fato impede avançar naquele caso
específico, ou se faz sentido seguir mesmo assim.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Criação, checklist, progresso e execução de tarefas em `.sitespec/` |
| Autoridade | Contrato em `docs/sitespec.md` e schema `sitespec.schema.json` |
