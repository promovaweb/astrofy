---
name: astrofy-cloudflare
description:
  Configura e valida o Cloudflare em projetos Astro, escolhendo o caminho de
  build aceito pelo cf e preservando o provedor de publicação existente.
---

# Configurar e validar o Cloudflare

## Entradas

Leia o manifesto, o lockfile, astro.config.*, o adaptador instalado, scripts,
.gitignore, tsconfig.json, wrangler.* e cloudflare.config.ts. Use os caminhos
definidos em `.astrofy/config/paths.json` quando diferirem dos exemplos.
Confira a versão instalada do Astro, do adaptador e do `cf` no lockfile antes
de aplicar APIs da documentação online.

## Execução

1. Classifique o alvo de publicação antes de alterar arquivos:
   - sem adaptador, o site é estático e a publicação é de ativos;
   - com @astrojs/cloudflare, as rotas sob demanda rodam em Workers;
   - com wrangler.jsonc, wrangler.json ou wrangler.toml, o projeto ainda usa
     Wrangler e precisa de `cf migrate` antes de qualquer comando `cf` que
     faça build.
2. Confira os pré-requisitos do `cf`, que está em beta: Node.js 22.18 ou
   posterior, `"type": "module"` no package.json e o `cf` instalado como
   dependência de desenvolvimento. O Bun não é suportado para carregar
   cloudflare.config.ts.
3. Escolha o caminho de build e registre a escolha. O Astro 6 e posteriores
   ainda não fazem build com o `cf` durante o beta. Se o dry-run do `cf`
   recusar a versão instalada, use `astro build` seguido de `wrangler deploy`.
   Não rode `cf init .`, `cf dev`, `cf build` nem `cf deploy` num projeto com
   wrangler.* sem cloudflare.config.ts.
4. Configure os arquivos sem substituir o provedor nem o modo em uso:
   - cloudflare.config.ts com defineConfig, worker.name, compatibilityDate e
     entrypoint; accountId, bindings e triggers conforme o uso real;
   - .gitignore com `.cloudflare/`, `.wrangler`, `.dev.vars*` e `.env*`;
   - tsconfig.json incluindo `cloudflare.config.ts` e `.cloudflare/types`;
   - scripts de desenvolvimento, build, publicação e preview.
5. Preserve o adaptador e a versão do Astro instalada. Uma migração de Wrangler
   para `cf` ou de Pages para Workers exige escopo próprio e teste das rotas
   representativas. As regras completas estão em
   [configuração do Cloudflare](references/implementation.md).
6. Registre no relatório a classificação, o caminho escolhido, os arquivos
   alterados e as escolhas de nomenclatura, como o nome do Worker e o modo.

## Verificação

A configuração existe e é a que o projeto usa: cloudflare.config.ts presente
quando o caminho é o `cf`, ou wrangler.jsonc preservado quando o caminho é o
Wrangler. O dry-run mostra o Worker, as bindings e o modo sem enviar requisição
à API. Confira o Build Output em `.cloudflare/output/v0/config.json` quando o
caminho for o `cf`.

```bash
astrofy check --rule quality.build
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
configuração e [cenários de validação](examples/cases.md) ao conferir a saída.
