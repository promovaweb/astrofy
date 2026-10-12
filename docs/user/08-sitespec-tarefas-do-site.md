# Tarefas do site com sitespec

Nem toda mudança no site é uma página nova. Um ajuste de componente, uma
correção de contraste, uma pendência de SEO — isso vira uma tarefa em
`.sitespec/`, não uma entrevista de página. Use `astrofy-page-planner`
(capítulo 2) para páginas completas; use sitespec para o resto do trabalho
de desenvolvimento do site.

## Criar uma tarefa

Descreva o pedido ao agente. `astrofy-sitespec-create` confere se já existe
uma tarefa igual, mapeia as skills relacionadas ao pedido e só pergunta o
que sobrar sem resposta — a maioria dos pedidos não gera pergunta nenhuma.
Quando o pedido é ambíguo em algo que mudaria a tarefa, a skill faz no
máximo três perguntas objetivas, cada uma com uma opção recomendada, antes
de escrever o arquivo.

```text
Pedido: "o botão primário está com contraste baixo no tema claro"
→ sem pergunta: skill, arquivo e critério de pronto já estão no pedido
→ cria .sitespec/0003-corrigir-contraste-botao/SITEPEC.md
```

A tarefa criada fica em `status: draft`, com `primarySkill` (quem executa) e
`reviewSkills` (quem contribuiu critério para a checklist).

## Checklist e identidade do item

Cada item da checklist tem um id curto e fixo, `{#id}`, e pode marcar a
skill responsável:

```markdown
- [ ] Ajustar o token de cor do botão `#astrofy-design-system` {#a3f2}
- [x] Medir o contraste atual `#astrofy-accessibility` {#a001}
```

O id não muda depois de criado, mesmo que o item seja reordenado. Um item
sem `{#id}`, ou com um id repetido na mesma checklist, invalida a tarefa
inteira até a correção — o contrato completo está em `docs/sitespec.md`.

## Acompanhar o progresso

```bash
astrofy sitespec list --json
```

Devolve as tarefas existentes com progresso (`done`/`total`), o próximo id
livre e, para cada tarefa, `blockedBy` (dependências ainda não concluídas).
Pelo terminal interativo, `astrofy tui` abre a aba **Specs** (`Ctrl+S`): lista
as tarefas, mostra prioridade e progresso, e `Enter` abre o detalhe completo
com descrição, checklist e notas. A aba é só consulta.

## Executar a tarefa

`astrofy-sitespec-implement` lê a tarefa, muda `status` para `in_progress`,
executa cada item com a skill marcada e marca `[x]` pelo `{#id}` ao
terminar. Ao final:

| Resultado | `status` |
| --- | --- |
| Toda a checklist concluída | `done` |
| Impedimento externo à tarefa | `blocked`, com `blockedReason` |
| Decisão de não terminar | `archived`, com `archivedReason` |

Decisões e desvios ficam registrados em `## Notas`, datados.

## Dependências entre tarefas

Uma tarefa pode declarar `dependsOn` com o id de outra que precisa terminar
primeiro. `astrofy sitespec list --json` resolve isso automaticamente:

```bash
astrofy sitespec list --json
```

A tarefa dependente aparece com `blockedBy: ["0001"]` enquanto a 0001 não
estiver `done`. Isso é informativo — não muda `status` para `blocked`
sozinho; a pessoa ou a skill decide se a dependência pendente impede
avançar mesmo assim.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Criação, checklist, progresso e execução de tarefas em `.sitespec/` |
| Autoridade | Contrato em `docs/sitespec.md` e schema `sitespec.schema.json` |
