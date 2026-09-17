---
name: astrofy-landing-pages
description: Monta landing pages Astro com oferta e ação fornecidas, compondo seções reutilizáveis e verificando destinos e estados do fluxo.
---

# Montar landing page

Monta landing pages Astro com oferta e ação fornecidas, compondo seções reutilizáveis e verificando destinos e estados do fluxo.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Oferta confirmada, ação esperada e conteúdo autorizado.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

Defina a sequência de leitura conforme a ação esperada. Reutilize seções do projeto. Confira o destino do botão e, quando houver formulário, trate erros e sucesso. Teste a página em larguras representativas.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

A ação tem destino funcional e os estados presentes foram exercitados. O texto não inventa características da oferta.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --page /apresentacao/
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
