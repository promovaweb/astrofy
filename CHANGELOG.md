# Changelog

## [0.5.3] - 2026-09-18

### Corrigido

- O `prepack` permanece portátil em Linux, Windows e macOS e deixa a validação
  de PDF e EPUB no job documental que instala as ferramentas necessárias.

### Validação

- Matriz de Node.js e sistemas operacionais, job documental e workflow de
  release executados separadamente.

## [0.5.2] - 2026-09-18

### Corrigido

- O workflow publica o tarball por um caminho relativo explícito, impedindo que
  o npm interprete o arquivo como uma dependência Git.

### Validação

- Suíte, ebook e instalação isolada aprovados no GitHub Actions antes da etapa
  de publicação.

## [0.5.1] - 2026-09-18

### Corrigido

- O workflow de release instala o Chromium antes da suíte completa.
- O teste de Markdown usa o executável instalado no próprio repositório.
- `markdownlint-cli` passa a ser dependência de desenvolvimento explícita,
  removendo a dependência acidental do diretório pai.

### Validação

- Suíte completa em checkout isolado pelo GitHub Actions.
- Pipeline automatizado de pacote, npm, ebook e GitHub Release.

## [0.5.0] - 2026-09-18

### Adicionado

- Exemplos completos para landing page de vendas, produto, serviço, Home,
  Sobre, Contato e Preços.
- Diagramas do fluxo e da relação entre orquestradoras, artefatos e skills.
- Capítulo sobre estados, execução e retomada prática das tarefas técnicas.
- Testes da ordem dos capítulos, links, comandos, tipos de página, estados e
  versões da documentação.
- Workflow de release para validar a tag, instalar o pacote em isolamento,
  publicar no npm e anexar ebook, tarball e checksums ao GitHub.

### Corrigido

- A distribuição npm passa a incluir `.ebook/`, permitindo executar os
  comandos documentados dentro do pacote instalado.
- Temporários em `.ebook/build/` deixam de integrar o Git e o pacote.

### Alterado

- PDF e EPUB incorporam Inter e Manrope a partir de dependências fixadas.
- A conferência do ebook valida XML, navegação interna, fontes, aliases, hashes
  e seções obrigatórias.
- A CI possui um job próprio para manual, ebook, release e pacote instalado.

### Validação

- `npm test`, `npm run docs:verify`, `npm run ebook:verify`,
  `npm run release:check` e instalação isolada do tarball.

## [0.4.0] - 2026-09-18

### Adicionado

- Manual técnico em dez capítulos para instalação, setup, planejamento de
  páginas, entrevista, plano de implementação, execução, retomada e solução de
  problemas.
- Exemplo completo do percurso de uma página de produto, desde o pedido até o
  checkup da implementação.
- Pipeline reproduzível que compila a documentação canônica em PDF e EPUB e
  registra fontes e hashes em um manifesto.
- Ebook versionado e aliases estáveis incluídos no pacote npm.

### Alterado

- O índice principal e a referência das skills passam a encaminhar para o
  manual completo.
- A versão do manual acompanha a versão do CLI e da biblioteca de skills.

### Validação

- `npm run ebook:verify` confere versão, fontes, hashes, aliases, EPUB e texto
  esperado no PDF.
- O pipeline segue o design system de documentos A4 do Hub.

## [0.3.0] - 2026-09-18

### Adicionado

- Duas orquestradoras para definir páginas por conversa e converter a
  especificação aprovada em tarefas técnicas retomáveis.
- Sete entrevistadoras para páginas de vendas, produto, serviço, Home, Sobre,
  Contato e Preços.
- Schemas fechados para `page-spec.json` e `implementation-plan.json`, com
  estados, áreas, ações, mídia, fases, dependências, estimativas e validações.
- Testes dos contratos, do roteamento entre especialistas e da instalação das
  49 skills em Codex e Claude.

### Alterado

- O setup inclui o planejamento modular no grafo sem executar ou publicar uma
  página automaticamente.
- A documentação explica a entrevista por checkpoints, as saídas em
  `.astrofy/pages/` e `.astrofy/plans/` e o encaminhamento para as skills
  técnicas existentes.

### Validação

- `npm test`: 84 testes aprovados.
- TypeScript, Markdown, schemas e proibições das skills aprovados.
- Nove skills novas aprovadas pelo validador estrutural de skills.

Não há migração obrigatória. Projetos podem continuar usando as skills
existentes e adotar o planejamento quando precisarem definir uma página.

## [0.2.0] - 2026-09-17

### Adicionado

- O comando `astrofy setup` coordena a entrada em projetos existentes e grava
  um estado retomável com hashes, arquivos alterados e marcos das 40 skills.
- O workflow distribuído declara dependências, entradas e saídas de todas as
  skills; um schema fechado valida o estado antes da escrita.
- A fixture permanente do Astro 7.3.3 e o CI conferem Actions, autenticação
  SSR, Content Layer, MDX, paginação, i18n e `ClientRouter`.
- A skill `astrofy-markdown` aplica markdownlint com configuração herdada e
  conserva frontmatter, links, código e arquivos MDX fora do escopo do linter.

### Alterado

- As 40 skills passam a usar procedimentos técnicos aprofundados, exemplos
  próprios e referências com versão e data de conferência.
- Os runners de compatibilidade abrangem Astro 5, 6 e 7, com cenários de build,
  navegador, hidratação, componentes e tokens.

### Validação

- `npm test`: 81 testes aprovados.
- Builds e testes de navegador aprovados em Astro 5.13.0, 6.0.0 e 7.3.3.
- Procedimentos especializados do Astro 7 aprovados em Chromium.
- TypeScript, Markdown, schemas, pacote npm e proibições das skills aprovados.
- Não há migração obrigatória; `astrofy setup` cria o novo estado quando usado.

## [0.1.1] - 2026-09-17

### Corrigido

- O comando global `astrofy` passa a executar ao reconhecer o link criado
  pelo npm. Importar o módulo continua sem iniciar comandos.
- Os testes usam caminhos reais no Windows e macOS e conferem documentação
  com finais de linha LF e CRLF.

### Alterado

- A configuração de publicação e o guia de instalação passam a indicar
  acesso público no npm, conforme a autorização de distribuição.
- A CI confere a instalação global, a ajuda e a versão do executável.

### Validação

- Suíte de 73 testes, incluindo regressão da execução por caminho simbólico.
- Matriz de CI com Linux, Windows e macOS em Node 22.12.0, 24 e 26.
- Instalação do pacote e abertura da TUI pelo comando global.
- Não há alteração no contrato do projeto nem migração necessária.

## [0.1.0] - 2026-09-17

### Adicionado

- CLI Node.js para adoção em projetos Astro, inspeção, checks por escopo,
  geração de tokens, documentação, links, relatórios e migração de contratos.
- Biblioteca de 38 skills com referências e instalação local em Codex e Claude.
- Checklist com 90 regras, histórico, revisão manual e atualização de validade.
- TUI com filtros, detalhes, progresso, cancelamento e exportação de relatórios.
- Schemas locais, geração CSS light/dark, importação Brandfy e proteção de
  escrita, caminhos, processos e credenciais reconhecidas nos relatórios.

### Distribuição

- Pacote npm com acesso restrito e licença `UNLICENSED`.
- Node.js 22.12.0 ou posterior; Chromium instalado separadamente para checks
  de navegador. A instalação inicial não exige migração de contrato.
- O template de site não integra esta release.

### Validação

- `npm test`: 71 testes em Linux com Node 22.12.0.
- `npm pack` e instalação do tarball em diretório temporário.
- Validação das skills e Markdown no Hub.
- A matriz remota de Windows, macOS e outras versões de Node permanece
  identificada separadamente na documentação de compatibilidade.
