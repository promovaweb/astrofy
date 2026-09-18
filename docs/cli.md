# Referência do CLI

Os exemplos usam o executável `astrofy` instalado no ambiente. No checkout de
desenvolvimento, substitua-o por `node dist/cli/index.js`. Caminhos e UUIDs
dos exemplos devem corresponder ao site e a uma execução existente.

## Saída e códigos

A saída JSON contém `schemaVersion`, `command`, `runId`, `status`, `summary`,
`findings` e `artifacts`, além do ambiente e dos escopos. Código 0 indica
conclusão dentro da política selecionada, sem afirmar cobertura total do site.
Código 1 indica falhas avaliadas. Código 2 indica uso, configuração ou versão
inválidos. Código 3 indica avaliação ou operação não concluída, inclusive
falhas de leitura e gravação. Cancelamento retorna 130. Mensagens internas
de falhas operacionais não são copiadas para a saída; erros na leitura dos
nomes e tipos das flags também não repetem os valores fornecidos.

`setup`, `init`, `check`, `skills install`, `tokens build`, `tokens import-brandfy`,
`docs check`, `links scan` e `migrate --apply` salvam o resultado em
`.astrofy/reports/<runId>.json`. O caminho aparece em `artifacts` e pode ser
consultado com `report --run`. Operações em `--dry-run` e consultas como
`inspect` e `status` não criam esse arquivo automaticamente. A retenção
configurada preserva os relatórios citados pela checklist e pelo histórico.

## astrofy setup

Inicia ou retoma a coordenação das 40 skills no projeto existente.

Sem argumentos posicionais. Aceita `--dry-run`.

Executa a adoção incremental, lê o grafo distribuído e grava
`.astrofy/setup-state.json`. O estado contém hashes dos arquivos observados,
`changedFiles`, dependências, entradas, saídas e status das etapas. A
reexecução preserva marcos registrados e mostra quais arquivos mudaram. O
comando não executa automaticamente as alterações descritas pelas skills.

### Exemplos

```bash
astrofy setup
astrofy setup --dry-run
astrofy setup --root apps/site
astrofy setup --root "site existente" --json
astrofy setup --root apps/site --dry-run --offline
```

A exportação Markdown inclui ambiente, escopo solicitado e coberto, estado,
severidade, arquivos relacionados e ação sugerida para cada achado. Resultados
auxiliares, como o índice de links ou os problemas da documentação, permanecem
em um bloco JSON ao final. A exportação oculta credenciais nos formatos
reconhecidos sem modificar o relatório fornecido ao renderizador Markdown.

## astrofy init

Prepara a adoção conservando arquivos existentes.

Sem argumentos posicionais. Aceita --dry-run.

Cria a configuração mínima, a checklist e o índice local. JSON inválido existente recusa a operação. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy init
astrofy init --dry-run
astrofy init --root apps/site
astrofy init --root "meu site" --json
astrofy init --root apps/site --dry-run --offline
```

## astrofy inspect

Mostra as dependências e a estrutura observadas sem executar configuração do site.

Sem argumentos posicionais.

Retorna versões, lockfile, recursos detectados e limitações. Não grava arquivos. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy inspect
astrofy inspect --json
astrofy inspect --root apps/site
astrofy inspect --offline
astrofy inspect --root "site existente" --no-color
```

## astrofy check

Executa as regras aplicáveis ao escopo selecionado.

Filtros opcionais --category, --rule, --page, --component e --changed. Aceita --dry-run.

Grava relatório e checklist. Uma execução parcial preserva avaliações de outros escopos. --page e --component são mutuamente exclusivos. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy check
astrofy check --rule links.broken --page /blog/exemplo/
astrofy check --category design-system --json
astrofy check --component src/components/Header.astro
astrofy check --changed --ci --offline
```

## astrofy status

Consulta a checklist e recalcula a validade dos resultados em memória.

Sem argumentos posicionais.

Retorna os itens e a cobertura atual. Não grava nem executa checks. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy status
astrofy status --json
astrofy status --root apps/site
astrofy status --offline
astrofy status --ci --no-color
```

## astrofy tui

Abre o painel interativo de consulta e revisão.

Sem argumentos posicionais. Aceita --no-color.

Abrir a tela não grava arquivos. As ações r, e e m são explícitas. Sem TTY ou com --json/--ci, retorna a consulta e termina. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy tui
astrofy tui --root apps/site
astrofy tui --no-color
astrofy tui --json
astrofy tui --ci
```

## astrofy tokens validate

Valida o envelope e os aliases nos dois modos de tema.

Sem argumentos posicionais. Lê paths.designSystem.

Não gera CSS. Um tipo inválido ou uma referência ausente retorna código 2. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy tokens validate
astrofy tokens validate --json
astrofy tokens validate --root apps/site
astrofy tokens validate --offline
astrofy tokens validate --ci --no-color
```

## astrofy tokens build

Gera o CSS e seu manifesto a partir do JSON oficial.

Aceita --dry-run. Usa paths.designSystemCss.

Escreve CSS e manifesto quando a entrada é válida. Requer o adaptador Tailwind 4. O dry-run não grava saídas. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy tokens build
astrofy tokens build --dry-run
astrofy tokens build --root apps/site --json
astrofy tokens build --offline
astrofy tokens build --dry-run --ci
```

## astrofy tokens check

Compara o CSS e o manifesto com a geração esperada.

Sem argumentos posicionais.

Não altera arquivos. Retorna código 1 quando o CSS ou o manifesto estiver desatualizado. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy tokens check
astrofy tokens check --json
astrofy tokens check --root apps/site
astrofy tokens check --ci
astrofy tokens check --offline --no-color
```

## astrofy tokens import-brandfy

Importa o formato real de paleta Brandfy para o envelope Astrofy.

--source é uma string obrigatória com caminho relativo de JSON dentro do projeto. Aceita --dry-run.

Escreve design system e source-map. Ajustes locais não marcados recusam a reimportação. Não gera CSS automaticamente. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy tokens import-brandfy --source .brandfy/tokens.json
astrofy tokens import-brandfy --source .brandfy/tokens.json --dry-run
astrofy tokens import-brandfy --source brand/tokens.json --json
astrofy tokens import-brandfy --root apps/site --source brand/tokens.json
astrofy tokens import-brandfy --source brand/tokens.json --dry-run --offline
```

## astrofy docs check

Confere documentos e links locais em .astrofy/docs.

Sem argumentos posicionais.

Não grava documentos. Retorna código 1 para destinos ou âncoras ausentes. A coerência do texto exige revisão humana. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy docs check
astrofy docs check --json
astrofy docs check --root apps/site
astrofy docs check --offline
astrofy docs check --ci --no-color
```

## astrofy links scan

Lê as páginas renderizadas e identifica links internos inválidos.

Sem argumentos posicionais. Usa paths.output e o domínio do projeto.

Cada entrada retorna `route`, `title`, `description`, `headings`,
`taxonomies`, `links` e `broken`. Headings incluem nível, texto e ID quando
presente. Tags vêm de `article:tag` ou links com `rel="tag"`; categorias
vêm de `article:section`. Listas vazias indicam que esses metadados não foram
encontrados no HTML, sem presumir a configuração editorial do site.

Não aplica sugestões de texto. Saída sem HTML retorna código 3. Confira a
saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy links scan
astrofy links scan --json
astrofy links scan --root apps/site
astrofy links scan --offline
astrofy links scan --ci --no-color
```

## astrofy report

Consulta o estado ou exporta uma execução selecionada.

--run recebe UUID opcional. --output recebe caminho relativo opcional. --markdown exige --output. Aceita --dry-run.

Sem --output, apenas consulta. A exportação escreve o arquivo indicado. UUID inválido ou caminho externo é recusado. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy report --json
astrofy report --output .astrofy/reports/resumo.json
astrofy report --output .astrofy/reports/resumo.md --markdown
astrofy report --run 00000000-0000-0000-0000-000000000000 --json
astrofy report --output resumo.md --markdown --dry-run
```

## astrofy migrate

Mostra ou aplica a migração de contrato registrada.

--apply aplica a migração. O padrão é somente planejar. Aceita --dry-run, incompatível com --apply.

Uma versão desconhecida é recusada. A aplicação grava configurações validadas e o registro de migração, conservando a checklist. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy migrate
astrofy migrate --dry-run
astrofy migrate --json
astrofy migrate --apply
astrofy migrate --root apps/site --apply --offline
```

## astrofy skills list

Lista as 40 skills distribuídas com o pacote, incluindo astrofy-setup como
entrada inicial e astrofy-markdown para formatação com linter.

Sem argumentos posicionais. Não exige um projeto Astro.

Retorna nomes e descrições. Não instala ou altera skills. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy skills list
astrofy skills list --json
astrofy skills list --offline
astrofy skills list --no-color
astrofy skills list --ci
```

## astrofy skills install

Instala ou atualiza skills no agente local explicitamente escolhido.

--agent é obrigatório: codex ou claude. --skill aceita nomes separados por vírgula. O padrão instala o catálogo completo. Aceita --dry-run.

Escreve somente no projeto, conservando arquivos personalizados. Agente ou skill desconhecidos são recusados. Confira a saída do comando e use `status` após uma operação que altere a checklist.

### Exemplos

```bash
astrofy skills install --agent codex
astrofy skills install --agent claude
astrofy skills install --agent codex --skill astrofy-themes
astrofy skills install --agent codex --skill astrofy-init,astrofy-config --dry-run
astrofy skills install --agent claude --root apps/site --json
```

## --root

Tipo: `string`. Diretório explícito do site. O padrão busca a raiz Astro mais próxima.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy inspect --root apps/site
astrofy init --root apps/site --dry-run
astrofy status --root "site existente"
astrofy check --root apps/site --json
astrofy tokens check --root apps/site
```

## --json

Tipo: `boolean`. Padrão false. stdout contém somente um objeto JSON. Diagnósticos operacionais usam stderr.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy inspect --json
astrofy check --json
astrofy status --json
astrofy tokens validate --json
astrofy skills list --json
```

## --ci

Tipo: `boolean`. Padrão false. Evita interface interativa. A exigência de revisões manuais vem da política do projeto.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --ci
astrofy tui --ci
astrofy status --ci
astrofy tokens check --ci
astrofy docs check --ci
```

## --offline

Tipo: `boolean`. Padrão false. Não consulta previews remotos. Verificações locais permanecem disponíveis.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy inspect --offline
astrofy check --offline
astrofy tokens build --offline
astrofy links scan --offline
astrofy skills list --offline
```

## --no-color

Tipo: `boolean`. Padrão false. Remove cores da TUI e conserva os estados textuais.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy tui --no-color
astrofy status --no-color
astrofy inspect --no-color
astrofy check --no-color
astrofy skills list --no-color
```

## --dry-run

Tipo: `boolean`. Padrão false, exceto migrate, que já planeja por padrão. Não grava os arquivos da operação.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy init --dry-run
astrofy check --dry-run
astrofy tokens build --dry-run
astrofy skills install --agent codex --dry-run
astrofy report --output resumo.json --dry-run
```

## --category

Tipo: `string`. Filtro opcional de check por categoria exata do catálogo.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --category seo
astrofy check --category design-system
astrofy check --category components
astrofy check --category navigation
astrofy check --category docs
```

## --rule

Tipo: `string`. Filtro opcional de check por ID exato de regra.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --rule project.detected
astrofy check --rule links.broken
astrofy check --rule design.css-sync
astrofy check --rule og.required
astrofy check --rule quality.build
```

## --page

Tipo: `string`. Filtro opcional de check por rota. Não pode ser combinado com --component.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --page /
astrofy check --page /blog/
astrofy check --page /blog/2/
astrofy check --page /componentes/
astrofy check --page /blog/exemplo/ --rule links.broken
```

## --component

Tipo: `string`. Filtro opcional de check por caminho relativo do componente. Incompatível com --page.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --component src/components/Header.astro
astrofy check --component src/components/Card.astro
astrofy check --component src/components/Button.astro
astrofy check --component src/components/Counter.tsx
astrofy check --component src/components/Menu.astro --category components
```

## --changed

Tipo: `boolean`. Padrão false. Seleciona somente instâncias cujo fingerprint difere do resultado registrado.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy check --changed
astrofy check --changed --json
astrofy check --changed --category seo
astrofy check --changed --page /
astrofy check --changed --rule links.broken
```

## --help

Tipo: `boolean`. Padrão false. Mostra comandos e opções sem exigir um site.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy --help
astrofy --help --json
astrofy check --help
astrofy tokens build --help
astrofy skills install --help
```

## --version

Tipo: `boolean`. Padrão false. Mostra a versão do framework sem executar operações.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy --version
astrofy --version --json
astrofy --version --no-color
astrofy --version --offline
astrofy --version --ci
```

## --apply

Tipo: `boolean`. Padrão false. Exclusivo de migrate. Aplica os arquivos já validados pelo plano de migração.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy migrate --apply
astrofy migrate --apply --json
astrofy migrate --apply --root apps/site
astrofy migrate --apply --offline
astrofy migrate --apply --ci
```

## --agent

Tipo: `string`. Obrigatório em skills install. Valores: codex e claude. Nenhuma instalação global é feita.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy skills install --agent codex
astrofy skills install --agent claude
astrofy skills install --agent codex --dry-run
astrofy skills install --agent claude --json
astrofy skills install --agent codex --skill astrofy-init
```

## --skill

Tipo: `string`. Opcional em skills install. Nomes exatos separados por vírgula. O padrão instala todas.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy skills install --agent codex --skill astrofy-init
astrofy skills install --agent codex --skill astrofy-themes
astrofy skills install --agent claude --skill astrofy-mdx
astrofy skills install --agent codex --skill astrofy-init,astrofy-config
astrofy skills install --agent claude --skill astrofy-checkup --dry-run
```

## --run

Tipo: `string`. UUID opcional de uma execução existente, exclusivo de report. Não aceita um caminho de arquivo.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy report --run 00000000-0000-0000-0000-000000000000
astrofy report --run 00000000-0000-0000-0000-000000000000 --json
astrofy report --run 00000000-0000-0000-0000-000000000000 --output copia.json
astrofy report --run 00000000-0000-0000-0000-000000000000 --output resumo.md --markdown
astrofy report --run 00000000-0000-0000-0000-000000000000 --root apps/site
```

## --output

Tipo: `string`. Caminho relativo opcional de exportação em report. Sem a opção, a consulta não escreve arquivo.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy report --output resumo.json
astrofy report --output resumo.md --markdown
astrofy report --output .astrofy/reports/consulta.json
astrofy report --output resumo.json --dry-run
astrofy report --output resumo.md --markdown --json
```

## --markdown

Tipo: `boolean`. Padrão false. Exclusivo de report e exige --output para gerar uma síntese Markdown.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy report --markdown --output resumo.md
astrofy report --markdown --output .astrofy/reports/resumo.md
astrofy report --markdown --output resumo.md --dry-run
astrofy report --markdown --output resumo.md --json
astrofy report --markdown --output resumo.md --root apps/site
```

## --source

Tipo: `string`. Caminho relativo obrigatório do JSON em tokens import-brandfy. O arquivo deve estar no projeto.

A opção é recusada em comandos aos quais não se aplica. Flags da execução não alteram a configuração persistente.

### Exemplos

```bash
astrofy tokens import-brandfy --source .brandfy/tokens.json
astrofy tokens import-brandfy --source brand/tokens.json
astrofy tokens import-brandfy --source brand/tokens.json --dry-run
astrofy tokens import-brandfy --source brand/tokens.json --json
astrofy tokens import-brandfy --source brand/tokens.json --root apps/site
```
