# Imagens no Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Origem e componente

Arquivo em src pode ser importado e processado por Image ou Picture de
astro:assets. Arquivo em public é servido pelo caminho público e não passa pela
transformação de imagem do Astro. Use public para favicon, arquivo que precisa
manter URL estável ou ativo já otimizado por outro pipeline.

Use Image para uma fonte e Picture para oferecer formatos alternativos da
mesma imagem. Recortes distintos por viewport pedem fontes com media em um
elemento picture e processamento explícito das imagens, por exemplo getImage.
Não suponha que a prop formats muda o recorte. Informe width e height, ou dados
de imagem importada, para reservar
espaço. Use sizes quando o layout muda a largura exibida; widths sem sizes
costuma entregar arquivo maior do que o necessário.

## Carregamento

Imagem LCP visível na primeira dobra pode usar loading eager e fetchpriority
high após medir a página. Imagem fora da primeira dobra usa lazy. Não marque
todas como eager. Logo SVG e ícone decorativo podem ficar fora do pipeline
quando o tamanho e a URL já são adequados.

Para URL remota, autorize host e padrão na configuração de imagem antes de
passar a origem ao componente. Não aceite URL digitada pelo visitante como src
sem validar protocolo e host.

## Texto alternativo

alt vazio serve para imagens decorativas ou redundantes no contexto, mesmo
quando não se repetem. Imagem que representa ação,
produto, dado ou conteúdo recebe texto que comunica sua função. Não repita a
legenda adjacente nem acrescente palavras como imagem ou foto.

## Inspeção da imagem entregue

No navegador, leia currentSrc, naturalWidth e largura calculada do elemento.
Compare a fonte escolhida com largura CSS e devicePixelRatio. O arquivo do
src não é necessariamente o que foi baixado quando existe srcset.

No painel Network, confirme content type, tamanho transferido e status. Uma
URL que responde 200 com HTML de fallback continua sendo uma imagem inválida.
Teste duas larguras de viewport e um dispositivo com densidade diferente.
Para imagem remota, simule falha da origem em ambiente isolado e confira se
o build ou runtime comunica a indisponibilidade sem usar ativo silenciosamente
incorreto.

Para art direction, confira recorte e ponto focal em cada breakpoint. Para
troca de formato, confira que todas as variantes preservam o mesmo conteúdo.

## Fontes de implementação

- [Imagens Astro](https://docs.astro.build/en/guides/images/)
- [Referência de configuração de imagens](https://docs.astro.build/en/reference/configuration-reference/#image)
