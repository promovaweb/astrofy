# Casos de organizar arquitetura

## Uso comum

Separe a estrutura global em BaseLayout e deixe a página compor suas seções.

## Projeto existente

Um site usa src/views para layouts. Registre o caminho no contrato e preserve os imports válidos.

## Erro recorrente

Não extraia cada tag HTML em um componente. A abstração precisa reduzir repetição ou isolar comportamento.

## Conferência

Cada área tem finalidade e consumidores identificados. As rotas anteriores continuam funcionando. Use `astrofy check --category architecture` e registre o resultado da operação no escopo realmente verificado.
