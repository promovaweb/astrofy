---
name: astrofy-build-deploy
description: Prepara build e operação de publicação em projetos Astro, respeitando o adaptador e o provedor existentes e validando o ambiente.
---

# Preparar build e publicação

Prepara build e operação de publicação em projetos Astro, respeitando o adaptador e o provedor existentes e validando o ambiente.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Manifesto, adaptador, ambiente e provedor adotado.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Identifique o modo estático ou servidor e o adaptador compatível. Confira variáveis por ambiente e scripts de build. Execute o build autorizado, teste preview e documente a publicação conforme o provedor. Publique apenas dentro da autorização recebida.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

O build é reproduzível e o procedimento descreve entradas, saída e teste após publicação.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --rule quality.build
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
