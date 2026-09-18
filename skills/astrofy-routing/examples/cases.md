# Casos de organizar rotas

## Uso comum

Crie a rota de post a partir de um slug validado da coleção.

## Projeto existente

Um artigo mudou de URL. Registre redirect da URL antiga e teste o destino final.

## Erro recorrente

Não considere suficiente a existência de 404.html. Confira o status HTTP retornado pelo servidor.

## Conferência

As rotas são únicas e redirects terminam no destino esperado. A página de erro recebe status coerente. Use `astrofy check --category routing` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** src/pages, getStaticPaths, slugs, base, trailingSlash e regras do provedor.
- **Alteração sob teste:** Conserve URLs publicadas ou registre a relação antiga/nova. Verifique status HTTP no servidor utilizado, inclusive 404.
- **Falha e resultado esperado:** Dois conteúdos com o mesmo slug devem ser recusados ou resolvidos explicitamente. Redirect circular precisa falhar no teste do destino final.
- **Comando complementar:** `astrofy check --category routing`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
