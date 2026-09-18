# Referência técnica de astrofy-blog-archives

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia coleção publicável, paginate, pageSize e URLs de taxonomias.

Defina ordenação com desempate estável antes de paginar. Use a mesma seleção do
post individual e estabeleça o comportamento do arquivo vazio.

## Alteração compatível

Mantenha prefixos existentes como /artigos. Confira redirects se o pedido
alterar URLs; preserve metadados específicos por página.

## Diagnóstico

Com três posts e pageSize 2, a união das páginas deve conter exatamente três IDs
sem repetição. Página 2 precisa ter sua própria canônica.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Paginação

Use paginate no retorno de getStaticPaths e preserve a ordem estável da lista
recebida. Página tem URL própria e não deve apontar canonical para a primeira
página. Links anterior e próximo usam URLs geradas pelo helper.

Taxonomia parte da mesma seleção publicável. Se um filtro não encontra entradas,
renderize estado vazio com status 200 apenas quando a rota existe; tag
inexistente pode responder 404 conforme a política do site.

## Contrato da página paginada

O helper paginate entrega page.data, page.currentPage, page.lastPage e page.url. Use
page.url.prev e page.url.next apenas quando definidos; não calcule página zero
nem mantenha links falsos na primeira e na última página.

A escolha entre [page].astro e [...page].astro altera a URL da primeira
página. Preserve o formato publicado e confira a rota raiz depois de trocar o
arquivo. Uma coleção vazia exige tratamento explícito do índice; não suponha
que o helper gerará a página desejada sem entradas.

Para taxonomias, normalize identificador e mantenha rótulo de exibição separado.
Deduplique uma tag repetida na mesma entrada antes de agrupar. Compare a união
de page.data de todas as páginas com a seleção original e confira a contagem
por identificador, não somente o número de cards.

## Fontes de paginação

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
