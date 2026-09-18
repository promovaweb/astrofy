# Casos de configurar conteúdo mdx

## Uso comum

Importe Notice.astro num post e confira o aviso no HTML.

## Projeto existente

Um acervo existente usa pubDate. Mapeie o campo durante a migração sem alterar a data factual.

## Erro recorrente

MDX executa código durante a compilação. Não compile conteúdo externo desconhecido como se fosse texto simples.

## Conferência

O MDX renderiza componentes e o schema recusa frontmatter inválido. A origem do conteúdo está documentada. Use `astrofy check --category mdx` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** integração MDX, coleção, schema, imports e origem do conteúdo.
- **Alteração sob teste:** Mapeie campos antigos sem mudar seu significado. Valide uma entrada antes de migrar o acervo e registre componentes permitidos.
- **Falha e resultado esperado:** Um campo obrigatório ausente precisa apontar a entrada inválida; o mesmo arquivo corrigido deve renderizar o componente MDX no HTML.
- **Comando complementar:** `astrofy check --category mdx`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
