# Contribuindo com o Astrofy

Este guia é para quem vai alterar o código, as skills ou a documentação do
[Astrofy](https://github.com/promovaweb/astrofy). Para instalar e usar o
produto, leia o [README](https://github.com/promovaweb/astrofy/blob/main/README.md).

O projeto é escrito em [TypeScript](https://github.com/microsoft/TypeScript)
sobre [Node.js](https://github.com/nodejs/node) 22.12.0 ou posterior. O CLI é
publicado no npm como `@promovaweb/astrofy`. As skills operam em sites
[Astro](https://github.com/withastro/astro) existentes.

## Antes de começar

- Para dúvidas de uso, converse no [Discord](https://promovaweb.com/discord).
  O canal reúne a Comunidade e os mantenedores.
- Para bug ou pedido de recurso, abra uma
  [issue](https://github.com/promovaweb/astrofy/issues) com versão do Astrofy,
  sistema operacional, versão do Node.js e passo a passo para reproduzir.
- Uma issue por mudança. Mudanças grandes, como uma skill nova, um comando
  novo ou uma alteração de contrato, começam pela issue para alinhar o escopo
  antes do código.

## Ambiente

Requisitos:

- Node.js 22.12.0 ou posterior.
- `git` e acesso ao repositório.
- Chromium instalado apenas para os testes de browser.

Clone e prepare o checkout:

```bash
git clone https://github.com/promovaweb/astrofy.git
cd astrofy
npm ci
npm run build
node dist/cli/index.js --help
```

O `build` compila `packages/` para `dist/`. O `dist/` é gerado e não deve ser
editado à mão.

Para os testes que abrem navegador, instale o Chromium do Playwright:

```bash
npx playwright install chromium
```

As fixtures de compatibilidade têm lockfiles próprios e ficam fora do `npm ci`
da raiz. Instale cada uma quando for alterar adapters, geração de CSS ou
contratos usados por Astro 5, 6 e 7:

```bash
npm --prefix fixtures/compatibility/astro5 ci
npm --prefix fixtures/compatibility/astro6 ci
npm --prefix fixtures/compatibility/astro7 ci
```

## Organização do código

| Caminho | Conteúdo |
| --- | --- |
| `packages/core` | descoberta do projeto, configuração, checklist, relatórios e instalação local |
| `packages/cli` | parsing de argumentos, saída em texto e JSON, TUI |
| `packages/checks` | leitura de HTML e MDX e verificadores por regra |
| `packages/schemas` | schemas JSON 2020-12 e validação offline com Ajv |
| `packages/design-system` | resolução de tokens e geração determinística de CSS |
| `packages/adapters` | compatibilidade e importação do formato [Brandfy](https://github.com/promovaweb/brandfy) |
| `skills/` | catálogo de skills, com `catalog.json` e uma pasta por skill |
| `docs/` | manual do usuário, referência do CLI e documentação técnica |
| `tests/` | suíte de testes em `node:test` |
| `fixtures/` | projetos de compatibilidade e de referência |
| `scripts/` | validação de pacote, de release e geração da matriz de skills |
| `.ebook/` | gerador do PDF e do EPUB a partir de `docs/user/` |
| `templates/` | modelos usados por comandos do CLI |

A responsabilidade de cada pacote, o fluxo de escrita atômica e o lock de
gravação estão em [docs/architecture.md](docs/architecture.md). A matriz das
skills fica em [docs/skill-matrix.md](docs/skill-matrix.md).

## Fluxo de trabalho

1. Abra ou localize a issue que descreve a mudança.
2. Crie uma branch a partir de `main`, com nome curto: `feat/skill-x`,
   `fix/check-links`, `docs/cli`.
3. Faça a alteração menor que resolve o pedido. Para um comando novo,
   atualize o parser, a saída, a documentação e os testes na mesma branch.
4. Rode as validações que cobrem o que mudou.
5. Abra o pull request com a issue relacionada e o resultado das validações.

Para uma skill, o fluxo mais comum é:

1. Criar ou ajustar a pasta em `skills/<nome>/`, com o `SKILL.md` e as
   referências locais.
2. Registrar a skill em `skills/catalog.json`.
3. Atualizar a documentação em `docs/skills.md`.
4. Regenerar a matriz com `npm run skills:matrix`.
5. Rodar `npm test` e `npm run skills:matrix:check`.

Para um comando do CLI, confira em `docs/cli.md` a seção do comando. O teste
`tests/docs.test.mjs` exige uma seção para cada comando e cada opção, com pelo
menos cinco exemplos por seção.

## Regras do código

- Escreva documentação, comentários e mensagens em português do Brasil.
  Preserve os termos técnicos em inglês usados pelo ecossistema.
- Mantenha o TypeScript estrito: o `tsconfig.json` usa `strict` e
  `noUncheckedIndexedAccess`. Não contorne a tipagem com `any` sem motivo.
- Toda operação que grava no site usa escrita atômica e o lock em
  `.astrofy/cache/write.lock`. Não crie um caminho de gravação paralelo.
- Comandos de consulta não gravam arquivos. Comandos com `--dry-run` mostram
  o que seria feito sem gravar.
- Mensagens de erro dizem o que falhou e o que fazer. Não repita valores de
  flags nem credenciais na saída.
- O texto das skills segue as regras editoriais da Promovaweb: sem travessão
  longo como pontuação, sem emoji e com instruções curtas.
- Não edite `dist/` nem os arquivos gerados do ebook. Altere a fonte em
  `packages/`, `docs/` ou `.ebook/` e rode o gerador.
- Não inclua segredo, token ou caminho absoluto da sua máquina em commit,
  teste ou fixture.

## Validar

O comando principal compila e executa a suíte sem navegador:

```bash
npm test
```

Os demais comandos:

```bash
npm run check                 # checagem de tipos, sem emitir
npm run test:browser          # testes que abrem Chromium
npm run test:all              # unitários e de browser
npm run docs:verify           # testes de documentação
npm run skills:matrix:check   # matriz de skills em dia
npm run ebook:verify          # PDF e EPUB conferidos
npm run release:check         # versão, changelog e workflow coerentes
npm pack --dry-run            # conteúdo do pacote npm
```

Para validar o pacote gerado em isolamento:

```bash
mkdir -p artifacts
npm pack --pack-destination artifacts
version="$(node -p "require('./package.json').version")"
npm run package:verify -- "artifacts/promovaweb-astrofy-${version}.tgz"
```

Com as fixtures instaladas e os três builds gerados, rode os verificadores de
compatibilidade:

```bash
npm run test:compatibility
npm run test:project-fixtures
npm run test:skill-procedures
npm run test:skill-domains
```

O fluxo das fixtures, incluindo `init`, `tokens build` e o build de cada site,
está em [fixtures/compatibility/README.md](fixtures/compatibility/README.md).

## Documentação

- `docs/user/` é o guia do usuário, na ordem de `docs/user/reading-order.txt`.
  Ele também gera o ebook.
- `docs/cli.md` é a referência de cada comando e opção. Ela é conferida por
  `tests/docs.test.mjs`.
- `docs/skills.md` descreve o catálogo. `docs/skill-matrix.md` é gerado por
  `npm run skills:matrix` e conferido por `npm run skills:matrix:check`.
- `docs/architecture.md`, `docs/configuration.md`, `docs/compatibility.md` e
  `docs/sitespec.md` registram contratos internos.
- A documentação publicada fica em
  [promovaweb.com/docs/astrofy](https://promovaweb.com/docs/astrofy/).

Depois de alterar o guia do usuário, regenere o ebook:

```bash
npm run ebook
npm run ebook:verify
```

## Commits e pull requests

Use mensagens curtas no imperativo, com prefixo do tipo de mudança:

```text
feat: adiciona skill de revisão de contraste
fix: corrige leitura de lockfile pnpm
docs: atualiza a referência do CLI
test: cobre saída JSON do check
```

O pull request deve trazer:

- o que mudou e por quê, com a issue relacionada;
- o comportamento antes e depois, quando houver mudança visível;
- os comandos de validação executados e o resultado;
- a documentação atualizada na mesma branch;
- a matriz de skills regenerada, quando o catálogo mudar.

Mantenha o pull request pequeno e com um assunto por vez. Mudanças de contrato,
como formato de arquivo, schema ou saída JSON, precisam de teste e de nota no
`CHANGELOG.md`.

## Releases

A versão fica nestes arquivos e precisa ser a mesma em todos:

- `package.json` e `package-lock.json`;
- `VERSION`;
- `skills/catalog.json`;
- `packages/core/types.ts`, na constante `VERSION`;
- `ebook/VERSION`;
- `ebook/build.json`, regenerado por `npm run ebook` junto com o PDF e o EPUB
  da versão.

A entrada da versão vai no `CHANGELOG.md`, no formato `## [x.y.z]`. O comando
abaixo confere a coerência entre os arquivos, o changelog e o workflow:

```bash
npm run release:check
```

Para conferir também a tag pretendida:

```bash
npm run release:check -- v<versão>
```

O release é feito por tag `v<versão>`. O workflow
`.github/workflows/release.yml` espera a validação do commit e roda
`docs:verify`, `ebook:verify` e `release:check`. Depois empacota e valida o
tarball e cria a GitHub Release com o tarball, o PDF, o EPUB e o
`SHA256SUMS`. O workflow não publica no npm. O `release:check` falha se ele
voltar a conter `npm publish` ou um token do npm.

A publicação no npm é feita só pela máquina local, por um mantenedor logado
como `contatopromovaweb`. Depois que a GitHub Release existir:

```bash
mkdir -p /tmp/astrofy-release && cd /tmp/astrofy-release
gh release download v<versão> --repo promovaweb/astrofy \
  --pattern 'promovaweb-astrofy-*.tgz' --pattern SHA256SUMS
sha256sum --check --ignore-missing SHA256SUMS
npm publish promovaweb-astrofy-<versão>.tgz --access public
npm view @promovaweb/astrofy version license
```

Para gerar o tarball no lugar de baixá-lo, rode `npm pack` no commit da tag e
compare o hash com o `SHA256SUMS` da release. O `npm view` pode levar alguns
minutos para mostrar a versão nova. A release só está completa quando o npm
mostra a mesma versão da tag.

## Licença

As contribuições entram sob a
[GNU AGPL 3.0](https://github.com/promovaweb/astrofy/blob/main/LICENSE), a
mesma licença do projeto. Ao abrir um pull request, você concorda em
licenciar sua contribuição sob esses termos.
