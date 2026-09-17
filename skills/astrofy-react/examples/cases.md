# Casos de configurar ilhas react

## Uso comum

Use client:visible para um contador demonstrativo abaixo da abertura.

## Projeto existente

Um site já usa React para busca. Preserve o provider local e documente seus consumidores.

## Erro recorrente

Valores aleatórios durante a renderização podem divergir entre servidor e cliente. Produza um valor estável ou adie a leitura.

## Conferência

A ilha responde à interação. Conteúdo estático continua renderizado pelo Astro. Use `astrofy check --category react` e registre o resultado da operação no escopo realmente verificado.
