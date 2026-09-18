# Referência técnica de astrofy-page-design

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia conteúdo real, objetivo da rota, tokens, componentes e capturas atuais.

Defina ordem de leitura antes da grade visual. Teste largura estreita, desktop,
zoom e conteúdo maior que o exemplo. Preserve acesso a ações e texto completo.

## Alteração compatível

Altere uma região da página por vez; compare capturas com o mesmo conteúdo,
viewport e tema. Reutilize espaçamentos já definidos.

## Diagnóstico

Um título longo não pode desaparecer por altura fixa. Verifique scrollWidth,
quebra de linha e foco no botão principal.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra               | Método   | Escopo | Verificação                                     |
| ------------------- | -------- | ------ | ----------------------------------------------- |
| `layout.responsive` | `hybrid` | `page` | Sem perda de conteúdo nas larguras verificadas. |
| `layout.overflow`   | `hybrid` | `page` | Sem overflow horizontal indevido.               |
| `layout.hierarchy`  | `manual` | `page` | Hierarquia visual e leitura coerentes.          |

## Composição de página

Página usa main uma vez, h1 único e seções com heading quando o conteúdo pede
navegação. Grid e espaçamento consomem tokens semânticos; valores avulsos tornam
modo e manutenção inconsistentes.

Imagens reservam espaço e CTAs têm destino real. CSS responsivo trata conteúdo
longo, zoom e viewport estreito antes de adicionar efeito visual.

## Composição no projeto existente

Leia o layout da rota antes de adicionar main, header ou footer. A página pode
fornecer somente o conteúdo do slot principal; duplicar a estrutura do documento
produz landmarks repetidos. Mantenha título, metadados e conteúdo coordenados
pelas props que o layout realmente aceita.

Separe dado editorial de escolha visual. Conteúdo fornecido alimenta seções;
variantes de layout não devem inventar métricas, depoimentos ou imagens de produto.
Quando faltar um ativo, implemente o estado previsto sem simular uma comprovação
institucional. Preserve URLs e semântica das ações existentes.

Interação precisa justificar código cliente. Uma grade, tipografia responsiva
ou seção decorativa não exige ilha de framework. Para controle interativo,
delimite estado e conteúdo inicial antes de escolher diretiva client.

## Layout orientado pelo conteúdo

Defina largura de leitura e comportamento das colunas com texto real. Itens de
grid e flex podem conservar largura mínima baseada no conteúdo; inspecione
min-width, quebra de palavras e tamanho intrínseco quando houver overflow.
Não aplique overflow-x hidden no documento para ocultar a causa.

Conteúdo bidimensional, como tabela ou código, pode exigir rolagem numa região
própria. Isso não justifica deslocamento horizontal de toda a página. Ações e
texto comum devem continuar legíveis com zoom e em coluna estreita.

Evite altura fixa para blocos de texto variáveis. Reserve proporção para mídia
quando conhecida e confira recorte, legenda e ausência de imagem. Uma imagem
decorativa pode mudar de posição; conteúdo essencial conserva ordem coerente
no DOM, independentemente do grid visual.

## Estados e comparação visual

Escolha estados que exercitam a composição: título longo, lista vazia, imagem
ausente, erro de formulário e menu aberto quando existirem. Teste os temas
oferecidos pelo site sem criar um segundo tema apenas para preencher a revisão.

Ao comparar capturas, mantenha conteúdo, viewport, escala e fonte carregada.
Desative ou estabilize animações somente no ambiente de captura e registre essa
condição. Screenshot sozinha não comprova foco, ordem de leitura ou destino de
link; confira esses comportamentos no navegador.

Inspecione tanto a região alterada quanto o documento completo. Padding de uma
seção pode corrigir sua captura e duplicar espaçamento com o layout externo.
Registre o elemento que causou overflow e o ajuste aplicado, evitando relatório
que apenas diga que a página ficou responsiva.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Theme variables](https://tailwindcss.com/docs/theme):** namespaces de
  variáveis e utilitários do Tailwind 4; confira o CSS compilado.
- **[documentação para page-design](https://www.w3.org/WAI/tutorials/page-structure/):**
  regiões e headings; consulte ao compor a estrutura semântica da página.
