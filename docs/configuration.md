# Configuração e estado

A adoção cria oito arquivos em `.astrofy/config/`. Cada arquivo agrupa um
assunto e usa `schemaVersion: "1.0.0"`. Campos desconhecidos e tipos inválidos
são recusados pelo schema local. Mensagens de validação identificam o caminho
do campo sem reproduzir seu valor.

## Estado do setup

`astrofy setup` cria `.astrofy/setup-state.json` depois da adoção incremental.
O arquivo registra a versão do workflow, hashes dos arquivos observados,
`changedFiles` e as 49 etapas com `dependsOn`, `inputs`, `outputs`, `status` e
`updatedAt`. O grafo canônico fica em
`skills/astrofy-setup/references/workflow.json`.
O contrato fechado fica em `packages/schemas/setup-state.schema.json`; campo,
status, hash ou data inválidos interrompem a retomada antes da escrita.

Uma segunda execução conserva os marcos já registrados e compara os hashes.
O agente relaciona `changedFiles` aos consumidores do grafo antes de repetir
uma etapa. `--dry-run` calcula o mesmo estado sem criar arquivos.

As definições conversacionais de páginas ficam em `.astrofy/pages/<slug>/`.
Os planos técnicos correspondentes ficam em `.astrofy/plans/<slug>/`. Esses
arquivos pertencem ao agente e ao fluxo das skills; o comando `setup` apenas
registra suas etapas no grafo e não cria uma página ou aprova conteúdo.

## Arquivos editáveis

| Arquivo | Campos e comportamento |
| --- | --- |
| `project.json` | `projectId` estável, `locale`, `contractVersion`, `adoptionMode` e origem opcional do template. |
| `paths.json` | Caminhos de configuração pública, componentes, layouts, conteúdo, páginas, estilos, tokens, checklist, saída e ativos. |
| `features.json` | Booleanos `blog`, `react`, `i18n` e `forms`. |
| `policies.json` | Severidades que fazem o check falhar, ajustes por regra, exigência de revisão manual e categorias estritas. |
| `skills.json` | Catálogos locais de skills habilitadas e desabilitadas. |
| `checks.json` | Exclusões, preview, timeout, limite de páginas, retenção e execução confiável. |
| `integrations.json` | URLs não secretas de provedores e nomes das variáveis de ambiente das credenciais. |
| `exceptions.json` | Dispensações por regra e escopo, com motivo, responsável e validade. |

Os schemas distribuídos ficam em `packages/schemas/`. Consulte o arquivo
correspondente para os tipos e limites completos. A validação funciona offline.
`page-spec.schema.json` valida a definição conversacional de uma página;
`implementation-plan.schema.json` valida fases, tarefas, dependências,
estimativas e conferências da implementação.

## Seleção e instalação de skills

Em `skills.json`, `enabled` e `disabled` são listas de nomes do catálogo
distribuído. Uma lista `enabled` vazia seleciona todas as skills, exceto as
desabilitadas. Nomes ausentes do catálogo e nomes presentes nas duas listas
são recusados antes da cópia. A opção explícita `--skill` seleciona a skill
daquela instalação; as preferências existentes continuam sendo validadas.

O instalador mantém `.astrofy/config/installed-codex.json` ou
`.astrofy/config/installed-claude.json`, conforme o agente escolhido. Esses
arquivos usam o schema `installed-skills`: versão, agente e hashes SHA-256
dos arquivos instalados. Um manifesto de outro agente, um caminho externo
ou um hash inválido interrompe a instalação sem substituir as skills locais.

O catálogo usa `skill-catalog.schema.json`. Cada nome precisa ser único,
com título e descrição. Ambos os schemas são distribuídos com o pacote e
validados localmente, sem acesso à rede.

## Política da execução

Os padrões do framework são preenchidos durante init. A configuração do
projeto define severidades e exigências. Uma exceção válida pode dispensar uma
falha da política de término, mas o estado encontrado continua `failed`.
Filtros da linha de comando selecionam o escopo da execução e não reescrevem a
configuração persistente.

`adoptionMode` aceita `incremental` ou `strict`. A política padrão considera
`critical` e `error` para o código de saída. `requireManual` é falso por padrão.
Quando ativado, uma pendência exigida pela política retorna código 3.

`checks.timeoutMs` começa em 10000, `maxPages` em 200 e `retention` em 30.
`trustedExecution` começa em falso e `baseUrl` em null. Uma operação que exige
preview informa a ausência dessas condições, sem apresentar aprovação.

## Checklist

O catálogo de regras distribuído declara `schemaVersion`, `catalogVersion`
e `rules`. O schema `rule-catalog.schema.json` fecha os campos de cada regra,
incluindo método, severidade, escopo e recurso opcional. A leitura também
recusa IDs duplicados e uma versão de catálogo incompatível com o verificador.

`astrofy.checklist.json` conserva uma instância por `ruleId`, `scope.type` e
`scope.target`. Cada item inclui método, severidade, resultado e notas. O
histórico preserva avaliações anteriores quando as entradas mudam.

A identidade de uma página ignora a barra final e trata `/index.html` como
o índice da rota. Assim, `/blog`, `/blog/` e `/blog/index.html` selecionam
a mesma instância, inclusive nas dispensas. O filtro de página aceita rotas
locais iniciadas por `/`, sem domínio externo. Caminhos de componentes
consideram equivalentes os separadores de Windows e Unix. IDs de instâncias
existentes são preservados quando a checklist é reconciliada.

A reconciliação atualiza categoria, skill, método, resumo e severidade a
partir do catálogo e da política. Se o método mudar ou uma regra retirada
voltar ao catálogo, a avaliação anterior vai para o histórico e o item
exige nova verificação. Notas e IDs existentes permanecem. Instâncias cujo
tipo de escopo deixou de corresponder à regra ficam retiradas da cobertura;
a aprovação anterior não é transferida para outro tipo de escopo.

`astrofy status` faz essa reconciliação em memória e inclui páginas do build
e componentes encontrados na consulta. Novas instâncias aparecem pendentes,
conforme os recursos habilitados. O comando não executa scripts e não grava
a checklist; a consolidação acontece em `astrofy check`.

Antes da primeira avaliação, itens dispensados por um recurso desabilitado
acompanham sua configuração: habilitar o recurso os torna pendentes.
Essa troca não cria um histórico de avaliação inexistente. Resultados já
registrados continuam sujeitos à invalidação por fingerprint.

| Estado | Uso |
| --- | --- |
| `pending` | Ainda não avaliado ou resultado antigo sem validade atual. |
| `passed` | Verificação concluída com resultado favorável no escopo registrado. |
| `failed` | Verificação concluída com uma ocorrência que precisa de correção. |
| `blocked` | A operação não conseguiu avaliar o escopo. |
| `not_applicable` | Recurso ausente ou escopo dispensado com justificativa. |

Métodos aceitos: `automatic`, `manual` e `hybrid`. A revisão manual não altera
o método original. Ela registra responsável e justificativa, e não pode
substituir a execução de uma regra automática.

O registro de revisão consulta o método no catálogo atual. Alterar esse
campo na checklist não permite aprovar manualmente uma regra automática.
Instâncias retiradas, regras ausentes e tipos de escopo antigos são recusados
antes da gravação. A primeira revisão não cria uma avaliação anterior no
histórico; revisões seguintes conservam o resultado e o responsável anteriores.

A cobertura usa `(passed + failed) / aplicáveis`. A proporção favorável entre
itens avaliados usa `passed / (passed + failed)`. Denominador vazio resulta em
null no JSON e em “sem avaliações” na interface.

## Relatórios e retenção

Relatórios ficam em `.astrofy/reports/<UUID>.json`. Eles registram o comando,
o ambiente, os escopos solicitados e os efetivamente cobertos. Uma execução
parcial atualiza apenas seus itens. `status` verifica a validade em memória e
não grava o resultado da consulta.

O CLI também conserva relatórios de inicialização, instalação de skills,
geração de tokens, importação Brandfy, migração aplicada e verificações de
documentos e links. Esses comandos registram seu próprio escopo e seus
artefatos sem atribuir novas aprovações à checklist. O modo `--dry-run` não
persiste esses relatórios.

A retenção conserva os relatórios mais recentes e todos os relatórios citados
pela checklist ou por seu histórico. Arquivos não reconhecidos permanecem
intactos. Caches podem ser descartados após encerrar as execuções ativas.

A proteção reconhece caminhos equivalentes com `./` e separadores de Windows.
O UUID interno precisa corresponder ao nome do relatório solicitado. Arquivos
com identidade divergente ou JSON não reconhecido são conservados pela limpeza,
e a consulta informa a divergência em vez de exibir outra execução.

## Migração

A primeira migração implementada aceita contrato `0.1.0` e preenche os campos
novos do contrato `1.0.0`. O modo padrão mostra as alterações propostas.
`migrate --apply` aplica os arquivos validados e registra a operação em
`.astrofy/migrations/`. Versões desconhecidas são recusadas.

Antes da primeira escrita, o lote inteiro passa pelos schemas e pelas mesmas
verificações adicionais do carregamento normal: caminhos dentro do projeto,
extensão CSS, checklist na raiz, URLs de integração sem credenciais e prazo
de exceção posterior à criação. Uma recusa nessa etapa preserva todos os
arquivos de configuração e não cria um registro de migração aplicada.
