---
name: astrofy-blog
description: Organiza o blog de um site Astro com coleções MDX e templates de leitura e arquivo, definindo taxonomias e regras de publicação.
---

# Organizar blog

Organiza o blog de um site Astro com coleções MDX e templates de leitura e arquivo, definindo taxonomias e regras de publicação.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Acervo, navegação editorial e campos de publicação.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Defina o schema da coleção e a seleção única de posts publicáveis. Relacione post individual e arquivos paginados. Normalize taxonomias e documente autoria e fuso. Reutilize o design system na leitura e nas listagens.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

Os mesmos posts elegíveis aparecem nas rotas e arquivos. Rascunhos e datas futuras obedecem à política registrada.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --category blog
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
