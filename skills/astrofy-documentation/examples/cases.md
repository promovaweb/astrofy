# Casos de manter documentação

## Uso comum

Registre como executar dev, check e build a partir dos scripts reais.

## Projeto existente

Após mover um componente, atualize seu documento e os links do índice.

## Erro recorrente

Não copie uma arquitetura desejada para o documento como se já estivesse implementada.

## Conferência

Comandos, caminhos e exemplos correspondem ao projeto. Caches e builds não inundam o mapa de arquivos. Use `astrofy docs check` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** índice local, scripts reais, caminhos atuais e consumidores dos componentes.
- **Alteração sob teste:** Ao mover arquivo, atualize índice, referências e documento do componente. Preserve anotações humanas e identifique afirmações ainda não verificadas.
- **Falha e resultado esperado:** Um link relativo para arquivo removido deve falhar na conferência; após corrigir, o documento precisa ser alcançável pelo índice.
- **Comando complementar:** `astrofy docs check`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
