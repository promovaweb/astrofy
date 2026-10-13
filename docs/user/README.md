# Astrofy: guia do usuário

Use o Astrofy em uma conversa com Codex ou Claude. Depois de instalar o
pacote e disponibilizar as skills no projeto, descreva o trabalho com
suas próprias palavras — sem precisar nomear um comando, uma skill ou um
formato de arquivo. O agente examina o site, seleciona as skills
necessárias conforme o pedido e solicita só as informações que faltam
para continuar, em vez de seguir um roteiro fixo igual para todo caso.

Este manual existe para as duas situações em que vale a pena consultá-lo
diretamente: quando você quer entender o que o agente está fazendo e por
quê, antes de aprovar algo; e quando você quer conduzir uma etapa
manualmente pelo terminal, sem o agente — por exemplo, numa automação ou
num script de CI.

## Comece aqui

1. [Instale o pacote e as skills](01-instalacao-e-setup.md).
2. [Veja como a conversa conduz o trabalho](00-visao-geral.md) — este
   capítulo explica por que o percurso de página é dividido em etapas e
   o que cada etapa produz.
3. Descreva ao agente a página ou a mudança desejada, em linguagem
   natural.

Os demais capítulos explicam cada etapa em profundidade: o porquê de
cada decisão de design do Astrofy, não só o passo a seguir. Volte a eles
quando quiser acompanhar o que o agente está fazendo, entender por que
ele pediu algo específico, ou operar o CLI manualmente.

## Consulte pela tarefa

- **Definir uma página:** [planejamento](02-planejamento-de-pagina.md) e
  [entrevista de conteúdo](03-entrevista-e-conteudo.md) — do pedido
  inicial até o conteúdo aprovado.
- **Revisar a implementação:** [plano técnico](04-plano-de-implementacao.md)
  e [execução e validação](05-execucao-e-validacao.md) — como o conteúdo
  aprovado se transforma em tarefas técnicas e código.
- **Consultar exemplos:** [sete tipos de página](06-exemplos-por-tipo-de-pagina.md)
  — um percurso resumido para cada tipo de entrevistadora.
- **Continuar depois:** [execução retomável](07-execucao-retomavel.md) e
  [retomada e manutenção](09-retomada-e-manutencao.md) — estados,
  transições e como voltar a um projeto depois de um tempo.
- **Registrar uma tarefa pontual do site:** [sitespec](08-sitespec-tarefas-do-site.md)
  — para qualquer trabalho que não é uma página nova, e para as
  próprias tarefas técnicas derivadas de uma página.
- **Resolver uma falha:** [solução de problemas](10-solucao-de-problemas.md).

O [manual do CLI](../cli.md) descreve, comando por comando, todas as
opções disponíveis para instalação de skills, consulta de estado,
checks, revisão manual e entrevistas pelo terminal — use-o como
referência de sintaxe quando já souber qual comando quer executar; use
este manual quando quiser entender o fluxo por trás do comando.

## Formatos

Os capítulos deste diretório são a fonte canônica — eles não são gerados
a partir de outro lugar. O projeto compila a mesma edição em PDF e EPUB
dentro de `ebook/`, para leitura offline ou distribuição fora do
repositório. A versão do manual (e do ebook) acompanha a versão do
pacote Astrofy publicada no npm; os dois nunca divergem porque o próprio
processo de release recusa publicar uma versão nova sem recompilar e
validar o ebook contra os capítulos atuais.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Percurso completo do usuário do Astrofy |
| Autoridade | Skills, schemas e comandos distribuídos pelo pacote |
