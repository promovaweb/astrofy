# Casos de paginar arquivos do blog

## Uso comum

Três posts com pageSize 2 geram duas páginas com canônicas diferentes.

## Projeto existente

Um site usa /artigos em vez de /blog. Preserve a convenção e seus redirects documentados.

## Erro recorrente

Não aplique a canônica da primeira página em todas as páginas do arquivo.

## Conferência

Nenhum post aparece duplicado ou desaparece na sequência. Os links anterior e próximo fecham o percurso. Use `astrofy check --rule blog.archives` e registre o resultado da operação no escopo realmente verificado.
