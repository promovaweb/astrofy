# Casos de verificar seo

## Header de staging no ambiente público

Use ambiente de teste com meta robots permitindo indexação e X-Robots-Tag
noindex aplicado pelo host. A revisão deve apontar a diferença entre HTML e
resposta HTTP. Corrija a configuração apenas no ambiente abrangido pelo pedido
e preserve o noindex intencional de staging.

## Rota SSR ausente do sitemap

Crie na fonte de teste uma entrada publicada com rota por requisição. Confira
sua resposta e procure sua URL no conjunto de XMLs gerados. Quando a descoberta
automática não cobrir a rota, acrescente-a pelo mecanismo documentado e repita
a comparação. Não inclua entradas em rascunho junto com as públicas.

## Canonical com base e paginação

Publique uma listagem paginada sob base não vazia. Compare as duas primeiras
páginas e uma URL com parâmetro de campanha. A canonical de cada página
preserva sua posição na paginação e a base; a remoção de parâmetros segue a
política documentada. Confira também o header Link para evitar conflito.

## Uso comum

Confira título e canônica de /blog/2/ após o build.

## Projeto existente

Um staging usa noindex intencional. Preserve a política e não trate a tag como erro genérico.

## Erro recorrente

Encontrar uma tag no código-fonte não comprova que ela aparece na saída renderizada.

## Conferência

Cada diagnóstico identifica rota e tag. Indexação e canônica correspondem à política do ambiente. Use `astrofy check --category seo` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** HTML atual, domínio de produção, política de staging, sitemap e robots.
- **Alteração sob teste:** Preserve overrides autorizados e URLs publicadas. Corrija duplicação no layout responsável em vez de acrescentar outra tag na página.
- **Falha e resultado esperado:** Duas tags canonical na mesma página devem ser detectadas. Um staging intencionalmente noindex não deve receber index por correção automática.
- **Comando complementar:** `astrofy check --category seo`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
