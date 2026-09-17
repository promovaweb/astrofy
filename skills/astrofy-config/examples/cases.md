# Casos de separar configuração

## Uso comum

Mova os links repetidos do cabeçalho e rodapé para navigation.ts.

## Projeto existente

Um site já usa config/menu.ts. Preserve o nome quando a convenção estiver documentada.

## Erro recorrente

Não importe TypeScript durante uma inspeção de projeto desconhecido. A importação executa código.

## Conferência

O valor tem uma única fonte editável. Segredos continuam no ambiente. O build preserva o comportamento anterior. Use `astrofy check --category config` e registre o resultado da operação no escopo realmente verificado.
