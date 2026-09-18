# Configuração em Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Mapa de valores

- URL pública de API: cliente e servidor, via astro:env/client.
- Chave de API: servidor, via astro:env/server.
- site e base: componente Astro, via import.meta.env.SITE e BASE_URL.
- Flag do build: cliente ou servidor, via import.meta.env.PROD e DEV.

Em Astro 7, PUBLIC_ expõe uma variável no bundle do cliente. Nunca dê esse
prefixo a chave, token, credencial ou endereço interno. Prefira astro:env para
declarar tipo, contexto, acesso, obrigatoriedade e valor padrão.

## Schema de ambiente

Declare o schema no astro.config.* com defineConfig e envField. Use context:
client apenas para valor público que o navegador pode receber. Use context:
server com access: secret para segredo. Importe a variável tipada de
astro:env/client ou astro:env/server; não espalhe leituras de process.env por
componentes.

astro.config.* roda antes do carregamento automático de .env. Para ler arquivo
de ambiente nessa configuração, use loadEnv do Vite e instale vite diretamente
quando o gerenciador for pnpm. Fora da configuração, use import.meta.env.

## Mudanças de configuração

Confira dependências entre site, base, trailingSlash, output, adapter,
integrations, aliases Vite e env.schema; altere somente o escopo necessário.
Base participa de links, BASE_URL e arquivos gerados.
No Astro 7, output aceita static ou server. Para combinar páginas estáticas e
sob demanda, instale o adaptador e configure prerender por rota; hybrid não é um
valor atual de output. Em static, use export const prerender = false nas rotas
dinâmicas; em server, prerender = true gera uma rota durante o build.

Astro 7 usa Vite 8. Confira compatibilidade dos plugins na migração da major;
atualize apenas os que precisarem e teste depois de editar vite.plugins,
resolve.alias ou ssr.

## Configuração pública e contrato Astrofy

Os JSONs de .astrofy/config descrevem adoção e verificação do projeto. Eles não
substituem astro.config.* nem são automaticamente importados pela aplicação.
Um caminho alterado em paths.json precisa corresponder à estrutura existente;
não move arquivos por si só.

Módulo público de navegação ou identidade contém dados que podem chegar ao
HTML e ao bundle. Não reexporte segredos junto de configuração pública por um
index compartilhado. Confira imports transitivos dos consumidores cliente.

## Build e runtime

Classifique cada variável pelo momento de leitura. Valor incorporado no build
não muda ao editar o ambiente do servidor sem nova geração. Para segredo lido
em runtime, confira suporte do adaptador e forma de disponibilização no host.
Teste com valor fictício identificável, sem imprimir credenciais reais.

Defaults devem representar ausência permitida. Não use valor de produção como
fallback silencioso de staging para endpoint que produz efeitos externos.
Campos obrigatórios ausentes precisam produzir diagnóstico identificável antes
do uso. Teste string vazia, formato inválido e valor válido separadamente.

Ao editar configuração executável, preserve plugins e callbacks existentes.
Uma inspeção estática lê texto ou AST; build executa a configuração e deve ser
tratado como execução do projeto. Não importe astro.config.* apenas para listar
valores ou descobrir o diretório de saída.

## Fontes

- [Variáveis de ambiente](https://docs.astro.build/en/guides/environment-variables/)
- [API astro:env](https://docs.astro.build/en/reference/modules/astro-env/)
- [Configuração Astro](https://docs.astro.build/en/reference/configuration-reference/)
