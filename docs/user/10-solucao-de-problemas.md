# Solução de problemas

## O projeto não é reconhecido

Execute `astrofy inspect --root <diretório>` apontando para a pasta que
contém o `package.json` do site. Confira se `astro` aparece em
`dependencies` ou `devDependencies` desse arquivo — essa é a única
condição que o Astrofy usa para decidir que um diretório é um projeto
Astro válido. Se o comando for executado dentro de um subdiretório do
projeto (como `src/pages/`), a descoberta sobe pelos diretórios pais até
encontrar esse manifesto; `--root` explícito pula essa busca e aponta
direto para a raiz.

## O setup encontrou JSON inválido

Abra o caminho informado na mensagem, corrija a sintaxe e repita
`astrofy init --dry-run` para confirmar a correção antes de gravar. O
comando preserva arquivos existentes deliberadamente e interrompe a
gravação quando não consegue interpretá-los — ele nunca sobrescreve uma
configuração corrompida com um padrão novo, porque isso poderia apagar
uma personalização que só está temporariamente malformada.

## O tipo de página ficou ambíguo

Informe a finalidade principal e a ação esperada primeiro — essas duas
respostas são o que a orquestradora (capítulo 2) usa para escolher a
especialista certa entre as sete disponíveis. Necessidades secundárias
(uma tabela de preços dentro de uma página de produto, por exemplo) não
precisam de ambiguidade: registre-as como requisito complementar depois
que o tipo principal estiver definido, em vez de tentar encaixar o
pedido em dois tipos ao mesmo tempo.

## A implementação divergiu do conteúdo aprovado

Pare a tarefa antes de continuar — não siga implementando sobre uma
divergência já percebida. Compare a página atual com `page.md` e
`page-spec.json` da página (capítulo 2) linha por linha, não só por
impressão geral, e corrija a implementação para voltar a corresponder ao
que foi aprovado. Se a divergência na verdade revela que o conteúdo
aprovado estava errado ou incompleto, a correção certa é voltar à etapa
de conteúdo (capítulo 3) e aprovar a mudança lá — nunca ajustar o texto
só na implementação, porque isso deixa `page-spec.json` e o código
dizendo coisas diferentes.

## O plano ficou desatualizado

Execute `astrofy plan --slug <slug>` depois de reler o projeto e a
especificação atual. O comando reconcilia as tarefas existentes em vez
de recriá-las do zero — `status`, itens de checklist já marcados e o
`id` de cada tarefa são preservados; o que é atualizado é o texto,
a skill responsável e as dependências, a partir do `page-spec.json`
atual (capítulo 4 detalha exatamente o que muda e o que não muda nessa
reconciliação). Não exclua manualmente os arquivos em `.sitespec/` antes
de reexecutar: isso descartaria progresso que o comando preservaria por
conta própria. Se você precisar consultar o histórico de tarefas
concluídas numa versão anterior do plano, use o histórico do Git sobre
esses arquivos — eles são texto versionável, não um estado opaco.

## Uma tarefa não sai de `blocked`

Confira o `blockedReason` registrado no front matter da sitespec — ele
descreve a causa específica do bloqueio, não um estado genérico. Se a
causa já foi resolvida, registre `astrofy apply --slug <slug> --task
<task> --status completed` (ou `in_progress`, se o trabalho ainda não
tiver terminado) para seguir adiante; o comando aceita a transição de
`blocked` para `in_progress` especificamente para permitir essa nova
tentativa. Se a causa for uma dependência de outra tarefa ainda não
concluída, confira `blockedBy` em vez de `blockedReason` — são conceitos
diferentes: `blockedReason` é um impedimento que a própria tarefa
registrou; `blockedBy` é calculado automaticamente a partir de
`dependsOn` e não precisa de nenhuma ação manual além de concluir a
predecessora.

## O Chromium não está disponível

Consulte a instalação controlada pelo Astrofy, que mantém o binário fora
do processo de `npm install` do próprio pacote para não forçar esse
download em quem nunca vai rodar checks de navegador:

```bash
astrofy browser status
astrofy browser install
```

Depois execute `astrofy check --browser`. No CI, mantenha o cache
indicado no workflow distribuído para evitar baixar o Chromium a cada
execução — o download sozinho pode custar mais tempo que o restante da
suíte de verificação.

## A migração pendente deve falhar no CI

Use o modo de conferência, que não grava nada e serve justamente para
decidir se um pipeline deve interromper antes de continuar:

```bash
astrofy migrate --check
```

O comando retorna código 1 quando o contrato do projeto ainda está numa
versão anterior e precisa de migração, e código 0 quando a configuração
já usa a versão atual. `astrofy migrate --apply` é a única forma de de
fato aplicar a migração — `--check` nunca escreve um arquivo.

## O ebook não confere

Na raiz do Astrofy (não dentro de um projeto que consome o pacote),
execute:

```bash
npm run ebook
npm run ebook:verify
```

O primeiro comando recompila PDF, EPUB e o manifesto `build.json` a
partir dos capítulos atuais de `docs/user/`. O segundo compara a edição
já gerada com todos os capítulos e arquivos do pipeline, byte a byte —
ele existe para detectar o caso em que alguém editou um capítulo e
esqueceu de regenerar o ebook antes de publicar uma versão nova.

## `astrofy setup` está lento

Se a execução parece demorar mais do que o esperado num projeto grande,
confira se `.astrofy/cache/file-hashes.json` existe e está sendo
atualizado — esse cache evita reler e recalcular o hash de todo o
projeto a cada execução, reaproveitando o hash de um arquivo cujo
`mtime` e tamanho não mudaram desde a última leitura. Um cache ausente
(primeira execução, ou depois de limpar `.astrofy/cache/`) explica uma
primeira execução mais lenta; execuções seguintes no mesmo projeto
devem ser bem mais rápidas. O cache é descartável por natureza: se ele
estiver corrompido ou vier de outra máquina, a próxima execução só o
reconstrói, sem interromper o setup.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Referência |
| Escopo | Falhas comuns no fluxo e no ebook |
| Autoridade | Comandos e contratos distribuídos pelo Astrofy |
