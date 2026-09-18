# Referência técnica de astrofy-init

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia package.json, lockfile, astro.config.*, .astrofy/config/paths.json e
.astrofy/config/features.json.

Diferencie versão declarada, resolvida no lockfile e instalada. Use --root
apontando ao pacote Astro, inclusive em monorepo. Confira caminhos e recursos
detectados antes da primeira escrita.

## Alteração compatível

Conserve as oito configurações existentes; corrija somente campos inválidos.
init cria arquivos ausentes e não converte o site para outra estrutura.

## Diagnóstico

Um features.json com blog como string deve recusar init e conservar seus bytes.
Um segundo init válido deve produzir created vazio.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                   | Método      | Escopo    | Verificação                                                |
| ----------------------- | ----------- | --------- | ---------------------------------------------------------- |
| `project.detected`      | `automatic` | `project` | Raiz, Astro, manifesto e lockfile identificados.           |
| `project.compatibility` | `automatic` | `project` | Versões dentro da matriz suportada ou limitação declarada. |
| `project.contract`      | `automatic` | `project` | Contrato Astrofy válido.                                   |
| `project.paths`         | `automatic` | `project` | Caminhos configurados existem e estão no escopo permitido. |
| `project.features`      | `hybrid`    | `project` | Recursos habilitados correspondem ao site.                 |

## Adoção preservativa

A inspeção lê manifestos e arquivos sem importar astro.config.*. Em workspace,
--root aponta para o pacote com Astro, não para a raiz compartilhada.
Configuração JSON inválida deve ser corrigida no campo indicado.

O init cria contratos Astrofy e não gera páginas, instala integração ou move
código. A segunda execução preserva arquivos e anotações do projeto.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[JSON Schema](https://ajv.js.org/json-schema.html):** dialeto JSON Schema e
  validação Ajv; consulte ao diagnosticar campos recusados.
- **[documentação para init](https://docs.astro.build/en/guides/upgrade-to/v6/):**
  mudanças da major 6; consulte somente quando a instalação ou migração envolver
  Astro 6.
- **[Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/):** mudanças da
  major 7; consulte somente quando a instalação ou migração envolver Astro 7.

## Adoção sem substituir o projeto

Antes de executar, registre a raiz escolhida e leia o manifesto como JSON. A
inspeção não deve importar astro.config nem módulos TypeScript do site. A versão
instalada prevalece sobre a faixa declarada; lockfiles concorrentes ou versão
não identificada precisam aparecer no relato da inspeção.

```bash
astrofy inspect --root apps/site --json
astrofy init --root apps/site --dry-run --json
astrofy init --root apps/site --json
astrofy status --root apps/site --json
```

Substitua apps/site pelo pacote real. Se o JSON existente for inválido, pare na
correção do campo informado; apagar a pasta .astrofy perde notas e escolhas
anteriores. Compare created e preserved entre dry-run e escrita.

O init cria os contratos project, paths, features, policies, skills, checks,
integrations e exceptions, além da checklist e documentação inicial. Ele não
gera um site nem instala as skills. O mapeamento inicial usa caminhos
convencionais; um site com src/views exige conferir paths.layouts e os demais
caminhos antes dos checks. A detecção de recursos por nomes de arquivos é uma
hipótese inicial: confira features contra a implementação.

Em adoção repetida, compare os bytes de uma página, uma configuração e uma nota
documental personalizada. Nenhum desses arquivos deve mudar por causa de init.
Uma checklist inicial contém avaliações pendentes ou itens não aplicáveis, sem
aprovação presumida do site.

## Fontes para adoção

- **[Astro 6](https://docs.astro.build/en/guides/upgrade-to/v6/):** consulte ao
  encontrar uma API ou requisito diferente durante adoção em Astro 6.
- **[Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/):** consulte
  somente para projetos nessa major ou migração explicitamente solicitada.

A faixa implementada pelo Astrofy é Astro 5 a 7. As fixtures distribuídas
exercitam combinações específicas de Astro 5 e 6; isso não comprova todas as
versões aceitas pela faixa. Registre a combinação realmente usada.
