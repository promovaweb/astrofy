# Astrofy

O Astrofy reúne 38 skills e um CLI Node.js para trabalhar em sites Astro.
O CLI prepara a adoção em projetos existentes, gera CSS a partir de tokens e
registra verificações por regra e escopo em uma checklist JSON.

As skills operam sobre projetos Astro existentes. O pacote não inclui um
template de site.

## Instalação

Use Node.js 22.12 ou posterior e instale as dependências registradas no lockfile.
No diretório deste repositório, execute:

```bash
npm ci
npm run build
node dist/cli/index.js --help
```

O pacote está disponível publicamente no npm. Instale ou atualize com:

```bash
npm install --global @promovaweb/astrofy@0.1.1
astrofy --help
astrofy --version
```

Depois da instalação, execute `astrofy tui --root /caminho/do/site` para
abrir o painel em um projeto já inicializado com `astrofy init`.
A versão 0.1.1 corrige a execução pelo atalho global criado pelo npm.

O pacote conserva `UNLICENSED`, sem concessão de licença aberta. Para uma
instalação a partir do checkout autorizado, `npm pack` gera o arquivo `.tgz`.

## Adotar em um site existente

A inicialização escreve apenas arquivos ausentes. O dry-run permite conferir
os caminhos sem criar a pasta `.astrofy`.

```bash
node dist/cli/index.js inspect --root /caminho/site
node dist/cli/index.js init --root /caminho/site --dry-run
node dist/cli/index.js init --root /caminho/site
node dist/cli/index.js check --root /caminho/site --json
```

O check grava relatórios e a checklist. Ele não instala dependências nem
executa scripts do site com a configuração padrão. Uma revisão visual ou
editorial continua pendente até receber uma avaliação identificada.

## Documentação

- **Uso do CLI:** [comandos e opções](docs/cli.md).
- **Contratos:** [configuração e estado](docs/configuration.md).
- **Tokens:** [geração e importação Brandfy](docs/design-system.md).
- **TUI:** [navegação e revisão manual](docs/tui.md).
- **Arquitetura:** [pacotes e integridade de escrita](docs/architecture.md).
- **Compatibilidade:** [faixas e validação](docs/compatibility.md).
- **Skills:** [catálogo e instalação](docs/skills.md).

## Desenvolvimento

`npm test` compila o TypeScript e executa os testes Node. `npm run check` faz
somente a checagem de tipos. O código fica em `packages/` e o JavaScript de
distribuição é gerado em `dist/`.

Os testes de comportamento do framework abrem Chromium contra servidores
locais temporários. Após `npm ci`, execute `npx playwright install chromium`
antes de `npm test`. A suíte confere temas, persistência, overflow, erros
JavaScript e restrições de rede sem depender de um preview já aberto.

Os builds adicionais com Astro 5 e 6 ficam nas
[fixtures de compatibilidade](fixtures/compatibility/README.md), com seus
próprios lockfiles e verificação de navegador. Esse fluxo é separado de
`npm test`, pois instala versões adicionais do site.
