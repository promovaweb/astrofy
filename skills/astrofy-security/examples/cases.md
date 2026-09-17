# Casos de revisar fronteiras de execução

## Uso comum

Escape o caractere menor que ao serializar JSON-LD dentro de script.

## Projeto existente

Um site recebe HTML de CMS. Confira a política de sanitização no ponto de entrada existente.

## Erro recorrente

Não compile MDX externo nem importe configuração desconhecida durante uma inspeção estática.

## Conferência

As correções possuem caso reproduzível. O relatório não expõe credenciais nem declara auditoria completa por análise automática. Use `astrofy check --rule config.secrets` e registre o resultado da operação no escopo realmente verificado.
