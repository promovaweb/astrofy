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
3. **Voz e redação:** peça uma amostra aprovada ou consulte as referências
   editoriais existentes. Registre o tom, as expressões a preservar e as que a
   pessoa quer evitar. Não copie frases da amostra. Se não houver uma, pergunte
   quais características ela prefere. A falta de amostra não impede o plano.
4. **Conteúdo:** percorra cada área aprovada e colete heading, corpo, itens,
   ações, destinos e fonte factual. Texto ausente permanece pendente. Marque
   sugestões redigidas pelo agente como propostas até a aprovação da pessoa.
5. **Mídia:** registre ativo existente, origem, texto alternativo, proporção e
   estado sem mídia. Não solicite upload por ferramenta limitada a texto.
6. **Comportamento:** registre formulário, navegação, estados, responsividade,
   analytics e integrações que a página realmente usa.
7. **Revisão:** apresente a página inteira na ordem de leitura. Se houver copy
   proposta, use `astrofy-editorial-review` em modo de auditoria antes da
   aprovação. Reescreva achados somente na copy criada pelo agente e repita a
   auditoria. Registre pendências explícitas e aguarde a aprovação da página.

Quando o CLI estiver disponível, use `astrofy page create` para iniciar o
estado, `astrofy page answer` para registrar cada resposta e
`astrofy page status` antes de formular a pergunta seguinte. O campo
`nextQuestions` limita cada interação a três assuntos e impede a repetição de
entradas já preenchidas.

O schema de entrevista do CLI não possui campo de voz. Nesse percurso, registre
a direção confirmada em `page.md` durante a revisão, sem acrescentar campo ao
JSON.

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
e `ready` conforme o contrato. Registre no Markdown a seção `Voz e redação`,
com a referência aprovada, as características escolhidas e as expressões a
preservar ou evitar.

O contrato pronto também registra `seo`, `integrations`, `accessibility` e
`tests`. Não marque uma resposta ausente como texto vazio para encerrar a
entrevista; mantenha o campo em `missing` até receber conteúdo.

Não marque a página como `approved` enquanto objetivo, público, rota,
arquitetura e ação principal estiverem abertos. Ela pode seguir com áreas
opcionais pendentes quando isso estiver registrado e não impedir o percurso
principal.

## Encaminhamento

Depois da aprovação, invoque `astrofy-implementation-planner`. Forneça os dois
arquivos gerados, a raiz do aplicativo e as pendências aceitas. Não encaminhe
texto provisório como conteúdo final.
