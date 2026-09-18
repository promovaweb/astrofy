# Referência técnica de astrofy-structured-data

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia conteúdo visível, entidades, IDs estáveis e serialização JSON-LD.

Derive propriedades da mesma fonte usada pelo texto. Valide JSON e
correspondência factual separadamente. Escape conteúdo inserido em script HTML.

## Alteração compatível

Preserve @id de entidades já publicadas ao centralizar marcação. Remova
duplicações sem fabricar avaliações, preços ou autores.

## Diagnóstico

Um título contendo fechamento de script precisa permanecer texto no JSON-LD, sem
criar novo elemento ou executar código.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra              | Método      | Escopo | Verificação                                |
| ------------------ | ----------- | ------ | ------------------------------------------ |
| `structured.valid` | `automatic` | `page` | Dados estruturados sintaticamente válidos. |
| `structured.truth` | `hybrid`    | `page` | Marcação corresponde ao conteúdo visível.  |

## Grafo JSON-LD

@id identifica entidade e pode usar fragmento da canonical. URLs de image, url
e logo devem apontar para recursos públicos; publisher representa uma entidade
Organization ou Person, embutida ou referenciada por @id. Não informe data, autor ou avaliação que não
aparece na página.

JSON.stringify evita montagem inválida; sequência de fechamento de script recebe
tratamento antes de entrar no elemento script.

## Identidade das entidades

Separe WebPage, conteúdo principal e organização responsável. A URL da página
e o @id de uma entidade podem se relacionar sem representar a mesma coisa.
Adote identificadores estáveis para Organization e Person; não crie uma nova
organização para cada artigo somente porque a canonical mudou.

Quando vários componentes emitem JSON-LD, compare os objetos por @id e conteúdo.
Dois scripts não são necessariamente erro, mas descrições conflitantes da mesma
entidade precisam ser reconciliadas na fonte. @graph permite agrupar entidades;
não torna válidas propriedades incompatíveis com o tipo escolhido.

Um tipo TypeScript ajuda durante a implementação, mas não valida dados externos
em runtime. Confira presença, tipo e significado de cada propriedade a partir
da coleção ou API antes de construir o objeto. Não preencha campo desconhecido
com string vazia, zero ou data atual apenas para satisfazer um exemplo.

## Serialização no Astro

Monte um objeto de dados e serialize com JSON.stringify. Antes de inseri-lo em
script application/ld+json usando set:html, transforme o caractere menor-que
no escape JSON literal barra invertida seguido de u003c. Isso impede que texto
contendo fechamento de script encerre prematuramente o elemento no parser HTML.

Evite concatenar propriedades em strings ou aplicar escape de entidades HTML
ao JSON dentro do script. Depois de renderizar, leia textContent e aplique
JSON.parse; o valor recuperado deve corresponder ao objeto original. Confira
também o DOM para detectar elementos introduzidos por uma serialização incorreta.

Emita dados da rota no HTML correspondente. Se a informação muda por requisição,
use a mesma fonte e instante de leitura do conteúdo visível para evitar preço,
disponibilidade ou data divergentes. Data de build não substitui data de alteração
editorial do artigo.

## Verificações distintas

Primeiro confira JSON válido no HTML final. Depois confira vocabulário, tipos e
relações Schema.org. Por fim, quando houver objetivo de rich result, consulte
os requisitos atuais do recurso específico e execute seu validador apropriado.
Um tipo válido no Schema.org pode não ter apresentação especial no buscador.

Compare campos com conteúdo visível e fonte responsável por cada valor. JSON
válido ou teste de rich results aprovado não comprova exatidão factual e não
garante exibição especial. Registre URL, momento da coleta, ferramenta e alcance
de cada resultado.

## Fontes

- [Schema.org: introdução](https://schema.org/docs/gs.html): tipos, propriedades
  e relações entre entidades.
- [Diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies):
  correspondência com a página e limites da elegibilidade para rich results.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data):**
  relação entre marcação e conteúdo visível; confira elegibilidade separadamente
  da sintaxe JSON.
