# Referência técnica de astrofy-cloudflare

> Base técnica conferida para Astro 7.3.3 em 13/10/2026. Revise os links
> oficiais ao alterar a versão do framework, do adaptador ou da CLI citada.

## Arquivos e APIs

Leia o manifesto, o lockfile, astro.config.*, o adaptador instalado, scripts,
.gitignore, tsconfig.json, wrangler.* e cloudflare.config.ts. O `cf` está em
beta; comandos, configuração e Build Output podem mudar antes da versão
estável.

Separe a configuração do projeto (cloudflare.config.ts, scripts, .gitignore,
tsconfig) do artefato de build (.cloudflare/output/v0). A primeira descreve o
Worker e o ambiente; o segundo é gerado e não deve ser editado à mão.

## Classificação do alvo

| Situação | Sinal no projeto | Caminho de publicação |
| --- | --- | --- |
| Site estático | Sem adaptador | Ativos estáticos, sem Worker |
| Worker sob demanda | @astrojs/cloudflare no manifesto | Workers via adaptador |
| Projeto Wrangler | wrangler.jsonc, wrangler.json ou wrangler.toml | Migrar com cf migrate antes de usar cf |

O adaptador @astrojs/cloudflare v13 e o Astro 6 removeram o suporte a Cloudflare
Pages. O caminho atual é Cloudflare Workers. Um projeto em Pages migra pelas
instruções oficiais de Pages para Workers.

## Pré-requisitos do cf

- Node.js 22.18 ou posterior para a leitura de cloudflare.config.ts.
- `"type": "module"` no package.json; sem ele o Node emite
  MODULE_TYPELESS_PACKAGE_JSON a cada leitura.
- `cf` como dependência de desenvolvimento, para o import de `cf/config`
  resolver. Dentro do projeto, a CLI global executa a cópia do projeto.
- Bun não é suportado para carregar cloudflare.config.ts.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra | Método | Escopo | Verificação |
| --- | --- | --- | --- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

A verificação de build do catálogo cobre o artefato publicado. A escolha do
caminho do Cloudflare e a conferência dos pré-requisitos ficam como revisão
desta skill.

```bash
astrofy check --rule quality.build
```

## Diagnóstico por sintoma

| Sintoma | Conferência | Correção delimitada |
| --- | --- | --- |
| cloudflare.config.ts is required | Projeto Wrangler sem migração | Rodar cf migrate antes de cf dev |
| Aviso de módulo sem tipo | Campo "type" do package.json | Definir "type": "module" |
| Astro 6+ não faz build com cf | Versão do Astro e do adaptador | Usar astro build e wrangler deploy |
| Build Output ausente | .cloudflare/output/v0/config.json | Rodar cf build antes do prebuilt |

A documentação do `cf` registra que o Astro 6 e posteriores ainda não fazem
build com a CLI durante o beta. Confirme o comportamento na versão instalada
com `cf deploy --dry-run` antes de trocar os scripts do projeto.

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
