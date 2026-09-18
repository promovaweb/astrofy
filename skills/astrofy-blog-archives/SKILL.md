---
name: astrofy-blog-archives
description:
  Implementa arquivos paginados de blog Astro com ordenação determinística e
  taxonomias, verificando URLs e estados vazios.
---

# Paginar arquivos do blog

## Entradas

Leia coleção publicável, paginate, pageSize e URLs de taxonomias. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Defina ordenação com desempate estável antes de paginar. Use a mesma seleção do
post individual e estabeleça o comportamento do arquivo vazio.

Use paginate em getStaticPaths. Ordene por data com desempate estável. Reutilize
a seleção de posts em tags, categorias e autores habilitados. Preserve um estado
vazio utilizável e canônicas específicas para cada página.

### Sequência específica

1. Filtre e ordene a coleção antes de chamar paginate.
2. Defina pageSize fixo e confira a mesma regra em categoria, tag e autor.
3. Gere canonical, título e navegação próprios para cada página.
4. Use page.url.prev e page.url.next somente quando definidos. Confira a URL da
   primeira página conforme [page] ou [...page] no nome do arquivo.
5. Teste coleção vazia, última página e número ímpar de entradas. Compare os
   IDs de todas as páginas com a seleção de origem para detectar perda e repetição.

### Alteração de implementação existente

Mantenha prefixos existentes como /artigos. Confira redirects se o pedido
alterar URLs; preserve metadados específicos por página.

## Verificação

Com três posts e pageSize 2, a união das páginas deve conter exatamente três IDs
sem repetição. Página 2 precisa ter sua própria canônica.

Nenhum post aparece duplicado ou desaparece na sequência. Os links anterior e
próximo fecham o percurso.

```bash
astrofy check --rule blog.archives
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
