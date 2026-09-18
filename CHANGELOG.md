# Changelog

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
