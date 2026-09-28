# Referência técnica de astrofy-editorial-review

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia texto completo, glossário, idioma, fontes factuais e componentes que o
exibem.

Separe correção linguística de alteração de fatos. Preserve código inline, nomes
de propriedades, URLs e citações que exigem reprodução literal.

## Alteração compatível

Revise texto antigo respeitando a voz registrada e o glossário do projeto.
Não altere oferta, números, nomes ou promessas sem confirmar a fonte
correspondente. Uma ocorrência isolada de um padrão não justifica mudar a voz
nem rotular a origem do texto.

## Sinais de texto genérico

Use a leitura editorial para localizar alegações amplas sem fonte, vocabulário
inflado, introduções que anunciam o assunto, transições vazias, finais
genéricos, estruturas repetidas, exagero de ênfase, abstrações com ação humana,
omissão de atores conhecidos e frases que não acrescentam informação. Esses
sinais pedem avaliação contextual, não substituições automáticas. Confira se
há um conjunto de ocorrências e se a voz aprovada as justifica.

## Modo de auditoria e modo de edição

Quando a pessoa pede diagnóstico, não altere arquivos. Apresente os trechos
observados, o padrão, seu efeito e uma ação possível. Não use detectores nem
atribua autoria com base em características de escrita. Quando a pessoa pede
edição, faça a menor correção que resolva o problema e preserve o texto
aprovado fora do escopo indicado.

Preserve detalhes específicos confirmados, marcas de voz intencionais, humor,
tensão, apartes e variações de ritmo. Não acrescente fatos, nomes, números,
depoimentos, funções, fontes ou resultados. Se a reescrita depender de algo que
não consta nas fontes, solicite confirmação ou mantenha o trecho delimitado ao
que já foi informado.

Leia a página inteira para reconhecer moldes repetidos em headings, aberturas,
parágrafos e CTAs. Compare a edição com amostras aprovadas e preserve seus
traços de vocabulário, formalidade, pessoa e cadência. Não aplique o mesmo
formato a todas as seções só para obter consistência visual.

## Ciclo de revisão anti-slop

1. Leia o texto completo, o objetivo da página, a voz registrada e as fontes.
2. Identifique os trechos e explique o efeito de leitura, sem atribuir origem
   automática ao texto.
3. Confirme alegações e nomes próprios. Marque separadamente os pontos sem
   fonte.
4. Reescreva os trechos necessários sem trocar a intenção ou os fatos.
5. Confira a página renderizada e compare o conjunto com a voz aprovada. Leia
   em voz alta para localizar frases artificiais e confira se a mudança de
   ritmo ajuda o raciocínio, sem criar coloquialismos ou erros de propósito.

## Diagnóstico

Corrigir um rótulo não deve mudar href ou nome de evento. Compare texto e
atributos antes e depois da edição.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                    | Método   | Escopo | Verificação                                          |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `editorial.spelling`     | `hybrid` | `page` | Ortografia revisada no idioma configurado.           |
| `editorial.terms`        | `hybrid` | `page` | Glossário e nomes próprios preservados.              |
| `editorial.placeholders` | `hybrid` | `page` | Conteúdo provisório removido das páginas publicadas. |

## Revisão no site

Texto em componente Astro, MDX e configuração pública pode ter contexto
diferente. Localize a fonte antes de editar HTML gerado. Não normalize termos
técnicos, nomes de API ou títulos de documentos sem fonte local.

A revisão final usa rota renderizada para conferir truncamento, links, headings
e mensagens associadas a controles.

## Localização do texto e contexto

Relacione trecho renderizado à fonte: nó Markdown, prop de componente, dicionário
de tradução ou configuração pública. O mesmo rótulo pode aparecer em vários
contextos; não substitua todas as ocorrências antes de conferir seus consumidores.
Não edite dist para corrigir texto que será sobrescrito no próximo build.

Leia também texto não visível no estado inicial: alt, nome acessível, mensagens
de erro e instruções de formulário. Preserve concordância entre rótulo visível
e nome anunciado. Mensagem de sucesso precisa descrever o estado confirmado
pelo sistema, não um resultado ainda pendente no provedor.

## Edição de Markdown e MDX

Separe prosa, frontmatter, código, imports e expressões JSX. Uma troca global
de aspas ou chaves pode alterar sintaxe executável. Use edição delimitada ou
parser compatível e confira o diff por tipo de conteúdo.

Preserve URLs e definições de links quando a alteração for somente linguística.
Mudar heading pode mudar fragmento publicado; procure consumidores e confira
o ID final no HTML. Título editorial, slug e ID da coleção não são o mesmo campo.

Exemplos de código mantêm comandos e identificadores exatos. Corrija comentários
ou explicações sem traduzir flags e nomes de propriedades. Se encontrar erro
técnico no exemplo, registre-o e valide a correção pelo procedimento técnico
correspondente, sem tratá-lo como simples ortografia.

## Fatos, glossário e saída

Registre a fonte de números, nomes, versões e datas que precisarem de conferência.
Quando duas fontes divergirem, exponha a divergência; não escolha o valor que
melhor completa a frase. Preserve distinção entre citação literal e paráfrase.

Não transforme glossário em substituição cega: um termo pode estar correto num
identificador e inadequado numa frase. Registre exceções pelo contexto concreto.
Placeholder identificado exige conteúdo fornecido ou remoção coerente da região,
não fabricação de depoimento, métrica ou dado comercial.

Depois da edição, valide o schema quando mudar frontmatter, compile MDX quando
afetar sua estrutura e confira a rota renderizada. Formatação aprovada não
comprova fidelidade factual. Relate correções aplicadas e pontos ainda sem fonte.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
