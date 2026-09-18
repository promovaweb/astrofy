# Referência técnica de astrofy-blog

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia schema da coleção, seleção publicável, rotas de post, arquivos e
taxonomias.

Centralize o filtro de publicação por rascunho e data com fuso definido.
Reutilize a mesma seleção nas rotas, arquivos e taxonomias.

## Alteração compatível

Compare campos legados e atuais antes de migrar o schema. Preserve datas
factuais e slugs já publicados; redirects exigem conferência específica.

## Diagnóstico

Com três posts elegíveis e pageSize 2, gere duas páginas. Um rascunho e um post
futuro não podem aparecer quando a política os exclui.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra           | Método      | Escopo    | Verificação                                      |
| --------------- | ----------- | --------- | ------------------------------------------------ |
| `blog.slugs`    | `automatic` | `project` | Slugs únicos e normalizados.                     |
| `blog.drafts`   | `automatic` | `project` | Rascunhos não aparecem na produção.              |
| `blog.dates`    | `automatic` | `project` | Datas válidas e política de publicação aplicada. |
| `blog.post`     | `hybrid`    | `project` | Corpo, código, mídia e tabelas legíveis.         |
| `blog.archives` | `automatic` | `project` | Arquivos e paginação completos e sem duplicação. |
| `blog.empty`    | `hybrid`    | `project` | Estado vazio utilizável.                         |

## Modelo do blog

Defina a coleção em src/content.config.ts com loader e schema Zod. pubDate deve
ser data válida; conteúdo futuro não entra em páginas públicas. Slug precisa ser
único depois de normalizado.

A rota individual consulta a entrada pelo identificador. Arquivos e taxonomias
usam lista já filtrada e ordenada. Nunca recalcule publicação por regras
diferentes em cada template.

## Publicação e tempo

Defina se pubDate representa instante com fuso ou data editorial sem horário.
Normalize essa interpretação uma vez e use o mesmo instante de referência na
seleção do build. Testes devem fornecer um relógio fixo, incluindo o limite
exato de publicação, para não depender da hora de execução.

Em saída estática, chegar ao horário agendado não altera os arquivos publicados.
Documente qual processo dispara novo build. Em SSR, confirme se a coleção usada
é carregada no build ou consultada por requisição; renderização dinâmica não
transforma automaticamente uma coleção de build em fonte atualizada ao vivo.

Filtro da listagem não protege a rota individual. A mesma política precisa
alcançar getStaticPaths ou a consulta do handler, além de RSS, sitemap e busca
interna quando existirem. Preview de rascunho tem contrato próprio de acesso
e não pode ser habilitado apenas por parâmetro público não validado.

## Identidade e ordenação

Separe ID da coleção, slug e URL pública. Loader pode gerar o ID a partir do
arquivo; renomear esse arquivo pode alterar referências. Preserve URLs já
publicadas por mapeamento explícito quando necessário e confira colisões após
normalização, inclusive entre fontes diferentes.

Não dependa da ordem retornada por getCollection. Ordene por campo definido
e desempate por identificador estável antes de paginar. Alterar título não
deve reorganizar empates se o contrato usa ID. Para múltiplos idiomas, confira
qual conjunto participa da ordenação antes de criar arquivos.

Referências de autor e taxonomia devem resolver para entidades existentes.
Defina como tratar remoção de uma entidade ainda usada por posts. Não converta
automaticamente categoria ausente em uma nova categoria com nome vazio.

## Feed e consistência

Se houver RSS, derive items da seleção publicável e componha links pelo mesmo
resolver das páginas. Confira XML e URLs absolutas, incluindo base. Não reutilize
HTML de MDX com componentes interativos sem verificar o que pode ser renderizado
e consumido no feed; resumo textual pode ser o contrato adotado.

Compare conjuntos de IDs entre posts, arquivos, taxonomias e saídas auxiliares.
Um feed pode limitar quantidade, mas os itens incluídos continuam publicáveis.
Documente essa limitação para não interpretar diferenças esperadas como perda.

Teste remoção de publicação seguida de build limpo e conferência do artefato.
Ausência na listagem não comprova remoção de HTML antigo no destino de deploy.

## Fontes

- [RSS no Astro](https://docs.astro.build/en/recipes/rss/): geração de feed,
  mapeamento de itens e conteúdo entregue aos leitores.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
- **[Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/):**
  compilação MDX e imports de componentes; consulte ao alterar schema ou
  renderização do corpo.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
