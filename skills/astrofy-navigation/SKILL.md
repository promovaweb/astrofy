---
name: astrofy-navigation
description:
  Implementa menus e submenus de sites Astro operáveis por teclado e toque, com
  foco, estado atual e destinos verificados.
---

# Implementar navegação

## Entradas

Leia árvore de links, controle de abertura, IDs, aria-expanded e rota atual. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

1. Renderize destinos como `a[href]` dentro de `nav`; use `button type="button"`
   para expandir uma lista, com `aria-controls` apontando a um ID único.
2. Sincronize `aria-expanded` do botão e `hidden` da lista no mesmo handler. O
   estado inicial precisa corresponder ao HTML antes do JavaScript.
3. Em Escape, feche a lista e retorne o foco ao botão controlador. No clique
   externo, feche sem deslocar o foco do elemento escolhido pelo visitante.
4. Remova a lista fechada do percurso de Tab. Não use somente opacity: 0.
5. Aplique `aria-current="page"` ao destino atual, considerando base e a
   política de barra final. Não aplique `role="menu"` à navegação comum.
6. Se o site usa navegação com transições, confira listeners após trocar de
   rota; um clique não pode disparar o mesmo handler duas vezes.

### Sequência específica

1. Modele item, subitem, rota ativa e controle mobile na configuração.
2. Use link para navegação e button apenas para abrir ou fechar painel.
3. Sincronize aria-expanded, aria-controls, hidden e foco em cada transição.
4. Teste Tab, Enter, Space, Escape, clique externo e mudança de rota.

### Alteração de implementação existente

Ao integrar ClientRouter, teste navegação de ida e volta: o menu precisa
reassociar elementos sem duplicar listeners. No fechamento por clique externo,
preserve o foco do destino; ao fechar por Escape, devolva-o ao gatilho.

Preserve caminhos publicados e estados existentes ao centralizar a árvore. Teste
duas instâncias quando houver navegação de desktop e móvel.

## Verificação

Abrir com Enter, avançar com Tab e fechar com Escape deve retornar o foco ao
controle. Menu fechado não pode receber foco interno.

As ações funcionam por mouse, toque e teclado. O menu fechado não mantém links
invisíveis no percurso de foco.

```bash
astrofy check --category navigation
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
