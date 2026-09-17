# Casos de implementar temas

## Uso comum

Escolha dark, recarregue a página e confira a persistência.

## Projeto existente

Um site usa classe dark em vez de data-theme. Documente o adaptador sem adicionar dois controles concorrentes.

## Erro recorrente

Não aplique sempre a preferência do sistema após carregar. Isso apagaria a escolha explícita feita no seletor.

## Conferência

A preferência explícita prevalece. System acompanha o sistema e o site continua utilizável com armazenamento indisponível. Use `astrofy check --category theme` e registre o resultado da operação no escopo realmente verificado.
