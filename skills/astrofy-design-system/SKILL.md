---
name: astrofy-design-system
description: Valida tokens hierárquicos e gera o CSS do design system em sites Astro, preservando aliases tipados e os modos claro e escuro.
---

# Gerar design system

Valida tokens hierárquicos e gera o CSS do design system em sites Astro, preservando aliases tipados e os modos claro e escuro.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Design system JSON, mapeamento de caminhos e Tailwind instalado.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Modele valores primitivos e funções semânticas. Confira overrides existentes nos dois modos. Execute tokens validate, tokens build --dry-run e tokens build. Compare o CSS e o manifesto e confira os componentes consumidores.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

A geração é determinística. Aliases não formam ciclos, os tipos são preservados e tokens check confirma a sincronização.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy tokens check
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
