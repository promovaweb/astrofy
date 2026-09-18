# Referência técnica de astrofy-routing

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia src/pages, getStaticPaths, slugs, base, trailingSlash e regras do provedor.

Compare rota de origem e URL final considerando base e modo de renderização.
Teste colisões e ciclos de redirect.

## Alteração compatível

Conserve URLs publicadas ou registre a relação antiga/nova. Verifique status
HTTP no servidor utilizado, inclusive 404.

## Diagnóstico

Dois conteúdos com o mesmo slug devem ser recusados ou resolvidos
explicitamente. Redirect circular precisa falhar no teste do destino final.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                | Método      | Escopo | Verificação                              |
| -------------------- | ----------- | ------ | ---------------------------------------- |
| `routing.collisions` | `automatic` | `page` | Sem colisões entre rotas publicadas.     |
| `routing.redirects`  | `automatic` | `page` | Redirecionamentos sem ciclos conhecidos. |
| `routing.not-found`  | `hybrid`    | `page` | Página de erro e status corretos.        |

## Roteamento Astro 7

Arquivo em src/pages define página ou endpoint. [slug] representa segmento e
[...path] captura múltiplos segmentos. getStaticPaths gera rotas no build;
renderização sob demanda pede output server ou regra de prerender adequada.

site, base e trailingSlash participam das URLs públicas. Endpoint retorna
Response com método, status e content type explícitos.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para routing](https://docs.astro.build/en/guides/on-demand-rendering/):**
  prerender, modo servidor e adaptador; consulte antes de alterar a execução de
  rotas.
