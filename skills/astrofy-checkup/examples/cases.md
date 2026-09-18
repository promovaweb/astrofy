# Casos de executar check-up

## Uso comum

Execute somente links.broken na rota /blog/exemplo/ e confira o relatório gerado.

## Projeto existente

Um resultado antigo perde validade após alterar o header. Registre nova revisão nas páginas afetadas.

## Erro recorrente

Não transforme uma dispensa temporária em passed. A exceção muda a política, não o resultado encontrado.

## Conferência

A checklist corresponde ao escopo avaliado. Pendências e falhas operacionais não contam como aprovações. Use `astrofy check --changed` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** policies.json, checks.json, paths.json, checklist e relatórios citados.
- **Alteração sob teste:** Reconcilie catálogo preservando notas e histórico. Alteração de entrada invalida avaliação anterior; dispensa muda política, não aprova o resultado.
- **Falha e resultado esperado:** Uma regra manual pendente não pode receber passed por scanner. Sem build atual, um relatório não deve afirmar validação do HTML publicado.
- **Comando complementar:** `astrofy check --changed`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Consulta sem escrita e revisão pendente

Guarde os bytes da checklist e execute status. A consulta não deve alterá-los.
Selecione uma regra manual existente no catálogo e execute seu check. Leia o
resultado e confirme que a ausência de revisão humana não produz passed.

```bash
astrofy status --root apps/site --json
astrofy report --root apps/site --markdown --output .astrofy/reports/resumo.md
```

A exportação Markdown exige --output. Confira o arquivo gerado e a presença
das pendências. Para registrar uma revisão real, use a TUI, identifique quem
revisou e descreva o elemento observado. Não altere o método no JSON para
permitir aprovação manual de uma regra automática.
