---
name: astrofy-blog
description:
  Organiza o blog de um site Astro com coleções MDX e templates de leitura e
  arquivo, definindo taxonomias e regras de publicação.
---

# Organizar blog

## Entradas

Leia schema da coleção, seleção publicável, rotas de post, arquivos e
taxonomias. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Centralize o filtro de publicação por rascunho e data com fuso definido.
Reutilize a mesma seleção nas rotas, arquivos e taxonomias.

Defina o schema da coleção e a seleção única de posts publicáveis. Relacione
post individual e arquivos paginados. Normalize taxonomias e documente autoria e
fuso. Reutilize o design system na leitura e nas listagens.

### Sequência específica

1. Defina schema, status de publicação, data, slug, autoria e taxonomias na
   coleção.
2. Use uma única função para selecionar entradas publicáveis.
3. Ordene por data e desempate por identificador antes de gerar posts e
   arquivos.
4. Faça post individual, arquivo e sitemap consumirem a mesma seleção.
5. Confira RSS e busca interna quando existirem. Documente limites de quantidade
   e use relógio fixo nos testes de publicação agendada.
6. Diferencie coleção carregada no build de fonte consultada por requisição.
   Confirme como publicação futura e retirada de conteúdo chegam ao deploy.

### Alteração de implementação existente

Compare campos legados e atuais antes de migrar o schema. Preserve datas
factuais e slugs já publicados; redirects exigem conferência específica.

## Verificação

Com três posts elegíveis e pageSize 2, gere duas páginas. Um rascunho e um post
futuro não podem aparecer quando a política os exclui.

Os mesmos posts elegíveis aparecem nas rotas e arquivos. Rascunhos e datas
futuras obedecem à política registrada.

```bash
astrofy check --category blog
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
