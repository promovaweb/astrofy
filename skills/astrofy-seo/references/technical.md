# Referência técnica de astrofy-seo

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia HTML atual, domínio de produção, política de staging, sitemap e robots.

Compare tags renderizadas por rota, inclusive paginação. Registre origem de cada
canonical e regra de indexação do ambiente.

## Alteração compatível

Preserve overrides autorizados e URLs publicadas. Corrija duplicação no layout
responsável em vez de acrescentar outra tag na página.

## Diagnóstico

Duas tags canonical na mesma página devem ser detectadas. Um staging
intencionalmente noindex não deve receber index por correção automática.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra             | Método      | Escopo | Verificação                                       |
| ----------------- | ----------- | ------ | ------------------------------------------------- |
| `seo.title`       | `hybrid`    | `page` | Título presente e adequado por página.            |
| `seo.description` | `hybrid`    | `page` | Descrição presente conforme política.             |
| `seo.canonical`   | `hybrid`    | `page` | Canônica absoluta e correta.                      |
| `seo.indexing`    | `hybrid`    | `page` | Robots e indexação coerentes com ambiente e rota. |
| `seo.sitemap`     | `automatic` | `page` | Sitemap contém as rotas elegíveis.                |
| `seo.language`    | `hybrid`    | `page` | Idioma declarado e consistente.                   |

## HTML indexável

Canonical é absoluto e único por página. Página paginada usa URL própria. robots
de staging segue a política do ambiente sem alterar produção por acidente.

Sitemap lista somente rotas canônicas indexáveis. Confira HTML renderizado, não
apenas Props do componente de metadados.

## Origem da canonical

Derive a canonical do domínio público configurado e do caminho normalizado.
Não use o host de preview ou qualquer Host recebido como fonte implícita da
identidade pública. Confira base e trailingSlash na URL resultante; new URL
com caminho iniciado por barra retorna à raiz do domínio.

Escolha explicitamente quais parâmetros alteram o conteúdo. Parâmetro de
campanha e filtro funcional não devem receber a mesma normalização por acaso.
Não use fragmento como canonical. Páginas paginadas com conteúdo distinto
mantêm sua própria identidade, em vez de apontar todas para a primeira página.

Compare canonical, links internos e sitemap para evitar destinos conflitantes.
Canonical é um sinal de preferência, não redirecionamento nem garantia de
seleção pelo buscador. Confira também eventual header Link emitido pelo host;
uma tag correta não elimina conflito com o header.

## Rastreamento e indexação

Leia robots.txt, meta robots e X-Robots-Tag na resposta real. Disallow trata
acesso do crawler; noindex trata indexação. Se o crawler não puder acessar a
página, pode não ler seu noindex. Não use robots.txt como mecanismo para escolher
uma canonical ou como proteção de conteúdo privado.

Confira a política de staging no host além do código Astro. Um header aplicado
pelo CDN pode permanecer após promover o ambiente. Teste uma URL pública de
produção e uma URL de staging sem reutilizar conclusões entre ambientes.

Página inexistente deve responder conforme o contrato de erro, não apenas
exibir texto de 404 dentro de resposta 200. Confira status sem seguir redirects
automaticamente e depois a cadeia até o destino final. Para SSR, teste a
resposta do adaptador; um arquivo de build não demonstra esse comportamento.

## Cobertura do sitemap

Compare URLs elegíveis com o XML produzido, inclusive arquivos referenciados
pelo índice de sitemaps. Configurar site é necessário para a integração gerar
URLs absolutas coerentes. Filtre páginas excluídas pela política do projeto.

Rotas dinâmicas renderizadas por requisição podem não ser enumeradas pelo build.
Quando a integração não as descobrir, forneça URLs pela opção apropriada, como
customPages, ou pela geração adotada no projeto. Confira disponibilidade e
publicação na fonte de conteúdo antes de incluir cada URL.

Lastmod deve refletir alteração relevante do conteúdo quando fornecido. Não
substitua todas as datas pelo horário da execução do build. Sitemap facilita
descoberta; não comprova indexação ou validade editorial de cada página.

## Metadados por rota e verificação

No layout, diferencie defaults e overrides da página; um título de marca não
pode apagar o título do artigo. Confira strings vazias e espaços, além de
ausência de props. Leia o head da resposta inicial e verifique que composição
de layouts não emite tags concorrentes.

Registre URL, status, redirects, canonical, instruções robots e presença no
sitemap. Separe correção local de observação em ferramenta do buscador. A
validação do Astrofy não informa por si só se uma URL está indexada.

## Fontes

- [Noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing):
  instrução de indexação e necessidade de acesso para leitura.
- [Integração sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/):
  site, filtros e inclusão de URLs adicionais.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[AI features and your website](https://developers.google.com/search/docs/appearance/ai-features):**
  orientações do Google para recursos de IA; não generalize recomendações a
  outras plataformas.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para seo](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls):**
  sinais de canonicalização; consulte ao corrigir URLs duplicadas e tags
  canonical.
