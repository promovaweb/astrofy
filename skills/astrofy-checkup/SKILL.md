---
name: astrofy-checkup
description: Executa verificações do Astrofy e organiza revisões manuais por escopo, mantendo checklist, relatórios e validade dos resultados.
---

# Executar check-up

Executa verificações do Astrofy e organiza revisões manuais por escopo, mantendo checklist, relatórios e validade dos resultados.

## Preparação e alcance

Apresente um plano curto e atualize o progresso quando concluir uma etapa. Identifique a raiz Astro e leia `.astrofy/docs/index.md`, a configuração pertinente e os arquivos reais do escopo. Entradas desta operação: Configuração, checklist e escopo solicitado.

Consulte [referências técnicas](references/technical.md) para as APIs usadas e [casos de execução](examples/cases.md) para adoção e erros recorrentes. Preserve alterações locais e retome arquivos existentes pelo conteúdo atual. Esta skill pode operar em qualquer projeto Astro compatível, inclusive sem o Astrofy Template.

## Procedimento

1. Consulte `astrofy status --json` para conhecer o estado atual. A consulta
   reconcilia o catálogo e recalcula validade em memória, sem gravar a
   checklist ou executar código do site.
2. Selecione categoria, regra, página ou componente conforme o pedido.
   `check --changed` avalia entradas diferentes da última execução; seu
   relatório não representa cobertura integral do projeto.
3. Confira `checks.trustedExecution` antes de checks que executam scripts.
   Para navegador, confirme o preview e `checks.baseUrl`. Ausência dessas
   condições corresponde a avaliação não concluída, não a aprovação.
4. Execute o check e leia os achados, arquivos e ações sugeridas. Scripts
   preparatórios terminam antes da conferência final do HTML; um build com
   erro não permite usar a saída anterior como comprovação atual.
5. Registre revisão humana somente para regras manuais ou híbridas, com
   responsável e justificativa. A TUI oferece esse registro com `m`.
   Regras automáticas usam seu verificador, mesmo que uma checklist antiga
   apresente outro método. Instâncias retiradas exigem reconciliação.
6. Consulte novamente o status após alterações. Preserve notas, relatórios
   citados e histórico. Uma dispensa vigente altera a aplicação da política,
   mas não transforma um resultado desfavorável em aprovação.

Interprete o código de saída junto do relatório: 0 corresponde à política
selecionada, 1 a falhas avaliadas, 2 a entrada ou configuração inválida,
3 a operação não concluída e 130 a cancelamento. Não conclua uma revisão
apenas porque o processo retornou 0.

Atualize a documentação dos arquivos alterados e somente os itens de checklist efetivamente avaliados. Falta de preview ou falha operacional deve aparecer no relatório como avaliação não concluída. Não instale dependências, envie formulários ou publique o site durante uma simples inspeção.

## Verificação e conclusão

A checklist corresponde ao escopo avaliado. Pendências e falhas operacionais não contam como aprovações.

Use o comando abaixo quando o CLI estiver instalado, junto dos testes específicos do site. O resultado da checklist não substitui a revisão humana exigida pelo escopo.

```bash
astrofy check --changed
```

No resumo final, informe arquivos modificados, comandos executados e pendências reais. Confira os links de Markdown alterados e o estado do Git.

## Texto público

A redação pública segue o Contrato Editorial Compartilhado do projeto. No Hub Promovaweb, leia os índices editoriais da raiz e seus módulos aplicáveis. Em outros sites, consulte as instruções locais e preserve a voz e os fatos fornecidos. Não atribua experiências ou opiniões sem fonte.
