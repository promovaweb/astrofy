# Preparação editorial do Astrofy Design

## Direção escolhida

O pedido abrange documentação, ebook e documentação do site. Na conversa,
Luiz escolheu “1 e 2”: guia prático e referência completa. A escolha vale
para esta documentação. O tutorial acompanhado não será a estrutura principal.

O guia do usuário explicará quando usar cada modo, como formular o pedido e
como conferir o resultado. A referência técnica detalhará entradas, arquivos,
persistência, limites e exemplos. O capítulo do guia será a fonte comum do
PDF, do EPUB e da página do site. Este registro interno não integra o ebook.

As fontes factuais são `skills/astrofy-design/SKILL.md`, suas referências,
`packages/core/skills.ts`, o catálogo e os testes de instalação. A documentação
não deve apresentar os modos da skill como subcomandos do CLI.

## Organização proposta

O capítulo do guia começará pelo trabalho visual numa página existente.
Depois apresentará criação, estudo, auditoria e redesign, com exemplos de
pedidos e interpretação das entregas. A parte final explicará os tokens,
o histórico e a conferência no navegador.

A referência técnica manterá as instruções de instalação e acrescentará uma
seção para cada modo. Cada seção descreverá entradas necessárias, opções,
resultado, arquivos alterados, limites e cinco exemplos distintos. Uma tabela
reunirá os caminhos persistentes e os arquivos de consulta da skill.

O texto falará diretamente com você, no presente, sem atribuir experiência
pessoal ao autor. Os exemplos serão situações ilustrativas. O fechamento
encaminhará para a conferência da página e para a referência técnica.

## Amostra para leitura

### Astrofy Design na prática

Uma página pode ter o conteúdo aprovado e ainda precisar de ajustes na
composição. O título ocupa espaço demais no celular, as seções parecem iguais
ou o botão principal perde destaque entre os outros elementos. Você pode
pedir ao Astrofy Design que examine essa página, explique os problemas ou
implemente uma nova composição, conforme o trabalho que pretende fazer.

A skill `astrofy-design` orienta o agente na organização dos elementos, na
tipografia, nas cores e nas interações. Ela consulta os componentes e os tokens
existentes antes de propor mudanças. Num site com várias páginas, a identidade
compartilhada continua orientando o resultado, mesmo quando uma seção recebe
uma composição diferente.

### Escolher entre examinar e alterar

Para entender o que precisa melhorar numa página existente, comece por
`audit`. O agente examina os arquivos indicados e apresenta os problemas
localizados, com sugestões de correção. Esse modo entrega o diagnóstico na
conversa e preserva os arquivos do projeto.

Você pode pedir: “Use astrofy-design audit na página de produto. Confira a
hierarquia dos títulos, o destaque da ação principal e o comportamento no
celular. Explique o que encontrou sem editar os arquivos.” O caminho da página
ajuda o agente a delimitar a análise. Se a conferência depender de abrir o
navegador e isso não for possível, a entrega deve indicar o que ficou pendente.

Quando você já pretende mudar a aparência, use `redesign` e descreva o que
quer preservar. Um pedido como “Reorganize a página de produto mantendo os
textos, o formulário e as cores da marca” autoriza uma mudança visual dentro
desse escopo. O agente precisa considerar os componentes que a página usa
para evitar que o ajuste altere outras rotas sem necessidade.

Os nomes `audit` e `redesign` fazem parte da conversa com o agente. Eles não
são comandos que você executa no terminal. O CLI instala a skill e oferece
verificações técnicas, enquanto o agente conduz a análise ou a implementação
solicitada.

## Estado da preparação

Luiz respondeu “1” ao checkpoint da amostra: manter a explicação direta, os
exemplos comentados e a referência separada. A voz, a organização e a amostra
estão aprovadas para expansão nesta documentação. A aprovação abrange o guia
prático e a referência de uso, com as mesmas fontes no ebook e no site.
A referência de implementação permanece em docs/design.md.

A execução inclui gerar PDF e EPUB, sincronizar as páginas e os downloads
do site e conferir os destinos. Não inclui commit, push ou deploy.

## Conferência da entrega

A expansão mantém a direção aprovada: explicação direta, exemplos comentados
no guia e consulta por modo na referência. Os quatro modos têm cinco exemplos
cada. Entradas, arquivos alterados e limites correspondem à skill local. Os
modos são pedidos ao agente, sem apresentá-los como comandos do CLI.

O guia completo passou pelo validador de conteúdo após a revisão dos trechos
apontados. As anotações restantes sobre vírgulas foram conferidas como
listas e enumerações; as expressões absolutas descrevem contratos do sistema.
O PDF e o EPUB foram recompilados. O PDF tem 46 páginas, com inspeção visual
da capa, do início do capítulo prático e de páginas da referência.

Os 101 testes unitários do Astrofy e os cinco testes de documentação passaram.
A verificação do ebook confirmou fontes, links e hashes. As 14 páginas e os
downloads foram sincronizados e passaram pela consulta posterior. O build do
site terminou com sucesso. As duas páginas novas e o início da documentação
abriram com HTTP 200 em 375 e 1440 pixels, sem rolagem horizontal; títulos,
canonical, imagens Open Graph e links de navegação foram conferidos.

O Markdown dos capítulos, deste registro, da referência técnica e da skill de
página passou. O validador de WEBSITE-PAGINAS.md apontou desalinhamento de tabela
na linha de page-home, fora da alteração de Astrofy. A consulta geral dos ebooks
open source também apontou divergências em outros projetos; a consulta limitada
a Astrofy passou após a sincronização. Esses arquivos alheios foram preservados.

A entrega permanece no worktree, sem commit, push ou deploy.

A auditoria final de SEO percorreu 2.247 páginas e 175.020 links internos.
Nenhuma falha restante pertence às rotas de Astrofy. As 13 falhas gerais são
metadados de outros projetos, um título de blog, uma descrição de
vulnerabilidade e um link interno ausente em outro artigo. O build final
passou após a revisão do título da home de Astrofy e dos trechos antigos
nos capítulos de execução retomável e sitespec. PDF, EPUB e destinos foram
regerados após essa revisão e a consulta de sincronização passou novamente.
