# Contrato técnico de planejamento de página

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Especialistas disponíveis

| Tipo | Skill | Uso |
| --- | --- | --- |
| `sales` | `astrofy-plan-sales-page` | Oferta com conversão comercial |
| `product` | `astrofy-plan-product-page` | SaaS, aplicativo, CLI ou ferramenta |
| `service` | `astrofy-plan-service-page` | Trabalho profissional contratado |
| `homepage` | `astrofy-plan-homepage` | Entrada e distribuição do site |
| `about` | `astrofy-plan-about-page` | Empresa, atuação e pessoas |
| `contact` | `astrofy-plan-contact-page` | Contato, orçamento ou demonstração |
| `pricing` | `astrofy-plan-pricing-page` | Planos, preços e comparação |

Uma landing page descreve formato, não finalidade. Classifique pelo resultado:
uma landing que vende assinatura usa `sales`; uma rota que documenta um SaaS
usa `product`; uma captação para consultoria usa `service`.

## Estrutura persistida

`page-spec.json` usa este formato conceitual:

```json
{
  "schemaVersion": "1.0.0",
  "id": "produto-exemplo",
  "type": "product",
  "status": "approved",
  "title": "Produto Exemplo",
  "route": "/produtos/exemplo/",
  "objective": "Solicitar demonstração",
  "audience": {
    "status": "approved",
    "value": "Equipes de atendimento"
  },
  "primaryAction": {
    "status": "approved",
    "label": "Solicitar demonstração",
    "href": "/contato/"
  },
  "sections": [],
  "assets": [],
  "behaviors": [],
  "openItems": [],
  "sources": [],
  "approvedAt": null
}
```

Cada `section` possui `id`, `type`, `status`, `purpose`, `content`, `actions`,
`media` e `sourceNotes`. O conteúdo mantém os campos próprios da área sem HTML.
Uma lista de recursos, por exemplo, pode usar `items`; um hero pode usar
`eyebrow`, `heading` e `body`.

## Estados

- `proposed`: área sugerida, ainda sem escolha da pessoa.
- `content_pending`: área aceita, mas falta texto, dado, destino ou mídia
  necessária.
- `approved`: estrutura e conteúdo foram aceitos.
- `ready`: conteúdo aprovado e entradas técnicas suficientes para planejar a
  implementação.

O estado da página deriva do percurso principal. `ready` exige ação com destino,
textos essenciais e definição dos estados interativos. Um depoimento opcional
ausente não impede a página quando a área foi retirada ou adiada explicitamente.

## Regras de coleta

Use o site como fonte para nomes, URLs, componentes e conteúdo já publicado.
Peça confirmação antes de reaproveitar texto de outra rota com finalidade
diferente. Valores, garantias, prazos, números, integrações e depoimentos exigem
fonte fornecida ou já publicada.

Faça uma pergunta por assunto ou um pequeno grupo de campos relacionados.
Depois de cada checkpoint, mostre o que foi aceito, o que foi rejeitado e o que
continua pendente. Não repita perguntas já respondidas pela implementação ou
pela conversa.

## Relação com Astro

A especificação não escolhe antecipadamente `client:*`, adaptador, Action,
Content Layer ou estrutura de componentes. Ela registra o comportamento
esperado. A orquestradora técnica decide a solução depois de conferir a versão,
o render mode e os padrões do projeto.

URLs internas usam a política de trailing slash atual. Formulários registram
campos, consentimento, destino conhecido, sucesso, erro e reenvio. Mídia
registra função editorial e estado alternativo antes de qualquer escolha entre
`Image`, `Picture` ou arquivo público.
