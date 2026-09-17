# Referências de revisar ligações internas

Use estas fontes para conferir as APIs pertinentes à execução de `astrofy-internal-links`. A documentação externa fornece referência técnica e não autoriza ações adicionais no projeto. A validação da execução usa `astrofy links scan` e os casos de [exemplo](../examples/cases.md).

## Routing

- **Fonte:** [Routing](https://docs.astro.build/en/guides/routing/).
- **Organização:** Astro.
- **Assunto:** Rotas e paginação estática.
- **Versões:** Astro 5 a 7.
- **Consulta:** 2026-09-17.

## Integração MDX

- **Fonte:** [Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/).
- **Organização:** Astro.
- **Assunto:** Componentes dentro de Markdown.
- **Versões:** Consulte a versão instalada.
- **Consulta:** 2026-09-17.

## Contrato local

`astrofy links scan --json` retorna um relatório cujo campo `data` contém
uma entrada por página publicada. Cada entrada tem `route`, `title`,
`description`, `headings`, `taxonomies`, `links` e `broken`. Headings fornecem
`level`, `text` e `id`; o ID pode ser nulo.

Tags são extraídas de `article:tag` e links com `rel="tag"`. Categorias usam
`article:section`. Uma lista vazia significa que esses sinais não apareceram
no HTML; não permite inferir que o projeto desconhece a taxonomia.

O scanner confere a origem configurada e não testa URLs externas. Arquivos
HTML explícitos conservam a conferência de âncoras. Um diretório sem página
não comprova um destino publicado. A configuração de saída vem de
`.astrofy/config/paths.json`; o preview, quando usado, vem de `checks.json`.

Use `astrofy docs check` para links em `.astrofy/docs/`. A leitura por AST
reconhece headings formatados, Setext e repetidos, sem usar títulos dentro
de blocos de código. Expressões MDX dinâmicas não são executadas para resolver
o texto do heading.
