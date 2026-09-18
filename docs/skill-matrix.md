# Matriz operacional das skills

Esta matriz é gerada pelo workflow canônico. Ela mostra dependências, entradas,
saídas e o comando que confere o domínio associado a cada skill.

| Skill | Depende de | Entradas | Saídas | Validação |
| --- | --- | --- | --- | --- |
| `astrofy-setup` | Nenhum | `package.json`, `astro.config.*`, `lockfile` | `.astrofy/setup-state.json` | Revisão do artefato de saída |
| `astrofy-init` | `astrofy-setup` | `inspeção do projeto` | `.astrofy/config/`, `astrofy.checklist.json` | `astrofy check --category project` |
| `astrofy-architecture` | `astrofy-init` | `rotas`, `layouts`, `componentes` | `mapa de responsabilidades` | `astrofy check --category architecture` |
| `astrofy-config` | `astrofy-init`, `astrofy-architecture` | `configuração observada`, `variáveis de ambiente` | `fontes de configuração mapeadas` | `astrofy check --category config` |
| `astrofy-documentation` | `astrofy-architecture`, `astrofy-config` | `estado observado`, `comandos reais` | `documentação operacional` | `astrofy check --category docs` |
| `astrofy-page-planner` | `astrofy-architecture`, `astrofy-config`, `astrofy-documentation` | `pedido de página`, `rotas e componentes atuais` | `especificação de página aprovada` | Revisão do artefato de saída |
| `astrofy-plan-sales-page` | `astrofy-page-planner` | `oferta`, `público`, `conversão` | `definição de página de vendas` | Revisão do artefato de saída |
| `astrofy-plan-product-page` | `astrofy-page-planner` | `produto`, `casos de uso`, `aquisição` | `definição de página de produto` | Revisão do artefato de saída |
| `astrofy-plan-service-page` | `astrofy-page-planner` | `serviço`, `escopo`, `contratação` | `definição de página de serviço` | Revisão do artefato de saída |
| `astrofy-plan-homepage` | `astrofy-page-planner` | `papel do site`, `públicos`, `destinos` | `definição da Home` | Revisão do artefato de saída |
| `astrofy-plan-about-page` | `astrofy-page-planner` | `entidade`, `história`, `pessoas` | `definição da página Sobre` | Revisão do artefato de saída |
| `astrofy-plan-contact-page` | `astrofy-page-planner` | `finalidade`, `campos`, `destino do envio` | `definição da página de contato` | Revisão do artefato de saída |
| `astrofy-plan-pricing-page` | `astrofy-page-planner` | `planos`, `preços`, `cobrança` | `definição da página de preços` | Revisão do artefato de saída |
| `astrofy-implementation-planner` | `astrofy-page-planner` | `especificação aprovada`, `checklist atual` | `plano de implementação retomável` | Revisão do artefato de saída |
| `astrofy-branding` | `astrofy-config` | `ativos e origem da marca` | `identidade registrada` | `astrofy check --category brand` |
| `astrofy-design-system` | `astrofy-branding` | `tokens da marca` | `tokens validados`, `CSS gerado` | `astrofy check --category design-system` |
| `astrofy-tailwind` | `astrofy-design-system`, `astrofy-config` | `CSS de entrada`, `versões resolvidas` | `integração Tailwind conferida` | Revisão do artefato de saída |
| `astrofy-themes` | `astrofy-design-system` | `tokens por modo` | `temas e primeira pintura` | `astrofy check --category theme` |
| `astrofy-components` | `astrofy-architecture`, `astrofy-design-system` | `consumidores reais`, `contrato visual` | `componentes e API` | `astrofy check --category components` |
| `astrofy-component-docs` | `astrofy-components` | `props`, `slots`, `consumidores` | `referência de componentes` | Revisão do artefato de saída |
| `astrofy-sections` | `astrofy-components` | `conteúdo e composição` | `seções reutilizáveis` | Revisão do artefato de saída |
| `astrofy-page-design` | `astrofy-sections`, `astrofy-themes` | `conteúdo da página`, `identidade` | `composição responsiva` | `astrofy check --category layout` |
| `astrofy-header` | `astrofy-components`, `astrofy-navigation` | `marca`, `ações`, `rotas` | `cabeçalho operável` | `astrofy check --category header` |
| `astrofy-navigation` | `astrofy-routing`, `astrofy-components` | `mapa de rotas`, `hierarquia` | `navegação por teclado e toque` | `astrofy check --category navigation` |
| `astrofy-footer` | `astrofy-components`, `astrofy-routing` | `links publicados`, `dados institucionais` | `rodapé configurado` | `astrofy check --category footer` |
| `astrofy-homepage` | `astrofy-page-design`, `astrofy-header`, `astrofy-footer` | `conteúdo inicial`, `ação principal` | `página inicial` | Revisão do artefato de saída |
| `astrofy-landing-pages` | `astrofy-page-design`, `astrofy-forms` | `oferta`, `destino da ação` | `landing page e fluxo` | Revisão do artefato de saída |
| `astrofy-mdx` | `astrofy-config`, `astrofy-security` | `origem do conteúdo`, `schema` | `coleção MDX tipada` | `astrofy check --category mdx` |
| `astrofy-blog` | `astrofy-mdx`, `astrofy-routing` | `coleção publicável`, `taxonomias` | `contrato do blog` | `astrofy check --category blog` |
| `astrofy-blog-post` | `astrofy-blog` | `entrada da coleção`, `layout` | `template de post` | Revisão do artefato de saída |
| `astrofy-blog-archives` | `astrofy-blog`, `astrofy-routing` | `coleção ordenada`, `pageSize` | `arquivos paginados` | Revisão do artefato de saída |
| `astrofy-editorial-review` | `astrofy-blog-post` | `texto visível`, `fontes do projeto` | `texto revisado` | `astrofy check --category editorial` |
| `astrofy-routing` | `astrofy-architecture`, `astrofy-config` | `rotas atuais`, `base e redirects` | `mapa de URLs` | `astrofy check --category routing` |
| `astrofy-i18n` | `astrofy-routing` | `idiomas`, `páginas equivalentes` | `rotas e relações de idioma` | Revisão do artefato de saída |
| `astrofy-internal-links` | `astrofy-routing`, `astrofy-blog` | `HTML ou conteúdo`, `destinos publicados` | `links internos conferidos` | `astrofy check --category links` |
| `astrofy-seo` | `astrofy-routing`, `astrofy-config` | `HTML renderizado`, `URL pública` | `metadados e indexação` | `astrofy check --category seo` |
| `astrofy-open-graph` | `astrofy-seo`, `astrofy-images` | `metadados`, `imagem pública` | `Open Graph conferido` | `astrofy check --category og` |
| `astrofy-structured-data` | `astrofy-seo` | `entidades visíveis`, `URLs canônicas` | `JSON-LD validado` | `astrofy check --category structured` |
| `astrofy-geo` | `astrofy-seo`, `astrofy-structured-data` | `HTML inicial`, `autoria e fontes` | `descoberta por IA revisada` | `astrofy check --category geo` |
| `astrofy-images` | `astrofy-config` | `origem e dimensões dos ativos` | `imagens responsivas` | `astrofy check --category images` |
| `astrofy-react` | `astrofy-components`, `astrofy-config` | `interação necessária`, `framework instalado` | `ilhas hidratadas` | `astrofy check --category react` |
| `astrofy-forms` | `astrofy-security`, `astrofy-config` | `campos`, `endpoint ou Action` | `envio validado` | `astrofy check --category forms` |
| `astrofy-accessibility` | `astrofy-navigation`, `astrofy-forms`, `astrofy-themes` | `HTML e estados interativos` | `semântica, foco e teclado conferidos` | `astrofy check --category accessibility` |
| `astrofy-code-quality` | `astrofy-architecture` | `código alterado`, `configuração TypeScript` | `tipos e imports conferidos` | Revisão do artefato de saída |
| `astrofy-security` | `astrofy-architecture`, `astrofy-config` | `fronteiras de entrada`, `segredos e sessão` | `fronteiras revisadas` | Revisão do artefato de saída |
| `astrofy-testing` | `astrofy-code-quality` | `comportamento alterado`, `falha reproduzível` | `testes do fluxo` | `astrofy check --category quality` |
| `astrofy-build-deploy` | `astrofy-testing`, `astrofy-config` | `adaptador`, `ambiente e scripts` | `build e operação conferidos` | Revisão do artefato de saída |
| `astrofy-markdown` | `astrofy-documentation`, `astrofy-component-docs`, `astrofy-editorial-review` | `Markdown alterado`, `configuração do linter` | `Markdown formatado e validado` | Revisão do artefato de saída |
| `astrofy-checkup` | `astrofy-build-deploy`, `astrofy-markdown`, `astrofy-accessibility` | `escopo alterado`, `artefatos atuais` | `checklist e relatório final` | Revisão do artefato de saída |

## Entrada e encerramento

A entrada é `astrofy-setup`. O fluxo termina com `astrofy-markdown`, `astrofy-checkup`.
