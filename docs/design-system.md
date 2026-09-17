# Tokens e CSS

O JSON em `.astrofy/design/design-system.json` é a fonte editável da identidade
visual. Seu envelope é específico do Astrofy. A árvore `tokens` usa tipos e
aliases DTCG 2025.10, enquanto `modes.light.overrides` e
`modes.dark.overrides` são extensões do framework.

## Organização dos tokens

Use `primitive` para valores de origem, `semantic` para funções visuais e
`component` quando um valor recorrente pertencer a um componente específico.
Os nomes dos grupos não substituem o tipo declarado por `$type`.

Um alias completo usa a sintaxe `{primitive.color.white}`. O modo é aplicado
antes da resolução, portanto uma referência semântica acompanha o override de
seu destino. Referências ausentes, ciclos e tipos incompatíveis são recusados.

Tipos convertidos incluem cores, dimensões, famílias e pesos tipográficos.
O gerador também trata números, durações, curvas, bordas, transições, sombras,
gradientes e tipografia composta. Dimensões usam `px` ou `rem`. Durações usam
`ms` ou `s`. Traçados customizados de SVG são recusados pela saída de borda CSS,
pois esse formato não preserva sua semântica.

## Nomes e Tailwind

A variável de um token como `semantic.color.surface` é
`--astrofy-semantic-color-surface`. O nome é convertido para ASCII e kebab-case.
Colisões são erros. O utilitário semântico correspondente usa `--color-surface`
no bloco `@theme inline`, permitindo classes como `bg-surface`.

Cores primitivas mantêm o prefixo `primitive` nos utilitários para não colidir
com uma função semântica de mesmo nome. Tokens de componente mantêm o prefixo
`component`. Breakpoints são emitidos como valores estáticos e não podem mudar
entre temas.

O CSS gerado importa Tailwind uma única vez. O layout do site deve importar
esse arquivo e depois os estilos autorais. Os estilos autorais não repetem a
paleta de marca. Ativos do JSON são consumidos pelos componentes e não viram
declarações CSS.

## Geração e comparação

```bash
astrofy tokens validate
astrofy tokens build --dry-run
astrofy tokens build
astrofy tokens check
```

A validação confere os dois modos. O build escreve CSS e manifesto. O check
compara os bytes esperados com os arquivos atuais e retorna código 1 quando
houver divergência. Timestamps não entram no CSS nem no manifesto, portanto a
mesma entrada e versão produzem os mesmos bytes.

O manifesto registra a versão do gerador, o hash de entrada e o hash de cada
saída. Uma alteração de tokens também invalida avaliações que dependem da
identidade visual quando a checklist é consultada ou reavaliada.

## Importação Brandfy

O adaptador usa o formato observado em `brandfy/brand/tokens.json`, com `name`,
`families`, `light` e `dark`. As famílias contêm escalas de cores hexadecimais.
As funções de tema são mapeadas para tokens semânticos, preservando o modo.

```bash
astrofy tokens import-brandfy --source .brandfy/tokens.json --dry-run
astrofy tokens import-brandfy --source .brandfy/tokens.json
```

O source-map registra a origem e o valor importado de cada caminho. Um ajuste
local marcado com `localOverride: true` permanece intacto na reimportação.
Uma divergência local não marcada interrompe a operação para conciliação.
O adaptador não presume logos nem importa arquivos de uma URL externa.

Confira os componentes depois de gerar o CSS. Sincronização de bytes não
substitui a revisão de contraste, logos e estados de interação.
