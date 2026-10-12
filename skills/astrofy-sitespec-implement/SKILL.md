---
name: astrofy-sitespec-implement
description:
  Executa uma tarefa de .sitespec/ com a skill principal declarada e
  atualiza o SITEPEC.md a cada item concluído, nota registrada ou mudança
  de estado.
---

# Implementar sitespec

## Entradas

Leia `docs/sitespec.md` na raiz do pacote Astrofy para o contrato do arquivo.
Rode `astrofy sitespec list --json` e localize a tarefa pelo `id` ou `slug`
pedido. Leia o `SITEPEC.md` dela por completo: `## Descrição`, cada item da
`## Checklist` com seu `{#id}` e skill, e `## Notas`.

Se a tarefa tiver `blockedBy` não vazio no resultado de
`astrofy sitespec list --json`, confirme com quem pediu a execução se faz
sentido avançar mesmo assim antes de continuar.

## Execução

1. Se `status` ainda for `draft`, mude para `in_progress` e atualize
   `updatedAt` para o momento atual antes de começar a executar itens.
2. Execute cada item da checklist, na ordem em que aparecem, usando a skill
   marcada no item (ou `primarySkill`, quando o item não tem tag própria).
3. Depois de concluir um item, edite a linha dele de `- [ ]` para `- [x]`
   pelo `{#id}`, sem alterar o texto nem o id. Atualize `updatedAt`.
4. Registre em `## Notas` uma linha datada por decisão relevante, bloqueio
   encontrado ou desvio do que a `## Descrição` previa. Não é preciso uma
   nota por item concluído sem incidente.
5. Se um item revelar que a tarefa não pode continuar por dependência
   externa (credencial, decisão de outra pessoa, recurso indisponível),
   mude `status` para `blocked`, escreva `blockedReason` com a causa
   específica e pare — não force os itens restantes.
6. Quando todo item da checklist estiver `[x]`, mude `status` para `done` e
   atualize `updatedAt`. Uma tarefa com item pendente nunca fica `done`.
7. Se a tarefa deixar de fazer sentido (duplicada, decisão de não fazer),
   mude `status` para `archived` com `archivedReason`, mesmo com itens
   pendentes.

### Sequência específica

1. Confirme dependências pendentes antes de começar.
2. Marque cada item assim que ele termina, não em lote ao final.
3. Toda mudança de `status` ou de item atualiza `updatedAt`.
4. `done` exige 100% da checklist marcada; sem exceção.

### Alteração de implementação existente

Reexecutar um item já marcado `[x]` não deve desmarcá-lo sem motivo
registrado em `## Notas`. Se a execução anterior estava errada, desmarque,
explique por quê na nota e trate como trabalho pendente de novo.

## Verificação

`astrofy sitespec list --json` depois da edição precisa mostrar a tarefa
ainda em `items` (nunca em `errors` — uma edição não pode deixar o arquivo
inválido), com `progress` refletindo os itens marcados e `status` coerente
com o progresso.

```bash
astrofy sitespec list --json
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a
saída.
