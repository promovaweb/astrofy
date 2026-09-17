# Casos de configurar idiomas

## Uso comum

Relacione /pt/sobre/ e /en/about/ quando ambas as traduções estiverem publicadas.

## Projeto existente

Um site mantém o idioma padrão sem prefixo. Preserve essa convenção ao adicionar outro idioma.

## Erro recorrente

Não gere hreflang para uma tradução que ainda não possui rota publicada.

## Conferência

A navegação chega a páginas existentes e identifica corretamente o idioma de cada conteúdo. Use `astrofy check --category i18n` e registre o resultado da operação no escopo realmente verificado.
