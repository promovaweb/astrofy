# Casos de validar fluxos

## Uso comum

Teste que um rascunho não gera rota nem aparece no arquivo paginado.

## Projeto existente

Uma alteração no menu exige refazer o percurso de teclado, mesmo com build sem erros.

## Erro recorrente

Não use um teste de existência de arquivo como prova de funcionamento do formulário.

## Conferência

Os testes protegem comportamento observável e falham quando o contrato correspondente é violado. Use `astrofy check --category quality` e registre o resultado da operação no escopo realmente verificado.
