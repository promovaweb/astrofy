# Casos de revisar código

## Uso comum

Remova uma propriedade sem uso depois de conferir os consumidores.

## Projeto existente

Um site possui aliases próprios. Corrija o import sem substituir toda a configuração TypeScript.

## Erro recorrente

Não remova código apenas porque uma busca literal não achou uso. Rotas e imports dinâmicos exigem inspeção própria.

## Conferência

O código alterado passa nas verificações pertinentes e a revisão informa limitações concretas. Use `astrofy check --rule quality.types` e registre o resultado da operação no escopo realmente verificado.
