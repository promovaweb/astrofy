# Casos de paginar arquivos do blog

## Uso comum

Três posts com pageSize 2 geram duas páginas com canônicas diferentes.

## Projeto existente

Um site usa /artigos em vez de /blog. Preserve a convenção e seus redirects documentados.

## Erro recorrente

Não aplique a canônica da primeira página em todas as páginas do arquivo.

## Conferência

Nenhum post aparece duplicado ou desaparece na sequência. Os links anterior e próximo fecham o percurso. Use `astrofy check --rule blog.archives` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** coleção publicável, paginate, pageSize e URLs de taxonomias.
- **Alteração sob teste:** Mantenha prefixos existentes como /artigos. Confira redirects se o pedido alterar URLs; preserve metadados específicos por página.
- **Falha e resultado esperado:** Com três posts e pageSize 2, a união das páginas deve conter exatamente três IDs sem repetição. Página 2 precisa ter sua própria canônica.
- **Comando complementar:** `astrofy check --rule blog.archives`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
