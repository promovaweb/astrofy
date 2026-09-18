# Referência técnica de astrofy-blog-post

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia entrada da coleção, layout de leitura, componentes MDX e metadados.

Derive título, autoria e datas da entrada atual. Confira código, tabela, imagem
e componente no corpo, com largura de leitura adequada.

## Alteração compatível

Preserve canonical externo autorizado e slugs existentes. Atualize layout e
metadados sem reescrever o conteúdo factual.

## Diagnóstico

Dois artigos com títulos diferentes devem emitir títulos e canônicas
correspondentes. Uma tabela longa deve continuar legível no celular.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Template de post

Use getEntry ou getCollection no servidor e render(entry), importado de
astro:content, para obter Content e headings. Renderize Content no layout de
leitura; não use entry.render(), pertencente à API legada. Campos de
frontmatter alimentam HTML, Open Graph e
JSON-LD; não mantenha cópias manuais em cada template.

Imagem de capa recebe dimensões e texto alternativo contextual. Corpo MDX
confiável pode receber componentes declarados; conteúdo sem origem controlada
não entra no compilador.

## Fontes

- [API astro:content](https://docs.astro.build/en/reference/modules/astro-content/):
  confira render, CollectionEntry e a estrutura retornada antes de tipar o
  template ou construir o sumário.

## Corpo, sumário e metadados

O sumário usa os slugs retornados em headings para produzir os fragmentos.
Não recalcule IDs a partir do texto: títulos repetidos podem receber sufixos.
Quando componentes MDX acrescentam headings em runtime, confira se aparecem
na lista retornada; não presuma que o compilador os descobriu.

Para a data de atualização, valide que não antecede a publicação. Datas sem
hora precisam de timezone editorial definido para não mudar de dia no host.
Campo ausente deve omitir a marcação opcional, em vez de gerar texto undefined.
Teste o template com tabela larga, bloco de código e heading repetido.

## Fontes complementares

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/):**
  compilação MDX e imports de componentes; consulte ao alterar schema ou
  renderização do corpo.
- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
- **[Open Graph protocol](https://ogp.me/):** propriedades Open Graph e URLs;
  compare o protocolo com o HTML emitido.
- **[documentação para blog-post](https://docs.astro.build/en/basics/layouts/):**
  props e slots do layout; consulte ao extrair estrutura compartilhada entre
  rotas.
