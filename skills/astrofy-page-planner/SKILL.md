---
name: astrofy-page-planner
description:
  Conduz a definição modular de páginas para sites Astro, seleciona a entrevista
  adequada e registra conteúdo, áreas, mídia e ações antes da implementação.
---

# Planejar uma página do site

Use esta skill quando a pessoa pedir uma página nova ou uma reformulação sem
entregar uma definição completa. Esta é a entrada conversacional para páginas.
Ela coordena a coleta e não altera componentes, rotas ou estilos.

## Reconhecimento

1. Leia instruções locais, estado Git, `.astrofy/docs/index.md`, configuração,
   rotas, layouts, componentes, páginas semelhantes e design system.
2. Confirme se o pedido trata de venda, produto, serviço, Home, Sobre, Contato
   ou Preços. Quando houver dois tipos plausíveis, explique a diferença prática
   e peça a escolha antes de entrevistar.
3. Carregue somente a especialista selecionada e suas referências. Preserve
   perguntas próprias do tipo escolhido.
4. Registre fatos fornecidos, conteúdo já publicado e lacunas separadamente.
   Não converta hipótese do agente em texto aprovado.

## Entrevista por checkpoints

Conduza uma etapa de cada vez. Mostre o resumo atualizado e aguarde a resposta
quando a etapa seguinte depender da escolha atual.

1. **Finalidade:** objetivo, público, rota e ação principal.
2. **Arquitetura:** apresente três composições realmente diferentes, com a
   recomendada primeiro, e permita uma composição escrita pela pessoa.
3. **Conteúdo:** percorra cada área aprovada e colete heading, corpo, itens,
   ações, destinos e fonte factual. Texto ausente permanece pendente.
4. **Mídia:** registre ativo existente, origem, texto alternativo, proporção e
   estado sem mídia. Não solicite upload por ferramenta limitada a texto.
5. **Comportamento:** registre formulário, navegação, estados, responsividade,
   analytics e integrações que a página realmente usa.
6. **Revisão:** apresente a página inteira na ordem de leitura, com pendências
   explícitas, antes de marcar a especificação como aprovada.

Leia o [contrato da especificação](references/technical.md) durante a coleta e
os [casos de entrevista](examples/cases.md) para tratar página existente,
conteúdo incompleto e mudança de escopo.
O contrato fechado distribuído pelo pacote fica em
`packages/schemas/page-spec.schema.json` no checkout do Astrofy.

## Saída

Grave `.astrofy/pages/<slug>/page.md` e
`.astrofy/pages/<slug>/page-spec.json` somente depois de confirmar slug e rota.
O Markdown apresenta a leitura completa; o JSON conserva os campos usados pela
próxima orquestradora. Use os estados `proposed`, `content_pending`, `approved`
e `ready` conforme o contrato.

Não marque a página como `approved` enquanto objetivo, público, rota,
arquitetura e ação principal estiverem abertos. Ela pode seguir com áreas
opcionais pendentes quando isso estiver registrado e não impedir o percurso
principal.

## Encaminhamento

Depois da aprovação, invoque `astrofy-implementation-planner`. Forneça os dois
arquivos gerados, a raiz do aplicativo e as pendências aceitas. Não encaminhe
texto provisório como conteúdo final.
