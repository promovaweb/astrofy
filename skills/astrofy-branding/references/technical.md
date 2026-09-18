# Referência técnica de astrofy-branding

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia ativos fornecidos, identidade existente, design-system.json e
source-map.json quando disponível.

Registre origem, licença informada e uso de cada ativo. Distinga valor fornecido
de aproximação visual. Examine uma exportação Brandfy real antes de escolher o
mapeamento.

## Alteração compatível

Compare exportação recebida, importação anterior e alteração local; apresente
divergências por campo. Preserve o ajuste local até resolver a divergência.

## Diagnóstico

Reimportar uma cor alterada localmente deve conservar ou sinalizar a
personalização; um caminho de logo ausente deve aparecer como pendência.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra              | Método   | Escopo    | Verificação                                          |
| ------------------ | -------- | --------- | ---------------------------------------------------- |
| `brand.provenance` | `manual` | `project` | Origem e inferências da identidade registradas.      |
| `brand.assets`     | `hybrid` | `project` | Ativos referenciados existem e correspondem à marca. |
| `brand.fonts`      | `hybrid` | `project` | Fontes e fallbacks definidos.                        |

## Ativos de marca

Mantenha source-map com origem, formato, dimensões, autorização e consumidor de
cada ativo. SVG de marca preserva viewBox e não recebe rasterização sem
necessidade. Tokens de cor representam função visual, não nome do arquivo.

Logo claro e escuro devem ser escolhidos pelo mesmo atributo ou classe de tema
consumida pelo CSS. Confira contraste e proporção em cabeçalho, rodapé e Open
Graph.

## Mapeamento para o projeto

Compare o formato recebido com o schema consumido pelo Astrofy antes de importar.
Paleta de marca não determina automaticamente funções de surface, content e
action. Registre quais valores vieram da fonte e quais associações semânticas
foram escolhidas para o site, sem alterar os arquivos originais de marca.

Confira se o caminho do ativo representa arquivo-fonte, asset processado ou URL
pública. Um caminho relativo ao pacote de origem não passa a funcionar dentro
do projeto de destino sem cópia ou resolução apropriada. Valide maiúsculas,
extensão e referência final no HTML gerado.

## Logos e fontes

Inspecione proporção, área transparente e viewBox antes de ajustar dimensões.
Logo com margem embutida pode parecer menor mesmo com a mesma largura CSS.
Não remova elementos ou distorça proporção para compensar uma exportação inadequada.
Confira variante clara e escura nos fundos reais dos consumidores.

Para fontes, registre família, arquivos, pesos, estilos e licença informada.
Declare apenas pesos disponíveis ou o intervalo real da variável. Verifique
fallback antes e depois do carregamento para detectar cortes e mudança de largura.
Não presuma que um arquivo com nome bold contém o peso solicitado.

## Reimportação e personalizações

Compare três estados quando disponíveis: fonte recebida, última importação e
valor atual. Valor atual diferente da última importação indica possível ajuste
local. Registre divergência por campo antes de sobrescrever; sem base anterior,
não conclua automaticamente que a diferença é erro do projeto.

Depois da importação, regenere derivados pelo mecanismo existente e confira
consumidores representativos. Arquivo de logo existente não comprova legibilidade
em header compacto; token válido não comprova contraste do botão que o utiliza.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/):**
  tipos e aliases DTCG 2025.10; diferencie a árvore de tokens do envelope
  Astrofy.
- **[Images](https://docs.astro.build/en/guides/images/):** origem da imagem,
  transformação e texto alternativo; consulte antes de trocar o componente de
  mídia.
