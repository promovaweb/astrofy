# Casos de criar sitespec

## Uso comum

Pedido: "o botão primário está com contraste baixo no tema claro". Rode
`astrofy sitespec list --json`, confirme que não existe tarefa igual, anote
`nextId` (por exemplo `"0003"`), escolha `slug: corrigir-contraste-botao`,
`primarySkill: astrofy-design-system`, `reviewSkills: [astrofy-accessibility]`.
Leia o `SKILL.md` de `astrofy-accessibility` e escreva a checklist com os
critérios de contraste que se aplicam ao botão, cada item com `{#id}` próprio.

## Pedido ambíguo, poucas perguntas

Pedido: "melhora a página de preços". Rode `astrofy skills list --json`;
nenhuma skill isolada resolve "melhora" — isso pode ser copy, SEO, layout
ou os três. Pergunte no máximo três, cada uma objetiva:

1. "O que precisa melhorar: o texto, o SEO, o layout, ou mais de um? Eu
   recomendaria tratar como tarefas separadas se forem mais de um."
2. "Isso é a página de preços inteira ou uma seção específica (hero, tabela
   de planos, FAQ)?"

Depois da resposta, crie uma tarefa por frente identificada (ou uma só, se
a resposta restringir a um ponto), com `primarySkill` e `reviewSkills`
coerentes com o que foi respondido, e registre a pergunta e a resposta em
`## Notas`.

## Pedido já específico, zero perguntas

Pedido: "o link do rodapé para a página de contato está indo para /contato
mas a rota é /fale-conosco". Skill, arquivo e critério de pronto já estão
no pedido: `astrofy-routing` ou `astrofy-footer` resolve, o arquivo é o
componente de rodapé, e "pronto" é o link apontar para a rota real. Não
pergunte nada — crie a tarefa direto a partir do passo 4 do procedimento.

## Projeto existente

Antes de criar, sempre rode `astrofy sitespec list --json` e leia `items`
inteiro. Uma tarefa parecida já registrada, mesmo com `slug` diferente,
deve ser reaproveitada ou referenciada via `dependsOn`, não duplicada.

## Erro recorrente

Não escreva `reviewSkills` com a lista inteira do catálogo "para garantir
cobertura". Cada skill em `reviewSkills` precisa ter sido lida e contribuído
pelo menos um critério real para a checklist. Uma skill sem contribuição
nenhuma não entra na lista.

Não pergunte um roteiro fixo de perguntas (por exemplo, sempre "qual
prioridade?", "qual arquivo?", "qual skill?") independente do pedido já ser
claro. Isso é a bureaucracia que o contrato tenta evitar: mapeie as skills
relacionadas primeiro, e pergunte apenas o que sobrar sem resposta.

## Conferência

Depois de escrever o arquivo, rode `astrofy sitespec list --json` de novo.
A tarefa precisa aparecer em `items`; se aparecer em `errors`, leia a
mensagem (ela cita o campo ou o `{#id}` problemático) e corrija antes de
considerar a criação concluída.

## Regressão específica

- **Arquivos envolvidos:** `.sitespec/<id>-<slug>/SITEPEC.md`,
  `packages/schemas/sitespec.schema.json`.
- **Alteração sob teste:** criação de uma tarefa nova sem duplicar uma
  existente e sem inventar critério fora das `reviewSkills` declaradas.
- **Falha e resultado esperado:** um item de checklist sem `{#id}`, ou com
  `{#id}` repetido, faz a tarefa inteira cair em `errors` até a correção.
- **Comando complementar:** `astrofy sitespec list --json`.

Execute a falha deliberada (remova um `{#id}` de um item) em uma cópia
descartável do arquivo e confirme que `astrofy sitespec list --json` move a
tarefa para `errors`. Restaure o `{#id}` e confirme a volta para `items`.

## Dependência entre tarefas

Uma segunda tarefa só começa depois que a primeira termina: declare
`dependsOn: ["0001"]` na segunda. Rode `astrofy sitespec list --json` e
confirme que a segunda tarefa aparece com `blockedBy: ["0001"]` enquanto a
primeira não estiver `done`, e com `blockedBy: []` depois que a primeira for
marcada `done` por `astrofy-sitespec-implement`.

```bash
astrofy sitespec list --json
```

Não marque `status: blocked` só porque existe uma dependência pendente —
`blockedBy` já comunica isso; `blocked` é para impedimentos que a própria
tarefa não controla, como aguardar credencial externa.
