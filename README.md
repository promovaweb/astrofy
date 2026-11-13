<p align="center">
  <a href="https://github.com/promovaweb/astrofy">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/promovaweb/astrofy/main/brand/logo/logo-dark.png">
      <img alt="Astrofy" src="https://raw.githubusercontent.com/promovaweb/astrofy/main/brand/logo/logo-light.png" width="360">
    </picture>
  </a>
</p>

<h1 align="center">Astrofy</h1>

<p align="center">
  Skills para planejar, implementar e revisar sites Astro em conversa com Codex ou Claude.
</p>

<p align="center">Um projeto da <a href="https://promovaweb.com">Promovaweb</a></p>

<p align="center">
  <a href="https://github.com/promovaweb/astrofy/releases/latest"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/promovaweb/astrofy"></a>
  <a href="https://www.npmjs.com/package/@promovaweb/astrofy"><img alt="npm" src="https://img.shields.io/npm/v/@promovaweb/astrofy"></a>
  <a href="https://github.com/promovaweb/astrofy/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/promovaweb/astrofy/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/promovaweb/astrofy/blob/main/LICENSE"><img alt="Licença" src="https://img.shields.io/github/license/promovaweb/astrofy"></a>
</p>

<p align="center">
  <a href="https://promovaweb.com/discord"><img alt="Discord: obter ajuda e conversar com a Comunidade" src="https://img.shields.io/badge/Discord-Obter%20ajuda%20e%20conversar%20com%20a%20Comunidade-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

<p align="center">
  <a href="https://promovaweb.com/docs/astrofy/">Documentação</a> ·
  <a href="https://promovaweb.com/discord">Discord</a> ·
  <a href="https://promovaweb.com/planos?utm_source=github&utm_medium=readme&utm_campaign=astrofy">Planos da Promovaweb</a> ·
  <a href="https://github.com/promovaweb/astrofy/blob/main/CHANGELOG.md">Changelog</a>
</p>

## O que é

O Astrofy reúne skills, um CLI e um painel no terminal para trabalhar em sites
Astro existentes. Você descreve o trabalho ao agente. Ele escolhe a skill
especialista, faz as perguntas de conteúdo e apresenta o plano antes de alterar
o código.

O pacote não cria um site do zero e não inclui template. Ele opera sobre um
projeto Astro que já existe, mesmo que ainda esteja no início.

| Modo | Como se usa | Para quê |
| --- | --- | --- |
| Skills no agente | `astrofy skills install` | planejar páginas, executar tarefas, revisar SEO, acessibilidade, conteúdo e design |
| CLI | `astrofy <comando>` | conduzir as mesmas etapas pelo terminal, em script ou em CI |
| Painel no terminal | `astrofy` ou `astrofy tui` | consultar o estado, revisar itens e acompanhar tarefas |

## Instalação

Requisitos:

- Node.js 22.12.0 ou posterior.
- Um projeto Astro com `astro` declarado no `package.json`, em `dependencies`
  ou `devDependencies`.
- Permissão de escrita no diretório do projeto.

Instale o pacote e as skills para o agente usado no projeto:

```bash
npm install --global @promovaweb/astrofy
cd /caminho/do/site
astrofy skills install --agent codex
```

Para Claude, troque `codex` por `claude`. Para conferir os arquivos antes de
gravar, acrescente `--dry-run`. A instalação é sempre local ao projeto.

Para atualizar:

```bash
npm install --global @promovaweb/astrofy@latest
astrofy skills install --agent codex
```

## Primeiros passos

Depois de instalar as skills, abra a conversa no projeto e peça o trabalho com
suas próprias palavras:

> Quero criar uma página para meu produto. Use o Astrofy para entender este
> projeto, conversar comigo sobre o conteúdo e apresentar um plano antes de
> implementar.

O agente encaminha o pedido conforme o escopo:

- **Projeto inteiro:** `astrofy-setup` mapeia a implementação, prepara os
  contratos ausentes e coordena as demais skills.
- **Página nova:** `astrofy-page-planner` conduz a entrevista e registra a
  especificação em `.astrofy/pages/<slug>/`.
- **Ajuste pontual:** `astrofy-sitespec-create` registra a tarefa em
  `.sitespec/` e `astrofy-sitespec-implement` executa a checklist.

Pelo terminal, a mesma adoção pode ser conferida antes de gravar:

```bash
astrofy inspect
astrofy setup --dry-run
astrofy setup
astrofy check --json
```

O `check` grava relatório e checklist em `.astrofy/`. Antes de aprovar uma
implementação, confira `git status` e `git diff`: eles mostram o que mudou no
disco.

Sem argumentos, `astrofy` abre o painel interativo. Em script ou CI, use
`--json` ou `--ci` para receber a consulta em texto.

## Uso

### Planejar uma página

Pelo terminal, cada resposta fica registrada em `interview.json`:

```bash
astrofy page create --slug produto --type product
astrofy page status --slug produto
astrofy page answer --slug produto --field title --value "Produto"
astrofy plan --slug produto
astrofy apply --slug produto
```

O `plan` relaciona a especificação com rotas, componentes e validações. O
`apply` registra a passagem das tarefas por `in_progress`, `completed`,
`failed` e `skipped`.

### Registrar uma tarefa pontual

```bash
astrofy sitespec list --json
astrofy sitespec progress
```

A lista é somente leitura e mostra o progresso, o próximo id livre e as
dependências entre tarefas. No painel, a aba **Specs** (`Ctrl+S`) acompanha as
tarefas sem gravar nada. O contrato do arquivo está em
[docs/sitespec.md](https://github.com/promovaweb/astrofy/blob/main/docs/sitespec.md).

### Verificar o site

```bash
astrofy check
astrofy check --browser
astrofy browser status
```

O `check` executa as regras aplicáveis ao escopo. Com `--browser`, ele inclui
temas, persistência, overflow, erros JavaScript e responsividade contra o
preview configurado. O navegador não acompanha o pacote; instale sob demanda
com `astrofy browser install` e remova com `astrofy browser remove`.

### Trabalhar no design

A skill `astrofy-design` acrescenta composição visual, estudo de referências,
auditoria e redesign, com as referências e as paletas incluídas localmente.

```bash
astrofy skills install --agent codex --skill astrofy-design
```

Depois peça ao agente `astrofy-design build`, `astrofy-design study`,
`astrofy-design audit` ou `astrofy-design redesign`. Esses nomes são modos da
skill e não comandos do CLI.

## Uso com agentes

As skills são instaladas no projeto, no diretório do agente escolhido:
`.agents/skills/` para Codex e `.claude/skills/` para Claude. A instalação não
escreve fora do site aberto.

- `--agent` é obrigatório e aceita `codex` ou `claude`.
- `--skill` aceita um nome ou uma lista separada por vírgula. Sem a opção, o
  catálogo completo é instalado.
- `--dry-run` mostra os arquivos previstos sem gravar.
- `--root` aponta um site específico quando o diretório atual não é a raiz.

```bash
astrofy skills install --agent claude --skill astrofy-seo,astrofy-geo --root apps/site
astrofy skills list --json
```

Se um arquivo de uma skill instalada foi editado no projeto, uma nova
instalação recusa sobrescrevê-lo e pede a conciliação manual. O Astrofy não
expõe servidor MCP: a integração com o agente acontece pelas skills
instaladas no projeto.

## Documentação

- [Documentação publicada](https://promovaweb.com/docs/astrofy/)
- [Guia do usuário](https://github.com/promovaweb/astrofy/blob/main/docs/user/README.md)
- [Referência do CLI](https://github.com/promovaweb/astrofy/blob/main/docs/cli.md)
- [Referência das skills](https://github.com/promovaweb/astrofy/blob/main/docs/skills.md)
- [Configuração](https://github.com/promovaweb/astrofy/blob/main/docs/configuration.md)
- [Contrato do SITEPEC.md](https://github.com/promovaweb/astrofy/blob/main/docs/sitespec.md)
- [Arquitetura](https://github.com/promovaweb/astrofy/blob/main/docs/architecture.md)
- [Ebook em PDF e EPUB](https://github.com/promovaweb/astrofy/blob/main/ebook/README.md)

## Feito com

| Projeto | Para quê |
| --- | --- |
| [Astro](https://github.com/withastro/astro) | framework dos sites atendidos, nas versões 5, 6 e 7 |
| [Node.js](https://github.com/nodejs/node) | runtime do CLI |
| [TypeScript](https://github.com/microsoft/TypeScript) | linguagem do código compilado para `dist/` |
| [Ajv](https://github.com/ajv-validator/ajv) | validação dos schemas JSON |
| [Playwright](https://github.com/microsoft/playwright) | verificações no Chromium |
| [neo-blessed](https://github.com/embark-framework/neo-blessed) | painel interativo no terminal |
| [Brandfy](https://github.com/promovaweb/brandfy) | importação de tokens de marca |

## Comunidade e suporte

- **Discord:** [obter ajuda e conversar com a Comunidade](https://promovaweb.com/discord).
- **Bugs e pedidos:** abra uma [issue](https://github.com/promovaweb/astrofy/issues)
  com a versão, o sistema operacional e o passo a passo para reproduzir.
- **Novidades:** acompanhe o
  [CHANGELOG](https://github.com/promovaweb/astrofy/blob/main/CHANGELOG.md) e
  as [releases](https://github.com/promovaweb/astrofy/releases).

## Contribuir

Leia o [CONTRIBUTING.md](https://github.com/promovaweb/astrofy/blob/main/CONTRIBUTING.md)
para preparar o ambiente, entender a organização do código, rodar as
validações e enviar um pull request.

## Promovaweb

O Astrofy é mantido pela [Promovaweb](https://promovaweb.com), comunidade de
co-working digital onde profissionais aprendem a construir, automatizar e
gerir negócios de tecnologia e IA com aulas ao vivo, Co-works e revisão de
projetos reais.

Quer usar o Astrofy em projetos de verdade, com acompanhamento? Conheça os
[planos da Promovaweb](https://promovaweb.com/planos?utm_source=github&utm_medium=readme&utm_campaign=astrofy).

## Licença

Distribuído sob a
[GNU AGPL 3.0](https://github.com/promovaweb/astrofy/blob/main/LICENSE).
A licença não concede o uso do nome e do logo do Astrofy nem da marca
Promovaweb (AGPL 3.0, seção 7, item e).
