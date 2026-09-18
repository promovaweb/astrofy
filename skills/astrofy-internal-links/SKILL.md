---
name: astrofy-internal-links
description:
  Analisa links internos em sites Astro e sugere destinos contextualizados,
  preservando a sintaxe MDX e evitando alterações repetidas.
---

# Revisar ligações internas

## Entradas

Leia HTML atual, rotas, headings, arquivo MDX de origem e destinos candidatos.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Leia o parágrafo e a seção de destino antes de propor âncora. Altere somente o
destino necessário e preserve imports, frontmatter e código.

1. Execute `astrofy links scan --json` sobre um build atual. Cada rota fornece
   título, descrição, headings, taxonomias, links existentes e destinos
   ausentes. Sem HTML publicado, registre a necessidade de build; não trate uma
   lista vazia como comprovação de ausência de problemas.
2. Relacione a rota ao arquivo-fonte antes de sugerir uma alteração. Leia o
   parágrafo de origem e a seção de destino. Título semelhante ou tag comum
   ajudam a localizar candidatos, mas não justificam um link isoladamente.
3. Registre cada proposta com rota de origem, arquivo, trecho atual, texto
   sugerido para a âncora, URL de destino, fragmento quando houver e razão
   contextual. Informe se o link já existe e evite repetir a mesma indicação no
   parágrafo. Não crie links dentro de links.
4. Aplique somente as alterações abrangidas pelo pedido. Use parsing
   Markdown/MDX ou uma edição delimitada conferida pelo parser. Preserve
   frontmatter, imports, componentes, código e fatos. Se a mesma URL aparecer no
   rótulo ou no título do link, altere apenas o destino.
5. Gere novamente o escopo necessário quando a alteração afetar a publicação e
   repita o scanner. Confira a rota e o ID de destino no HTML atual. Registre
   falhas restantes e conserve os resultados de outras páginas.

O CLI não aplica sugestões editoriais automaticamente. `links scan` produz o
índice e os diagnósticos; a edição pertence ao trabalho da skill. Os fragmentos
da documentação Markdown/MDX são conferidos com `docs check`, enquanto os links
publicados são conferidos no HTML pelo scanner.

### Sequência específica

1. Gere o índice com links scan a partir de HTML atual.
2. Leia parágrafo de origem e heading de destino antes de sugerir âncora.
3. Aplique edição delimitada que preserve frontmatter, MDX e código.
4. Gere o escopo e rode scanner novamente para confirmar destino e fragmento.
5. Diferencie rota estática, SSR, redirect e destino não HTML. Registre casos
   que exigem resposta do host para completar a conferência.
6. Antes de editar link de referência Markdown, confira todos os consumidores
   da definição. Use IDs emitidos para fragmentos, incluindo headings repetidos.

### Alteração de implementação existente

Atualize referências a heading renomeado após confirmar seus consumidores. Evite
substituir ocorrências da URL dentro de código ou rótulos.

## Verificação

Um fragmento ausente deve ser detectado. Após corrigir o destino e repetir o
scanner, o link deve existir uma única vez no parágrafo.

Links e âncoras existem. A reexecução não duplica links nem muda trechos de
código.

```bash
astrofy links scan
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
