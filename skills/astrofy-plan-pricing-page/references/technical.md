# Referência técnica para página de preços

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `pricingSource`, `currency`, `taxMode` e `validFrom`;
- `plans[]` com id, nome, público, preço, período, ação e destaque;
- `features[]` com estado por plano e unidade do limite;
- `billing` com recorrência, uso, assento, excedente e renovação;
- `commercialRules` com teste, upgrade, downgrade e cancelamento;
- `comparisonNotes[]` para diferenças que uma célula curta não explica.

## Arquiteturas úteis

**Cards por plano:** resumo, cards, detalhes, FAQ e ação. Use com poucos planos
e diferenças fáceis de explicar.

**Tabela comparativa:** introdução, seletor de periodicidade, tabela agrupada,
observações e ações. Use com muitos recursos e limites.

**Uso variável:** introdução, unidades, exemplos confirmados, estimativa,
regras de excedente e contato. Use somente quando a fórmula é estável.

## Prontidão

Preço mostra moeda e período. Valor anual esclarece cobrança total ou valor
mensal equivalente. Destaque visual não altera a informação. Texto acessível
explica ícones, traços e limites; cor sozinha não comunica inclusão.

Se a fonte divergir de outra página, interrompa a consolidação e peça qual valor
vigora. A especificação registra a origem usada e a data da conferência.

## Encaminhamento técnico

Uma alternância mensal/anual pode usar estado local quando modifica apenas a
apresentação. Checkout e autenticação seguem o fluxo existente. Testes conferem
preço, período, ação, foco e conteúdo disponível sem JavaScript quando cabível.
