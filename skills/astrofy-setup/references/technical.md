# Coordenação da biblioteca Astrofy

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Percurso inicial e retomada

Comece com inspect e init dry-run na raiz do aplicativo. A skill astrofy-init
cria os contratos; a setup coordena o trabalho e não substitui o CLI. Antes de
cada etapa, leia o SKILL.md instalado e suas referências aplicáveis.

Execute `astrofy setup` para materializar `.astrofy/setup-state.json`. O estado
guarda hashes dos arquivos observados, `changedFiles`, dependências, entradas,
saídas, status e data de cada etapa. Registre em `.astrofy/docs/index.md` o
resultado, os comandos e a próxima ação. Na retomada, relacione cada arquivo
alterado aos consumidores descritos em `references/workflow.json` e repita as
etapas afetadas. Não apague notas nem fabrique aprovações de checklist.

Os status aceitos no estado são `completed`, `pending` e `not_applicable`.
Marque `completed` somente depois de produzir as saídas e executar a conferência
da skill. Recurso ausente recebe `not_applicable`; dependência ou entrada ainda
ausente permanece `pending`.

## Seleção de especialistas

Os nomes abaixo usam o prefixo astrofy-. Considere cada grupo e registre sua
aplicação; um recurso ausente não deve ser criado apenas para executar a skill.

| Assunto observado | Skills | Saída para a próxima etapa |
| --- | --- | --- |
| Adoção e estrutura | init, architecture, config | Contratos, caminhos e responsabilidades |
| Componentes | components, component-docs, sections | Props, slots e consumidores |
| Marca e estilos | branding, design-system, tailwind, themes | Ativos, tokens e modos |
| Navegação global | header, navigation, footer | Links, foco e configuração |
| Páginas solicitadas | page-design, homepage, landing-pages | Composição e CTAs existentes |
| Conteúdo | mdx, blog, blog-post, blog-archives, editorial-review | Schemas, seleção publicável e templates |
| Descoberta | seo, open-graph, structured-data, geo, internal-links | Metadados e destinos verificados |
| URLs e idiomas | routing, i18n | Rotas, redirects e traduções |
| Interação | react, forms | Hidratação e contrato de envio |
| Qualidade de UI | accessibility, images | Foco, alternativas e ativos |
| Implementação | code-quality, security, testing | Correções e testes delimitados |
| Operação | build-deploy, documentation, markdown, checkup | Build, documentação e avaliações |

Execute documentação inicial antes das correções e atualize-a após mudanças.
Publicação não é consequência automática do setup. Falta de credencial, preview
ou dependência deixa a etapa identificada como não executada; prossiga nas
demais que não dependam dela.

## Origem do contrato

astrofy skills list é a fonte operacional dos nomes disponíveis. O catálogo
distribuído e os schemas do CLI definem instalação e configuração; consulte
astrofy --help antes de usar opções ausentes da versão instalada.
