# Caminhos e artefatos no Cloudflare

> Base técnica conferida para Astro 7.3.3 em 13/10/2026. Revise os links
> oficiais ao alterar a versão do framework, do adaptador ou da CLI citada.

O `cf` está em beta. Comandos, configuração e Build Output podem mudar antes da
versão estável. Trate cada afirmação abaixo como o comportamento da versão
instalada, confirmado por `cf deploy --dry-run`.

## Escolha do caminho

Classifique o projeto antes de escrever qualquer arquivo. A classificação muda
os arquivos criados e os comandos publicados.

| Situação | Sinal no projeto | Caminho de publicação |
| --- | --- | --- |
| Site estático | Sem adaptador | Ativos estáticos, sem Worker |
| Worker sob demanda | @astrojs/cloudflare no manifesto | Workers via adaptador |
| Projeto Wrangler | wrangler.jsonc, wrangler.json ou wrangler.toml | Migrar com cf migrate antes de usar cf |

O adaptador @astrojs/cloudflare v13, usado a partir do Astro 6, removeu o
suporte a Cloudflare Pages. O caminho atual é Cloudflare Workers. Um projeto
publicado em Pages migra pelas instruções oficiais de Pages para Workers.

## Pré-requisitos do cf

- Node.js 22.18 ou posterior: a leitura de cloudflare.config.ts usa a resolução
  de módulos do Node.
- `"type": "module"` no package.json. Sem esse campo, o Node emite
  MODULE_TYPELESS_PACKAGE_JSON a cada leitura. Com "type": "commonjs", a
  leitura falha.
- `cf` como dependência de desenvolvimento, para o import de `cf/config`
  resolver. Dentro do projeto, uma CLI global executa a cópia do projeto.
- Bun não é suportado para carregar cloudflare.config.ts.

## Arquivos de configuração

cloudflare.config.ts usa `defineConfig()`. O Worker exige `name` e
`compatibilityDate`; um Worker que executa código também exige `entrypoint`.
Bindings vêm de `bindings.*` e triggers de `triggers.*`. O arquivo não tem
`assets.directory`: num projeto Vite, os ativos são a saída do build do
cliente.

| Arquivo | Alteração esperada |
| --- | --- |
| cloudflare.config.ts | Worker, entrypoint, accountId e ambiente |
| package.json | `cf` em devDependencies; `"type": "module"`; scripts |
| vite.config.ts | Plugin Cloudflare quando o caminho é o cf |
| .gitignore | .cloudflare/, .wrangler, .dev.vars*, .env* |
| tsconfig.json | Inclui cloudflare.config.ts e .cloudflare/types |

Projetos criados por `cf init` já incluem `.cloudflare/` no .gitignore. Ao
configurar um projeto existente, adicione a entrada quando ela não existir.

## Artefatos de build

O cf escreve o Build Output em `.cloudflare/output/v0/`. O arquivo
`config.json` registra o modo usado no build. Um deploy prebuilt precisa do
mesmo modo. Gere os tipos com `cf workers types` quando o projeto buildar por
Wrangler, ou confie no plugin Vite, que escreve `.cloudflare/types/index.d.ts`
no desenvolvimento e no build.

## Migração de Wrangler

`cf migrate` cria cloudflare.config.ts, adiciona `cf` ao projeto e lista itens
obrigatórios. Enquanto houver item obrigatório, o arquivo gerado contém um
`throw` e o build falha. Resolva cada TODO antes de publicar. Não rode `cf` num
projeto Wrangler sem migrar: a configuração gerada ignora o wrangler.jsonc e
pode divergir do que está publicado.

## Fontes

- [Cloudflare CLI](https://developers.cloudflare.com/cf/): visão geral,
  instalação e login.
- [Develop, build, and deploy](https://developers.cloudflare.com/cf/projects/):
  comandos, modos, prebuilt e como o cf executa o projeto.
- [Programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/):
  campos de cloudflare.config.ts, bindings e triggers.
- [Migrate a Wrangler project](https://developers.cloudflare.com/cf/wrangler/migrate/):
  conversão e itens obrigatórios.
- [Integração Cloudflare no Astro](https://docs.astro.build/en/guides/integrations-guide/cloudflare/):
  adaptador, Workers e remoção do Pages.
