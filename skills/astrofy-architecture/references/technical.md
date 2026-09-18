# Referência técnica de astrofy-architecture

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia src/pages, layouts usados, aliases do tsconfig.json e consumidores
encontrados pelos imports.

Trace uma rota até seu layout, componentes, configuração e conteúdo. Distinga
execução no servidor, build e navegador. Registre a função de cada fronteira,
incluindo ilhas existentes.

## Alteração compatível

Extraia um trecho repetido em duas rotas antes de ampliar a refatoração. Compare
URLs, headings e imports antes e depois; preserve diretórios personalizados.

## Diagnóstico

Mover um layout sem atualizar um consumidor deve falhar no build. O cenário
corrigido precisa renderizar ambas as rotas com os mesmos títulos.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                     | Método      | Escopo    | Verificação                                   |
| ------------------------- | ----------- | --------- | --------------------------------------------- |
| `architecture.map`        | `hybrid`    | `project` | Arquitetura e responsabilidades documentadas. |
| `architecture.imports`    | `automatic` | `project` | Imports e aliases resolvem.                   |
| `architecture.boundaries` | `hybrid`    | `project` | Dependências respeitam limites estabelecidos. |

## Mapa de arquitetura

Em Astro 7, arquivos de src/pages definem rotas. Layout recebe estrutura comum;
componente encapsula UI; ilha pode conter estado do cliente. Mantenha segredos
no servidor. Uma consulta pública pode ocorrer no navegador quando a interação
exigir; documente esse caminho. Propague apenas dados serializáveis até a ilha.

Antes de mover arquivo, procure imports estáticos, imports MDX, aliases de
tsconfig e imports dinâmicos. Conserve o caminho público da rota e verifique a
saída do build após cada grupo movido.

## Responsabilidade e instante de execução

Registre para cada fonte de dados quando ela é consultada: build, requisição
ou navegador. Fetch no frontmatter de página prerenderizada captura dados na
geração; não atualiza a página publicada a cada visita. Mover esse código para
layout compartilhado pode multiplicar chamadas ou mudar a superfície afetada.

Mantenha a escolha de status HTTP, redirects e composição da página próxima
da rota. Um módulo de acesso a dados retorna dados ou falhas tipadas; não precisa
conhecer o componente visual. Injete apenas o contexto necessário em helpers
para evitar dependência implícita de cookies ou estado global do processo.

Em SSR, não guarde usuário atual ou dados privados em variável mutável de módulo.
O processo pode atender várias requisições. Diferencie cache público reutilizável
de estado por visitante antes de extrair código comum.

## Fronteiras de imports

Trace imports transitivos de scripts e componentes hidratados. Um arquivo
chamado server.ts não é isolado do cliente apenas pelo nome. Separe módulos
que usam credenciais e dependências de runtime daqueles compartilhados com UI.
Evite barrel que reexporta lógica de servidor para facilitar imports no cliente.

Imports de tipos podem ser compartilhados sem transportar implementação quando
usados como import type. Isso não substitui inspeção do bundle nem validação
dos dados recebidos. Documente também módulos com efeitos ao importar: conexão,
registro de listener e leitura de ambiente não são funções puras.

Não force hidratação de todo o layout por causa de um controle interativo.
Delimite a ilha e suas props. Para conteúdo estático composto com framework,
confira slots e children antes de migrar a página inteira para React.

## Extração e movimentação

Repetição entre consumidores é uma razão para extração, mas não a única. Um
módulo com uma responsabilidade independente também pode ter um único consumidor.
Justifique a extração pelo contrato e pela mudança esperada, sem impor camadas
vazias ou contagem arbitrária de consumidores.

Antes de mover componentes, confira imports, globs de conteúdo, CSS relativo,
assets e referências MDX. Antes de mover páginas, confira a mudança de URL.
Diretórios layouts e components são convenções organizacionais; pages participa
do roteamento e não pode ser reorganizado como pasta comum sem avaliar as rotas.

## Fontes

- [Estrutura do projeto](https://docs.astro.build/en/basics/project-structure/):
  diretórios de roteamento, código processado e assets públicos.
- [Data fetching](https://docs.astro.build/en/guides/data-fetching/): consulta
  no frontmatter e diferença entre geração estática e execução por requisição.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para architecture](https://docs.astro.build/en/basics/layouts/):**
  props e slots do layout; consulte ao extrair estrutura compartilhada entre
  rotas.
- **[Renderização sob demanda](https://docs.astro.build/en/guides/on-demand-rendering/):**
  prerender, modo servidor e adaptador; consulte antes de alterar a execução de
  rotas.

## Refatoração guiada por consumidores

Registre uma tabela com rota, arquivo de página, layout, componentes,
configuração e origem do conteúdo. Uma mesma página pode combinar HTML estático
com ilhas; mover uma ilha para o layout pode alterar hidratação e estado em
todas as rotas. Leia a diretiva client e o fluxo de props antes.

Use um caso pequeno: duas páginas repetem a estrutura html, head e body, mas
possuem títulos próprios. Extraia essa estrutura para um layout com prop title e
slot padrão. Migre as duas páginas, preserve seus caminhos e compile. No HTML
final, confira um único documento html, título específico em cada rota, conteúdo
do slot e o mesmo destino dos links anteriores. Preserve meta charset e viewport
no layout extraído. Um título com acento deve continuar com a mesma grafia no
DOM; teste também a codificação do HTML.

Se uma das páginas for MDX, confirme como a versão instalada aplica layouts e
passa frontmatter. Não copie automaticamente o contrato de uma página Astro. Se
existir renderização de servidor, confira o adaptador antes de mover lógica que
usa Request, cookies ou variáveis de ambiente.

A revisão final compara comportamento e responsabilidades. A criação de uma
pasta layouts não prova que a estrutura melhorou; o resultado deve mostrar quais
repetições foram removidas e quais consumidores ficaram mais simples.

## Fontes para fronteiras de renderização

- **[Layouts](https://docs.astro.build/en/basics/layouts/):** estrutura comum,
  composição e diferenças de consumo por páginas Astro, Markdown e MDX.
- **[Renderização sob demanda](https://docs.astro.build/en/guides/on-demand-rendering/):**
  confira dependência de adaptador e execução por requisição antes de mover
  lógica.
