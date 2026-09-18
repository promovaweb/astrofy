# Referência técnica de astrofy-config

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia src/config, imports dos módulos públicos, astro.config.* e nomes das
variáveis de ambiente.

Separe configuração de renderização e configuração interna do Astrofy. Liste
consumidores antes de unificar valores e mantenha segredos fora de módulos
enviados ao cliente.

## Alteração compatível

Conserve tipos exportados e nomes consumidos. Migre um domínio, como navigation,
atualize imports e remova somente a definição já substituída.

## Diagnóstico

Dois menus com URLs diferentes devem revelar qual fonte cada um usa. Após
centralizar, alterar uma URL precisa atualizar os dois consumidores.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra               | Método      | Escopo    | Verificação                                              |
| ------------------- | ----------- | --------- | -------------------------------------------------------- |
| `config.schema`     | `automatic` | `project` | Arquivos JSON válidos contra schemas.                    |
| `config.categories` | `hybrid`    | `project` | Configurações organizadas por assunto.                   |
| `config.duplicates` | `hybrid`    | `project` | Sem duplicação conflitante de configuração.              |
| `config.secrets`    | `hybrid`    | `project` | Sem segredo conhecido em configuração pública ou bundle. |

## Configuração Astro 7

astro.config.* é avaliado antes de .env. Use loadEnv apenas nesse arquivo quando
necessário. Em componentes e endpoints, use import.meta.env ou astro:env
conforme o schema.

PUBLIC_ entra no bundle de cliente. Chave e token ficam no servidor. site e base
influenciam canonical, sitemap e links, por isso a alteração pede build de rota
sob subdiretório.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[JSON Schema](https://ajv.js.org/json-schema.html):** dialeto JSON Schema e
  validação Ajv; consulte ao diagnosticar campos recusados.
- **[documentação para config](https://docs.astro.build/en/guides/environment-variables/):**
  PUBLIC_, ambiente do servidor e configuração; confira quais valores chegam ao
  cliente.
