# Casos de configurar idiomas

## Traduções com slugs diferentes

Relacione a mesma identidade a /sobre/ e /en/about/. Abra cada página e use o
seletor nos dois sentidos. Confira que a composição consulta a identidade,
sem produzir /en/sobre/. Remova a tradução da publicação e verifique que o link
de equivalente desaparece ou segue a alternativa explicitamente definida.

## Rewrite para outro idioma

Configure um caso de fallback conforme o contrato existente. Solicite a rota
ausente e registre status, URL visível, texto entregue e html lang. Compare com
o comportamento por redirect. A resposta de fallback não deve ser catalogada
como tradução independente apenas por responder 200.

## Prefixo e base

Use idioma padrão sem prefixo e aplicação publicada sob base não vazia. Confira
home, página interna e versão traduzida. Nenhum link pode repetir base ou
prefixar o idioma padrão contra a configuração. Repita no HTML do build para
não depender exclusivamente do servidor de desenvolvimento.

## Uso comum

Relacione /pt/sobre/ e /en/about/ quando ambas as traduções estiverem publicadas.

## Projeto existente

Um site mantém o idioma padrão sem prefixo. Preserve essa convenção ao adicionar outro idioma.

## Erro recorrente

Não gere hreflang para uma tradução que ainda não possui rota publicada.

## Conferência

A navegação chega a páginas existentes e identifica corretamente o idioma de cada conteúdo. Use `astrofy check --category routing` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** idiomas existentes, idioma padrão, política de prefixos, traduções e fallback.
- **Alteração sob teste:** Preserve o idioma padrão sem prefixo quando esse for o contrato atual. Ao adicionar idioma, teste menus e fallback antes de gerar hreflang.
- **Falha e resultado esperado:** Uma tradução ausente não pode produzir link 404. Cada página traduzida deve declarar seu idioma e alternates coerentes.
- **Comando complementar:** `astrofy check --category routing`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
