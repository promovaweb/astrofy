# Astrofy

O Astrofy reúne 49 skills e um CLI Node.js para trabalhar em sites Astro.
Comece por astrofy-setup para reconhecer o projeto e coordenar as especialistas.
Use astrofy-markdown para formatar e validar a documentação com markdownlint.
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
npm install --global @promovaweb/astrofy@0.5.3
astrofy --help
astrofy --version
```

Depois da instalação, execute `astrofy tui --root /caminho/do/site` para
abrir o painel em um projeto já inicializado com `astrofy init`.
A versão 0.5.3 inclui planejamento conversacional e técnico para páginas de
vendas, produto, serviço, Home, Sobre, Contato e Preços.

O pacote conserva `UNLICENSED`, sem concessão de licença aberta. Para uma
instalação a partir do checkout autorizado, `npm pack` gera o arquivo `.tgz`.

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
especificação aprovada fica em `.astrofy/pages/<slug>/`.

Depois, `astrofy-implementation-planner` relaciona a especificação com rotas,
componentes, checklist e scripts atuais. O plano em
`.astrofy/plans/<slug>/` registra fases, tarefas, skills, arquivos,
dependências, estimativas e validações. Nenhuma das duas orquestradoras altera
ou publica o site sem uma solicitação posterior.

## Documentação

- [Guia do usuário](docs/user/README.md)
- [Ebook em PDF e EPUB](ebook/README.md)
- [Referência das skills](docs/skills.md)
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

`npm test` compila o TypeScript e executa os testes Node. `npm run check` faz
somente a checagem de tipos. O código fica em `packages/` e o JavaScript de
distribuição é gerado em `dist/`.

Os testes de comportamento do framework abrem Chromium contra servidores
locais temporários. Após `npm ci`, execute `npx playwright install chromium`
antes de `npm test`. A suíte confere temas, persistência, overflow, erros
JavaScript e restrições de rede sem depender de um preview já aberto.

Os builds adicionais com Astro 5, 6 e 7 ficam nas
[fixtures de compatibilidade](fixtures/compatibility/README.md), com seus
próprios lockfiles e verificação de navegador. Esse fluxo é separado de
`npm test`, pois instala versões adicionais do site.

Depois de instalar as dependências das fixtures, os scripts
`test:compatibility`, `test:skill-procedures` e `test:skill-domains` conferem
respectivamente o site mínimo, os procedimentos comuns e os domínios de Astro
7 usados pelas skills.
O job `compatibility` do CI instala os três lockfiles, gera os builds e executa
esses runners no Linux com Node 26 e Chromium.
