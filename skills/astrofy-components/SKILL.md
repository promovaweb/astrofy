---
name: astrofy-components
description:
  Cria componentes Astro reutilizáveis com propriedades, slots e variantes
  limitadas, conservando os contratos dos consumidores.
---

# Compor componentes

## Entradas

Leia componente .astro, declaração Props, slots, estilos e dois consumidores
reais. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Diferencie link de botão pela ação. Declare variantes finitas, valores padrão e
atributos encaminhados. Teste conteúdo longo e slot ausente quando forem
aceitos.

Delimite a responsabilidade do componente. Modele propriedades explícitas e
slots para conteúdo composto. Use variantes finitas. Atualize os consumidores,
descreva os estados e confira a renderização nas páginas afetadas.

Use o contrato de [componentes Astro 7](references/implementation.md) para
definir Props, slots, atributos encaminhados e fronteiras de hidratação.

### Sequência específica

1. Declare Props com variantes finitas e defaults compatíveis.
2. Encaminhe atributos apenas para o elemento semântico correto.
3. Use slots para regiões estruturais, não para substituir toda a API.
4. Verifique renderização com conteúdo longo, sem slot opcional e por teclado.

### Alteração de implementação existente

Confira a precedência do spread de atributos e teste duas instâncias para
detectar IDs duplicados. Uma variante que troca link por botão precisa tipar
atributos de cada elemento e conservar o comportamento de teclado nativo.

Adicione uma variante sem alterar o valor padrão existente. Só remova uma prop
após migrar todos os consumidores e conferir usos em MDX.

## Verificação

Uma prop obrigatória ausente deve aparecer na checagem de tipos. Um link de
navegação precisa renderizar href e receber foco por teclado.

Propriedades tipadas e exemplos correspondem ao código. A composição funciona
com os conteúdos reais.

```bash
astrofy check --category components
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
