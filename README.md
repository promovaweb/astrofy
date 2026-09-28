# Astrofy

O Astrofy reúne skills para trabalhar em sites Astro por conversa com Codex ou
Claude. Instale o pacote, disponibilize as skills no projeto e peça o trabalho
em linguagem natural. O agente escolhe as especialistas, faz as perguntas
necessárias e apresenta o plano antes de implementar.

## Comece por uma conversa

Instale o pacote e as skills para o agente que usa no projeto:

```bash
npm install --global @promovaweb/astrofy@0.7.0
cd /caminho/do/site
astrofy skills install --agent codex
```

Para Claude, troque `codex` por `claude`. Se quiser conferir os arquivos antes
da instalação, acrescente `--dry-run` ao último comando.

Depois, peça o trabalho ao agente. Por exemplo:

> Quero criar uma página para meu produto. Use o Astrofy para entender este
> projeto, conversar comigo sobre o conteúdo e apresentar um plano antes de
> implementar.

Para uma adoção ampla ou uma revisão do projeto, peça `astrofy-setup`. Para uma
página, descreva o resultado esperado. O agente confere o que precisa preparar
e conduz a entrevista com `astrofy-page-planner`. Você não precisa preencher a
entrevista por meio de comandos do CLI.

O CLI continua disponível para instalar skills, acompanhar estado, executar
checks ou retomar uma página manualmente. Consulte a [referência do CLI](docs/cli.md)
quando precisar desses comandos.

As skills operam sobre projetos Astro existentes. O pacote não inclui um
template de site.

## Desenvolvimento do pacote

Use Node.js 22.12 ou posterior e instale as dependências registradas no lockfile.
No diretório deste repositório, execute:

```bash
npm ci
npm run build
node dist/cli/index.js --help
```

O pacote está disponível publicamente no npm. A versão 0.7.0 inclui
planejamento conversacional e técnico para páginas de vendas, produto, serviço,
Home, Sobre, Contato e Preços. O painel opcional abre com
`astrofy tui --root /caminho/do/site` depois que o projeto foi inicializado
com `astrofy init`.

O pacote conserva `UNLICENSED`, sem concessão de licença aberta. Para uma
instalação a partir do checkout autorizado, `npm pack` gera o arquivo `.tgz`.
O tarball mantém somente a edição atual do ebook. Edições anteriores continuam
disponíveis nas respectivas GitHub Releases.

## Adotar em um site existente

A entrada `setup` escreve apenas contratos ausentes e cria o estado retomável
da coordenação. O dry-run permite conferir os caminhos sem criar a pasta
`.astrofy`.

```bash
node dist/cli/index.js inspect --root /caminho/site
node dist/cli/index.js setup --root /caminho/site --dry-run
node dist/cli/index.js setup --root /caminho/site
node dist/cli/index.js check --root /caminho/site --json
```

O check grava relatórios e a checklist. Ele não instala dependências nem
executa scripts do site com a configuração padrão. Uma revisão visual ou
editorial continua pendente até receber uma avaliação identificada.

## Planejar uma página

Peça a página em linguagem natural, como "quero criar uma página para meu
produto". `astrofy-page-planner` inspeciona o site, escolhe a entrevistadora
adequada e coleta finalidade, público, áreas, textos, mídia e ações. A
especificação aprovada fica em `.astrofy/pages/<slug>/`. O agente conduz essa
etapa na conversa. Os comandos abaixo servem para registrar cada resposta pelo
terminal.

Depois, `astrofy-implementation-planner` relaciona a especificação com rotas,
componentes, checklist e scripts atuais. O plano em
`.astrofy/plans/<slug>/` registra fases, tarefas, skills, arquivos,
dependências, estimativas e validações. Nenhuma das duas orquestradoras altera
ou publica o site sem uma solicitação posterior.

O CLI conserva a mesma sequência em arquivos retomáveis:

```bash
astrofy page create --slug produto --type product
astrofy page status --slug produto
astrofy page answer --slug produto --field title --value "Produto"
astrofy plan --slug produto
astrofy apply --slug produto
```

Cada resposta atualiza `interview.json`. Quando não há lacunas obrigatórias,
o CLI gera o contrato com conteúdo, SEO, integrações, acessibilidade e testes.
`apply` registra a passagem das tarefas por `ready`, `in_progress`,
`completed`, `failed` e `skipped`; a skill indicada executa a alteração no site.

## Documentação

- [Guia do usuário](docs/user/README.md)
- [Ebook em PDF e EPUB](ebook/README.md)
- [Referência das skills](docs/skills.md)
- [Matriz operacional das skills](docs/skill-matrix.md)
- [CLI](docs/cli.md)
- [Configuração](docs/configuration.md)

- **Uso do CLI:** [comandos e opções](docs/cli.md).
- **Contratos:** [configuração e estado](docs/configuration.md).
- **Tokens:** [geração e importação Brandfy](docs/design-system.md).
- **TUI:** [navegação e revisão manual](docs/tui.md).
- **Arquitetura:** [pacotes e integridade de escrita](docs/architecture.md).
- **Compatibilidade:** [faixas e validação](docs/compatibility.md).
- **Skills:** [guia das 49 skills, instalação, fluxos e exemplos](docs/skills.md).
- **Verificação das skills:** [cenários executados e limites dos testes](docs/skills-validation.md).
- **Gestão do projeto:** [backlog, timesheets e redistribuição de datas](docs/backlog-timesheets.md).

## Desenvolvimento

`npm test` compila o TypeScript e executa a suíte sem navegador.
`npm run test:browser` executa apenas os testes que abrem Chromium e
`npm run test:all` reúne os dois grupos. `npm run check` faz somente a checagem
de tipos. O código fica em `packages/` e o JavaScript de distribuição é gerado
em `dist/`.

O pacote não transporta o binário do Chromium. Instale-o sob demanda com
`astrofy browser install`, confira com `astrofy browser status` e remova com
`astrofy browser remove`. `astrofy check` executa as verificações estáticas;
`astrofy check --browser` inclui temas, persistência, overflow, erros
JavaScript e responsividade contra o preview configurado.

Os builds adicionais com Astro 5, 6 e 7 ficam nas
[fixtures de compatibilidade](fixtures/compatibility/README.md), com seus
próprios lockfiles e verificação de navegador. Esse fluxo é separado de
`npm test`, pois instala versões adicionais do site.

Depois de instalar as dependências das fixtures, os scripts
`test:compatibility`, `test:skill-procedures` e `test:skill-domains` conferem
respectivamente o site mínimo, os procedimentos comuns e os domínios de Astro
7 usados pelas skills.
O job `compatibility` do CI instala os três lockfiles, gera os builds e executa
esses runners no Linux com Node 26 e Chromium. O job `browser` mantém um cache
próprio; a matriz de Node e sistemas operacionais não baixa navegador.
