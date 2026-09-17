# Casos de configurar conteúdo mdx

## Uso comum

Importe Notice.astro num post e confira o aviso no HTML.

## Projeto existente

Um acervo existente usa pubDate. Mapeie o campo durante a migração sem alterar a data factual.

## Erro recorrente

MDX executa código durante a compilação. Não compile conteúdo externo desconhecido como se fosse texto simples.

## Conferência

O MDX renderiza componentes e o schema recusa frontmatter inválido. A origem do conteúdo está documentada. Use `astrofy check --category mdx` e registre o resultado da operação no escopo realmente verificado.
