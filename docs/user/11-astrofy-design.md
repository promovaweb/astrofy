# Astrofy Design na prática

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

## Escolher entre examinar e alterar

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

## Criar uma página ou um componente

Use `build` quando precisar implementar uma interface nova no projeto Astro.
Informe a finalidade da página, o conteúdo aprovado e o destino esperado para
a ação principal. O agente consulta os componentes disponíveis e apresenta a
composição antes de escrever o código, quando ainda houver escolhas abertas.

Por exemplo, você pode pedir: “Use astrofy-design build para criar uma página
de produto com este conteúdo aprovado. Reaproveite o cabeçalho, os botões e os
tokens do site. A ação principal deve abrir o formulário de demonstração.”
Esse pedido relaciona a composição com elementos reais do projeto. Se o
formulário ainda não existir, o agente precisa informar isso antes de tratar
a ação como funcional.

O mesmo modo atende a um componente isolado. Ao pedir uma tabela de preços,
você pode delimitar a mudança à tabela e aos estados de seus botões. Isso
permite avaliar a leitura dos planos sem redesenhar o cabeçalho, o rodapé e
as outras seções da página. Confira também onde esse componente é usado,
pois uma alteração compartilhada pode aparecer em mais de uma rota.

A skill não completa informações comerciais ausentes. Preços, depoimentos,
quantidades de clientes e resultados precisam vir do conteúdo aprovado.
Quando falta uma imagem, você pode fornecer um arquivo ou solicitar sua
produção. Os caminhos ilustrativos da biblioteca não são imagens prontas
para entrar no site.

## Estudar uma referência visual

O modo `study` recebe uma URL ou uma imagem e descreve como os elementos se
organizam. Você pode usá-lo para entender por que uma composição funciona
antes de pedir algo semelhante para seu próprio conteúdo. O estudo examina
hierarquia, distribuição do espaço, papéis tipográficos e cores, sem alterar
a página do projeto.

Um pedido possível é: “Use astrofy-design study nesta captura. Explique como
o título, a imagem e a ação principal se relacionam e o que muda numa tela
estreita.” Uma captura registra apenas o estado visível. Ela não comprova
como um menu abre, como a página reage ao teclado ou qual fonte foi usada.
Essas informações precisam permanecer identificadas como não verificadas.

Uma URL pode permitir a leitura do HTML e do CSS, dependendo do acesso e das
ferramentas disponíveis. Se o endereço exigir autenticação ou devolver apenas
uma estrutura vazia que depende de JavaScript, o agente deve explicar a
limitação. O estudo não deve apresentar uma descrição visual inventada para
compensar a falta da página renderizada.

Depois da análise, você pode encerrar o trabalho, pedir uma composição para
seu conteúdo ou solicitar um `design.md` portátil. Esse arquivo registra o
sistema visual que será usado no seu projeto. Estudar uma página externa não
transfere seus textos, logos, fotografias ou outros ativos para o seu site.

## Manter a identidade entre páginas

Num redesign de várias rotas, o agente começa pelo contrato visual comum.
A página de produto e a página de preços podem distribuir o conteúdo de formas
diferentes, mas precisam continuar compartilhando as fontes, as cores e os
estados dos componentes definidos para a marca. Trocar o tema em cada rota
prejudicaria essa continuidade.

Você pode pedir: “Use astrofy-design redesign nas páginas de produto e preços.
Mantenha a identidade atual e aplique o mesmo padrão de botões e títulos nas
duas. Preserve os formulários, as URLs e os textos aprovados.” O agente deve
apresentar os arquivos envolvidos e conferir os componentes compartilhados
antes de implementar as mudanças.

Os tokens concentram valores reutilizados, como cores e espaçamentos. No
Astrofy, os caminhos do arquivo de design e do CSS gerado vêm da configuração
do projeto. A mudança começa na fonte dos tokens e passa pelo gerador. Editar
somente o CSS gerado faria o ajuste desaparecer na próxima geração.

A skill conserva um histórico das composições em `.astrofy/design/log.json`.
Esse registro ajuda a consultar trabalhos anteriores e mantém até vinte
entradas recentes. Ele não substitui o Git nem registra automaticamente uma
aprovação. Os modos de estudo e auditoria não criam esse histórico.

## Conferir a entrega

Abra a página em larguras de celular e desktop. Confira se o título cabe,
se os elementos mantêm a ordem de leitura e se a ação principal continua
acessível. Uma composição pode parecer correta numa captura larga e ainda
produzir rolagem horizontal ou esconder parte do formulário numa tela estreita.

A conferência precisa incluir teclado, foco visível e os estados que o
componente oferece. Se houver animação, verifique a alternativa para redução
de movimento. Num site com temas claro e escuro, confira as cores em ambos.
O relatório deve distinguir o que foi observado no navegador do que foi
conferido apenas pela leitura dos arquivos.

Execute os scripts de validação e build declarados pelo projeto. Em uma
instalação inicializada do Astrofy, os comandos de tokens ajudam a conferir
se a fonte e o CSS gerado continuam sincronizados. Esses resultados precisam
acompanhar a inspeção visual, porque a validade do arquivo não comprova que o
botão funciona ou que a página mantém uma leitura confortável.

Para consultar as entradas de cada modo, os arquivos envolvidos e mais
exemplos de pedidos, use a [referência do Astrofy Design](12-astrofy-design-referencia.md).
O capítulo de [execução e validação](05-execucao-e-validacao.md) explica como
registrar as verificações do projeto depois da implementação.
