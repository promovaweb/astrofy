# Casos de configurar imagens

## Uso comum

Use uma imagem processada do acervo local no corpo do post.

## Projeto existente

Um logo SVG fica em public. Preserve o vetor e confira sua legibilidade nos dois temas.

## Erro recorrente

Não aplique lazy loading à imagem principal apenas por convenção. Avalie sua posição na primeira tela.

## Conferência

A imagem mantém proporção, possui alternativa adequada e não ocupa bytes desnecessários para o tamanho exibido. Use `astrofy check --category images` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** origem dos ativos, dimensões, componentes Image/Picture ou img e layout.
- **Alteração sob teste:** Preserve vetores de marca e URLs externas autorizadas. Atualize consumidores ao mover ativos e confira variantes nos temas.
- **Falha e resultado esperado:** Uma imagem com proporção errada deve ser percebida na comparação visual. Imagem decorativa pode ter alt vazio; imagem funcional precisa comunicar a ação.
- **Comando complementar:** `astrofy check --category images`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
