# Referência técnica de astrofy-build-deploy

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia scripts, lockfile, adaptador, output, variáveis e provedor existente.

Separe build local, preview e publicação externa. Identifique saída estática ou
runtime de servidor. Confira versão do Node exigida por toda a combinação
instalada.

## Alteração compatível

Preserve o provedor e o modo adotado. Uma migração de major ou adaptador exige
escopo próprio e teste das rotas representativas.

## Diagnóstico

Build com erro não pode reutilizar dist antigo para afirmar sucesso. Em
servidor, teste uma rota dinâmica com o runtime correto.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Fontes

- [Adapter Node](https://docs.astro.build/en/guides/integrations-guide/node/):
  consulte os modos standalone e middleware para determinar quem serve ativos
  e inicia o processo; confira carregamento de ambiente no host.
- [CLI Astro](https://docs.astro.build/en/reference/cli-reference/#astro-preview):
  use preview para inspeção local, sem adotá-lo como servidor de produção.

## Diagnóstico por artefato

| Sintoma | Conferência | Correção delimitada |
| --- | --- | --- |
| HTML abre, ilha não hidrata | URL e resposta dos chunks no navegador | Corrigir base ou publicação dos ativos |
| Rota dinâmica responde 404 | Adaptador, entrypoint e regra de encaminhamento | Encaminhar rota ao servidor gerado |
| Segredo funciona no build, falta no host | Presença da variável no processo | Configurar ambiente de runtime sem recompilar valor secreto no cliente |
| Conteúdo de versão anterior | Commit do artefato e política de cache | Servir artefato novo e invalidar somente conteúdo afetado |

Em falha de build, não use a existência de dist como comprovação de sucesso.
Leia o exit code e associe o teste ao diretório produzido naquela execução.
Para rollback, restaure o artefato completo, incluindo HTML, chunks e servidor;
misturar HTML antigo com chunks novos pode quebrar imports do cliente.

## Referências de arquitetura

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para build-deploy](https://docs.astro.build/en/guides/on-demand-rendering/):**
  prerender, modo servidor e adaptador; consulte antes de alterar a execução de
  rotas.
