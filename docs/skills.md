# Biblioteca de skills

As skills podem ser instaladas no diretório de um projeto Astro existente.
A instalação precisa indicar o agente e preserva arquivos locais personalizados.
O CLI não escreve em diretórios globais de agentes.

```bash
astrofy skills list
astrofy skills install --agent codex --dry-run
astrofy skills install --agent codex
astrofy skills install --agent claude --skill astrofy-themes
```

O adaptador Codex usa `.agents/skills/` e o adaptador Claude usa
`.claude/skills/`. O manifesto de instalação registra hashes por arquivo.
Uma atualização recusa substituir um arquivo que foi alterado localmente.

## Catálogo

- **[astrofy-init](../skills/astrofy-init/SKILL.md):** Prepara a adoção do Astrofy em um projeto Astro existente, preservando arquivos personalizados e registrando o estado inicial.
- **[astrofy-architecture](../skills/astrofy-architecture/SKILL.md):** Organiza responsabilidades de rotas, layouts e componentes em sites Astro, documentando dependências e adaptações necessárias.
- **[astrofy-config](../skills/astrofy-config/SKILL.md):** Agrupa configurações públicas por assunto em projetos Astro e atualiza consumidores sem duplicar valores ou expor credenciais.
- **[astrofy-components](../skills/astrofy-components/SKILL.md):** Cria componentes Astro reutilizáveis com propriedades, slots e variantes limitadas, conservando os contratos dos consumidores.
- **[astrofy-component-docs](../skills/astrofy-component-docs/SKILL.md):** Documenta a API e os usos reais dos componentes Astro em Markdown, mantendo propriedades e exemplos alinhados à implementação.
- **[astrofy-react](../skills/astrofy-react/SKILL.md):** Integra React apenas nas interações necessárias de um site Astro, escolhendo hidratação e verificando o comportamento no navegador.
- **[astrofy-code-quality](../skills/astrofy-code-quality/SKILL.md):** Revisa tipos, imports e duplicações no código de projetos Astro, aplicando correções delimitadas e verificadas pelos testes do site.
- **[astrofy-branding](../skills/astrofy-branding/SKILL.md):** Registra a identidade visual de um site a partir de marca fornecida, exportação real ou referência, identificando inferências e autoria.
- **[astrofy-design-system](../skills/astrofy-design-system/SKILL.md):** Valida tokens hierárquicos e gera o CSS do design system em sites Astro, preservando aliases tipados e os modos claro e escuro.
- **[astrofy-tailwind](../skills/astrofy-tailwind/SKILL.md):** Integra utilitários Tailwind ao design system de um projeto Astro, verificando versão, entrada CSS e classes emitidas pelo build.
- **[astrofy-themes](../skills/astrofy-themes/SKILL.md):** Implementa light, dark e system com preferência persistente em sites Astro, conferindo a primeira pintura e estados dos componentes.
- **[astrofy-page-design](../skills/astrofy-page-design/SKILL.md):** Compõe páginas Astro a partir de conteúdo e identidade fornecidos, conferindo hierarquia, leitura e comportamento responsivo.
- **[astrofy-sections](../skills/astrofy-sections/SKILL.md):** Cria seções reutilizáveis para páginas Astro com conteúdo explícito, composição por slots e comportamento responsivo documentado.
- **[astrofy-header](../skills/astrofy-header/SKILL.md):** Configura cabeçalhos Astro com marca, ações e comportamento sticky, verificando a relação com navegação, foco e conteúdo da página.
- **[astrofy-footer](../skills/astrofy-footer/SKILL.md):** Organiza rodapés Astro configuráveis com links e informações fornecidas, conferindo responsividade e destinos publicados.
- **[astrofy-navigation](../skills/astrofy-navigation/SKILL.md):** Implementa menus e submenus de sites Astro operáveis por teclado e toque, com foco, estado atual e destinos verificados.
- **[astrofy-homepage](../skills/astrofy-homepage/SKILL.md):** Monta páginas iniciais Astro com conteúdo fornecido e seções reutilizáveis, alinhando navegação, hierarquia e ação principal.
- **[astrofy-landing-pages](../skills/astrofy-landing-pages/SKILL.md):** Monta landing pages Astro com oferta e ação fornecidas, compondo seções reutilizáveis e verificando destinos e estados do fluxo.
- **[astrofy-blog](../skills/astrofy-blog/SKILL.md):** Organiza o blog de um site Astro com coleções MDX e templates de leitura e arquivo, definindo taxonomias e regras de publicação.
- **[astrofy-mdx](../skills/astrofy-mdx/SKILL.md):** Configura integração MDX e schemas de conteúdo em sites Astro, documentando componentes permitidos e a origem confiável dos arquivos.
- **[astrofy-blog-post](../skills/astrofy-blog-post/SKILL.md):** Compõe templates de post Astro com corpo MDX, autoria e metadados derivados da coleção, verificando leitura e mídia responsiva.
- **[astrofy-blog-archives](../skills/astrofy-blog-archives/SKILL.md):** Implementa arquivos paginados de blog Astro com ordenação determinística e taxonomias, verificando URLs e estados vazios.
- **[astrofy-editorial-review](../skills/astrofy-editorial-review/SKILL.md):** Revisa ortografia e nomenclatura em textos visíveis de sites Astro, preservando fatos, código e a direção editorial fornecida.
- **[astrofy-seo](../skills/astrofy-seo/SKILL.md):** Verifica SEO no HTML renderizado de projetos Astro, relacionando metadados, canônicas e indexação às rotas e ao ambiente.
- **[astrofy-open-graph](../skills/astrofy-open-graph/SKILL.md):** Configura metadados Open Graph em páginas Astro com URLs absolutas e fallback por tipo de conteúdo, conferindo as imagens publicadas.
- **[astrofy-geo](../skills/astrofy-geo/SKILL.md):** Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta por IA, distinguindo orientações oficiais de hipóteses.
- **[astrofy-internal-links](../skills/astrofy-internal-links/SKILL.md):** Analisa links internos em sites Astro e sugere destinos contextualizados, preservando a sintaxe MDX e evitando alterações repetidas.
- **[astrofy-documentation](../skills/astrofy-documentation/SKILL.md):** Mantém arquitetura, mapa de arquivos e operação de projetos Astro em Markdown, conferindo comandos e componentes na implementação.
- **[astrofy-checkup](../skills/astrofy-checkup/SKILL.md):** Executa verificações do Astrofy e organiza revisões manuais por escopo, mantendo checklist, relatórios e validade dos resultados.
- **[astrofy-accessibility](../skills/astrofy-accessibility/SKILL.md):** Revisa semântica, foco e operação por teclado em sites Astro, combinando verificações automáticas com revisão manual de estados.
- **[astrofy-images](../skills/astrofy-images/SKILL.md):** Configura imagens em sites Astro conforme origem e uso, verificando dimensões, responsividade e carregamento no layout publicado.
- **[astrofy-routing](../skills/astrofy-routing/SKILL.md):** Organiza rotas e redirects em sites Astro, preservando URLs existentes e verificando colisões, parâmetros e comportamento de 404.
- **[astrofy-structured-data](../skills/astrofy-structured-data/SKILL.md):** Configura e valida JSON-LD em sites Astro, relacionando entidades e propriedades às informações presentes no conteúdo visível.
- **[astrofy-i18n](../skills/astrofy-i18n/SKILL.md):** Configura idiomas e relações entre páginas em sites Astro, verificando rotas, fallback e metadados das traduções disponíveis.
- **[astrofy-forms](../skills/astrofy-forms/SKILL.md):** Integra formulários em páginas Astro com validação e mensagens acessíveis, verificando o destino de envio em ambiente autorizado.
- **[astrofy-testing](../skills/astrofy-testing/SKILL.md):** Organiza testes de contratos e fluxos de sites Astro conforme o impacto da mudança, registrando ambiente e limites da cobertura.
- **[astrofy-build-deploy](../skills/astrofy-build-deploy/SKILL.md):** Prepara build e operação de publicação em projetos Astro, respeitando o adaptador e o provedor existentes e validando o ambiente.
- **[astrofy-security](../skills/astrofy-security/SKILL.md):** Revisa entradas, segredos e execução de HTML ou MDX em projetos Astro, aplicando correções delimitadas e documentando o alcance.
