# Casos de uso do Astrofy Design

## Criar uma página

Peça `astrofy-design build` para uma página de produto com conteúdo aprovado.
O agente lê tokens e componentes, apresenta a composição e implementa na rota
indicada. Confira o build, a navegação e o comportamento em telas estreitas.

## Estudar uma imagem

Peça `astrofy-design study` com uma captura fornecida. O resultado descreve
hierarquia, composição e papéis tipográficos. Uma imagem não permite afirmar
o nome exato da fonte. O estudo não modifica o projeto.

## Estudar uma URL

Peça `astrofy-design study https://example.com`. Se a página não puder ser
acessada ou renderizada, o agente informa a limitação. Ele não apresenta uma
análise visual baseada apenas no título retornado pelo servidor.

## Auditar um componente

Peça `astrofy-design audit src/components/Header.astro`. O agente localiza os
problemas de composição e interação e explica como corrigi-los. Nenhum arquivo,
relatório ou histórico deve ser alterado por esse pedido de diagnóstico.

## Redesenhar várias páginas

Peça `astrofy-design redesign` para as rotas de produto e preços. O agente
preserva as funcionalidades e aplica o mesmo contrato visual às duas páginas.
A comparação antes e depois precisa mostrar consistência entre as rotas.

## Exportar a composição

Depois de aprovar uma composição, peça um `design.md` portátil. O agente
registra os tokens e os limites de variação, preservando o documento existente.
Uma referência visual externa não autoriza copiar logos, textos ou imagens.
