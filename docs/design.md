# Astrofy Design

A skill `astrofy-design` trabalha na composição visual de interfaces Astro.
Ela reúne o fluxo de criação, os temas, os componentes, as macroestruturas,
a tipografia, as cores, o movimento e a revisão visual na própria instalação.
O funcionamento não depende de consultar um site externo para ler as regras.

## Percursos de leitura

O [guia prático](user/11-astrofy-design.md) explica como escolher o modo e
conferir a entrega. A [referência de uso](user/12-astrofy-design-referencia.md)
descreve as entradas, os arquivos e os limites, com cinco exemplos por modo.
Os dois capítulos entram no ebook e na documentação do site. Este documento
concentra instalação pelo checkout e integração com o pacote.

## Instalação e uso

No checkout do Astrofy, execute o build e instale a skill no projeto desejado.
O primeiro comando de instalação mostra os arquivos previstos sem gravá-los.

```bash
npm run build
node dist/cli/index.js skills install --agent codex --skill astrofy-design --root /caminho/do/site --dry-run
node dist/cli/index.js skills install --agent codex --skill astrofy-design --root /caminho/do/site
```

Use `claude` no lugar de `codex` para instalar no outro agente. A instalação
completa da biblioteca também inclui essa skill. O instalador preserva arquivos
personalizados e instala referências, exemplos, paletas e licença juntos.

Os modos abaixo são invocações na conversa, não subcomandos do terminal:

| Modo | Exemplo | Resultado |
| --- | --- | --- |
| Criar | `astrofy-design build` para a página de produto | Composição e implementação no projeto |
| Estudar | `astrofy-design study` com uma URL ou captura | Análise da referência, sem editar o site |
| Auditar | `astrofy-design audit src/pages/index.astro` | Problemas localizados e sugestões |
| Redesenhar | `astrofy-design redesign src/pages/index.astro` | Nova composição com funções preservadas |

Também é possível pedir um componente isolado, um redesign de várias rotas
ou uma exportação portátil para `design.md`. Consulte os
[casos de uso](../skills/astrofy-design/examples/cases.md) para esses percursos.

## Relação com as outras skills

`astrofy-design` propõe e revisa a composição. `astrofy-design-system` mantém
o contrato dos tokens. `astrofy-themes` cuida da preferência de tema e da
primeira pintura. `astrofy-page-design` trata da composição responsiva dentro
do fluxo de páginas, e `astrofy-components` mantém os componentes reutilizáveis.

As referências incorporadas conservam o inglês da fonte técnica. As instruções
de entrada e a integração estão em Português do Brasil. Exemplos genéricos de
exportação precisam ser adaptados ao envelope do Astrofy antes de validar ou
gerar CSS. A skill explica essa conversão na
[referência técnica](../skills/astrofy-design/references/technical.md).

A consulta às paletas não instala fontes nem importa automaticamente todos os
temas. O histórico de composições fica em `.astrofy/design/log.json`. Estudo e
auditoria não criam esse arquivo. A identidade do mesmo produto permanece
consistente entre suas páginas.

## Conteúdo incorporado e limites

A biblioteca contém as 106 referências da fonte, o fluxo de composição e as
paletas CSS necessárias à consulta dos temas. O registro técnico da importação
fica em `skills/astrofy-design/source-manifest.json`. Os avisos exigidos pela
licença MIT estão em `skills/astrofy-design/LICENSE` e acompanham a instalação.

As imagens externas citadas no guia de imagens não acompanham a biblioteca.
A implementação precisa usar arquivos reais do projeto ou gerar os ativos
solicitados. Preços, disponibilidade e licenças de serviços mencionados nos
exemplos exigem consulta antes do uso.

## Conferência

Os testes do Astrofy verificam catálogo, workflow, instalação nos dois agentes,
links locais e preservação de personalizações. Depois de usar a skill em um
site, execute o build desse projeto e confira a página no navegador. Tokens
válidos não comprovam responsividade, contraste ou funcionamento das ações.

O validador de distribuição limita o tarball a 1.500.000 bytes, incluindo a
biblioteca de design. Confira o pacote com `npm run package:verify -- pacote.tgz`
antes de publicar uma edição.
