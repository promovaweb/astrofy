# Fixtures de compatibilidade

Estes projetos comprovam integração com versões anteriores ao template
principal. São sites pequenos de teste, com manifests e lockfiles próprios.
Não são templates de publicação nem substituem o `astrofy-template`.

| Projeto | Astro | React | Integração React | MDX | Tailwind | Vite | Node usado no build |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `astro5` | 5.13.0 | 18.3.1 | 4.3.0 | 4.0.0 | 4.3.3 | 6.4.3 | 22.12.0 |
| `astro6` | 6.0.0 | 19.0.0 | 5.0.0 | 5.0.0 | 4.3.3 | 7.3.6 | 22.23.2 |
| `astro7` | 7.3.3 | 19.0.0 | 6.0.6 | 8.0.1 | 4.3.3 | 8.3.0 | 26.8.1 |

Os três builds e a verificação no Chromium passaram em Linux. O lockfile do
Astro 6 inclui uma dependência que exige Node 22.19 ou posterior. Essa fixture
fixa Vite 7.3.6 como dependência direta para manter Astro e Tailwind no mesmo
major. Uma instalação inicial com Vite 7 e 8 misturados falhou no plugin do
Tailwind; ela não integra a combinação aprovada pelo teste.

## Preparação e execução

Execute os comandos a partir da raiz do repositório Astrofy. Instale as
dependências do framework com `npm ci`, compile com `npm run build` e instale
o navegador com `npx playwright install chromium`.

Para Astro 5, selecione Node 22.12.0 ou posterior no ambiente e execute:

```bash
npm --prefix fixtures/compatibility/astro5 ci
node dist/cli/index.js init --root fixtures/compatibility/astro5
node dist/cli/index.js tokens build --root fixtures/compatibility/astro5
npm --prefix fixtures/compatibility/astro5 run build
```

Para Astro 6, selecione Node 22.23.2, usado nesta conferência, e execute:

```bash
npm --prefix fixtures/compatibility/astro6 ci
node dist/cli/index.js init --root fixtures/compatibility/astro6
node dist/cli/index.js tokens build --root fixtures/compatibility/astro6
npm --prefix fixtures/compatibility/astro6 run build
```

Para Astro 7, use Node compatível com o manifesto e execute:

```bash
npm --prefix fixtures/compatibility/astro7 ci
node dist/cli/index.js setup --root fixtures/compatibility/astro7
node dist/cli/index.js tokens build --root fixtures/compatibility/astro7
npm --prefix fixtures/compatibility/astro7 run build
```

Com os três builds disponíveis, execute:

```bash
node fixtures/compatibility/verify.mjs
```

A verificação exige os dois diretórios `dist/`. Ela cria servidores HTTP
locais em portas disponíveis e um contexto de navegador por projeto. Confere
hidratação, incremento do contador, a classe Tailwind `bg-surface`, os tokens
light/dark e o componente Astro renderizado no MDX. Erros JavaScript ou
assertivas não atendidas encerram o comando com falha. Servidores e navegador
são encerrados ao terminar.

## Arquivos e limites

`src/pages/index.astro` importa o CSS produzido por `tokens build` e a ilha
`Counter.jsx`. `src/pages/artigo.mdx` importa `Note.astro`. O design system de
teste usa as cores do arquivo `fixtures/design-system.json` do framework.

Configurações, checklist, relatórios e documentação da adoção são gerados por
`init` e pelos checks. Eles são ignorados no Git destas fixtures. Os lockfiles,
as fontes, o JSON de tokens, o manifesto de geração e `designsystem.css`
permanecem versionáveis. Estes projetos não têm assets de marca completos;
não foram aprovados como sites por todas as 90 regras do Astrofy.

A suíte padrão `npm test` não instala nem recompila estas dependências
adicionais. Execute este fluxo ao alterar adapters, geração CSS, dependências
ou contratos usados por essas versões. O resultado local não comprova Windows
ou macOS, nem todas as versões intermediárias de Astro, React e Tailwind.

## Procedimentos das skills

Com as dependências das três fixtures e Chromium instalados, execute pela
raiz do Astrofy:

```bash
node fixtures/compatibility/verify-skills.mjs
```

O comando trabalha em cópias temporárias, cria um layout com dois consumidores,
um componente com props e slot e um caso de hidratação ausente. Confere a
recuperação após import inválido, títulos por rota, UTF-8, variantes, foco,
cores dos tokens e incremento do contador. O executável vem do campo bin do
manifesto Astro instalado, respeitando as diferenças entre Astro 5, 6 e 7.
As cópias e os servidores locais são removidos ao terminar.

Os cenários especializados de Astro 7 usam o servidor local de desenvolvimento:

```bash
node fixtures/compatibility/verify-domains.mjs
```

Esse runner confere Actions com formulário, autenticação SSR por cookie,
Content Layer com MDX, paginação, rotas i18n e navegação com `ClientRouter`.
Nenhuma submissão sai do computador.

O job `compatibility` de `.github/workflows/ci.yml` instala os três lockfiles,
prepara os builds e executa os três runners em cada push e pull request.

A cobertura e os resultados ficam em
[validação das skills](../../docs/skills-validation.md).
