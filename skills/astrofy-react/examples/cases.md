# Casos de configurar ilhas react

## Uso comum

Use client:visible para um contador demonstrativo abaixo da abertura.

## Projeto existente

Um site já usa React para busca. Preserve o provider local e documente seus consumidores.

## Erro recorrente

Valores aleatórios durante a renderização podem divergir entre servidor e cliente. Produza um valor estável ou adie a leitura.

## Conferência

A ilha responde à interação. Conteúdo estático continua renderizado pelo Astro. Use `astrofy check --category react` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** package.json, integração React em astro.config.*, ilha JSX/TSX e diretiva client no consumidor Astro.
- **Alteração sob teste:** Preserve providers e estado local. Mude uma ilha de cada vez e compare HTML inicial, hidratação e navegação entre rotas.
- **Falha e resultado esperado:** Um contador precisa incrementar após hidratar. Erros de console e diferenças entre HTML inicial e cliente devem reprovar o fluxo mesmo com build válido.
- **Comando complementar:** `astrofy check --category react`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
