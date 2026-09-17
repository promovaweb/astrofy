---
name: astrofy-geo
description: Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta por IA, distinguindo orientações oficiais de hipóteses.
---

# Revisar descoberta por IA

Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta por IA, distinguindo orientações oficiais de hipóteses.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Conteúdo, fontes e plataformas de interesse.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Confira se a informação principal está acessível no HTML. Relacione afirmações às fontes fornecidas e identifique autoria quando pertinente. Consulte a orientação da plataforma específica. Registre recomendações com justificativa e limites de observação.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

A revisão mostra o trecho e a fonte que sustentam cada recomendação, sem prometer citações ou posições.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --category geo
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
