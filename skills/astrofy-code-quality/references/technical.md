# Referência técnica de astrofy-code-quality

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia tsconfig.json, scripts de check e teste, arquivos alterados e consumidores
dinâmicos.

Use o comando de tipos existente e delimite cada correção por comportamento.
Confira imports dinâmicos, coleções e rotas antes de remover código supostamente
sem uso.

## Alteração compatível

Preserve aliases e APIs públicas ao reduzir duplicação. Uma atualização de
dependência exige escopo próprio e consulta do guia da versão correspondente.

## Diagnóstico

Um import com caixa incorreta pode passar localmente e falhar em Linux. Confira
o nome exato no Git e teste em ambiente sensível a maiúsculas.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Tipos e imports

Astro 7 combina tipos TypeScript, tipos de componentes .astro e schemas de
Content Layer. Use unions para variantes e tipos derivados do schema para dados
editoriais. Evite any em limites entre módulo e componente.

Remover import pede busca por consumidores diretos, MDX e aliases. Uma limpeza
de dependência só termina após lockfile, build e bundle confirmarem ausência de
uso.

## Cobertura das ferramentas

Leia os scripts antes de executá-los: check pode chamar TypeScript, Astrofy ou
outro validador. Astro build compila o projeto, mas não substitui astro check
para diagnósticos de tipos em arquivos .astro. Tsc isolado também não cobre
esses componentes da mesma maneira. Registre comando e arquivos alcançados.

Confira includes, excludes, extends e referências do tsconfig. Tipos gerados
do Astro devem acompanhar a configuração atual; quando estiverem ausentes ou
desatualizados, use o fluxo de sync do projeto antes de concluir que a API não
existe. Não edite arquivos gerados para eliminar um diagnóstico.

Para ESLint, confira parser e configuração que realmente alcançam .astro.
Regras JavaScript genéricas não interpretam automaticamente template Astro.
Preserve a forma de configuração adotada pelo projeto e confira compatibilidade
do eslint-plugin-astro com a versão instalada antes de adicionar presets.

## Contratos e entradas externas

Use Props para contratos dos componentes e tipos derivados para consumidores.
Uma asserção as não valida uma resposta de API. Receba dado desconhecido como
unknown, valide sua estrutura e normalize antes de passá-lo à renderização.
Não troque any por uma asserção igualmente permissiva apenas para silenciar lint.

Modele variantes incompatíveis com uniões discriminadas. Defaults precisam
preservar significado: ausência, string vazia e false podem representar estados
distintos. Teste consumidores existentes quando estreitar um tipo compartilhado.

Separe import type de imports executáveis. Ao remover dependência aparentemente
sem uso, confira configuração, scripts, MDX, carregamento dinâmico e efeitos
laterais. Busca por import direto não alcança todas essas formas de consumo.

## Correção e comprovação

Registre falhas anteriores à edição para separar regressões do estado inicial.
Corrija a causa no menor contrato coerente. Supressão pode ser necessária para
limitação documentada de ferramenta, mas deve ter alcance local e explicação
reproduzível; não desative a regra para toda a biblioteca.

Escolha a verificação pelo efeito: tipos para contrato, lint para regra estática,
build para resolução e compilação, teste de execução para comportamento. Uma
ilha pode compilar e ainda falhar na hidratação; nesse caso confira navegador
e console na rota afetada. Repetir todos os comandos sem mudança nova não amplia
a cobertura da revisão.

## Fontes

- [Guia eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/):
  configuração, parser e alcance das regras em arquivos Astro.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Integração React](https://docs.astro.build/en/guides/integrations-guide/react/):**
  compatibilidade da integração e hidratação; consulte antes de alterar a ilha.
- **[documentação para code-quality](https://docs.astro.build/en/guides/typescript/):**
  Props e astro check; escolha a checagem que alcança arquivos .astro.
