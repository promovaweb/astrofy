# Execução retomável

Cada tarefa da página é uma sitespec com `page` e `task` no front matter
(contrato completo em `docs/sitespec.md`). O agente atualiza esse registro
enquanto trabalha para que você retome em outra conversa. Este capítulo
mostra os comandos do CLI para consultar e atualizar as tarefas pelo
terminal.

## Estados da tarefa

`astrofy apply --status` usa o vocabulário abaixo; internamente, cada um
grava um `status` de sitespec diferente.

| `--status` de `apply` | `status` da sitespec | Significado | Próxima ação permitida |
| --- | --- | --- | --- |
| (tarefa recém-criada) | `draft` | Ainda não começou | Conferir `blockedBy` e iniciar |
| `in_progress` | `in_progress` | Há trabalho em andamento | Continuar passos registrados |
| `completed` | `done` | Checklist inteira marcada | Libera dependentes |
| `failed` | `blocked` | Uma validação falhou | Corrigir e tentar de novo |
| `skipped` | `archived` | Saiu do escopo com justificativa | Manter a justificativa |

Não existe mais um par `pending`/`ready` separado do `status` da tarefa:
`astrofy sitespec list`/`progress` calculam `blockedBy` a partir de
`dependsOn` a cada leitura — uma tarefa `draft` sem `blockedBy` pode
começar; uma tarefa `draft` com `blockedBy` ainda depende de outra.

## Passagem prática

`astrofy plan --slug atlas` grava a tarefa `route` como sitespec:

```yaml
status: draft
dependsOn: []
relatedFiles:
  - src/pages/produtos/atlas.astro
```

Ao iniciar, a skill relê a rota, registra os arquivos observados e muda o
status para `in_progress`:

```bash
astrofy apply --slug atlas --task route --status in_progress
```

Depois de editar, executa as validações da checklist e faz a revisão manual
indicada. Só então registra a conclusão — isso marca `status: done` e cada
item da checklist como `[x]`:

```bash
astrofy apply --slug atlas --task route --status completed
```

Se uma validação falhar, registre `failed` em vez de `completed`; a tarefa
vai para `status: blocked` e a dependente continua com `blockedBy` não
vazio. Uma nova execução volta à tarefa com falha antes de avançar:

```bash
astrofy apply --slug atlas --task route --status failed
astrofy apply --slug atlas --task route --status completed
```

Ao concluir uma tarefa, a dependente perde a entrada correspondente em
`blockedBy` automaticamente — não é um campo gravado, é calculado a cada
leitura. Sem `--task`, `astrofy apply --slug atlas` escolhe a tarefa em
`in_progress`, ou a primeira `draft` sem `blockedBy`.

## Retomada em outra sessão

1. Confira `git status` e os arquivos alterados.
2. Execute `astrofy page status --slug atlas` e leia `page-spec.json`.
3. Execute `astrofy sitespec list --json` (ou `sitespec progress`) e filtre
   as tarefas com `page: atlas` para localizar a próxima.
4. Localize tarefas `in_progress` ou `blocked`.
5. Confirme se os arquivos ainda correspondem ao registro.
6. Continue a tarefa e repita suas validações.
7. Atualize o estado com `astrofy apply` e confirme que a dependência saiu
   de `blockedBy` da próxima tarefa.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Estados, execução e retomada das tarefas técnicas |
| Autoridade | Contrato de sitespec e `astrofy-implementation-planner` |
