# Casos de implementar navegação

## Uso comum

Abra o menu móvel com Enter, navegue com Tab e feche com Escape.

## Projeto existente

Preserve os destinos de um menu já publicado ao extrair navigation.ts.

## Erro recorrente

Não use role=menu como atalho para navegação comum. A semântica exige outro contrato de teclado.

## Conferência

As ações funcionam por mouse, toque e teclado. O menu fechado não mantém links invisíveis no percurso de foco. Use `astrofy check --category navigation` e registre o resultado da operação no escopo realmente verificado.
