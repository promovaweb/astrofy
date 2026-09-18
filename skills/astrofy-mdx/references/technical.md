# Referência técnica de astrofy-mdx

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Combinação executada: `@astrojs/mdx` 8.0.1 e Content Layer do Astro 7.3.3.

## Arquivos e APIs

Leia integração MDX, coleção, schema, imports e origem do conteúdo.

Diferencie API de coleções da versão instalada de exemplos de outra major.
Compile apenas conteúdo de origem autorizada, pois MDX pode executar código.

## Alteração compatível

Mapeie campos antigos sem mudar seu significado. Valide uma entrada antes de
migrar o acervo e registre componentes permitidos.

## Diagnóstico

Um campo obrigatório ausente precisa apontar a entrada inválida; o mesmo arquivo
corrigido deve renderizar o componente MDX no HTML.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra            | Método      | Escopo    | Verificação                                          |
| ---------------- | ----------- | --------- | ---------------------------------------------------- |
| `mdx.schema`     | `automatic` | `project` | Frontmatter atende ao schema editorial.              |
| `mdx.components` | `automatic` | `project` | Componentes referenciados existem e compilam.        |
| `mdx.trust`      | `hybrid`    | `project` | Origem do MDX e fronteira de confiança documentadas. |

## MDX no Astro 7

Coleção local usa glob ou file em astro/loaders e schema de astro/zod.
getCollection consulta dados tipados. Alteração do schema pode pedir reinício ou
sync do servidor.

MDX executa JSX e imports. Aceite somente arquivos do repositório ou pipeline
controlado; corpo de terceiro fica fora do compilador MDX.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/):**
  compilação MDX e imports de componentes; consulte ao alterar schema ou
  renderização do corpo.
- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
