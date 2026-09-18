# Markdownlint no projeto Astro

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Comando executado com markdownlint-cli 0.48.0; MDX foi compilado pelo Astro.

## Configuração e escopo

Localize a configuração efetiva, inclusive a do workspace. Passe --config
explicitamente quando ela não estiver no diretório de execução. A sintaxe de
markdownlint-cli não é intercambiável com markdownlint-cli2; preserve o runner
adotado. Arquivos de configuração JS executam código: leia-os antes de rodar.

Com markdownlint-cli já instalado localmente, um exemplo de script npm é:

```json
{
  "lint:markdown": "markdownlint --config .markdownlint.json 'docs/**/*.md' README.md",
  "lint:markdown:fix": "npm run lint:markdown -- --fix"
}
```

Adapte os caminhos ao projeto. No Windows, use aspas duplas escapadas no JSON
para os globs. Inclua explicitamente .astrofy/docs quando esse diretório fizer
parte do trabalho. Exclua arquivos gerados e dependências no ignore existente.

## Correção e leitura do resultado

Execute primeiro sem --fix; guarde os diagnósticos por arquivo e regra. Depois
da correção, compare o diff e execute novamente sem escrita. O código 1 indica
problemas de lint; configuração inválida é falha operacional, não aprovação.

MD022 trata espaçamento de headings; MD031, cercas de código; MD032, listas;
MD056, quantidade de colunas. Não desative regras em lote para esconder uma
tabela quebrada. Frontmatter e exemplos de código conservam seus valores.

## Limites

Lint não valida existência de links, tipos do frontmatter nem significado do
texto. Execute astrofy docs check para links locais quando disponível e o build
da coleção para schema. MDX exige conferência pelo compilador do projeto.

## Fontes

- [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli): opções,
  configuração, globs, correções disponíveis e códigos de saída.
