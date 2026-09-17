---
name: astrofy-security
description: Revisa entradas, segredos e execução de HTML ou MDX em projetos Astro, aplicando correções delimitadas e documentando o alcance.
---

# Revisar fronteiras de execução

Revisa entradas, segredos e execução de HTML ou MDX em projetos Astro, aplicando correções delimitadas e documentando o alcance.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Origem das entradas, renderização e dependências.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Localize entradas externas e seus consumidores. Confira serialização em HTML, uso de set:html e origem do MDX. Procure credenciais em configuração pública e examine dependências relevantes. Corrija ocorrências demonstradas e registre o alcance da revisão.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

As correções possuem caso reproduzível. O relatório não expõe credenciais nem declara auditoria completa por análise automática.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --rule config.secrets
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
