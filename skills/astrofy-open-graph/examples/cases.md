# Casos de configurar open graph

## Uso comum

Um post usa sua capa e uma página comum usa a imagem padrão do site.

## Projeto existente

Um site possui imagens sociais próprias. Preserve os ativos ao centralizar o componente de metadados.

## Erro recorrente

Não vincule automaticamente a imagem social ao tema atual do visitante. O crawler pode não executar o seletor.

## Conferência

Tags obrigatórias não entram em conflito. Quando houver várias imagens, cada grupo mantém suas propriedades e a ordem de preferência. As imagens podem ser acessadas no ambiente publicado. Use `astrofy check --category og` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** componente de metadados, título, descrição, imagem e domínio.
- **Alteração sob teste:** Preserve capas sociais próprias. Centralize a emissão sem duplicar tags já presentes em layouts herdados.
- **Falha e resultado esperado:** Remova a capa específica de um post de teste: o fallback precisa ser válido. Uma imagem 404 deve impedir afirmar que o compartilhamento foi conferido.
- **Comando complementar:** `astrofy check --category og`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
