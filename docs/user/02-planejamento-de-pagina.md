# Planejamento de uma página

Descreva a página ao agente na conversa. `astrofy-page-planner` examina a
estrutura atual do site e escolhe uma especialista. O agente prepara os
contratos necessários quando o projeto ainda não usa Astrofy.

| Pedido | Especialista |
| --- | --- |
| Landing page de vendas | `astrofy-plan-sales-page` |
| Página de produto | `astrofy-plan-product-page` |
| Página de serviço | `astrofy-plan-service-page` |
| Página inicial | `astrofy-plan-homepage` |
| Página Sobre | `astrofy-plan-about-page` |
| Página de contato | `astrofy-plan-contact-page` |
| Página de preços | `astrofy-plan-pricing-page` |

Se a solicitação combinar dois formatos, a orquestradora define um tipo
principal e registra as necessidades complementares. Uma página de produto com tabela de
planos, por exemplo, continua sendo produto e recebe requisitos de preços.

## Pontos de revisão

Primeiro, o agente confirma a finalidade e o público e valida a arquitetura.
Depois, organiza conteúdo e mídia e define os comportamentos da página. Você
recebe a página completa para revisar. Quando precisa da sua escolha, o agente
apresenta três opções diferentes e recomenda uma delas.

A saída segue `packages/schemas/page-spec.schema.json`. A implementação ainda
não começa: primeiro você revisa `page.md` e aprova a especificação. O agente
registra as respostas e a página nos arquivos do projeto.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Seleção do tipo e definição da página |
| Autoridade | `astrofy-page-planner` e especialistas de página |
