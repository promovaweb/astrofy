# Biblioteca de skills do Astrofy

O Astrofy distribui 49 skills para agentes trabalharem em projetos Astro
existentes. Cada skill reúne um procedimento, referências técnicas e casos
práticos. O agente lê essas instruções e executa o trabalho solicitado sobre os
arquivos do projeto. Instalar uma skill apenas disponibiliza esses arquivos; a
execução ocorre quando você solicita o trabalho ao agente.

## Instalação e atualização

Execute os comandos na raiz do site ou informe `--root` com o caminho do
projeto. Escolha `codex` ou `claude` em `--agent`. Sem `--skill`, a instalação
inclui as 49 skills; para selecionar algumas, use nomes separados por vírgula.

```bash
astrofy skills list
astrofy skills install --agent codex --dry-run
astrofy skills install --agent codex
astrofy skills install --agent claude --skill astrofy-themes
astrofy skills install --agent codex --root apps/site --skill astrofy-init,astrofy-config
```

O primeiro comando lista o catálogo disponível. O dry-run mostra o destino antes
da escrita. Codex recebe os arquivos em `.agents/skills/`; Claude, em
`.claude/skills/`. O CLI não instala skills globalmente. O manifesto registra
hashes por arquivo e a atualização recusa sobrescrever arquivos personalizados.
Confira as diferenças locais antes de tentar atualizar. Consulte os
[parâmetros do CLI](cli.md#astrofy-skills-install).

## Como solicitar uma execução

Cada `SKILL.md` identifica arquivos de entrada, operação técnica, alteração de
implementação existente e verificação. `references/technical.md` relaciona as
regras reais do catálogo, seus métodos e as APIs consultadas.
`examples/cases.md` descreve casos válidos e falhas a reproduzir em cópias de
teste. As referências ficam dentro de cada skill para permitir instalação
individual. Consulte a [validação dos procedimentos](skills-validation.md) para
executar os testes e conhecer sua cobertura.

As skills técnicas centrais incluem implementation.md para Astro 7. Esses guias
cobrem atualização para Vite 8, ambiente tipado, Content Layer, roteamento por
arquivos, ilhas React, limites de execução, artefatos de build, testes de
runtime, processamento de imagens e contratos de componentes. Leia esse arquivo
junto da referência técnica ao atuar em init, config, routing, mdx, react,
security, build-deploy, testing, images ou components.

Na conversa com o agente que acessa o projeto, informe o nome da skill, a raiz
do site, o escopo e o resultado desejado. Por exemplo:

> Use astrofy-themes neste projeto. Confira light, dark e system no cabeçalho e
> na página inicial, preserve o seletor existente e teste a persistência após
> recarregar a página.

Esse texto é uma solicitação ao agente. Os comandos `astrofy check` apresentados
nas fichas fazem verificações do framework; eles não executam a skill inteira.
Rotas como `/blog/exemplo/` e `/apresentacao/` são exemplos e precisam ser
substituídas pelas rotas reais do site.

Antes da execução, forneça as entradas indicadas na ficha e permita que o agente
leia os arquivos atuais. Cada skill orienta a apresentação de um plano curto, a
preservação de alterações locais e a leitura de `.astrofy/docs/index.md`, quando
existente. Na adoção inicial, use `astrofy-init` para preparar os arquivos
ausentes.

Ao terminar, o agente deve informar arquivos modificados, comandos executados e
pendências reais, atualizar a documentação afetada e registrar somente os itens
de checklist avaliados. Falta de preview ou falha operacional deixa a avaliação
incompleta. Revisões humanas continuam necessárias para itens manuais ou
híbridos. Uma inspeção simples não autoriza instalar dependências, enviar
formulários nem publicar o site.

## Fluxos de uso

A [matriz operacional](skill-matrix.md) relaciona todas as skills com suas
dependências, entradas, saídas e comandos de validação. O arquivo é gerado a
partir de `astrofy-setup/references/workflow.json` e conferido por
`npm run skills:matrix:check`.

Escolha as skills conforme a mudança. As sequências abaixo são percursos
sugeridos para organizar o trabalho; não existe execução automática de todas as
skills nem obrigação de seguir uma fila fixa. Em um site existente, comece pela
etapa que corresponde ao problema e preserve o que já funciona.

| Trabalho                  | Sequência sugerida                                                    | Conferência final                 |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------- |
| Adoção em site existente  | init → architecture → config → documentation                          | checkup                           |
| Definição de página       | page-planner → plan-*-page → implementation-planner                   | aprovação do plano                |
| Identidade e temas        | branding → design-system → tailwind → themes                          | accessibility e testing           |
| Componentes e navegação   | components → sections → header → navigation → footer → component-docs | accessibility e testing           |
| Página inicial ou landing | page-design → homepage ou landing-pages → images → editorial-review   | seo, open-graph e checkup         |
| Blog e conteúdo           | mdx → blog → blog-post → blog-archives → routing                      | internal-links e checkup          |
| Descoberta do conteúdo    | seo → open-graph → structured-data → geo                              | HTML atual e revisão das fontes   |
| Interação e idiomas       | react, forms ou i18n conforme o escopo                                | accessibility, security e testing |
| Preparação para publicar  | code-quality → testing → build-deploy → documentation                 | checkup no ambiente autorizado    |

Os nomes abreviados da tabela usam o prefixo `astrofy-`. A publicação segue a
autorização recebida e o provedor já adotado pelo projeto. As regras de texto
público vêm das instruções editoriais do site.

## Planejamento modular de páginas

O percurso completo, com instalação, entrevista, arquivos gerados, execução e
solução de problemas, está no [guia do usuário](user/README.md). A mesma fonte
gera o [ebook oficial](../ebook/README.md) em PDF e EPUB.

`astrofy-page-planner` recebe o pedido em linguagem natural, inspeciona o site
e seleciona uma entrevistadora pelo tipo de página. A conversa define
finalidade, público, áreas, textos, mídia, comportamento, ações e direção de
voz. A amostra aprovada e as expressões a preservar ou evitar ficam registradas
em `page.md`. Sugestões do agente permanecem como propostas até aprovação. O
resultado fica em `.astrofy/pages/<slug>/`, separado do código até receber
aprovação.

As especialistas cobrem vendas, produto, serviço, Home, Sobre, Contato e
Preços. Elas não implementam componentes nem publicam conteúdo. Depois da
aprovação, `astrofy-implementation-planner` relaciona a especificação com os
arquivos atuais, a checklist e as skills técnicas. A direção de voz acompanha
as tarefas que exibem texto, com revisão de `astrofy-editorial-review` quando a
copy for criada ou alterada. O plano retomável fica em `.astrofy/plans/<slug>/`.

Um pedido pode começar sem comandos ou formulários:

> Quero criar uma página para meu produto de atendimento.

O planner identifica o tipo provável, confirma a finalidade, oferece três
arquiteturas, coleta a direção de voz e pede o texto de cada área. A pessoa
pode fornecer os textos, aprovar propostas editoriais ou manter uma área
opcional pendente. A implementação começa somente depois da revisão integral
da página e do plano.

## Entrada e formatação

Descreva a tarefa ao agente e ele seleciona as skills compatíveis. Para uma
página, comece pelo pedido na conversa; `astrofy-page-planner` conduz a
entrevista e encaminha o plano aprovado às especialistas técnicas. Use
`astrofy-setup` quando quiser preparar a adoção do Astrofy ou revisar o site de
forma ampla. A coordenação acontece no agente; o CLI oferece comandos opcionais
para acompanhar o estado e conduzir etapas pelo terminal.

astrofy-markdown usa o linter já configurado ou prepara markdownlint-cli quando
necessário. Verifica antes de corrigir, preserva frontmatter e código e repete
a validação após ler o diff. Consulte as instruções e recursos distribuídos:

- [Entrada setup](../skills/astrofy-setup/SKILL.md),
  [coordenação](../skills/astrofy-setup/references/technical.md) e
  [casos](../skills/astrofy-setup/examples/cases.md).
- [Formatação Markdown](../skills/astrofy-markdown/SKILL.md),
  [linter](../skills/astrofy-markdown/references/technical.md) e
  [casos](../skills/astrofy-markdown/examples/cases.md).

## Índice das 49 skills

- **[astrofy-setup](../skills/astrofy-setup/SKILL.md):** Entrada inicial e
  coordenação da biblioteca conforme os recursos presentes no projeto.
- **[astrofy-page-planner](../skills/astrofy-page-planner/SKILL.md):** Entrevista
  modular, direção de voz e especificação aprovada da página.
- **[astrofy-implementation-planner](../skills/astrofy-implementation-planner/SKILL.md):**
  Fases e tarefas técnicas retomáveis para a página aprovada.
- **[astrofy-plan-sales-page](../skills/astrofy-plan-sales-page/SKILL.md):**
  Oferta, prova, preço, objeções e conversão.
- **[astrofy-plan-product-page](../skills/astrofy-plan-product-page/SKILL.md):**
  Produto, casos de uso, recursos, demonstração e aquisição.
- **[astrofy-plan-service-page](../skills/astrofy-plan-service-page/SKILL.md):**
  Serviço, entregas, processo, responsabilidades e contratação.
- **[astrofy-plan-homepage](../skills/astrofy-plan-homepage/SKILL.md):** Papel da
  Home, públicos, prioridades e destinos.
- **[astrofy-plan-about-page](../skills/astrofy-plan-about-page/SKILL.md):**
  Empresa, atuação, história, pessoas e fontes.
- **[astrofy-plan-contact-page](../skills/astrofy-plan-contact-page/SKILL.md):**
  Campos, consentimento, envio, retorno e canais alternativos.
- **[astrofy-plan-pricing-page](../skills/astrofy-plan-pricing-page/SKILL.md):**
  Planos, preços, limites, cobrança e comparação.
- **[astrofy-markdown](../skills/astrofy-markdown/SKILL.md):** Formatação e
  validação de Markdown com linter e preservação do conteúdo.

- **[astrofy-init](#astrofy-init):** Prepara a adoção do Astrofy em um projeto
  Astro existente, preservando arquivos personalizados e registrando o estado
  inicial.
- **[astrofy-architecture](#astrofy-architecture):** Organiza responsabilidades
  de rotas, layouts e componentes em sites Astro, documentando dependências e
  adaptações necessárias.
- **[astrofy-config](#astrofy-config):** Agrupa configurações públicas por
  assunto em projetos Astro e atualiza consumidores sem duplicar valores ou
  expor credenciais.
- **[astrofy-components](#astrofy-components):** Cria componentes Astro
  reutilizáveis com propriedades, slots e variantes limitadas, conservando os
  contratos dos consumidores.
- **[astrofy-component-docs](#astrofy-component-docs):** Documenta a API e os
  usos reais dos componentes Astro em Markdown, mantendo propriedades e exemplos
  alinhados à implementação.
- **[astrofy-react](#astrofy-react):** Integra React apenas nas interações
  necessárias de um site Astro, escolhendo hidratação e verificando o
  comportamento no navegador.
- **[astrofy-code-quality](#astrofy-code-quality):** Revisa tipos, imports e
  duplicações no código de projetos Astro, aplicando correções delimitadas e
  verificadas pelos testes do site.
- **[astrofy-branding](#astrofy-branding):** Registra a identidade visual de um
  site a partir de marca fornecida, exportação real ou referência, identificando
  inferências e autoria.
- **[astrofy-design-system](#astrofy-design-system):** Valida tokens
  hierárquicos e gera o CSS do design system em sites Astro, preservando aliases
  tipados e os modos claro e escuro.
- **[astrofy-tailwind](#astrofy-tailwind):** Integra utilitários Tailwind ao
  design system de um projeto Astro, verificando versão, entrada CSS e classes
  emitidas pelo build.
- **[astrofy-themes](#astrofy-themes):** Implementa light, dark e system com
  preferência persistente em sites Astro, conferindo a primeira pintura e
  estados dos componentes.
- **[astrofy-page-design](#astrofy-page-design):** Compõe páginas Astro a partir
  de conteúdo e identidade fornecidos, conferindo hierarquia, leitura e
  comportamento responsivo.
- **[astrofy-sections](#astrofy-sections):** Cria seções reutilizáveis para
  páginas Astro com conteúdo explícito, composição por slots e comportamento
  responsivo documentado.
- **[astrofy-header](#astrofy-header):** Configura cabeçalhos Astro com marca,
  ações e comportamento sticky, verificando a relação com navegação, foco e
  conteúdo da página.
- **[astrofy-footer](#astrofy-footer):** Organiza rodapés Astro configuráveis
  com links e informações fornecidas, conferindo responsividade e destinos
  publicados.
- **[astrofy-navigation](#astrofy-navigation):** Implementa menus e submenus de
  sites Astro operáveis por teclado e toque, com foco, estado atual e destinos
  verificados.
- **[astrofy-homepage](#astrofy-homepage):** Monta páginas iniciais Astro com
  conteúdo fornecido e seções reutilizáveis, alinhando navegação, hierarquia e
  ação principal.
- **[astrofy-landing-pages](#astrofy-landing-pages):** Monta landing pages Astro
  com oferta e ação fornecidas, compondo seções reutilizáveis e verificando
  destinos e estados do fluxo.
- **[astrofy-blog](#astrofy-blog):** Organiza o blog de um site Astro com
  coleções MDX e templates de leitura e arquivo, definindo taxonomias e regras
  de publicação.
- **[astrofy-mdx](#astrofy-mdx):** Configura integração MDX e schemas de
  conteúdo em sites Astro, documentando componentes permitidos e a origem
  confiável dos arquivos.
- **[astrofy-blog-post](#astrofy-blog-post):** Compõe templates de post Astro
  com corpo MDX, autoria e metadados derivados da coleção, verificando leitura e
  mídia responsiva.
- **[astrofy-blog-archives](#astrofy-blog-archives):** Implementa arquivos
  paginados de blog Astro com ordenação determinística e taxonomias, verificando
  URLs e estados vazios.
- **[astrofy-editorial-review](#astrofy-editorial-review):** Audita texto sem
  editar ou revisa linguagem, voz e alegações em conteúdo visível de sites Astro.
- **[astrofy-seo](#astrofy-seo):** Verifica SEO no HTML renderizado de projetos
  Astro, relacionando metadados, canônicas e indexação às rotas e ao ambiente.
- **[astrofy-open-graph](#astrofy-open-graph):** Configura metadados Open Graph
  em páginas Astro com URLs absolutas e fallback por tipo de conteúdo,
  conferindo as imagens publicadas.
- **[astrofy-geo](#astrofy-geo):** Revisa clareza, autoria e acesso ao conteúdo
  de sites Astro para descoberta por IA, distinguindo orientações oficiais de
  hipóteses.
- **[astrofy-internal-links](#astrofy-internal-links):** Analisa links internos
  em sites Astro e sugere destinos contextualizados, preservando a sintaxe MDX e
  evitando alterações repetidas.
- **[astrofy-documentation](#astrofy-documentation):** Mantém arquitetura,
  relação de arquivos e operação de projetos Astro em Markdown, conferindo
  comandos e componentes na implementação.
- **[astrofy-checkup](#astrofy-checkup):** Executa verificações do Astrofy e
  organiza revisões manuais por escopo, mantendo checklist, relatórios e
  validade dos resultados.
- **[astrofy-accessibility](#astrofy-accessibility):** Revisa semântica, foco e
  operação por teclado em sites Astro, combinando verificações automáticas com
  revisão manual de estados.
- **[astrofy-images](#astrofy-images):** Configura imagens em sites Astro
  conforme origem e uso, verificando dimensões, responsividade e carregamento no
  layout publicado.
- **[astrofy-routing](#astrofy-routing):** Organiza rotas e redirects em sites
  Astro, preservando URLs existentes e verificando colisões, parâmetros e
  comportamento de 404.
- **[astrofy-structured-data](#astrofy-structured-data):** Configura e valida
  JSON-LD em sites Astro, relacionando entidades e propriedades às informações
  presentes no conteúdo visível.
- **[astrofy-i18n](#astrofy-i18n):** Configura idiomas e relações entre páginas
  em sites Astro, verificando rotas, fallback e metadados das traduções
  disponíveis.
- **[astrofy-forms](#astrofy-forms):** Integra formulários em páginas Astro com
  validação e mensagens acessíveis, verificando o destino de envio em ambiente
  autorizado.
- **[astrofy-testing](#astrofy-testing):** Organiza testes de contratos e fluxos
  de sites Astro conforme o impacto da mudança, registrando ambiente e limites
  da cobertura.
- **[astrofy-build-deploy](#astrofy-build-deploy):** Prepara build e operação de
  publicação em projetos Astro, respeitando o adaptador e o provedor existentes
  e validando o ambiente.
- **[astrofy-security](#astrofy-security):** Revisa entradas, segredos e
  execução de HTML ou MDX em projetos Astro, aplicando correções delimitadas e
  documentando o alcance.

## astrofy-init

Prepara a adoção do Astrofy em um projeto Astro existente, preservando arquivos
personalizados e registrando o estado inicial.

- **Entradas necessárias:** Manifesto, lockfile e raiz do site.
- **Quando usar:** Em um site com src/pages/index.astro, inicialize e confira
  .astrofy/config/project.json.
- **Adaptação de projeto existente:** Em um monorepo, selecione apps/site por
  --root e mantenha os caminhos já personalizados.

### Procedimento

Execute astrofy inspect com a raiz explícita. Compare caminhos detectados com as
convenções do site. Use astrofy init --dry-run, confira a lista e execute init
para criar apenas os arquivos ausentes.

### Entrega e conferência

A reexecução conserva configurações, notas e código do site. A checklist inicia
sem aprovações presumidas.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy init --dry-run
```

- **Limite ou erro recorrente:** Um JSON existente inválido interrompe init.
  Corrija o campo informado, sem apagar o arquivo.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-init/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-init/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-init/examples/cases.md).

## astrofy-architecture

Organiza responsabilidades de rotas, layouts e componentes em sites Astro,
documentando dependências e adaptações necessárias.

- **Entradas necessárias:** Relação de arquivos e rotas consumidas.
- **Quando usar:** Separe a estrutura global em BaseLayout e deixe a página
  compor suas seções.
- **Adaptação de projeto existente:** Um site usa src/views para layouts.
  Registre o caminho no contrato e preserve os imports válidos.

### Procedimento

Trace os imports das páginas para os layouts e componentes. Defina grupos por
responsabilidade. Extraia apenas repetições que já tenham consumidores. Registre
a arquitetura observada e as razões das mudanças em
.astrofy/docs/architecture.md.

### Entrega e conferência

Cada área tem finalidade e consumidores identificados. As rotas anteriores
continuam funcionando.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category architecture
```

- **Limite ou erro recorrente:** Não extraia cada tag HTML em um componente. A
  abstração precisa reduzir repetição ou isolar comportamento.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-architecture/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-architecture/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-architecture/examples/cases.md).

## astrofy-config

Agrupa configurações públicas por assunto em projetos Astro e atualiza
consumidores sem duplicar valores ou expor credenciais.

- **Entradas necessárias:** Configurações atuais e respectivos imports.
- **Quando usar:** Mova os links repetidos do cabeçalho e rodapé para
  navigation.ts.
- **Adaptação de projeto existente:** Um site já usa config/menu.ts. Preserve o
  nome quando a convenção estiver documentada.

### Procedimento

Localize valores usados por navegação, cabeçalho e blog. Mova cada assunto para
seu módulo em src/config ou no caminho mapeado. Atualize os imports e remova a
definição anterior somente após conferir todos os consumidores.

### Entrega e conferência

O valor tem uma única fonte editável. Segredos continuam no ambiente. O build
preserva o comportamento anterior.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category config
```

- **Limite ou erro recorrente:** Não importe TypeScript durante uma inspeção de
  projeto desconhecido. A importação executa código.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-config/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-config/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-config/examples/cases.md).

## astrofy-components

Cria componentes Astro reutilizáveis com propriedades, slots e variantes
limitadas, conservando os contratos dos consumidores.

- **Entradas necessárias:** Código repetido, propriedades e usos reais.
- **Quando usar:** Crie Button.astro com href e variant, usando slot para o
  texto do link.
- **Adaptação de projeto existente:** Um card existente recebe conteúdo por
  slot. Preserve esse contrato ao adicionar uma variante.

### Procedimento

Delimite a responsabilidade do componente. Modele propriedades explícitas e
slots para conteúdo composto. Use variantes finitas. Atualize os consumidores,
descreva os estados e confira a renderização nas páginas afetadas.

### Entrega e conferência

Propriedades tipadas e exemplos correspondem ao código. A composição funciona
com os conteúdos reais.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category components
```

- **Limite ou erro recorrente:** Dezenas de flags booleanas produzem combinações
  ambíguas. Separe responsabilidades ou use uma união de variantes.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-components/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-components/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-components/examples/cases.md).

## astrofy-component-docs

Documenta a API e os usos reais dos componentes Astro em Markdown, mantendo
propriedades e exemplos alinhados à implementação.

- **Entradas necessárias:** Arquivo do componente e seus consumidores.
- **Quando usar:** Documente Button com href obrigatório, variant opcional e
  slot padrão.
- **Adaptação de projeto existente:** Um componente perdeu a propriedade
  compact. Remova-a do documento e revise os exemplos.

### Procedimento

Leia Props, defaults e slots no código. Registre o caminho, domínio, imports e
dependências. Explique os estados, tokens e necessidade de JavaScript. Inclua um
exemplo copiado de um consumidor válido e a lista de arquivos conferidos.

### Entrega e conferência

A página em .astrofy/docs/components descreve a API atual e é alcançável pelo
índice.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy docs check
```

- **Limite ou erro recorrente:** Não deduza propriedades apenas pelo nome do
  componente. Confirme declaração e uso real.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-component-docs/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-component-docs/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-component-docs/examples/cases.md).

## astrofy-react

Integra React apenas nas interações necessárias de um site Astro, escolhendo
hidratação e verificando o comportamento no navegador.

- **Entradas necessárias:** Dependência React, integração e interação
  solicitada.
- **Quando usar:** Use client:visible para um contador demonstrativo abaixo da
  abertura.
- **Adaptação de projeto existente:** Um site já usa React para busca. Preserve
  o provider local e documente seus consumidores.

### Procedimento

Confirme a integração no manifesto e em astro.config. Delimite a ilha e
serialize apenas props necessárias. Escolha client:visible, client:idle ou
client:load conforme a interação. Verifique erros de hidratação e teste o fluxo
após carregar a rota.

### Entrega e conferência

A ilha responde à interação. Conteúdo estático continua renderizado pelo Astro.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category react
```

- **Limite ou erro recorrente:** Valores aleatórios durante a renderização podem
  divergir entre servidor e cliente. Produza um valor estável ou adie a leitura.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-react/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-react/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-react/examples/cases.md).

## astrofy-code-quality

Revisa tipos, imports e duplicações no código de projetos Astro, aplicando
correções delimitadas e verificadas pelos testes do site.

- **Entradas necessárias:** Arquivos alterados e comandos de validação.
- **Quando usar:** Remova uma propriedade sem uso depois de conferir os
  consumidores.
- **Adaptação de projeto existente:** Um site possui aliases próprios. Corrija o
  import sem substituir toda a configuração TypeScript.

### Procedimento

Leia os contratos usados pela mudança. Execute a checagem de tipos disponível e
examine imports sem consumidores. Corrija cada ocorrência no escopo solicitado.
Marque achados de complexidade como análise humana quando não houver medição
determinística.

### Entrega e conferência

O código alterado passa nas verificações pertinentes e a revisão informa
limitações concretas.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --rule quality.types
```

- **Limite ou erro recorrente:** Não remova código apenas porque uma busca
  literal não achou uso. Rotas e imports dinâmicos exigem inspeção própria.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-code-quality/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-code-quality/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-code-quality/examples/cases.md).

## astrofy-branding

Registra a identidade visual de um site a partir de marca fornecida, exportação
real ou referência, identificando inferências e autoria.

- **Entradas necessárias:** Marca fornecida, exportação ou referência visual.
- **Quando usar:** Use uma paleta fornecida para preencher os tokens primitivos
  e registrar sua origem.
- **Adaptação de projeto existente:** Compare uma nova exportação com o
  source-map atual e mantenha ajustes locais marcados.

### Procedimento

Priorize os arquivos da marca fornecidos. Examine uma exportação real do Brandfy
antes de mapear campos. Compare fontes, cores e ativos existentes. Registre a
origem em source-map.json e identifique estimativas feitas a partir de imagem.

### Entrega e conferência

Cada valor adotado tem origem registrada. Reimportação conserva ajustes locais
identificados.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category brand
```

- **Limite ou erro recorrente:** Não presuma o formato de exportação do Brandfy
  nem copie ativos de uma URL de referência sem autorização.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-branding/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-branding/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-branding/examples/cases.md).

## astrofy-design-system

Valida tokens hierárquicos e gera o CSS do design system em sites Astro,
preservando aliases tipados e os modos claro e escuro.

- **Entradas necessárias:** Design system JSON, mapeamento de caminhos e
  Tailwind instalado.
- **Quando usar:** Mude semantic.color.action por meio do alias e confira o
  botão nos dois temas.
- **Adaptação de projeto existente:** Formalize as cores atuais do site e migre
  um componente por vez, comparando capturas.

### Procedimento

Modele valores primitivos e funções semânticas. Confira overrides existentes nos
dois modos. Execute tokens validate, tokens build --dry-run e tokens build.
Compare o CSS e o manifesto e confira os componentes consumidores.

### Entrega e conferência

A geração é determinística. Aliases não formam ciclos, os tipos são preservados
e tokens check confirma a sincronização.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy tokens check
```

- **Limite ou erro recorrente:** Um override não pode criar token novo ou trocar
  color por dimension. Corrija a entrada indicada pelo gerador.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-design-system/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-design-system/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-design-system/examples/cases.md).

## astrofy-tailwind

Integra utilitários Tailwind ao design system de um projeto Astro, verificando
versão, entrada CSS e classes emitidas pelo build.

- **Entradas necessárias:** Versão instalada, CSS de entrada e classes dos
  componentes.
- **Quando usar:** Troque bg-purple-600 por bg-action depois de conferir o token
  semântico.
- **Adaptação de projeto existente:** Um site usa Tailwind 3. Registre a
  incompatibilidade do adaptador CSS-first e preserve sua versão até uma
  migração autorizada.

### Procedimento

Selecione o adaptador compatível com a versão instalada. Mantenha uma única
importação de Tailwind. Use os utilitários semânticos gerados e examine o CSS
compilado. Registre exceções técnicas de valores literais por arquivo.

### Entrega e conferência

As classes usadas aparecem no CSS final. O CSS global não repete valores de
marca.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --rule design.token-usage
```

- **Limite ou erro recorrente:** A classe container possui significado próprio
  no Tailwind. Use um nome distinto para um componente de layout autoral.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-tailwind/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-tailwind/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-tailwind/examples/cases.md).

## astrofy-themes

Implementa light, dark e system com preferência persistente em sites Astro,
conferindo a primeira pintura e estados dos componentes.

- **Entradas necessárias:** Ativos por tema, persistência e política de scripts.
- **Quando usar:** Escolha dark, recarregue a página e confira a persistência.
- **Adaptação de projeto existente:** Um site usa classe dark em vez de
  data-theme. Documente o adaptador sem adicionar dois controles concorrentes.

### Procedimento

Aplique a preferência explícita no início do documento. Trate falhas de
armazenamento. Em system, acompanhe mudanças de prefers-color-scheme. Confira
logos, foco e estados de interação em páginas representativas.

### Entrega e conferência

A preferência explícita prevalece. System acompanha o sistema e o site continua
utilizável com armazenamento indisponível.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category theme
```

- **Limite ou erro recorrente:** Não aplique sempre a preferência do sistema
  após carregar. Isso apagaria a escolha explícita feita no seletor.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-themes/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-themes/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-themes/examples/cases.md).

## astrofy-page-design

Compõe páginas Astro a partir de conteúdo e identidade fornecidos, conferindo
hierarquia, leitura e comportamento responsivo.

- **Entradas necessárias:** Objetivo da página, conteúdo confirmado e tokens.
- **Quando usar:** Distribua três cards em colunas no desktop e em uma coluna no
  celular.
- **Adaptação de projeto existente:** Uma página existente possui texto maior
  que o exemplo. Teste esse texto ao ajustar a grade.

### Procedimento

Organize a ordem das seções conforme a tarefa de leitura. Use larguras e
espaçamentos do design system. Examine a página em celular e desktop com
conteúdo real. Ajuste overflow e foco sem esconder informação necessária.

### Entrega e conferência

A página mantém leitura e ações acessíveis nas larguras verificadas, com
comparação visual registrada.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category layout
```

- **Limite ou erro recorrente:** Não corte títulos com altura fixa para esconder
  desalinhamento. Ajuste composição e comportamento de quebra.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-page-design/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-page-design/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-page-design/examples/cases.md).

## astrofy-sections

Cria seções reutilizáveis para páginas Astro com conteúdo explícito, composição
por slots e comportamento responsivo documentado.

- **Entradas necessárias:** Seções necessárias e primitivas existentes.
- **Quando usar:** Hero recebe title e description, com ações no slot padrão.
- **Adaptação de projeto existente:** Adapte uma seção de FAQ existente
  preservando seus IDs e links de âncora.

### Procedimento

Defina o objetivo da seção e suas entradas. Reutilize botões e cards do projeto.
Prefira slots para ações compostas e dados tipados para itens paralelos.
Documente as larguras e os estados realmente usados.

### Entrega e conferência

A seção funciona em mais de um consumidor sem flags conflitantes nem conteúdo
institucional inventado.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category components
```

- **Limite ou erro recorrente:** Não crie uma seção universal com dezenas de
  layouts condicionais. Separe composições que tenham responsabilidades
  diferentes.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-sections/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-sections/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-sections/examples/cases.md).

## astrofy-header

Configura cabeçalhos Astro com marca, ações e comportamento sticky, verificando
a relação com navegação, foco e conteúdo da página.

- **Entradas necessárias:** Logo por tema, ações e configuração de cabeçalho.
- **Quando usar:** Use SiteHeader para compor o logo e SiteNavigation.
- **Adaptação de projeto existente:** Um cabeçalho existente tem duas linhas.
  Calcule a compensação de âncoras para a altura real.

### Procedimento

Componha marca e ações usando a configuração pública. Delegue abertura de menus
ao componente de navegação. Confira a altura sticky em zoom e celular. Garanta
espaço para destinos de âncora e elementos focados.

### Entrega e conferência

O cabeçalho não cobre foco nem conteúdo de âncoras nas larguras testadas.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category header
```

- **Limite ou erro recorrente:** Não duplique a máquina de estado do menu dentro
  do cabeçalho e da navegação.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-header/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-header/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-header/examples/cases.md).

## astrofy-footer

Organiza rodapés Astro configuráveis com links e informações fornecidas,
conferindo responsividade e destinos publicados.

- **Entradas necessárias:** Links e informações institucionais confirmadas.
- **Quando usar:** Exiba links para início, blog e componentes do próprio site.
- **Adaptação de projeto existente:** Um rodapé possui endereço confirmado.
  Preserve a informação ao reorganizar as colunas.

### Procedimento

Agrupe os links pelo uso real e leia a configuração do rodapé. Reutilize os
ativos de marca apropriados. Teste quebra de colunas e destinos internos.
Registre a composição e os campos opcionais.

### Entrega e conferência

Links existem e o rodapé conserva leitura em celular. Informações institucionais
possuem fonte fornecida.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category footer
```

- **Limite ou erro recorrente:** Não invente CNPJ, endereço ou texto legal para
  preencher espaço visual.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-footer/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-footer/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-footer/examples/cases.md).

## astrofy-navigation

Implementa menus e submenus de sites Astro operáveis por teclado e toque, com
foco, estado atual e destinos verificados.

- **Entradas necessárias:** Árvore de navegação e comportamento por largura.
- **Quando usar:** Abra o menu móvel com Enter, navegue com Tab e feche com
  Escape.
- **Adaptação de projeto existente:** Preserve os destinos de um menu já
  publicado ao extrair navigation.ts.

### Procedimento

Modele links numa fonte compartilhada. Use semântica de navegação de site. Teste
abrir, fechar, Escape, clique externo e retorno de foco. Identifique a rota
atual e valide destinos e âncoras.

### Entrega e conferência

As ações funcionam por mouse, toque e teclado. O menu fechado não mantém links
invisíveis no percurso de foco.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category navigation
```

- **Limite ou erro recorrente:** Não use role=menu como atalho para navegação
  comum. A semântica exige outro contrato de teclado.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-navigation/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-navigation/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-navigation/examples/cases.md).

## astrofy-homepage

Monta páginas iniciais Astro com conteúdo fornecido e seções reutilizáveis,
alinhando navegação, hierarquia e ação principal.

- **Entradas necessárias:** Público, objetivo principal e conteúdo confirmado.
- **Quando usar:** Use a abertura para apresentar o blog e apontar para sua
  listagem.
- **Adaptação de projeto existente:** Uma home institucional já possui ofertas
  confirmadas. Preserve os fatos ao alterar a ordem das seções.

### Procedimento

Identifique a ação principal da página e o conteúdo necessário para sustentá-la.
Componha a abertura e as seções com componentes existentes. Preserve o texto
aprovado e não preencha áreas sem conteúdo. Se criar ou alterar copy, revise-a
com `astrofy-editorial-review` antes de concluir. Verifique os destinos e
compare a leitura em celular e desktop.

### Entrega e conferência

A página permite compreender o assunto e encontrar a ação principal com conteúdo
factual e navegação funcional.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --page /
```

- **Limite ou erro recorrente:** Não acrescente depoimentos, métricas ou
  promessas para preencher um template.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-homepage/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-homepage/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-homepage/examples/cases.md).

## astrofy-landing-pages

Monta landing pages Astro com oferta e ação fornecidas, compondo seções
reutilizáveis e verificando destinos e estados do fluxo.

- **Entradas necessárias:** Oferta confirmada, ação esperada e conteúdo
  autorizado.
- **Quando usar:** Componha uma página de apresentação com Hero, FeatureGrid e
  Faq.
- **Adaptação de projeto existente:** Uma landing já possui endpoint de
  formulário. Preserve o destino e valide o envio em ambiente de teste
  autorizado.

### Procedimento

Defina a sequência de leitura conforme a ação esperada. Reutilize seções do
projeto e preserve a copy aprovada. Não preencha lacunas com texto genérico.
Se criar ou alterar copy, revise-a com `astrofy-editorial-review` antes de
concluir. Confira o destino do botão e, quando houver formulário, trate erros e
sucesso. Teste a página em larguras representativas.

### Entrega e conferência

A ação tem destino funcional e os estados presentes foram exercitados. O texto
não inventa características da oferta.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --page /apresentacao/
```

- **Limite ou erro recorrente:** Não altere uma oferta comercial apenas para
  adequar o texto à composição visual.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-landing-pages/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-landing-pages/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-landing-pages/examples/cases.md).

## astrofy-blog

Organiza o blog de um site Astro com coleções MDX e templates de leitura e
arquivo, definindo taxonomias e regras de publicação.

- **Entradas necessárias:** Acervo, navegação editorial e campos de publicação.
- **Quando usar:** Publique três posts com pageSize 2 e confira a segunda
  página.
- **Adaptação de projeto existente:** Um blog existente usa categoria opcional.
  Preserve a convenção ou migre com tratamento explícito dos posts antigos.

### Procedimento

Defina o schema da coleção e a seleção única de posts publicáveis. Relacione
post individual e arquivos paginados. Normalize taxonomias e documente autoria e
fuso. Reutilize o design system na leitura e nas listagens.

### Entrega e conferência

Os mesmos posts elegíveis aparecem nas rotas e arquivos. Rascunhos e datas
futuras obedecem à política registrada.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category blog
```

- **Limite ou erro recorrente:** Um site estático não publica sozinho na data
  futura. Documente a necessidade de novo build.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-blog/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-blog/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-blog/examples/cases.md).

## astrofy-mdx

Configura integração MDX e schemas de conteúdo em sites Astro, documentando
componentes permitidos e a origem confiável dos arquivos.

- **Entradas necessárias:** Integração instalada, schema e exemplos de conteúdo.
- **Quando usar:** Importe Notice.astro num post e confira o aviso no HTML.
- **Adaptação de projeto existente:** Um acervo existente usa pubDate. Mapeie o
  campo durante a migração sem alterar a data factual.

### Procedimento

Confirme a integração compatível com Astro. Defina campos obrigatórios e limites
por tipo de post. Documente imports de componentes e exemplos de uso. Compile
conteúdo válido e um caso inválido que deve apontar o arquivo e o campo.

### Entrega e conferência

O MDX renderiza componentes e o schema recusa frontmatter inválido. A origem do
conteúdo está documentada.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category mdx
```

- **Limite ou erro recorrente:** MDX executa código durante a compilação. Não
  compile conteúdo externo desconhecido como se fosse texto simples.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-mdx/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-mdx/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-mdx/examples/cases.md).

## astrofy-blog-post

Compõe templates de post Astro com corpo MDX, autoria e metadados derivados da
coleção, verificando leitura e mídia responsiva.

- **Entradas necessárias:** Post validado e componentes de leitura.
- **Quando usar:** Renderize um artigo com aviso, tabela e bloco de código.
- **Adaptação de projeto existente:** Um post possui canonical externo
  autorizado. Preserve o override em vez de forçar a URL local.

### Procedimento

Renderize o corpo com a API da versão instalada. Apresente autoria e datas
fornecidas. Use largura de leitura e estilos para tabelas e código. Derive
metadados do post e confira imagens e componentes embutidos.

### Entrega e conferência

O post tem rota própria e corpo legível nos temas suportados. Metadados
correspondem ao artigo.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --page /blog/exemplo/
```

- **Limite ou erro recorrente:** Não use o título genérico do blog em todos os
  posts. Leia o título da entrada atual.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-blog-post/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-blog-post/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-blog-post/examples/cases.md).

## astrofy-blog-archives

Implementa arquivos paginados de blog Astro com ordenação determinística e
taxonomias, verificando URLs e estados vazios.

- **Entradas necessárias:** Coleção publicável, pageSize e convenção de URLs.
- **Quando usar:** Três posts com pageSize 2 geram duas páginas com canônicas
  diferentes.
- **Adaptação de projeto existente:** Um site usa /artigos em vez de /blog.
  Preserve a convenção e seus redirects documentados.

### Procedimento

Use paginate em getStaticPaths. Ordene por data com desempate estável. Reutilize
a seleção de posts em tags, categorias e autores habilitados. Preserve um estado
vazio utilizável e canônicas específicas para cada página.

### Entrega e conferência

Nenhum post aparece duplicado ou desaparece na sequência. Os links anterior e
próximo fecham o percurso.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --rule blog.archives
```

- **Limite ou erro recorrente:** Não aplique a canônica da primeira página em
  todas as páginas do arquivo.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-blog-archives/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-blog-archives/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-blog-archives/examples/cases.md).

## astrofy-editorial-review

Audita texto sem editar ou revisa linguagem, voz e alegações em conteúdo visível
de sites Astro, sem presumir autoria por estilo.

- **Entradas necessárias:** Texto atual, idioma e glossário do projeto.
- **Quando usar:** Corrija o rótulo de um botão sem alterar o destino do link.
- **Adaptação de projeto existente:** Preserve uma expressão técnica do
  glossário ao revisar um artigo antigo.

### Procedimento

Leia a página completa, seu objetivo, a voz registrada e as fontes factuais.
Em modo de auditoria, relate os trechos, padrões, efeitos e ações sugeridas sem
editar. Em modo de edição, corrija somente o necessário. Preserve fatos, código
e escolhas de voz intencionais. Não invente detalhes. Compare o texto com
amostras aprovadas e leia a página como um conjunto para encontrar estruturas
repetidas. Confira a página renderizada e relate correções e informações que
ainda precisam de confirmação.

### Entrega e conferência

O texto está legível, mantém o significado confirmado e representa a voz
aprovada. Alegações têm fonte e padrões genéricos foram avaliados no contexto.
Nenhuma lacuna foi preenchida com informação inventada.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category editorial
```

- **Limite ou erro recorrente:** Não mude números ou nomes de oferta por
  parecerem incomuns. Consulte a fonte responsável. Não neutralize a voz nem
  classifique autoria humana ou automática apenas pelo estilo.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-editorial-review/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-editorial-review/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-editorial-review/examples/cases.md).

## astrofy-seo

Verifica SEO no HTML renderizado de projetos Astro, relacionando metadados,
canônicas e indexação às rotas e ao ambiente.

- **Entradas necessárias:** HTML publicado, domínio e política de indexação.
- **Quando usar:** Confira título e canônica de /blog/2/ após o build.
- **Adaptação de projeto existente:** Um staging usa noindex intencional.
  Preserve a política e não trate a tag como erro genérico.

### Procedimento

Leia títulos, descrições e canônicas no HTML final. Compare rotas elegíveis com
sitemap e robots. Revise staging separadamente da produção. Confira arquivos
paginados e overrides documentados.

### Entrega e conferência

Cada diagnóstico identifica rota e tag. Indexação e canônica correspondem à
política do ambiente.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category seo
```

- **Limite ou erro recorrente:** Encontrar uma tag no código-fonte não comprova
  que ela aparece na saída renderizada.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-seo/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-seo/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-seo/examples/cases.md).

## astrofy-open-graph

Configura metadados Open Graph em páginas Astro com URLs absolutas e fallback
por tipo de conteúdo, conferindo as imagens publicadas.

- **Entradas necessárias:** Título, descrição, imagem e tipo da página.
- **Quando usar:** Um post usa sua capa e uma página comum usa a imagem padrão
  do site.
- **Adaptação de projeto existente:** Um site possui imagens sociais próprias.
  Preserve os ativos ao centralizar o componente de metadados.

### Procedimento

Derive os campos do conteúdo atual. Use URLs absolutas e defina fallback
documentado. Confira a imagem publicada, texto alternativo e proporção. Compare
o HTML de uma página comum e de um artigo.

### Entrega e conferência

Tags obrigatórias aparecem uma vez e a imagem pode ser acessada no ambiente
publicado.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category og
```

- **Limite ou erro recorrente:** Não vincule automaticamente a imagem social ao
  tema atual do visitante. O crawler pode não executar o seletor.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-open-graph/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-open-graph/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-open-graph/examples/cases.md).

## astrofy-geo

Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta por
IA, distinguindo orientações oficiais de hipóteses.

- **Entradas necessárias:** Conteúdo, fontes e plataformas de interesse.
- **Quando usar:** Verifique se a explicação principal de um artigo aparece no
  HTML sem interação.
- **Adaptação de projeto existente:** Um site usa llms.txt por escolha própria.
  Preserve o arquivo, sem torná-lo exigência universal.

### Procedimento

Confira se a informação principal está acessível no HTML. Relacione afirmações
às fontes fornecidas e identifique autoria quando pertinente. Consulte a
orientação da plataforma específica. Registre recomendações com justificativa e
limites de observação.

### Entrega e conferência

A revisão mostra o trecho e a fonte que justificam cada recomendação, sem
prometer citações ou posições.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category geo
```

- **Limite ou erro recorrente:** Não apresente uma hipótese de recomendação como
  garantia de ranking ou requisito oficial.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-geo/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-geo/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-geo/examples/cases.md).

## astrofy-internal-links

Analisa links internos em sites Astro e sugere destinos contextualizados,
preservando a sintaxe MDX e evitando alterações repetidas.

- **Entradas necessárias:** Índice de rotas, headings e links existentes.
- **Quando usar:** Ligue uma menção a temas para o heading correspondente de um
  artigo já publicado.
- **Adaptação de projeto existente:** Uma âncora antiga foi renomeada. Atualize
  os consumidores confirmados sem alterar outras ocorrências textuais.

### Procedimento

1. Execute `astrofy links scan --json` sobre um build atual. Cada rota fornece
   título, descrição, headings, taxonomias, links existentes e destinos
   ausentes. Sem HTML publicado, registre a necessidade de build; não trate uma
   lista vazia como comprovação de ausência de problemas.
2. Relacione a rota ao arquivo-fonte antes de sugerir uma alteração. Leia o
   parágrafo de origem e a seção de destino. Título semelhante ou tag comum
   ajudam a localizar candidatos, mas não justificam um link isoladamente.
3. Registre cada proposta com rota de origem, arquivo, trecho atual, texto
   sugerido para a âncora, URL de destino, fragmento quando houver e razão
   contextual. Informe se o link já existe e evite repetir a mesma indicação no
   parágrafo. Não crie links dentro de links.
4. Aplique somente as alterações abrangidas pelo pedido. Use parsing
   Markdown/MDX ou uma edição delimitada conferida pelo parser. Preserve
   frontmatter, imports, componentes, código e fatos. Se a mesma URL aparecer no
   rótulo ou no título do link, altere apenas o destino.
5. Gere novamente o escopo necessário quando a alteração afetar a publicação e
   repita o scanner. Confira a rota e o ID de destino no HTML atual. Registre
   falhas restantes e conserve os resultados de outras páginas.

O CLI não aplica sugestões editoriais automaticamente. `links scan` produz o
índice e os diagnósticos; a edição pertence ao trabalho da skill. Os fragmentos
da documentação Markdown/MDX são conferidos com `docs check`, enquanto os links
publicados são conferidos no HTML pelo scanner.

### Entrega e conferência

Links e âncoras existem. A reexecução não duplica links nem muda trechos de
código.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy links scan
```

- **Limite ou erro recorrente:** Não use similaridade textual como autorização
  para inserir links em qualquer parágrafo.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-internal-links/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-internal-links/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-internal-links/examples/cases.md).

## astrofy-documentation

Mantém arquitetura, relação de arquivos e operação de projetos Astro em
Markdown, conferindo comandos e componentes na implementação.

- **Entradas necessárias:** Código atual e índice de documentação local.
- **Quando usar:** Registre como executar dev, check e build a partir dos
  scripts reais.
- **Adaptação de projeto existente:** Após mover um componente, atualize seu
  documento e os links do índice.

### Procedimento

Leia a implementação e compare o índice com os arquivos existentes. Documente
configuração e responsabilidades com exemplos executáveis. Agrupe acervos
grandes por coleção. Atualize páginas de componentes afetados e verifique links
da documentação.

### Entrega e conferência

Comandos, caminhos e exemplos correspondem ao projeto. Caches e builds não
inundam o relação de arquivos.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy docs check
```

- **Limite ou erro recorrente:** Não copie uma arquitetura desejada para o
  documento como se já estivesse implementada.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-documentation/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-documentation/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-documentation/examples/cases.md).

## astrofy-checkup

Executa verificações do Astrofy e organiza revisões manuais por escopo, mantendo
checklist, relatórios e validade dos resultados.

- **Entradas necessárias:** Configuração, checklist e escopo solicitado.
- **Quando usar:** Execute somente links.broken na rota /blog/exemplo/ e confira
  o relatório gerado.
- **Adaptação de projeto existente:** Um resultado antigo perde validade após
  alterar o header. Registre nova revisão nas páginas afetadas.

### Procedimento

1. Consulte `astrofy status --json` para conhecer o estado atual. A consulta
   reconcilia o catálogo e recalcula validade em memória, sem gravar a checklist
   ou executar código do site.
2. Selecione categoria, regra, página ou componente conforme o pedido.
   `check --changed` avalia entradas diferentes da última execução; seu
   relatório não representa cobertura integral do projeto.
3. Confira `checks.trustedExecution` antes de checks que executam scripts. Para
   navegador, confirme o preview e `checks.baseUrl`. Ausência dessas condições
   corresponde a avaliação não concluída, não a aprovação.
4. Execute o check e leia os achados, arquivos e ações sugeridas. Scripts
   preparatórios terminam antes da conferência final do HTML; um build com erro
   não permite usar a saída anterior como comprovação atual.
5. Registre revisão humana somente para regras manuais ou híbridas, com
   responsável e justificativa. A TUI oferece esse registro com `m`. Regras
   automáticas usam seu verificador, mesmo que uma checklist antiga apresente
   outro método. Instâncias retiradas exigem reconciliação.
6. Consulte novamente o status após alterações. Preserve notas, relatórios
   citados e histórico. Uma dispensa vigente altera a aplicação da política, mas
   não transforma um resultado desfavorável em aprovação.

Interprete o código de saída junto do relatório: 0 corresponde à política
selecionada, 1 a falhas avaliadas, 2 a entrada ou configuração inválida, 3 a
operação não concluída e 130 a cancelamento. Não conclua uma revisão apenas
porque o processo retornou 0.

### Entrega e conferência

A checklist corresponde ao escopo avaliado. Pendências e falhas operacionais não
contam como aprovações.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --changed
```

- **Limite ou erro recorrente:** Não transforme uma dispensa temporária em
  passed. A exceção muda a política, não o resultado encontrado.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-checkup/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-checkup/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-checkup/examples/cases.md).

## astrofy-accessibility

Revisa semântica, foco e operação por teclado em sites Astro, combinando
verificações automáticas com revisão manual de estados.

- **Entradas necessárias:** Rotas representativas, temas e fluxos interativos.
- **Quando usar:** Abra e feche um submenu usando Enter e Escape e confira o
  retorno de foco.
- **Adaptação de projeto existente:** Um botão só tem ícone. Forneça nome
  acessível sem depender da aparência do ícone.

### Procedimento

Teste landmarks, headings e nomes acessíveis. Percorra a página com Tab e opere
menus por teclado. Confira contraste nos dois temas e alternativas de imagem.
Registre separadamente scanner e revisão humana, com referência a WCAG 2.2 AA.

### Entrega e conferência

Problemas descrevem elemento, estado e correção. O relatório não declara
conformidade completa por um scanner isolado.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category accessibility
```

- **Limite ou erro recorrente:** Uma imagem decorativa pode ter alt vazio. Evite
  inserir texto redundante apenas para preencher esse atributo.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-accessibility/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-accessibility/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-accessibility/examples/cases.md).

## astrofy-images

Configura imagens em sites Astro conforme origem e uso, verificando dimensões,
responsividade e carregamento no layout publicado.

- **Entradas necessárias:** Ativos, dimensões e prioridade de exibição.
- **Quando usar:** Use uma imagem processada do acervo local no corpo do post.
- **Adaptação de projeto existente:** Um logo SVG fica em public. Preserve o
  vetor e confira sua legibilidade nos dois temas.

### Procedimento

Escolha processamento Astro ou public conforme a origem. Declare dimensões ou
proporção e alternativas pertinentes. Use tamanhos responsivos e carregamento
adequado à posição. Confira distorção e deslocamento de layout em páginas
representativas.

### Entrega e conferência

A imagem mantém proporção, possui alternativa adequada e não ocupa bytes
desnecessários para o tamanho exibido.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category images
```

- **Limite ou erro recorrente:** Não aplique lazy loading à imagem principal
  apenas por convenção. Avalie sua posição na primeira tela.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-images/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-images/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-images/examples/cases.md).

## astrofy-routing

Organiza rotas e redirects em sites Astro, preservando URLs existentes e
verificando colisões, parâmetros e comportamento de 404.

- **Entradas necessárias:** Rotas atuais, slugs e redirects autorizados.
- **Quando usar:** Crie a rota de post a partir de um slug validado da coleção.
- **Adaptação de projeto existente:** Um artigo mudou de URL. Registre redirect
  da URL antiga e teste o destino final.

### Procedimento

Mapeie rotas estáticas e dinâmicas. Normalize slugs e verifique colisões.
Preserve URLs publicadas ou crie redirects explícitos. Teste destino final,
ausência de ciclos e status 404 no provedor adotado.

### Entrega e conferência

As rotas são únicas e redirects terminam no destino esperado. A página de erro
recebe status coerente.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category routing
```

- **Limite ou erro recorrente:** Não considere suficiente a existência de
  404.html. Confira o status HTTP retornado pelo servidor.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-routing/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-routing/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-routing/examples/cases.md).

## astrofy-structured-data

Configura e valida JSON-LD em sites Astro, relacionando entidades e propriedades
às informações presentes no conteúdo visível.

- **Entradas necessárias:** Entidades confirmadas e tipo de conteúdo.
- **Quando usar:** Um post fornece headline e datePublished a partir da coleção.
- **Adaptação de projeto existente:** Uma página institucional já tem
  Organization. Preserve o identificador ao centralizar a marcação.

### Procedimento

Escolha tipos pertinentes ao conteúdo real. Derive propriedades das mesmas
fontes usadas pela página. Escape a serialização para script HTML. Valide a
sintaxe e compare cada afirmação com o texto visível.

### Entrega e conferência

O JSON-LD é válido e não inventa autoria, avaliações, preços ou entidades.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category structured
```

- **Limite ou erro recorrente:** JSON válido não comprova veracidade nem garante
  apresentação especial na busca.
- **Instruções do agente:**
  [SKILL.md](../skills/astrofy-structured-data/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-structured-data/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-structured-data/examples/cases.md).

## astrofy-i18n

Configura idiomas e relações entre páginas em sites Astro, verificando rotas,
fallback e metadados das traduções disponíveis.

- **Entradas necessárias:** Idiomas habilitados e traduções reais.
- **Quando usar:** Relacione /pt/sobre/ e /en/about/ quando ambas as traduções
  estiverem publicadas.
- **Adaptação de projeto existente:** Um site mantém o idioma padrão sem
  prefixo. Preserve essa convenção ao adicionar outro idioma.

### Procedimento

Defina convenção de rotas e idioma padrão. Use a integração nativa compatível
com Astro. Relacione páginas equivalentes e documente fallback. Confira
navegação entre idiomas, lang, canônicas e hreflang sem anunciar tradução
ausente.

### Entrega e conferência

A navegação chega a páginas existentes e identifica corretamente o idioma de
cada conteúdo.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category routing
```

- **Limite ou erro recorrente:** Não gere hreflang para uma tradução que ainda
  não possui rota publicada.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-i18n/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-i18n/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-i18n/examples/cases.md).

## astrofy-forms

Integra formulários em páginas Astro com validação e mensagens acessíveis,
verificando o destino de envio em ambiente autorizado.

- **Entradas necessárias:** Campos, endpoint e contrato de submissão fornecidos.
- **Quando usar:** Teste um formulário com endpoint local que registra uma
  submissão controlada.
- **Adaptação de projeto existente:** Um site já usa provedor externo. Preserve
  o contrato e a configuração pública ao reorganizar o componente.

### Procedimento

Modele rótulos e instruções dos campos. Valide também no servidor e trate
estados de envio, erro e sucesso. Use proteção adequada ao endpoint. Teste
submissão somente no ambiente autorizado e confirme a chegada ao destino
esperado.

### Entrega e conferência

O envio de teste chega ao destino, mensagens são acessíveis e nenhuma credencial
aparece no cliente.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category forms
```

- **Limite ou erro recorrente:** Uma mensagem de sucesso na tela não comprova
  recebimento. Confira a resposta e o destino.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-forms/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-forms/references/technical.md).
- **Exemplos:** [casos de execução](../skills/astrofy-forms/examples/cases.md).

## astrofy-testing

Organiza testes de contratos e fluxos de sites Astro conforme o impacto da
mudança, registrando ambiente e limites da cobertura.

- **Entradas necessárias:** Mudança solicitada e fluxos afetados.
- **Quando usar:** Teste que um rascunho não gera rota nem aparece no arquivo
  paginado.
- **Adaptação de projeto existente:** Uma alteração no menu exige refazer o
  percurso de teclado, mesmo com build sem erros.

### Procedimento

Escolha testes que reproduzam uma falha possível. Use checagem de tipos e build
para integração, navegador para comportamento e capturas para comparação visual.
Registre tema e viewport. Evite testes que apenas repetem o código implementado.

### Entrega e conferência

Os testes protegem comportamento observável e falham quando o contrato
correspondente é violado.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --category quality
```

- **Limite ou erro recorrente:** Não use um teste de existência de arquivo como
  prova de funcionamento do formulário.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-testing/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-testing/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-testing/examples/cases.md).

## astrofy-build-deploy

Prepara build e operação de publicação em projetos Astro, respeitando o
adaptador e o provedor existentes e validando o ambiente.

- **Entradas necessárias:** Manifesto, adaptador, ambiente e provedor adotado.
- **Quando usar:** Gere dist de um site estático e confira suas rotas no
  preview.
- **Adaptação de projeto existente:** Um site usa adaptador Node. Preserve o
  modo servidor e documente seu comando de execução.

### Procedimento

Identifique o modo estático ou servidor e o adaptador compatível. Confira
variáveis por ambiente e scripts de build. Execute o build autorizado, teste
preview e documente a publicação conforme o provedor. Publique apenas dentro da
autorização recebida.

### Entrega e conferência

O build é reproduzível e o procedimento descreve entradas, saída e teste após
publicação.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --rule quality.build
```

- **Limite ou erro recorrente:** Não substitua o provedor ou atualize uma major
  version apenas para simplificar o build.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-build-deploy/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-build-deploy/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-build-deploy/examples/cases.md).

## astrofy-security

Revisa entradas, segredos e execução de HTML ou MDX em projetos Astro, aplicando
correções delimitadas e documentando o alcance.

- **Entradas necessárias:** Origem das entradas, renderização e dependências.
- **Quando usar:** Escape o caractere menor que ao serializar JSON-LD dentro de
  script.
- **Adaptação de projeto existente:** Um site recebe HTML de CMS. Confira a
  política de sanitização no ponto de entrada existente.

### Procedimento

Localize entradas externas e seus consumidores. Confira serialização em HTML,
uso de set:html e origem do MDX. Procure credenciais em configuração pública e
examine dependências relevantes. Corrija ocorrências demonstradas e registre o
alcance da revisão.

### Entrega e conferência

As correções possuem caso reproduzível. O relatório não expõe credenciais nem
declara auditoria completa por análise automática.

A skill indica a seguinte verificação, complementada pelos testes e pela revisão
do escopo descrito acima:

```bash
astrofy check --rule config.secrets
```

- **Limite ou erro recorrente:** Não compile MDX externo nem importe
  configuração desconhecida durante uma inspeção estática.
- **Instruções do agente:** [SKILL.md](../skills/astrofy-security/SKILL.md).
- **Referências:**
  [fontes técnicas](../skills/astrofy-security/references/technical.md).
- **Exemplos:**
  [casos de execução](../skills/astrofy-security/examples/cases.md).
