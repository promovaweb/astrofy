# Referência técnica de astrofy-i18n

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia idiomas existentes, idioma padrão, política de prefixos, traduções e
fallback.

Relacione equivalentes por identidade do conteúdo, não apenas pelo slug. Gere
alternates somente para rotas existentes e confira lang.

## Alteração compatível

Preserve o idioma padrão sem prefixo quando esse for o contrato atual. Ao
adicionar idioma, teste menus e fallback antes de gerar hreflang.

## Diagnóstico

Uma tradução ausente não pode produzir link 404. Cada página traduzida deve
declarar seu idioma e alternates coerentes.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Cobertura de idiomas

O catálogo atual não possui categoria i18n nem regra diretamente associada a
esta skill. O check de routing verifica somente as regras de rotas do framework.
Confira manualmente lang, hreflang, idioma padrão, prefixos, equivalência entre
traduções e fallback no HTML de cada idioma. A ausência de erro em routing não
aprova essas propriedades.

## Rotas multilíngues

Configuração de i18n no Astro define locales e defaultLocale. A página entrega
html lang compatível com o texto. Canonical aponta para a própria versão;
hreflang lista somente alternativas existentes.

Fallback não deve misturar idiomas sem sinalização. Rota dinâmica precisa
validar locale e slug antes da consulta, com resposta definida para combinação
ausente.

## Identidade, idioma e caminho

Separe a identidade estável do conteúdo, o código de idioma e o slug publicado.
Uma tradução pode usar outro slug; trocar apenas /pt/ por /en/ não encontra
necessariamente sua equivalente. Guarde o relacionamento na coleção ou fonte
de dados usada pelo projeto e rejeite dois registros com a mesma identidade
e locale publicados simultaneamente.

Quando locales usa objetos com path e codes, diferencie o segmento de URL dos
códigos aceitos. Não derive html lang de qualquer segmento sem consultar esse
mapeamento. O idioma declarado acompanha o texto entregue, inclusive quando
um fallback apresenta conteúdo de outra língua.

Use helpers de astro:i18n para aplicar a configuração de URLs. Eles não traduzem
texto nem descobrem o slug equivalente no CMS. Resolva primeiro o registro da
tradução e só depois componha a URL. Confira base e trailingSlash para evitar
prefixo duplicado ou dois endereços para a mesma página.

## Renderização e fallback

Em páginas prerenderizadas, gere somente combinações existentes de locale e
slug por getStaticPaths. Em execução por requisição, valide parâmetros e estado
de publicação antes de renderizar. Um locale reconhecido não torna válido
qualquer slug solicitado.

Diferencie redirect de rewrite: o primeiro muda o endereço do navegador; o
segundo pode entregar outro conteúdo mantendo a URL pedida. Registre código
HTTP, endereço final e idioma efetivamente exibido. Fallback não cria uma
tradução e não deve entrar na relação de equivalentes como se fosse uma.

Se routing for manual, confira quais responsabilidades saíram do middleware
nativo. Teste normalização, rota padrão, ausência de tradução e encadeamento
com middleware existente. Não mantenha dois redirecionamentos concorrentes
para o mesmo idioma.

## Troca de idioma e resposta HTTP

O seletor deve oferecer equivalentes disponíveis. Quando o produto permite
voltar ao índice do idioma por falta de tradução, identifique esse destino;
não apresente a home como tradução do artigo. Preserve query apenas quando
seus parâmetros tiverem significado também no destino. Fragmentos dependem
dos headings traduzidos e não devem ser copiados sem conferir sua existência.

Preferência do navegador não é o idioma do conteúdo. Se a aplicação negocia
idioma por requisição, preserve a escolha explícita do visitante e examine
cache quando headers ou cookies mudam a resposta da mesma URL. HTML estático
não executa negociação por visitante durante sua geração.

## Matriz de conferência

Para cada família de conteúdo, registre identidade, locale, URL, publicação,
lang, canonical e alternativas. Confira ida e volta no seletor, incluindo
slugs distintos. Para fallback, registre também o idioma de origem entregue.
Teste acesso direto, navegação interna, idioma desconhecido e conteúdo ausente.

## Fontes

- [API astro:i18n](https://docs.astro.build/en/reference/modules/astro-i18n/):
  helpers de URL e funções disponíveis para roteamento manual.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[Content collections](https://docs.astro.build/en/guides/content-collections/):**
  loader, schema e seleção de entradas; confira a API da major instalada.
- **[documentação para i18n](https://docs.astro.build/en/guides/internationalization/):**
  prefixDefaultLocale, fallback e URLs por idioma; confira a política de rotas
  existente.
