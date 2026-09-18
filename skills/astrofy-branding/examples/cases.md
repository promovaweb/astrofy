# Casos de registrar identidade

## Uso comum

Use uma paleta fornecida para preencher os tokens primitivos e registrar sua origem.

## Projeto existente

Compare uma nova exportação com o source-map atual e mantenha ajustes locais marcados.

## Erro recorrente

Não presuma o formato de exportação do Brandfy nem copie ativos de uma URL de referência sem autorização.

## Conferência

Cada valor adotado tem origem registrada. Reimportação conserva ajustes locais identificados. Use `astrofy check --category brand` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** ativos fornecidos, identidade existente, design-system.json e source-map.json quando disponível.
- **Alteração sob teste:** Compare exportação recebida, importação anterior e alteração local; apresente divergências por campo. Preserve o ajuste local até resolver a divergência.
- **Falha e resultado esperado:** Reimportar uma cor alterada localmente deve conservar ou sinalizar a personalização; um caminho de logo ausente deve aparecer como pendência.
- **Comando complementar:** `astrofy check --category brand`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
