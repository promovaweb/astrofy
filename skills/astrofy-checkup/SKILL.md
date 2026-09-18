---
name: astrofy-checkup
description:
  Executa verificações do Astrofy e organiza revisões manuais por escopo,
  mantendo checklist, relatórios e validade dos resultados.
---

# Executar check-up

## Entradas

Leia policies.json, checks.json, paths.json, checklist e relatórios citados. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Selecione escopo antes de executar. Observe trustedExecution e baseUrl.
Diferencie falha de regra, execução incompleta e item manual pendente.

1. Consulte `astrofy status --json` para conhecer o estado atual. A consulta
   reconcilia o catálogo e recalcula validade em memória, sem gravar a checklist
   ou executar código do site.
2. Selecione categoria, regra, página ou componente conforme o pedido.
   `check --changed` avalia entradas diferentes da última execução; seu
   relatório não representa cobertura integral do projeto.
3. Confira `checks.trustedExecution` antes de checks que executam scripts. Para
   navegador, confirme o preview e `checks.baseUrl`. Ausência dessas condições
   corresponde a avaliação não concluída, não a aprovação.
4. Execute o check e leia os achados, arquivos e ações sugeridas. Scripts
   preparatórios terminam antes da conferência final do HTML; um build com erro
   não permite usar a saída anterior como comprovação atual.
5. Registre revisão humana somente para regras manuais ou híbridas, com
   responsável e justificativa. A TUI oferece esse registro com `m`. Regras
   automáticas usam seu verificador, mesmo que uma checklist antiga apresente
   outro método. Instâncias retiradas exigem reconciliação.
6. Consulte novamente o status após alterações. Preserve notas, relatórios
   citados e histórico. Uma dispensa vigente altera a aplicação da política, mas
   não transforma um resultado desfavorável em aprovação.

Interprete o código de saída junto do relatório: 0 corresponde à política
selecionada, 1 a falhas avaliadas, 2 a entrada ou configuração inválida, 3 a
operação não concluída e 130 a cancelamento. Não conclua uma revisão apenas
porque o processo retornou 0.

### Sequência específica

1. Consulte status sem escrita e selecione regra, categoria ou rota solicitada.
2. Confirme trustedExecution, baseUrl e build atual antes de check de navegador.
3. Diferencie falha avaliada, execução incompleta e revisão manual pendente.
4. Registre revisão humana somente no método manual ou híbrido.
5. Identifique o pacote e o artefato servido por baseUrl. Confira consumidores
   afetados quando a correção atingir um componente compartilhado.
6. Na entrega, separe cobertura efetiva, falhas e partes não executadas; não
   apresente uma amostra de rotas como aprovação integral do site.

### Alteração de implementação existente

Reconcilie catálogo preservando notas e histórico. Alteração de entrada invalida
avaliação anterior; dispensa muda política, não aprova o resultado.

## Verificação

Uma regra manual pendente não pode receber passed por scanner. Sem build atual,
um relatório não deve afirmar validação do HTML publicado.

A checklist corresponde ao escopo avaliado. Pendências e falhas operacionais não
contam como aprovações.

```bash
astrofy check --changed
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
