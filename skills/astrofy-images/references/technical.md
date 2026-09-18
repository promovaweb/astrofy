# Referência técnica de astrofy-images

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia origem dos ativos, dimensões, componentes Image/Picture ou img e layout.

Distinga ativo processado em src de arquivo servido em public. Escolha texto
alternativo pela função e dimensões pela composição real.

## Alteração compatível

Preserve vetores de marca e URLs externas autorizadas. Atualize consumidores ao
mover ativos e confira variantes nos temas.

## Diagnóstico

Uma imagem com proporção errada deve ser percebida na comparação visual. Imagem
decorativa pode ter alt vazio; imagem funcional precisa comunicar a ação.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra               | Método      | Escopo | Verificação                                          |
| ------------------- | ----------- | ------ | ---------------------------------------------------- |
| `images.dimensions` | `automatic` | `page` | Dimensões ou proporção previstas.                    |
| `images.delivery`   | `hybrid`    | `page` | Imagens responsivas e carregamento adequados ao uso. |

## Pipeline de imagens

Import de src entrega metadados e permite transformação por astro:assets. public
preserva URL e pula processamento. URL remota precisa de host permitido antes de
entrar no componente.

Imagem LCP usa carregamento prioritário somente depois da medição. Demais
imagens usam lazy. width e height evitam mudança de layout; alt descreve função,
não aparência genérica.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Images](https://docs.astro.build/en/guides/images/):** origem da imagem,
  transformação e texto alternativo; consulte antes de trocar o componente de
  mídia.
- **[documentação para images](https://www.w3.org/WAI/tutorials/images/):**
  origem da imagem, transformação e texto alternativo; consulte antes de trocar
  o componente de mídia.
