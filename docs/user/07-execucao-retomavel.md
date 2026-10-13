# Execução retomável

Cada tarefa da página é uma sitespec com `page` e `task` no front matter
(contrato completo em `docs/sitespec.md`, capítulo 8 para o uso geral de
sitespecs). O agente atualiza esse registro enquanto trabalha — não ao
final de tudo, mas a cada transição real — para que você, ou outra
sessão de conversa, consiga retomar exatamente de onde o trabalho parou,
sem depender de lembrar o que já tinha sido feito. Este capítulo mostra
os comandos do CLI para consultar e atualizar essas tarefas pelo
terminal, sem precisar do agente.

## Por que existir um estado por tarefa, e não só "feito"/"não feito"

Uma tarefa técnica real passa por mais situações do que só concluída ou
pendente. Ela pode estar esperando outra terminar, pode estar em
andamento numa sessão anterior que foi interrompida, pode ter sido
tentada e falhado numa validação, ou pode ter sido deliberadamente
descartada. Cada uma dessas situações exige uma ação diferente de quem
retoma o trabalho — continuar, investigar a falha, ou simplesmente
seguir para a próxima tarefa. Por isso o Astrofy registra um estado
específico, não um booleano.

## Estados da tarefa

`astrofy apply --status` usa o vocabulário abaixo — o mesmo desde antes
da unificação com sitespec, para que nenhum script existente precise
mudar. Internamente, cada valor grava um `status` de sitespec diferente;
essa tradução é feita pelo próprio comando, você não escreve o `status`
interno diretamente.

| `--status` de `apply` | `status` da sitespec | Significado | Próxima ação permitida |
| --- | --- | --- | --- |
| (tarefa recém-criada) | `draft` | Ainda não começou | Conferir `blockedBy` e iniciar |
| `in_progress` | `in_progress` | Há trabalho em andamento | Continuar os passos registrados na checklist |
| `completed` | `done` | Checklist inteira marcada | Libera as tarefas dependentes |
| `failed` | `blocked` | Uma validação falhou | Corrigir e tentar de novo |
| `skipped` | `archived` | Saiu do escopo com justificativa | Manter a justificativa registrada |

Versões anteriores do Astrofy usavam um par `pending`/`ready` separado
do `status` em si — uma tarefa era `pending` enquanto dependia de outra,
e virava `ready` quando a dependência terminava, só então podendo passar
para `in_progress`. Isso não existe mais como campo gravado: a mesma
informação é calculada a cada leitura, não armazenada, o que evita que
ela fique desatualizada se alguém editar o arquivo manualmente.
`astrofy sitespec list`/`progress` calculam `blockedBy` a partir de
`dependsOn` toda vez que leem — uma tarefa `draft` sem `blockedBy` pode
começar agora; uma tarefa `draft` com `blockedBy` ainda depende de outra
terminar primeiro.

## Passagem prática, do plano à conclusão

`astrofy plan --slug atlas` (capítulo 4) grava a tarefa `route` como uma
sitespec nova, em `draft`, sem nenhuma dependência:

```yaml
status: draft
dependsOn: []
relatedFiles:
  - src/pages/produtos/atlas.astro
```

Ao iniciar o trabalho, a skill relê a rota esperada, confirma os
arquivos envolvidos e muda o status para `in_progress` — isso é
registrado antes de qualquer edição de código, não depois, para que uma
interrupção no meio do trabalho deixe rastro de que algo estava em
andamento:

```bash
astrofy apply --slug atlas --task route --status in_progress
```

Depois de editar o arquivo, a skill executa as validações listadas na
checklist da tarefa e faz a revisão manual que ela indicar. Só então
registra a conclusão — e esse comando faz duas coisas de uma vez: marca
`status: done` **e** marca cada item da checklist dessa tarefa como
`[x]`. Isso existe porque o contrato de sitespec exige checklist completa
para um item estar `done` (capítulo 8); `apply --status completed` não
deixaria essa regra satisfeita por acidente.

```bash
astrofy apply --slug atlas --task route --status completed
```

Se uma validação falhar, registre `failed` em vez de `completed` — não
force a conclusão para "destravar" a dependente. A tarefa vai para
`status: blocked`, com um motivo registrado automaticamente
(`blockedReason`), e a tarefa dependente continua com `blockedBy` não
vazio, porque a predecessora ainda não está `done`. Uma nova tentativa
depois da correção volta à tarefa com falha antes de avançar — o
Astrofy não deixa uma dependente começar enquanto a predecessora
registrada como falha não for corrigida ou explicitamente contornada:

```bash
astrofy apply --slug atlas --task route --status failed
astrofy apply --slug atlas --task route --status completed
```

Ao concluir uma tarefa, a dependente perde a entrada correspondente em
`blockedBy` automaticamente, na próxima leitura — isso não é um campo
que alguém precisa limpar manualmente, é recalculado. Sem `--task`,
`astrofy apply --slug atlas` escolhe por conta própria: primeiro procura
uma tarefa já `in_progress` (para continuar o que estava em andamento
antes de começar algo novo); se não houver, escolhe a primeira `draft`
sem `blockedBy`.

## Retomada em outra sessão

Quando você volta a uma conversa ou abre o terminal depois de um tempo,
siga esta sequência — ela existe para reconstruir o contexto antes de
agir, não para agir primeiro e descobrir o contexto depois:

1. Confira `git status` e os arquivos alterados — o disco é a fonte de
   verdade, não a memória da conversa anterior.
2. Execute `astrofy page status --slug atlas` e leia `page-spec.json`
   para confirmar que o conteúdo aprovado não mudou enquanto você estava
   fora.
3. Execute `astrofy sitespec list --json` (ou `sitespec progress`) e
   filtre as tarefas com `page: atlas` para localizar a próxima com
   trabalho pendente.
4. Localize tarefas `in_progress` ou `blocked` — são as que precisam de
   atenção imediata, diferente de uma `draft` ainda esperando dependência.
5. Confirme se os arquivos no disco ainda correspondem ao que o registro
   da tarefa descreve; alguém pode ter editado algo fora do fluxo do
   Astrofy nesse intervalo.
6. Continue a tarefa e repita as validações da checklist — não assuma
   que uma validação passada antes continua válida sem reexecutar.
7. Atualize o estado com `astrofy apply` e confirme que a dependência
   saiu de `blockedBy` da próxima tarefa, antes de considerar a página
   pronta para a próxima etapa.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Estados, execução e retomada das tarefas técnicas |
| Autoridade | Contrato de sitespec e `astrofy-implementation-planner` |
