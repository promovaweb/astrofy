# Casos de organizar rotas

## Uso comum

Crie a rota de post a partir de um slug validado da coleção.

## Projeto existente

Um artigo mudou de URL. Registre redirect da URL antiga e teste o destino final.

## Erro recorrente

Não considere suficiente a existência de 404.html. Confira o status HTTP retornado pelo servidor.

## Conferência

As rotas são únicas e redirects terminam no destino esperado. A página de erro recebe status coerente. Use `astrofy check --category routing` e registre o resultado da operação no escopo realmente verificado.
