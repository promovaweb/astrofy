---
name: astrofy-documentation
description: Mantém arquitetura, mapa de arquivos e operação de projetos Astro em Markdown, conferindo comandos e componentes na implementação.
---

# Manter documentação

Mantém arquitetura, mapa de arquivos e operação de projetos Astro em Markdown, conferindo comandos e componentes na implementação.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Código atual e índice de documentação local.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Leia a implementação e compare o índice com os arquivos existentes. Documente configuração e responsabilidades com exemplos executáveis. Agrupe acervos grandes por coleção. Atualize páginas de componentes afetados e verifique links da documentação.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

Comandos, caminhos e exemplos correspondem ao projeto. Caches e builds não inundam o mapa de arquivos.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy docs check
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
