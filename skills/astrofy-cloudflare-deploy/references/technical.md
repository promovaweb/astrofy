# Referência técnica de astrofy-cloudflare-deploy

> Base técnica conferida para Astro 7.3.3 em 13/10/2026. Revise os links
> oficiais ao alterar a versão do framework, do adaptador ou da CLI citada.

## Arquivos e APIs

Leia cloudflare.config.ts ou wrangler.jsonc, os scripts do package.json, o modo
adotado, os nomes de binding, o ambiente de CI e o Build Output em
`.cloudflare/output/v0/config.json`. Confirme o caminho de publicação definido
por astrofy-cloudflare antes de montar os comandos.

Separe o comando de desenvolvimento, o de build e o de publicação. O build não
publica, e o prebuilt não constrói. Associe cada comando ao modo que ele
registra ou espera.

## Comandos por caminho

| Caminho | Desenvolvimento | Build | Publicação |
| --- | --- | --- | --- |
| cf | cf dev | cf build | cf deploy |
| Wrangler | astro dev | astro build | wrangler deploy |

O `cf build` roda o comando do framework ou a ferramenta Cloudflare instalada,
não o script build do package.json. Para encadear passos, use um script que
chame o `cf`, como `tsc -b && cf build`. O `cf build` aceita apenas `--mode`.

## Modos e prebuilt

Sem `--mode`, o plugin Vite usa development no `cf dev` e production no build.
Um deploy prebuilt precisa do modo registrado no Build Output; quando os modos
divergem, o comando para antes de enviar qualquer coisa e informa o modo a usar.
O modo também seleciona a configuração quando cloudflare.config.ts é uma
função. Um modo publica um Worker separado apenas quando retorna um `name`
diferente.

## Credenciais e CI

| Variável | Uso |
| --- | --- |
| CLOUDFLARE_API_TOKEN | Autentica as requisições de API |
| CLOUDFLARE_ACCOUNT_ID | Seleciona a conta |
| CLOUDFLARE_ZONE_ID | Seleciona a zona para comandos de zona |
| CF_SEND_TELEMETRY | Desliga a telemetria |

Sem terminal ou com a variável CI definida, o `cf` não espera resposta, aplica a
configuração automática sem perguntar e aborta comandos destrutivos sem
`--force`. Segredos entram por `--secrets-file`, em formato JSON ou .env. Não
versione esse arquivo.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra | Método | Escopo | Verificação |
| --- | --- | --- | --- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

A verificação de build do catálogo cobre o artefato publicado. A conferência do
modo, das credenciais e da URL pública fica como revisão desta skill.

```bash
astrofy check --rule quality.build
```

## Diagnóstico por sintoma

| Sintoma | Conferência | Correção delimitada |
| --- | --- | --- |
| Prebuilt recusa o modo | Modo registrado no Build Output | Passar o mesmo modo do build |
| Preview alcança produção | Origem do Build Output | Rodar cf previews deploy prebuilt |
| Mais de uma conta disponível | CLOUDFLARE_ACCOUNT_ID e accountId | Definir a conta uma vez |
| Publicação sem credencial | CLOUDFLARE_API_TOKEN | Autenticar por token antes do deploy |

## Fontes

- [Develop, build, and deploy](https://developers.cloudflare.com/cf/projects/):
  modos, prebuilt, previews e opções de deploy.
- [Use cf in CI](https://developers.cloudflare.com/cf/ci/): token, conta e
  comportamento não interativo.
- [Environment variables](https://developers.cloudflare.com/cf/environment-variables/):
  variáveis que controlam a CLI.
- [Use cf with coding agents](https://developers.cloudflare.com/cf/agents/):
  busca de comandos, `--dry-run` e leitura da saída.
