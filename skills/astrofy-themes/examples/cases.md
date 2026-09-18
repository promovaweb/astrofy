# Casos de implementar temas

## Uso comum

Escolha dark, recarregue a página e confira a persistência.

## Projeto existente

Um site usa classe dark em vez de data-theme. Documente o adaptador sem adicionar dois controles concorrentes.

## Erro recorrente

Não aplique sempre a preferência do sistema após carregar. Isso apagaria a escolha explícita feita no seletor.

## Conferência

A preferência explícita prevalece. System acompanha o sistema e o site continua utilizável com armazenamento indisponível. Use `astrofy check --category theme` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** script inicial do tema, seletor, localStorage, CSS dark e ativos por modo.
- **Alteração sob teste:** Adapte a convenção existente de classe ou data-theme. Não adicione um segundo controlador. Confira reinicialização após navegação quando o site usa transições.
- **Falha e resultado esperado:** Armazenamento indisponível não pode lançar erro que impeça o restante da página. Recarregar após selecionar dark deve manter o tema e o logo correto.
- **Comando complementar:** `astrofy check --category theme`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
