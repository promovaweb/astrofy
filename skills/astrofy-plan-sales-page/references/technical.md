# Referência técnica para página de vendas

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `offer.name`, `offer.summary`, `offer.deliverables` e `offer.limits`;
- `commercial.price`, `currency`, `billing`, `installments` e `taxes`;
- `commercial.trial`, `guarantee`, `cancellation` e `availability`;
- `proof[]` com tipo, texto, origem, autorização e ativo;
- `objections[]` com pergunta e resposta aprovada;
- `conversion` com tipo, destino, parâmetros e estados.

## Arquiteturas úteis

**Conversão direta:** hero, situação, proposta, itens incluídos, prova, preço,
FAQ e ação final. Use para oferta compreendida e contratação curta.

**Explicação guiada:** hero, problema, mecanismo, processo, entregas, casos,
preço, FAQ e ação. Use quando a pessoa precisa entender como a oferta funciona.

**Escolha entre planos:** hero, público, comparação, tabela de planos, suporte,
perguntas comerciais e ações por plano. Use somente com planos confirmados.

## Conteúdo mínimo

A página precisa de heading principal, explicação da oferta, público, itens
incluídos, ação com destino e condição comercial aplicável. Preço pode ficar
fora da página quando o modelo usa orçamento, desde que isso esteja explícito.

Uma garantia exige duração, cobertura, procedimento e fonte. Um depoimento
exige texto autorizado e identificação permitida. Contador regressivo exige
data real e comportamento após o término.

## Encaminhamento técnico

Checkout externo usa link real e retorno documentado. Formulário encaminha para
`astrofy-forms`; preço e planos podem encaminhar para
`astrofy-plan-pricing-page`; metadados e JSON-LD são planejados depois que a
oferta estiver aprovada.
