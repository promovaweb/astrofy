# Planejamento de uma página

Chame `astrofy-page-planner` com o pedido em linguagem natural. A skill lê o
contexto preparado pelo setup e escolhe uma especialista.

| Pedido | Especialista |
| --- | --- |
| Landing page de vendas | `astrofy-plan-sales-page` |
| Página de produto | `astrofy-plan-product-page` |
| Página de serviço | `astrofy-plan-service-page` |
| Página inicial | `astrofy-plan-homepage` |
| Página Sobre | `astrofy-plan-about-page` |
| Página de contato | `astrofy-plan-contact-page` |
| Página de preços | `astrofy-plan-pricing-page` |

Se o pedido combinar dois formatos, a orquestradora define um tipo principal e
registra as necessidades complementares. Uma página de produto com tabela de
planos, por exemplo, continua sendo produto e recebe requisitos de preços.

## Pontos de revisão

A conversa avança por finalidade, público, arquitetura, conteúdo, mídia,
comportamento e revisão integral. Cada etapa dependente de preferência oferece
três opções materialmente diferentes, com uma recomendação fundamentada.

A saída segue `packages/schemas/page-spec.schema.json`. A implementação ainda
não começa: primeiro a pessoa revisa `brief.md` e aprova a especificação.

