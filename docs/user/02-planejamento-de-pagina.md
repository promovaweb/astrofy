# Planejamento de uma página

Descreva a página ao agente na conversa, com suas próprias palavras —
você não precisa nomear um tipo de página nem conhecer o catálogo de
especialistas. `astrofy-page-planner` examina a estrutura atual do site
(rotas existentes, convenções já em uso) e escolhe qual das sete
entrevistadoras especializadas conduz a conversa. Se o projeto ainda não
tiver os contratos básicos do Astrofy, o agente prepara isso primeiro,
sem perguntar — esse é o mesmo encaminhamento automático descrito no
capítulo 1.

## Por que sete especialistas, e não uma entrevista genérica

Uma página de vendas e uma página de contato precisam de informação
completamente diferente: a primeira vive de oferta, prova e objeção; a
segunda vive de campos de formulário, consentimento e prazo de resposta.
Uma entrevista única e genérica para os dois casos acaba perguntando
coisa irrelevante para um tipo e deixando de perguntar o essencial para
o outro. Por isso o Astrofy mantém uma entrevistadora por tipo, cada uma
com as perguntas certas para aquele formato:

| Pedido | Especialista | O que ela garante que não falte |
| --- | --- | --- |
| Landing page de vendas | `astrofy-plan-sales-page` | Oferta, prova, preço, objeções, urgência |
| Página de produto | `astrofy-plan-product-page` | Capacidades, casos de uso, integrações, prova |
| Página de serviço | `astrofy-plan-service-page` | Escopo, entregas, processo, qualificação do cliente |
| Página inicial | `astrofy-plan-homepage` | Públicos, destinos principais, proposta central |
| Página Sobre | `astrofy-plan-about-page` | História verificável, pessoas autorizadas, princípios |
| Página de contato | `astrofy-plan-contact-page` | Canais, campos mínimos, consentimento, prazo |
| Página de preços | `astrofy-plan-pricing-page` | Planos, cobrança, comparação, limites |

Todas as sete entregam o mesmo formato de saída (`page-spec.json`
validado pelo mesmo schema), então o restante do percurso — plano
técnico, execução, validação — não precisa saber qual entrevistadora
rodou. A diferença fica contida na conversa, não se propaga para o
código.

Se a solicitação combinar dois formatos — uma página de produto com
tabela de planos, por exemplo — a orquestradora define um tipo principal
(aqui, produto) e registra as necessidades do segundo formato (preços)
como requisitos complementares dentro da mesma especificação. Ela não
cria duas páginas nem duas entrevistas separadas para um pedido que é,
na prática, uma única página.

## Pontos de revisão, em ordem

A entrevista não é uma lista de perguntas despejada de uma vez. Ela segue
uma ordem deliberada, porque cada resposta restringe a próxima decisão:

1. **Finalidade e ação principal.** Sem saber o que a página precisa
   fazer (vender, capturar lead, explicar, comparar), nenhuma decisão de
   arquitetura tem base.
2. **Arquitetura.** Com a finalidade clara, a especialista propõe três
   estruturas de seções diferentes e recomenda uma. Você escolhe ou pede
   ajuste — nunca é forçado a aceitar a primeira proposta.
3. **Conteúdo e mídia.** Dentro da arquitetura aprovada, cada seção
   recebe texto, imagens e referências (capítulo 3 detalha como
   responder a essa parte).
4. **Comportamentos.** Estados de interface, validações de formulário,
   condições de exibição — o que a página faz, não só o que ela mostra.

Você recebe a página completa (em `page.md`, texto corrido) para revisar
ao final, não só pedaço por pedaço. Isso existe porque uma seção isolada
pode parecer certa e, lida em sequência com as outras, revelar repetição,
contradição ou lacuna que só aparece no conjunto.

## O que sai dessa etapa, e o que ainda não existe

A saída estruturada segue `packages/schemas/page-spec.schema.json` — um
contrato fechado que valida tipo, rota, ações, seções, SEO,
acessibilidade e os testes esperados da página. Ele fica em
`.astrofy/pages/<slug>/page-spec.json`, com a cópia legível em `page.md`
no mesmo diretório.

A implementação ainda não começa neste ponto. Nenhum componente é criado,
nenhuma rota existe no projeto, nenhum commit é sugerido. Primeiro você
revisa `page.md` e aprova a especificação — só essa aprovação explícita
libera `astrofy-implementation-planner` para o capítulo 4. Separar essas
duas aprovações (conteúdo, depois plano técnico) é o que permite ajustar
um texto sem reabrir uma tarefa técnica já concluída, e vice-versa.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Seleção do tipo e definição da página |
| Autoridade | `astrofy-page-planner` e especialistas de página |
