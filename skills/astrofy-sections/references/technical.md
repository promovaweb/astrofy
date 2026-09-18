# Referência técnica de astrofy-sections

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia seções consumidoras, componentes primitivos, conteúdo tipado e slots.

Modele uma responsabilidade por seção e separe conteúdo repetido de ações
compostas. Preserve hierarquia de headings definida pela página.

## Alteração compatível

Extraia a seção de um consumidor real e valide um segundo uso com conteúdo
diferente antes de acrescentar variações.

## Diagnóstico

Duas FAQs na mesma página não podem repetir IDs. Links de âncora precisam chegar
à pergunta correta e manter o foco visível.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Seções reutilizáveis

Seção recebe conteúdo explícito e não lê dados globais escondidos. Slot nomeado
representa região opcional como media ou actions; Astro.slots.has evita wrapper
vazio.

O nível do heading vem da posição na página; uma seção reutilizável não deve
impor h1 a todos os consumidores. Exponha classe adicional apenas quando a
composição realmente pedir.

## Semântica da composição

Use section para agrupamento temático, normalmente identificado por heading.
Um wrapper usado apenas para largura ou fundo pode ser div. Conteúdo autônomo
pode pedir article; navegação pede nav. Não escolha a tag pelo nome do componente.

Quando uma região precisar de nome acessível, associe aria-labelledby ao heading
existente e confira o ID na mesma instância. Dar nome a toda subdivisão visual
pode produzir excesso de landmarks; avalie a estrutura da página completa.

Defina quem controla o nível do título: prop tipada, slot ou composição externa.
Evite gerar headings duplicados quando o consumidor fornece seu próprio título.
Tamanho visual usa CSS e não precisa determinar h2, h3 ou outro nível semântico.

## Variantes e conteúdo opcional

Modele variantes mutuamente exclusivas com união de valores, em vez de vários
booleans que podem entrar em conflito. Separe variação de layout de dados do
conteúdo. Uma seção com mídia opcional precisa declarar como a grade se comporta
sem ela, sem reservar uma coluna vazia inadvertidamente.

Use lista tipada para itens de mesma estrutura e slots para regiões compostas.
Não transforme markup recebido como string em set:html apenas para flexibilizar
a API. Conteúdo externo exige o tratamento adequado antes de virar HTML.

Defina comportamento para lista vazia, item incompleto e ausência de ação.
Omitir uma seção vazia pode ser correto, mas não deve esconder silenciosamente
dados obrigatórios que falharam na origem. Diferencie ausência prevista de erro.

## IDs, interação e tamanho disponível

Receba identificador estável quando houver âncora pública. Para controles
internos, componha IDs por instância e item, sem depender somente de título
repetível. Duas FAQs com a mesma pergunta precisam continuar independentes.

Escopo de listeners deve respeitar a instância. Um querySelector global para
o primeiro botão pode deixar as demais seções sem comportamento. Teste duas
instâncias e, quando ClientRouter existir, navegação de ida e volta.

Teste largura do contêiner, além de viewport: a seção pode aparecer em coluna
estreita num desktop. Texto longo, ausência de imagem e tradução maior devem
preservar ordem do DOM, leitura e área de foco. Documente apenas variantes
implementadas e verificadas nos consumidores reais.

## Fontes

- [Elemento section](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section):
  agrupamento temático, heading e nome acessível de região.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Theme variables](https://tailwindcss.com/docs/theme):** namespaces de
  variáveis e utilitários do Tailwind 4; confira o CSS compilado.
- **[documentação para sections](https://docs.astro.build/en/basics/astro-components/):**
  Astro.props, slots nomeados e fallback; consulte ao alterar a API de um
  componente.
