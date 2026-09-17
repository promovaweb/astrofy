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
