# Casos de implementar navegação

## Uso comum

Abra o menu móvel com Enter, navegue com Tab e feche com Escape.

## Projeto existente

Preserve os destinos de um menu já publicado ao extrair navigation.ts.

## Erro recorrente

Não use role=menu como atalho para navegação comum. A semântica exige outro contrato de teclado.

## Conferência

As ações funcionam por mouse, toque e teclado. O menu fechado não mantém links invisíveis no percurso de foco. Use `astrofy check --category navigation` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** árvore de links, controle de abertura, IDs, aria-expanded e rota atual.
- **Alteração sob teste:** Preserve caminhos publicados e estados existentes ao centralizar a árvore. Teste duas instâncias quando houver navegação de desktop e móvel.
- **Falha e resultado esperado:** Abrir com Enter, avançar com Tab e fechar com Escape deve retornar o foco ao controle. Menu fechado não pode receber foco interno.
- **Comando complementar:** `astrofy check --category navigation`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
