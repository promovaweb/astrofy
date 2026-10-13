# Casos de configurar e validar o Cloudflare

## Uso comum

Um site estático sem adaptador publica somente ativos. A configuração registra
essa classificação e não cria um Worker sem necessidade.

## Projeto existente

Um site usa @astrojs/cloudflare. Preserve o adaptador, confirme Node 22.18, o
campo "type": "module" e os scripts, e valide com um dry-run antes de publicar.

## Erro recorrente

Um projeto com wrangler.jsonc recebe `cf dev` sem migração. A configuração
gerada ignora o wrangler.jsonc. Reverta as alterações, rode `cf migrate` e
resolva os TODOs antes de repetir o comando.

## Conferência

A configuração existe e é a que o projeto usa. O dry-run descreve o Worker, as
bindings e o modo sem enviar requisição à API. Registre a classificação e o
caminho escolhido.

```bash
astrofy check --rule quality.build
```

## Regressão específica

- **Arquivos envolvidos:** package.json, cloudflare.config.ts, wrangler.*,
  .gitignore, tsconfig.json e astro.config.*.
- **Alteração sob teste:** Trocar o caminho de publicação sem alterar o
  adaptador nem o modo em uso.
- **Falha e resultado esperado:** O dry-run recusa a versão do Astro ou o
  projeto sem migração; a configuração anterior permanece até a correção.
- **Comando complementar:** `astrofy check --rule quality.build`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado antes
e depois da correção, mantendo os mesmos arquivos de entrada.
