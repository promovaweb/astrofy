# Casos de documentar componentes

## Uso comum

Documente um componente real, conferindo se href é obrigatório, opcional ou
incompatível com sua variante. Não deduza o contrato pelo nome Button.

## Projeto existente

Um componente perdeu a propriedade compact. Remova-a do documento e revise os exemplos.

## Erro recorrente

Não deduza propriedades apenas pelo nome do componente. Confirme declaração e uso real.

## Conferência

A página em .astrofy/docs/components descreve a API atual e é alcançável pelo índice. Use `astrofy docs check` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** Props, defaults, slots, imports, estilos, exemplos existentes e índice em .astrofy/docs.
- **Alteração sob teste:** Ao remover uma prop, altere assinatura, consumidores e exemplo documental no mesmo escopo. Registre o caminho real do componente e atualize o índice.
- **Falha e resultado esperado:** Um exemplo com prop removida deve ser identificado por tipos quando a API for estrita e por revisão de HTML e comportamento quando ela aceitar atributos arbitrários. O exemplo corrigido mostra o estado descrito.
- **Comando complementar:** `astrofy docs check`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
