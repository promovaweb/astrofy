# Referência técnica de astrofy-internal-links

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia HTML atual, rotas, headings, arquivo MDX de origem e destinos candidatos.

Leia o parágrafo e a seção de destino antes de propor âncora. Altere somente o
destino necessário e preserve imports, frontmatter e código.

## Alteração compatível

Atualize referências a heading renomeado após confirmar seus consumidores. Evite
substituir ocorrências da URL dentro de código ou rótulos.

## Diagnóstico

Um fragmento ausente deve ser detectado. Após corrigir o destino e repetir o
scanner, o link deve existir uma única vez no parágrafo.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra           | Método      | Escopo | Verificação                                    |
| --------------- | ----------- | ------ | ---------------------------------------------- |
| `links.broken`  | `automatic` | `page` | Links internos e âncoras verificáveis válidos. |
| `links.orphans` | `hybrid`    | `page` | Páginas órfãs identificadas e avaliadas.       |
| `links.context` | `manual`    | `page` | Âncoras e sugestões fazem sentido no contexto. |

## Links publicados

links scan lê títulos, headings, taxonomias e links do HTML gerado. Ele não
altera o Markdown. O arquivo-fonte é localizado antes da edição para evitar
substituição em import, URL literal ou bloco de código.

Fragmento usa o id emitido no HTML, não suposição sobre título. Proposta
registra origem, texto âncora, URL e razão contextual.

## Resolução do destino

Resolva href contra a URL publicada da página de origem, usando URL em vez de
concatenar strings. Caminho iniciado por barra parte da raiz do domínio;
caminho relativo depende do diretório da URL base. Considere elemento base
quando ele existir no HTML. Não use o caminho do arquivo MDX como base de uma
URL publicada.

Compare origin e a configuração de domínios do projeto para classificar links
internos. Um href absoluto pode ser interno; mailto, tel e download não são
rotas HTML comuns. Preserve query quando ela altera o conteúdo ou comportamento.
Não remova parâmetros automaticamente para fazer o scanner aceitar uma URL.

Distinga existência de arquivo no build e resposta do host. Rotas SSR podem
não ter arquivo HTML correspondente. Redirecionamentos e rewrites também
dependem da publicação. Para esses casos, confira status e destino final no
ambiente de teste e registre a limitação da análise estática.

## Fragmentos e alterações de headings

Compare o fragmento com o ID realmente emitido. Headings repetidos, acentos,
pontuação e plugins de Markdown podem mudar o identificador. IDs não se limitam
a headings; uma seção ou componente pode fornecer o destino. Valide codificação
do fragmento sem alterar silenciosamente capitalização do ID.

Após renomear heading, procure consumidores em conteúdo, navegação e componentes.
Um link para a mesma página também exige conferência. Se houver consumidores
externos relevantes, avalie conservar um ID estável no conteúdo, sem duplicar
IDs nem inserir uma âncora inacessível.

## Edição e rastreabilidade

Associe cada diagnóstico ao arquivo-fonte e ao nó de link. Links de referência
Markdown podem compartilhar uma definição; alterar sua URL modifica todos os
consumidores. Em MDX, props podem gerar links por expressão. Não trate import,
string de código e href de componente como a mesma ocorrência textual.

Conserve o rótulo salvo quando a correção pedida afeta somente o destino.
Antes de inserir uma nova ligação, confira se o leitor encontra no destino a
explicação prometida pelo trecho. Link de menu e link contextual têm funções
diferentes; contagem total não mede utilidade editorial.

Uma página sem links de entrada no conjunto examinado é candidata a órfã,
não prova de ausência em todo o site. Registre rotas incluídas no scan, páginas
SSR não visitadas e conteúdo intencionalmente isolado. Refazer o scan sobre
build antigo não comprova que a edição foi publicada no HTML.

## Fontes

- [Construtor URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL):
  resolução relativa, URL absoluta e tratamento de entradas inválidas.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/):**
  compilação MDX e imports de componentes; consulte ao alterar schema ou
  renderização do corpo.
