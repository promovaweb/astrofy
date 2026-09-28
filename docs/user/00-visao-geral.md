# Visão geral

Você descreve o trabalho ao agente na conversa. O Astrofy examina o projeto,
seleciona as skills necessárias e solicita as informações que faltam. Para criar
uma página, a conversa aprova o conteúdo antes de passar ao plano técnico e à
implementação.

O percurso de uma página tem três etapas:

1. `astrofy-page-planner` identifica o tipo de página e conduz a entrevista.
2. `astrofy-implementation-planner` relaciona o conteúdo aprovado à estrutura
   atual do projeto e apresenta um plano técnico.
3. As skills selecionadas implementam e conferem as tarefas aprovadas.

`astrofy-setup` organiza a adoção ampla ou a revisão inicial do site. Para uma
página específica, explique o que quer fazer. O agente confere se precisa
preparar o projeto antes de continuar.

![Etapas de uma página Astro](assets/fluxo-astrofy.svg)

Você pode começar com uma frase, como “quero uma página para meu produto”. O
agente confirma o tipo, coleta o conteúdo por etapas e apresenta alternativas
quando precisa da sua escolha. Você revisa a página completa e o plano antes
da implementação.

## Artefatos do projeto

| Caminho | Conteúdo |
| --- | --- |
| `.astrofy/config/project.json` | Configuração criada durante a adoção do Astrofy |
| `.astrofy/pages/<slug>/page-spec.json` | Especificação estruturada da página aprovada |
| `.astrofy/pages/<slug>/page.md` | Conteúdo completo para leitura e revisão |
| `.astrofy/plans/<slug>/implementation-plan.json` | Estado técnico das tarefas |
| `.astrofy/plans/<slug>/implementation-plan.md` | Plano técnico apresentado para revisão |
| `astrofy.checklist.json` | Estado das verificações executadas no site |

![Relação entre orquestradoras, artefatos e skills](assets/artefatos-skills.svg)

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Fluxo e artefatos públicos do Astrofy |
| Autoridade | Orquestradoras, schemas e CLI |
