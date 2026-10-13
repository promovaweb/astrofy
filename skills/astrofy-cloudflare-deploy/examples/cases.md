# Casos de publicar e operar no Cloudflare

## Uso comum

Um projeto configurado builda com `cf build`, confere com
`cf deploy --dry-run` e publica com `cf deploy`. O deploy sem flag roda o
build e publica; o `--prebuilt` publica o build já conferido.

## Projeto existente

Um projeto publica por Wrangler. Preserve `astro build` e `wrangler deploy` nos
scripts e no CI, sem trocar para o `cf` enquanto a versão do Astro não buildar
com a CLI.

## Erro recorrente

Um deploy prebuilt falha porque o build saiu com mode production e o deploy não
passou modo. Informe `--mode production`, sem rebuildar, para publicar o mesmo
artefato.

## Conferência

O comando de publicação é o mesmo que passou no dry-run, com o modo registrado
no Build Output. Depois da publicação autorizada, confira a URL pública, uma
rota dinâmica, um ativo e um 404.

```bash
astrofy check --rule quality.build
```

## Regressão específica

- **Arquivos envolvidos:** package.json, cloudflare.config.ts, wrangler.jsonc,
  .gitignore e o workflow de CI.
- **Alteração sob teste:** Publicar por prebuilt com um modo diferente do build.
- **Falha e resultado esperado:** O comando para antes de enviar e informa o
  modo a usar; o artefato anterior permanece publicado.
- **Comando complementar:** `astrofy check --rule quality.build`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado antes
e depois da correção, mantendo os mesmos arquivos de entrada.
