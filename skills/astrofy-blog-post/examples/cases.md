# Casos de compor post individual

## Uso comum

Renderize um artigo com aviso, tabela e bloco de código.

## Projeto existente

Um post possui canonical externo autorizado. Preserve o override em vez de forçar a URL local.

## Erro recorrente

Não use o título genérico do blog em todos os posts. Leia o título da entrada atual.

## Conferência

O post tem rota própria e corpo legível nos temas suportados. Metadados correspondem ao artigo. Use `astrofy check --page /blog/exemplo/` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** entrada da coleção, layout de leitura, componentes MDX e metadados.
- **Alteração sob teste:** Preserve canonical externo autorizado e slugs existentes. Atualize layout e metadados sem reescrever o conteúdo factual.
- **Falha e resultado esperado:** Dois artigos com títulos diferentes devem emitir títulos e canônicas correspondentes. Uma tabela longa deve continuar legível no celular.
- **Comando complementar:** `astrofy check --page /blog/exemplo/`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
