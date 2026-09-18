# Componentes Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Contrato de Props

Declare interface Props no frontmatter e leia Astro.props uma vez. Modele
variante como união de literais, por exemplo 'primary' | 'secondary', e escolha
um padrão compatível com consumidores existentes. Separe prop visual de prop de
comportamento. Não aceite string livre para classe sem definir como ela compõe
com classes internas.

Quando o componente encaminha atributos HTML, receba os atributos restantes e
envie-os ao elemento sem duplicar id, class, href, type ou aria-* já controlado
pela API. Link usa a; ação local usa button com type explícito.

## Slots e composição

Use slot nomeado para região estrutural opcional, como actions, e slot padrão
para corpo. Verifique Astro.slots.has('actions') antes de reservar marcação
vazia. Um componente que muda tag por prop precisa manter nome acessível e
comportamento de teclado correspondente.

## Fronteira cliente

Componente .astro renderiza no servidor por padrão. Não acrescente React ou
outra integração para uma variante visual. Se parte do componente pede estado,
extraia somente essa parte para ilha e passe dados serializáveis.

## Encaminhamento e composição tipada

Use HTMLAttributes de astro/types quando a API estende um elemento nativo.
Se href determina link e ausência de href determina botão, modele uma união
que impeça props incompatíveis, como disabled esperando comportamento nativo
de botão em uma âncora. aria-disabled em link não impede navegação sozinho.

Defina a precedência entre defaults e atributos recebidos antes do spread.
Extraia class para composição com class:list; não deixe o spread sobrescrever
silenciosamente a classe estrutural. Preserve `data-*` e `aria-*` dos consumidores.

Para IDs ligados a label, descrição ou região controlada, permita identificador
do consumidor e teste duas instâncias na mesma página. Valor fixo dentro do
componente cria relações ambíguas. Verifique o HTML emitido, além dos tipos.

Slots são conteúdo renderizado pelo Astro. Um componente React não importa um
arquivo .astro para executar no cliente; a página pode fornecer esse conteúdo
como children estático. Estado do React não transforma esse conteúdo em um
componente React com props reativas.

## Fontes de contratos

- [Sintaxe de componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Diretivas Astro](https://docs.astro.build/en/reference/directives-reference/)
