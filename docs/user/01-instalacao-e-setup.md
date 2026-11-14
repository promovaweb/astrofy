# Instalação e setup

## Requisitos

- Node.js 22.12.0 ou posterior: o CLI usa recursos recentes do runtime
  (como `node:timers/promises` com suporte a `AbortSignal`) e não testa
  versões anteriores.
- Um projeto Astro existente com `package.json` declarando `astro` em
  `dependencies` ou `devDependencies`. O Astrofy não cria um site do
  zero: ele opera sobre um projeto que já existe, mesmo que ainda esteja
  no início.
- Permissão de escrita no diretório do projeto. Toda operação que grava
  algo usa escrita atômica (arquivo temporário, sincronização e troca por
  `rename`) e um lock em `.astrofy/cache/write.lock`, então duas execuções
  simultâneas não corrompem o estado, mas ambas precisam conseguir
  escrever no disco.

## Instale o pacote e as skills

```bash
npm install --global @promovaweb/astrofy
cd /caminho/do/site
astrofy skills install --agent codex
```

Troque `codex` por `claude` se esse for o agente usado no projeto: o
destino muda (`.agents/skills/` para Codex, `.claude/skills/` para
Claude), mas o conteúdo instalado é o mesmo catálogo de 54 skills. Para
conferir o que seria escrito antes de gravar, acrescente `--dry-run`; o
comando mostra a lista de arquivos sem gravar no disco.

A instalação é local ao projeto: o Astrofy não escreve em diretórios fora do
site aberto. Ela também preserva personalizações. Se você já editou o
`SKILL.md` de uma skill instalada, uma nova instalação recusa sobrescrevê-lo e
orienta a conciliação manual, para que uma atualização de versão não apague
o seu ajuste em silêncio.

## Diga o que quer fazer

Depois de instalar, abra uma conversa no projeto e diga o que quer, sem
se preocupar com qual comando ou skill usar: essa escolha é do agente.
Por exemplo:

> Quero criar uma página de produto. Use o Astrofy para entender o
> projeto, conversar comigo sobre o conteúdo e mostrar o plano antes de
> implementar.

O agente lê a sua instrução e escolhe o caminho:

- **Instrução ampla** ("organize o projeto", "revise o que já existe",
  "prepare o site para o Astrofy") encaminha para `astrofy-setup`. Essa
  skill reconhece convenções e integrações já presentes no site,
  inicializa os contratos que ainda faltam (`.astrofy/config/`,
  `astrofy.checklist.json`) e registra o estado em
  `.astrofy/setup-state.json` para que uma nova execução saiba o que já
  foi feito e o que mudou desde então.
- **Página específica** ("quero uma página para X") encaminha
  direto para `astrofy-page-planner` (capítulo 2), sem passar por setup:
  a menos que o projeto ainda não tenha os contratos básicos, caso em
  que o agente prepara isso primeiro, sem perguntar.
- **Tarefa pontual** ("ajuste o contraste do botão", "corrija esse link
  quebrado") encaminha para `astrofy-sitespec-create` (capítulo 8).

Em nenhum desses três caminhos você precisa saber de antemão qual comando
do CLI corresponde à etapa. Conforme a conversa avança, o agente executa os
comandos do CLI (de `astrofy inspect` e `astrofy init` a `astrofy plan`) e
você só vê os resultados. Use esses comandos diretamente apenas quando quiser
conduzir a mesma etapa pelo terminal, sem o agente, por exemplo em CI ou
num script de automação. O [manual do CLI](../cli.md) descreve todos eles
com exemplos.

## O comando sem argumentos abre o painel

Depois de instalado, rodar `astrofy` sem nenhum comando abre a TUI: o
painel interativo de consulta descrito no capítulo 7, que também cobre as
tarefas de `.sitespec/`. Isso é deliberado: num terminal interativo, o
painel mostra o estado completo que um resumo de texto omitiria. Em um script
ou pipeline de CI, sem terminal interativo (ou com `--json`/`--ci`
explícitos), o mesmo comando sem argumentos devolve exatamente a mesma
consulta que `astrofy status` devolveria: então nenhuma automação
existente quebra por esse comportamento.

## Resultado da instalação

Depois da instalação das skills, elas ficam disponíveis no projeto, mas
nada muda no código ainda: instalar skills não é o mesmo que adotar o
framework. A adoção (via `astrofy-setup` ou pela primeira tarefa que
precisar desses contratos) cria `.astrofy/` com a configuração do projeto
e `astrofy.checklist.json` com o catálogo de verificações aplicáveis.

Antes de aprovar qualquer implementação, confira os arquivos alterados:
`git status` e `git diff` continuam sendo a fonte de verdade sobre o que
realmente mudou no disco, independente do que a conversa descreveu.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Instalação e início do trabalho em conversa |
| Autoridade | CLI de instalação e skills Astrofy |
