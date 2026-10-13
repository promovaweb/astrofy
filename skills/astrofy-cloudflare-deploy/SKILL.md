---
name: astrofy-cloudflare-deploy
description:
  Define e valida os comandos de publicação e operação no Cloudflare, com
  modos, build prebuilt e credenciais, sem publicar sem autorização.
---

# Publicar e operar no Cloudflare

## Entradas

Leia cloudflare.config.ts ou wrangler.jsonc, os scripts do package.json, o modo
adotado, os nomes de binding, o ambiente de CI e o último identificador de
publicação. Confirme o caminho definido por astrofy-cloudflare antes de montar
os comandos.

## Execução

1. Monte os scripts conforme o caminho:
   - cf: `cf dev`, `cf build`, `cf deploy` e `cf previews deploy`;
   - Wrangler: `astro build` seguido de `wrangler deploy`.
   O `cf build` não executa o script build do package.json. Passos extras
   entram encadeados, como `tsc -b && cf build`.
2. Trate o modo. Sem `--mode`, o plugin Vite usa development no dev e
   production no build. Um build prebuilt precisa do mesmo modo do build:
   `cf build` gera production, então `cf deploy --prebuilt --mode production`
   publica exatamente esse build.
3. Valide antes de publicar. `cf deploy --dry-run` mostra o Worker e as
   bindings sem enviar requisição à API nem exigir credenciais. `cf workers
   check` mede o tamanho do bundle e o tempo de inicialização no seu ambiente.
4. Em CI, use CLOUDFLARE_API_TOKEN e CLOUDFLARE_ACCOUNT_ID, um build por
   execução e `--prebuilt` para publicar o que foi conferido. Desligue a
   telemetria com CF_SEND_TELEMETRY=false.
5. Publique somente com autorização explícita. Registre o identificador da
   versão publicada e mantenha o anterior para restauração. Confira a URL
   pública, uma rota dinâmica, um ativo e um 404.
6. Para segredos, use `--secrets-file` com um arquivo não versionado; registre
   apenas o nome do binding, nunca o valor.

## Verificação

O comando de publicação é o mesmo que passou no dry-run, com o modo registrado
no Build Output. O relatório informa ambiente, modo, versão e as rotas
testadas.

```bash
astrofy check --rule quality.build
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
publicação e [cenários de validação](examples/cases.md) ao conferir a saída.
