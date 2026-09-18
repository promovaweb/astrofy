# Build e runtime no Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Escolha de saída

Em output static, páginas são prerenderizadas por padrão. Uma rota com
prerender false usa servidor quando existe adaptador compatível. Em output
server, rotas são dinâmicas por padrão e prerender true gera a rota no build.
Escolha pelo padrão predominante; ambos permitem combinar renderizações.
Confira adaptador, comando de inicialização e ambiente de runtime para cada
rota que precise de requisição.

Astro 7 usa Vite 8. Atualize plugin Vite e adaptador junto da major. Rode o
build a partir de instalação limpa usando o lockfile do projeto.

## Sequência de publicação

1. Execute a checagem de tipos e o build sem reutilizar dist anterior.
2. Liste arquivos gerados e confirme a saída esperada para static ou server.
3. Rode preview local. Em server, teste uma página dinâmica e um endpoint.
4. Configure valores de build e runtime no provedor. Valores presentes durante
   build não são automaticamente disponíveis ao processo de produção.
5. Após a publicação autorizada, teste rota inicial, rota dinâmica, 404,
   redirect e ativos com a URL pública.

Em Node adapter, segredos de runtime não são carregados automaticamente de .env
pelo adapter. O host deve fornecê-los ou o processo deve carregá-los antes de
node dist/server/entry.mjs no modo standalone. No modo middleware, o servidor
hospedeiro importa o handler e serve os ativos. Confira caminhos customizados
de outDir e build antes de copiar esse comando.

astro preview permite conferir o build localmente. A validação final do deploy
precisa do runtime do adaptador; preview não substitui o servidor de produção.

## Fontes

- [Migração para Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Integração Node](https://docs.astro.build/en/guides/integrations-guide/node/)
- [Renderização sob demanda](https://docs.astro.build/en/guides/on-demand-rendering/)
