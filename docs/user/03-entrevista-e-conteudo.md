# Entrevista e conteúdo

A especialista escolhida no capítulo 2 pergunta somente o necessário para
o tipo de página em questão — ela não aplica um questionário fixo. Ela
aceita três formas de resposta igualmente válidas: texto pronto para
publicar, notas incompletas que ela organiza, ou autorização explícita
para propor alternativas quando você não tem uma resposta formada ainda.

## O que a entrevista cobre, e por que cada item importa

- **Finalidade e ação principal** — sem isso, nenhuma outra decisão tem
  base; é o que a página precisa fazer alguém fazer.
- **Público e contexto de chegada** — a mesma oferta se apresenta
  diferente para quem chega de um anúncio e para quem chega de uma busca
  já informada.
- **Áreas da página e ordem de leitura** — a arquitetura aprovada no
  capítulo 2 ganha conteúdo real aqui, área por área.
- **Títulos, textos, rótulos e mensagens de estado** — inclui texto que
  é fácil esquecer, como a mensagem de erro de um formulário ou o rótulo
  de um botão desabilitado.
- **Imagens, vídeos, ilustrações e suas fontes** — a especialista
  registra a origem para a skill de implementação saber se precisa
  buscar, gerar ou receber o arquivo.
- **Links, formulários e integrações** — destinos reais, não
  placeholders; um link `#` ou um endpoint fictício se propaga para o
  plano técnico como se fosse real.
- **Amostra de texto aprovada, tom desejado e expressões a preservar ou
  evitar** — é o que faz a copy escrita por uma skill técnica soar como
  a marca, em vez de genérica.
- **Fatos que precisam de fonte** — números, afirmações institucionais e
  qualquer coisa verificável entra marcada, para que a revisão saiba o
  que confirmar antes de publicar.
- **Conteúdo ainda pendente** — uma lacuna reconhecida e registrada é
  diferente de uma lacuna que ninguém percebeu.

## Como responder

Você pode responder uma etapa por vez, na ordem que a especialista
apresenta, ou tudo de uma vez se já tiver as respostas prontas. Para cada
proposta dela, três reações são válidas: **aprovar**, **ajustar** ou
**manter pendente**. Não existe uma quarta opção de "ignorar" — uma área
sem resposta vira pendência registrada, não um vazio silencioso.

Quando você fornece um texto final, diga explicitamente que ele deve ser
preservado. Copy fornecida e aprovada não é reescrita só para caber no
layout — se o texto não couber, a solução é ajustar o layout, a skill de
implementação não tem autorização para encurtar ou reescrever conteúdo
que você já aprovou. Quando você quiser ajuda editorial em vez de
escrever o texto você mesmo, informe os fatos disponíveis e o tom
desejado; o agente propõe a copy como rascunho, não como final.

Você também pode fornecer uma amostra de texto já aprovada em outro
lugar (um post, um email, uma página existente) ou simplesmente descrever
como quer que a página soe ("direto, sem jargão", "mais técnico que o
resto do site"). O Astrofy registra essa orientação de voz para que as
skills que escrevem ou revisam copy no plano técnico (capítulo 4) e na
execução (capítulo 5) a usem — isso evita que o tom combinado na
entrevista se perca entre uma etapa e outra.

Propostas escritas pelo agente permanecem como rascunho até sua
aprovação explícita — nada que você não aprovou vira parte da
especificação final. Áreas opcionais podem ficar pendentes
deliberadamente: a aprovação final registra esse estado, então uma
lacuna conhecida não é preenchida silenciosamente durante a
implementação só porque alguém esqueceu que ela existia.

## Conduza a entrevista na conversa

No caminho comum, você simplesmente responde às perguntas do agente na
ordem em que ele as apresenta. Em cada ponto de decisão, aprove, ajuste
ou deixe uma área opcional pendente, usando linguagem natural — não há
sintaxe especial a aprender. O agente registra cada resposta e monta a
especificação conforme a conversa avança; você não precisa saber em que
arquivo ou formato isso está sendo salvo.

## Alternativa pelo CLI

Use estes comandos se você quiser conduzir a mesma entrevista pelo
terminal, sem o agente — por exemplo, para integrar a uma automação ou
para registrar respostas de um formulário externo. Eles não são
necessários no uso conversacional comum.

Inicie a entrevista informando o slug e o tipo da página:

```bash
astrofy page create --slug atlas --type product
astrofy page status --slug atlas
```

`page status` devolve até três itens em `nextQuestions` — o mesmo limite
que a conversa usa, para não sobrecarregar quem está respondendo com uma
lista longa de uma vez. Registre cada resposta com o identificador de
campo recebido:

```bash
astrofy page answer --slug atlas --field title --value "Atlas"
astrofy page answer --slug atlas --field route --value /atlas/
```

O arquivo `interview.json` conserva respostas e lacunas entre execuções —
rodar `page answer` em sessões diferentes continua a mesma entrevista, não
recomeça do zero. Quando todas as entradas obrigatórias existem, o
próprio comando gera `page-spec.json` com conteúdo, SEO, integrações,
acessibilidade e a lista de testes esperados, sem uma etapa separada.

O schema atual do CLI não tem um campo próprio para amostras de voz.
Quando conduzir a entrevista pelo terminal, registre a direção de voz
confirmada na seção "Voz e redação" de `page.md`, manualmente, durante a
revisão da especificação — no uso conversacional, o agente já faz esse
registro por você.

## Exemplo curto

```text
Usuário: Quero uma página do produto Atlas.
Astrofy: A ação principal deve iniciar teste, solicitar demonstração ou comprar?
Usuário: Solicitar demonstração.
Astrofy: Vou propor três arquiteturas para uma página de produto orientada à demo.
```

A partir daqui a conversa continua área por área — capacidades a
destacar, integrações reais, provas disponíveis — até a especificação
completa estar pronta para sua revisão final.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Coleta e aprovação do conteúdo de páginas |
| Autoridade | Contrato das entrevistadoras do Astrofy |
