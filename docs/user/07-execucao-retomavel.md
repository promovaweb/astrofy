# Execução retomável

Cada tarefa do plano possui identificador estável, dependências, status,
arquivos, passos e validações. O agente altera o status junto com o trabalho,
para que a próxima sessão encontre o ponto correto de retomada.

## Estados da tarefa

| Estado | Significado | Próxima ação permitida |
| --- | --- | --- |
| `pending` | Depende de outra tarefa ou informação | Resolver a dependência |
| `ready` | Pode começar | Conferir arquivos e iniciar |
| `in_progress` | Há trabalho em andamento | Continuar passos registrados |
| `completed` | Resultado e validações foram conferidos | Liberar dependentes |
| `failed` | Uma validação falhou | Corrigir e executar novamente |
| `skipped` | Saiu do escopo com justificativa | Manter a justificativa |

## Passagem prática

Uma tarefa começa assim:

```json
{
  "id": "product-route",
  "status": "ready",
  "dependsOn": [],
  "files": ["src/pages/produtos/atlas.astro"],
  "validations": ["npm run check", "npm run build"]
}
```

Ao iniciar, a skill relê a rota, registra os arquivos observados e muda o
status para `in_progress`. Após editar, executa todas as validações listadas e
faz a revisão manual indicada pelo plano. Somente então registra:

```json
{
  "id": "product-route",
  "status": "completed",
  "completedAt": "2026-09-18T16:00:00.000Z",
  "validationResults": [
    { "command": "npm run check", "status": "passed" },
    { "command": "npm run build", "status": "passed" }
  ]
}
```

Se um comando falhar, o status passa para `failed` e recebe a mensagem útil
para a correção. A tarefa dependente continua pendente. Uma nova execução volta
à tarefa com falha antes de avançar.

## Retomada em outra sessão

1. Confira `git status` e os arquivos alterados.
2. Leia `page-spec.json` e `implementation-plan.json`.
3. Localize tarefas `in_progress` ou `failed`.
4. Confirme se os arquivos ainda correspondem ao registro.
5. Continue a tarefa e repita suas validações.
6. Atualize o plano e libere as dependências concluídas.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Estados, execução e retomada das tarefas técnicas |
| Autoridade | Schema do plano e contrato do planner técnico |
