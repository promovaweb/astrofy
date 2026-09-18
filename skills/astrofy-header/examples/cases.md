# Casos de compor cabeçalho

## Menu aberto durante resize

Abra a navegação mobile, mova foco para um link e aumente o viewport para desktop.
Confira se o link continua visível ou se o foco foi encaminhado a um controle
equivalente disponível. Volte ao mobile: aria-expanded e visibilidade devem
concordar, sem rolagem presa nem links ocultos alcançáveis por Tab.

## Âncora com fonte carregada

Abra diretamente uma URL com fragmento antes de a fonte terminar de carregar.
Repita após carregar a fonte, com zoom e um rótulo longo na navegação. Compare
a posição do destino com a borda inferior do header. Teste também Shift+Tab
para um controle acima do viewport; clique em âncora sozinho não cobre foco.

## Uso comum

Use SiteHeader para compor o logo e SiteNavigation.

## Projeto existente

Um cabeçalho existente tem duas linhas. Calcule a compensação de âncoras para a altura real.

## Erro recorrente

Não duplique a máquina de estado do menu dentro do cabeçalho e da navegação.

## Conferência

O cabeçalho não cobre foco nem conteúdo de âncoras nas larguras testadas. Use `astrofy check --category header` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** Header.astro, configuração pública, logos e componente de navegação.
- **Alteração sob teste:** Preserve URLs e seletor de tema ao reorganizar a composição. Ajuste compensação de âncora conforme a altura real do cabeçalho.
- **Falha e resultado esperado:** Ao focar um link ou abrir uma âncora, o destino não pode ficar encoberto. Capture a posição do elemento depois de rolar.
- **Comando complementar:** `astrofy check --category header`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
