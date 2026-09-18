---
name: astrofy-plan-sales-page
description:
  Entrevista a pessoa sobre oferta, preço, prova, objeções e conversão para
  definir landing pages de vendas sem inventar afirmações comerciais.
---

# Definir página de vendas

Use sob coordenação de `astrofy-page-planner` quando a página apresenta uma
oferta e conduz para compra, assinatura, inscrição ou conversa comercial.

## Entrevista

1. Confirme oferta, público, situação atendida e ação final.
2. Pergunte o que a pessoa recebe, formato, duração, acesso, suporte e limites.
3. Confirme preço, moeda, recorrência, parcelamento, impostos, teste, garantia,
   cancelamento e disponibilidade. Campo desconhecido permanece pendente.
4. Colete provas com origem: depoimento autorizado, caso, demonstração, número
   verificável ou credencial publicada.
5. Liste objeções reais e respostas autorizadas. Não fabrique urgência,
   escassez, comparação ou resultado.
6. Defina checkout, formulário ou contato, inclusive estados de falha e retorno.

Apresente três arquiteturas compatíveis com a oferta, recomendada primeiro.
Depois percorra cada área aceita e peça seus textos. Use a
[referência de vendas](references/technical.md) para campos e condições de
prontidão.

## Saída

Entregue ao planner um fragmento com `type: sales`, dados comerciais, áreas,
ações, fontes e pendências. Consulte os [casos](examples/cases.md). Não escreva
no código do site e não publique a oferta.
