# Arquitetura e integridade de escrita

O pacote npm contém o CLI compilado, os schemas locais e a biblioteca de
skills. A pasta `.astrofy/` pertence ao site adotante. Ela conserva a política
do projeto e os documentos usados durante o trabalho.

## Pacotes internos

| Diretório | Responsabilidade |
| --- | --- |
| `packages/core` | Descoberta, configuração, checklist, relatórios e instalação local. |
| `packages/cli` | Parsing de argumentos, saída textual, JSON e TUI. |
| `packages/schemas` | Schemas JSON 2020-12 e validação offline com Ajv. |
| `packages/design-system` | Resolução tipada e geração determinística de CSS. |
| `packages/checks` | Leitura de HTML, MDX e verificadores por regra. |
| `packages/adapters` | Compatibilidade e importação do formato Brandfy observado. |

Os componentes Astro e o conteúdo do template permanecem no projeto
`astrofy-template`. O pacote do framework não importa componentes desse site.

## Entrada do executável

O CLI compara os caminhos reais do módulo e do executável informado pelo Node.
Isso permite executar o atalho global do npm, inclusive por links simbólicos,
sem iniciar comandos quando outro módulo apenas importa as funções do CLI.
O teste usa um caminho com espaços e um link de diretório, ou junction no
Windows, e confere que a ajuda produz saída.

## Raiz e caminhos

A descoberta sobe a partir do diretório atual até encontrar um manifesto que
declare Astro. A opção `--root` seleciona um diretório exato. Caminhos da
configuração são relativos a essa raiz e passam pela resolução de ancestrais
e links simbólicos. Destinos fora do projeto são recusados.

A inspeção lê manifests e lockfiles como texto. Ela não importa
`astro.config.*` nem módulos TypeScript do site. Versões instaladas são lidas
nos manifests das dependências e comparadas com as faixas implementadas.

## Escrita e concorrência

As operações mutáveis usam `.astrofy/cache/write.lock`, com PID, host e um
identificador da execução. Um processo vivo mantém exclusividade sobre a
consolidação. Um arquivo temporário no mesmo diretório recebe os bytes, passa
por sincronização e substitui o destino por rename.

O relatório da execução é escrito antes da checklist que o referencia. Uma
interrupção entre essas duas escritas conserva um relatório separado e a
checklist anterior. Repita a verificação para consolidar o estado atual.

Um lock ilegível ou pertencente a outro host exige inspeção operacional. Confira
o PID e o host registrados e só remova o arquivo após comprovar que a execução
terminou. Não remova o lock de um processo vivo.

`astrofy setup` lê e grava `.astrofy/cache/file-hashes.json`, um cache
descartável de hash por arquivo indexado por `mtime` e tamanho. Isso evita
reler e recalcular hash de todo o projeto a cada execução quando a maioria
dos arquivos não mudou desde a última. O cache não participa de nenhum
schema fechado; uma leitura corrompida apenas reconstrói os hashes afetados.

## Importação sob demanda

O Playwright (`checks/browser.ts`, `core/browser-manager.ts`) e a cadeia de
Markdown/MDX usada por `docs check` (`checks/markdown.ts`, via
`checks/evaluate.ts`) são importados dinamicamente, só quando o comando
executado de fato precisa deles. Um `import` estático no topo de
`packages/cli/index.ts` ou `packages/core/runner.ts` carrega esse peso em
toda invocação do CLI, inclusive `--help` e o painel padrão; mantenha essas
duas dependências atrás de `await import(...)` dentro da função que as usa.

## Processos e rede

A opção `checks.trustedExecution` autoriza executar scripts do site durante os
checks que dependem de build ou tipos. O processo recebe argumentos separados
e não usa interpolação shell no framework. Scripts do próprio projeto podem
executar os comandos declarados no manifesto.

Os scripts necessários são concluídos antes da leitura final do HTML e do
cálculo dos fingerprints. Rotas criadas pelo build entram na mesma execução.
Se o build falhar, verificações que dependem de sua saída não aprovam o HTML
anterior. Em `--dry-run`, scripts do projeto não são executados, mesmo quando
`checks.trustedExecution` estiver habilitado.

A regra `mdx.schema` usa o build para aplicar o schema real das coleções do
site. Sem autorização para executar o projeto, ela informa que a validação
não foi concluída. Os checks estáticos de datas e rascunhos complementam
essa validação ao comparar os arquivos de conteúdo com as rotas publicadas.

A checklist gerada não participa dos fingerprints: gravar o resultado de
uma verificação não invalida esse mesmo resultado na consulta seguinte.

O scanner de links locais confere âncoras tanto nas rotas limpas quanto nos
endereços explícitos dos arquivos HTML publicados. Destinos de assets precisam
ser arquivos; um diretório vazio não comprova uma página disponível. Segmentos
codificados que escapariam da pasta publicada são recusados. Links de outra
origem permanecem fora dessa verificação local.

A verificação da documentação lê Markdown e MDX por AST. Headings com
formatação, títulos Setext e repetições usam `github-slugger` 2.0.0 para
formar as âncoras. Títulos escritos dentro de blocos de código não entram
nessa lista. URLs com codificação inválida recebem diagnóstico sem impedir
a conferência dos demais links. Expressões MDX dinâmicas não são executadas
para calcular o texto de um heading.

A substituição de links confirma no AST que a ocorrência editada corresponde
ao destino. URLs repetidas no texto visível, no título do link ou em código
permanecem intactas. O modo de simulação não grava e repetir uma substituição
já aplicada não altera novamente o arquivo.

A verificação em navegador usa `checks.baseUrl`. As requisições ficam
restritas à origem configurada, com métodos GET e HEAD. O check não submete
formulários. Em modo offline, previews locais continuam disponíveis e destinos
remotos recebem avaliação não concluída.

WebSockets e service workers ficam desativados no contexto de teste, pois
não passam pela interceptação HTTP comum. A suíte usa servidores locais
temporários para conferir que POSTs e requisições a outra origem não chegam
aos destinos, enquanto os GETs permitidos continuam funcionando.

O log dos scripts do site não é copiado para os relatórios, pois pode conter
credenciais. O relatório registra o comando e seu código de término.

Relatórios ocultam valores em campos reconhecidos de senha, token, chave de
API e autorização. Também ocultam credenciais em URLs HTTP, cabeçalhos Bearer,
atribuições textuais desses campos e blocos PEM de chave privada. O marcador
é `[OCULTO]`. A proteção se aplica à gravação, releitura, exportação e saída
do CLI, sem reescrever as fontes ou configurações. Nomes como `credentialEnv`
continuam disponíveis para identificar a variável usada pela integração.

Essa identificação cobre os formatos implementados, não qualquer sequência
arbitrária que possa representar um segredo. Mantenha credenciais fora de
notas e texto livre.

Timeout e cancelamento encerram a árvore iniciada pelo gerenciador. Em Linux
e macOS, o processo usa um grupo próprio: recebe SIGTERM e, após 500 ms,
SIGKILL para os descendentes restantes. Em Windows, o encerramento usa
`taskkill.exe` com argumentos separados e sem shell. A operação aguarda esse
encerramento antes de retornar e liberar o lock. Os testes usam um descendente que ignora SIGTERM e verificam que ele deixou
de escrever antes de liberar o lock. A mesma suíte faz parte dos jobs de
Linux, Windows e macOS; consulte os resultados da CI da versão utilizada.

## Métricas locais

Cada relatório inclui `metrics.startedAt`, `metrics.completedAt`,
`metrics.durationMs` e contadores em `metrics.stages`. O setup mantém as últimas
50 execuções em `setup-state.json`, com duração, retomada e arquivos alterados.
Esses dados ajudam a localizar etapas lentas e permanecem no projeto.

## Planejamento retomável de páginas

`page create` inicia uma entrevista própria para vendas, produto, serviço,
Home, Sobre, Contato ou Preços. O estado fica em
`.astrofy/pages/<slug>/interview.json`. Até três perguntas pendentes são
retornadas por vez, e respostas anteriores permanecem disponíveis na retomada.

Quando a entrevista fica pronta, `page-spec.json` registra conteúdo, ações,
mídia, comportamentos, SEO, integrações, acessibilidade e testes. `plan`
transforma esse contrato em sitespecs (`route`, `content`, `check`) no
mesmo diretório `.sitespec/` das tarefas pontuais, com `page` e `task` no
front matter ligando cada uma de volta à página; reexecutar reconcilia sem
perder `status` nem itens de checklist já marcados. `apply` atualiza a
tarefa atual e libera dependentes concluídas (via `blockedBy`, calculado a
partir de `dependsOn`), sem substituir a execução técnica da skill associada.

## Migração de contratos

`astrofy migrate --check` retorna código 1 quando o contrato precisa de
atualização e não grava arquivos. O modo padrão apresenta o plano; `--apply`
continua sendo a única forma de aplicar a migração. Versões sem percurso
registrado são recusadas antes da escrita.

## Conteúdo do manual do usuário

Cada capítulo de `docs/user/` precisa ser explicativo, não uma lista de
bullets reduzida ao mínimo. Isso é regra, não preferência pontual de uma
edição: toda alteração que crie ou reescreva um capítulo do manual aplica os
pontos abaixo antes de considerar o trabalho concluído.

- Explique o porquê do mecanismo, não só o passo. Diga por que o Astrofy
  separa entrevista de plano, por que `blockedBy` é calculado e não gravado,
  por que uma skill pergunta ou deixa de perguntar — a pessoa que lê o
  manual pela primeira vez precisa entender a intenção, não só reproduzir
  comandos.
- Inclua pelo menos um percurso completo e concreto por capítulo central
  (instalação, planejamento, entrevista, plano, execução, sitespec,
  execução retomável): um pedido real, a sequência de comandos ou decisões,
  e o resultado observável nos arquivos do projeto. Um capítulo sem nenhum
  percurso de ponta a ponta está incompleto.
- Cubra o caminho feliz e pelo menos um desvio real: o que acontece quando
  a entrevista fica ambígua, quando uma validação falha, quando a
  especificação muda depois do plano gerado, quando um comando é chamado
  sem o contexto esperado. Não descreva só o cenário em que tudo funciona
  de primeira.
- Mantenha as tabelas de estado, contrato e comando — elas são a referência
  rápida —, mas acompanhe cada uma de prosa que explique a transição ou o
  campo, não deixe a tabela sozinha como única explicação.
- Use exemplos com valores reais do domínio do Astrofy (slugs, rotas,
  rule IDs, nomes de skill existentes no catálogo), nunca um placeholder
  genérico como `<valor>` quando um exemplo concreto comunica melhor.
- Depois de reescrever um capítulo, releia como alguém que nunca usou o
  Astrofy: se uma frase faz sentido só para quem já sabe o resultado, ela
  precisa de mais contexto, não de corte.

Um capítulo curto porque o assunto é genuinamente pequeno (por exemplo, uma
etapa de duas linhas de comando sem decisão nenhuma) não precisa de
enchimento artificial. A regra é contra superficialidade, não a favor de
tamanho por si só — mas a maioria dos capítulos deste manual tem decisão,
estado e consequência o suficiente para merecer o tratamento completo acima.
