# Pipeline de publicação no Cloudflare

> Base técnica conferida para Astro 7.3.3 em 13/10/2026. Revise os links
> oficiais ao alterar a versão do framework, do adaptador ou da CLI citada.

O `cf` está em beta. Confirme os comandos na versão instalada antes de
escrevê-los nos scripts do projeto.

## Build uma vez, publique esse build

O fluxo recomendado constrói o projeto uma vez e publica o artefato conferido.
Isso evita que o build do deploy divirja do que passou na validação.

| Etapa | Comando | Efeito |
| --- | --- | --- |
| Desenvolvimento | cf dev | Servidor local com o runtime |
| Build | cf build | Escreve .cloudflare/output/v0 |
| Conferência | cf deploy --dry-run | Valida sem enviar à API |
| Publicação | cf deploy --prebuilt | Publica o build existente |
| Preview | cf previews deploy | Publica um Worker Preview |

O `cf deploy --dry-run` não envia requisição à API e não exige credenciais. O
`cf deploy --prebuilt` não roda o build nem a configuração automática.

## Modos

Um modo seleciona a configuração que um cloudflare.config.ts em forma de função
retorna. Sem `--mode`, o plugin Vite usa development no `cf dev` e production
no build. O Build Output registra o modo usado. Ao publicar um build existente,
passe o mesmo modo, ou nenhum quando o build não registrar modo.

## Publicação em CI

A automação autentica por token, sem login interativo.

| Variável | Uso |
| --- | --- |
| CLOUDFLARE_API_TOKEN | Autentica as requisições de API |
| CLOUDFLARE_ACCOUNT_ID | Seleciona a conta |
| CF_SEND_TELEMETRY | Desliga a telemetria no job |

Um job típico roda `cf build`, `cf deploy --prebuilt --mode production
--dry-run` e, só no push para a branch principal, `cf deploy --prebuilt --mode
production`. Sem terminal ou com a variável CI definida, o `cf` não espera
resposta e aplica a configuração automática sem perguntar. Rode `cf init .` na
máquina e versione o resultado antes de configurar a CI.

## Retomada e restauração

Guarde o identificador da versão publicada a cada alteração. Uma falha depois
do deploy se corrige publicando a versão anterior ou uma nova versão. Não
misture ativos de versões diferentes.

## Fontes

- [Develop, build, and deploy](https://developers.cloudflare.com/cf/projects/):
  modos, prebuilt, previews e opções de deploy.
- [Use cf in CI](https://developers.cloudflare.com/cf/ci/): token, conta e
  comportamento não interativo.
- [Environment variables](https://developers.cloudflare.com/cf/environment-variables/):
  variáveis que controlam a CLI.
- [Use cf with coding agents](https://developers.cloudflare.com/cf/agents/):
  busca de comandos, `--dry-run` e leitura da saída.
