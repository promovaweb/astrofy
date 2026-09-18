# Referência técnica de astrofy-component-docs

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia Props, defaults, slots, imports, estilos, exemplos existentes e índice em
.astrofy/docs.

Documente valor aceito, padrão, obrigatoriedade e efeito de cada prop. Separe
exemplos observados de exemplos novos que ainda precisam ser compilados.

## Alteração compatível

Ao remover uma prop, altere assinatura, consumidores e exemplo documental no
mesmo escopo. Registre o caminho real do componente e atualize o índice.

## Diagnóstico

Um exemplo com prop removida precisa ser identificado na revisão. Tipos podem
detectá-lo quando a API é estrita; atributos arbitrários exigem conferência do
HTML e comportamento. O exemplo corrigido deve mostrar o estado descrito.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Contrato documentado

A documentação de componente descreve props obrigatórias, padrão, valores
aceitos, slots, atributos encaminhados e estados acessíveis. Exemplo precisa
reproduzir o import e a marcação real do consumidor.

Ao registrar componente de ilha, informe a diretiva client usada pelo consumidor
e as props serializáveis. Não prometa comportamento de navegador para componente
Astro estático.

## Extração do contrato

Leia Props junto à desestruturação de Astro.props e à marcação. Tipo opcional
não informa sozinho o default. Registre ausência, valor explícito e fallback
quando diferirem. Para união discriminada, documente combinações válidas em
vez de apresentar propriedades como independentes.

Para atributos encaminhados, informe elemento de destino e precedência entre
valor interno e recebido. Documente composição de class e IDs quando públicos.
Classes internas não devem virar API documentada sem necessidade do consumidor.

Para cada slot, registre nome, posição e conteúdo esperado. Diferencie fallback
de região omitida por Astro.slots.has. Confira semântica do conteúdo aceito:
inserir botão dentro de botão não se torna válido porque o slot aceita marcação.

## Exemplos verificáveis

Inclua import real e dependências de estilos ou dados. Um bloco Markdown não é
compilado por astro check. Para verificar exemplo novo, use um consumidor ou
fixture compilável e registre o comando. Docs check validar links não comprova
que o código do exemplo funciona.

Cubra uso mínimo e variante que altera comportamento ou semântica. Componente
que alterna link e botão precisa mostrar ambos os contratos. Para interação,
descreva teclado, foco e estado inicial, além da aparência.

Diferencie .astro com script de navegador de componente de framework hidratado.
JavaScript pode existir sem React; client:load não hidrata um arquivo .astro.
Informe o consumidor responsável pela diretiva e o conteúdo entregue antes
da hidratação.

## Manutenção

Relacione documento, componente e exemplos usados na conferência. Ao mudar uma
prop, procure exemplos em Markdown, MDX e páginas de demonstração. Atualize a
descrição do default mesmo quando os tipos não mudarem.

Se a API aceita atributos arbitrários, prop removida pode não gerar erro de tipo.
Confira HTML e comportamento nesse caso. Tipagem aberta limita o que a checagem
automática comprova sobre a documentação.

## Fontes

- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/):
  props, slots, fallback e scripts de navegador.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[documentação para component-docs](https://docs.astro.build/en/guides/typescript/):**
  Props e astro check; escolha a checagem que alcança arquivos .astro.
