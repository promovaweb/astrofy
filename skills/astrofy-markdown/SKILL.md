---
name: astrofy-markdown
description: Formata e valida Markdown em projetos Astro com markdownlint, preservando frontmatter, exemplos de código e a configuração existente do projeto.
---

# Formatar Markdown do projeto

## Identificar o contrato

Leia package.json, scripts de lint, configuração markdownlint e configurações
herdadas do workspace. Identifique os arquivos alterados e diferencie Markdown
de MDX. MDX contém sintaxe executável e exige seu parser ou build correspondente.

## Executar o linter

Use a [referência de comandos e diagnóstico](references/technical.md) e confira
os [casos de preservação](examples/cases.md) antes de aplicar correções em lote.

Use primeiro o script existente do projeto. Se não houver linter, configure
markdownlint-cli como dependência de desenvolvimento com o gerenciador do
lockfile e registre scripts de verificação e correção no package.json.
Defina o escopo de arquivos e exclua node_modules, .git, dist e arquivos gerados.
Não substitua uma configuração existente para eliminar diagnósticos.

Execute a verificação antes da correção. Aplique --fix apenas ao escopo pedido,
leia o diff e corrija manualmente os diagnósticos restantes. Preserve valores
do frontmatter, destinos de links, indentação de código e conteúdo literal.

Ao alterar headings, confira os links com fragmentos que dependem deles.
Tabela deve continuar renderizando suas colunas; lint verde não comprova a
semântica de uma tabela convertida acidentalmente em parágrafo.

## Conferir a saída

Repita o mesmo comando sem --fix. Execute astrofy docs check quando o projeto
possuir contratos Astrofy. Para conteúdo de coleção, use também a validação
do schema e o build aplicável. Informe arquivos corrigidos e diagnósticos que
restarem; não apresente formatação como revisão factual ou editorial do texto.
