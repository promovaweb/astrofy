# Casos de integrar tailwind

## Uso comum

Troque bg-purple-600 por bg-action depois de conferir o token semântico.

## Projeto existente

Um site usa Tailwind 3. Registre a incompatibilidade do adaptador CSS-first e preserve sua versão até uma migração autorizada.

## Erro recorrente

A classe container possui significado próprio no Tailwind. Use um nome distinto para um componente de layout autoral.

## Conferência

As classes usadas aparecem no CSS final. O CSS global não repete valores de marca. Use `astrofy check --rule design.token-usage` e registre o resultado da operação no escopo realmente verificado.
