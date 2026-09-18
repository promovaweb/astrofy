# Rotas em Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Ordem de implementação

Astro usa roteamento baseado em arquivos dentro de src/pages/. Crie
src/pages/sobre.astro para uma rota estática, [slug].astro para segmento
dinâmico, [...path].astro para rest parameter e index.astro para o índice do
diretório. Não mantenha uma tabela paralela de rotas para páginas comuns.

Para conteúdo estático, obtenha as entradas e retorne objetos params e props em
getStaticPaths(). Use strings para segmentos comuns; um rest parameter pode
receber undefined para gerar a raiz correspondente. Valide slug duplicado antes
do build e ordene a coleção antes de paginar para gerar saída reprodutível.

Em páginas renderizadas sob demanda, não use getStaticPaths() para simular
consulta por requisição. Leia Astro.params, valide formato e responda 404 para
valor ausente. A opção pede output: server ou rota sem prerender e um adaptador
instalado.

## URL canônica

Leia site, base e trailingSlash de astro.config.* antes de montar URL. Crie
links internos com prefixo base explícito e normalizado. new URL não acrescenta
o base do Astro: um path iniciado por barra resolve na raiz do domínio.
Para canonical, derive a origem pública de site, sem herdar o host do preview
ou de uma requisição arbitrária. Ao trocar um
endereço público, registre redirect no mecanismo compatível com o adaptador e
teste URL antiga e nova.

## Endpoints

Arquivo .ts em src/pages/ representa endpoint. Declare somente os métodos
necessários, valide entrada e retorne Response com status e content type. Código
de endpoint permanece no servidor; não importe segredo em componente com
diretiva client:*.

## Colisões e respostas

Compare a lista final de URLs antes de gravar redirects. Inclua o prefixo de
idioma, base, extensão e política de barra. Identificadores diferentes da
coleção podem produzir o mesmo endereço depois de normalizados.

Teste redirects primeiro sem seguir Location: confira status e destino. Depois
acompanhe a cadeia com limite de saltos para encontrar ciclos. Em hospedagem
puramente estática, um HTML com meta refresh não comprova redirect HTTP; use
as regras do provedor para exigir 301 ou 308.

Para uma rota SSR ausente, confira o status 404 na primeira resposta. Renderizar
uma mensagem de erro com status 200 produz um resultado diferente. Teste também
arquivo estático e endpoint para que uma regra catch-all não capture ativos.

## Fontes de implementação

- [Páginas Astro](https://docs.astro.build/en/basics/astro-pages/)
- [Referência de roteamento](https://docs.astro.build/en/reference/routing-reference/)
