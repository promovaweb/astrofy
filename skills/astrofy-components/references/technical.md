# Referência técnica de astrofy-components

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia componente .astro, declaração Props, slots, estilos e dois consumidores
reais.

Diferencie link de botão pela ação. Declare variantes finitas, valores padrão e
atributos encaminhados. Teste conteúdo longo e slot ausente quando forem
aceitos.

## Alteração compatível

Adicione uma variante sem alterar o valor padrão existente. Só remova uma prop
após migrar todos os consumidores e conferir usos em MDX.

## Diagnóstico

Uma prop obrigatória ausente deve aparecer na checagem de tipos. Um link de
navegação precisa renderizar href e receber foco por teclado.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                  | Método      | Escopo      | Verificação                                         |
| ---------------------- | ----------- | ----------- | --------------------------------------------------- |
| `components.contracts` | `hybrid`    | `component` | Propriedades e slots relevantes documentados.       |
| `components.types`     | `automatic` | `component` | Contratos tipados sem erros detectados.             |
| `components.reuse`     | `hybrid`    | `component` | Duplicações relevantes avaliadas para reutilização. |
| `components.examples`  | `hybrid`    | `component` | Exemplos refletem a implementação.                  |

## Contratos de componente

Props em frontmatter usam Astro.props; variante visual fica em união literal.
Preserve o elemento a para navegação e button para ação. Atributos aria, id,
class e type precisam de uma única origem.

Astro.slots.has permite omitir wrapper vazio. Se uma parte precisa de evento ou
estado, extraia essa parte como ilha em vez de hidratar todo o layout.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[documentação para components](https://docs.astro.build/en/basics/astro-components/):**
  Astro.props, slots nomeados e fallback; consulte ao alterar a API de um
  componente.
- **[TypeScript no Astro](https://docs.astro.build/en/guides/typescript/):**
  Props e astro check; escolha a checagem que alcança arquivos .astro.
- **[Diretivas](https://docs.astro.build/en/reference/directives-reference/):**
  client:load, client:visible, class:list e set:html; confira o efeito da
  diretiva escolhida.

## Contrato de componente antes da edição

Registre para cada prop: tipo, obrigatoriedade, valor padrão, consumidor e
efeito no HTML. Para slots, registre nome, conteúdo permitido e fallback. Separe
prop de estilo de atributo HTML encaminhado e evite espalhar valores recebidos
diretamente em elementos com função diferente.

Um componente de link pode exigir href e aceitar variant com dois valores. O
conteúdo vem de um slot. Um botão de envio usa button e type, sem href. Quando
ambos aparecem no projeto, escolha componentes separados ou uma união de props
que impeça combinações inválidas. Não esconda a distinção num conjunto crescente
de flags booleanas.

Teste pelo menos os consumidores afetados: valor padrão, variante explícita,
texto longo, foco visível e slot composto quando suportado. Propriedades de
acessibilidade e eventos precisam chegar ao elemento correto. Em Astro, um
componente .astro produz HTML; eventos de React dependem de uma ilha React.

Para checar Props de arquivos .astro, use o script existente que executa astro
check, se disponível. tsc isolado não comprova a validade de todas as expressões
.astro. Se o projeto não tiver a ferramenta, registre essa lacuna; instalação de
dependências segue o escopo autorizado.

## Fontes para contratos e composição

- **[Componentes Astro](https://docs.astro.build/en/basics/astro-components/):**
  consulte props, slots nomeados e fallback ao definir a composição.
- **[TypeScript no Astro](https://docs.astro.build/en/guides/typescript/):**
  confira tipos e a ferramenta adequada antes de declarar a API validada.
- **[Diretivas](https://docs.astro.build/en/reference/directives-reference/):**
  confira client e class:list quando a composição inclui hidratação ou
  variantes.
