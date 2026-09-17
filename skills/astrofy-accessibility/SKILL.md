---
name: astrofy-accessibility
description: Revisa semântica, foco e operação por teclado em sites Astro, combinando verificações automáticas com revisão manual de estados.
---

# Revisar acessibilidade

Revisa semântica, foco e operação por teclado em sites Astro, combinando verificações automáticas com revisão manual de estados.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Rotas representativas, temas e fluxos interativos.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Teste landmarks, headings e nomes acessíveis. Percorra a página com Tab e opere menus por teclado. Confira contraste nos dois temas e alternativas de imagem. Registre separadamente scanner e revisão humana, com referência a WCAG 2.2 AA.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

Problemas descrevem elemento, estado e correção. O relatório não declara conformidade completa por um scanner isolado.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --category accessibility
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
