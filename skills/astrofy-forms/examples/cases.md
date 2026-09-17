# Casos de integrar formulários

## Uso comum

Teste um formulário com endpoint local que registra uma submissão controlada.

## Projeto existente

Um site já usa provedor externo. Preserve o contrato e a configuração pública ao reorganizar o componente.

## Erro recorrente

Uma mensagem de sucesso na tela não comprova recebimento. Confira a resposta e o destino.

## Conferência

O envio de teste chega ao destino, mensagens são acessíveis e nenhuma credencial aparece no cliente. Use `astrofy check --category forms` e registre o resultado da operação no escopo realmente verificado.
