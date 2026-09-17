---
name: astrofy-internal-links
description: Analisa links internos em sites Astro e sugere destinos contextualizados, preservando a sintaxe MDX e evitando alterações repetidas.
---

# Revisar ligações internas

Analisa links internos em sites Astro e sugere destinos contextualizados, preservando a sintaxe MDX e evitando alterações repetidas.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Índice de rotas, headings e links existentes.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

1. Execute `astrofy links scan --json` sobre um build atual. Cada rota fornece
   título, descrição, headings, taxonomias, links existentes e destinos ausentes.
   Sem HTML publicado, registre a necessidade de build; não trate uma lista
   vazia como comprovação de ausência de problemas.
2. Relacione a rota ao arquivo-fonte antes de sugerir uma alteração. Leia o
   parágrafo de origem e a seção de destino. Título semelhante ou tag comum
   ajudam a localizar candidatos, mas não justificam um link isoladamente.
3. Registre cada proposta com rota de origem, arquivo, trecho atual, texto
   sugerido para a âncora, URL de destino, fragmento quando houver e razão
   contextual. Informe se o link já existe e evite repetir a mesma indicação
   no parágrafo. Não crie links dentro de links.
4. Aplique somente as alterações abrangidas pelo pedido. Use parsing
   Markdown/MDX ou uma edição delimitada conferida pelo parser. Preserve
   frontmatter, imports, componentes, código e fatos. Se a mesma URL aparecer
   no rótulo ou no título do link, altere apenas o destino.
5. Gere novamente o escopo necessário quando a alteração afetar a publicação
   e repita o scanner. Confira a rota e o ID de destino no HTML atual.
   Registre falhas restantes e conserve os resultados de outras páginas.

O CLI não aplica sugestões editoriais automaticamente. `links scan` produz
o índice e os diagnósticos; a edição pertence ao trabalho da skill. Os
fragmentos da documentação Markdown/MDX são conferidos com `docs check`,
enquanto os links publicados são conferidos no HTML pelo scanner.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

Links e âncoras existem. A reexecução não duplica links nem muda trechos de código.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy links scan
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
