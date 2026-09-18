---
name: astrofy-header
description:
  Configura cabeçalhos Astro com marca, ações e comportamento sticky,
  verificando a relação com navegação, foco e conteúdo da página.
---

# Compor cabeçalho

## Entradas

Leia Header.astro, configuração pública, logos e componente de navegação. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Separe marca, ações e controle do menu. Confira cabeçalho sticky com zoom,
teclado e âncoras. A navegação deve continuar alcançável em tela estreita.

Componha marca e ações usando a configuração pública. Delegue abertura de menus
ao componente de navegação. Confira a altura sticky em zoom e celular. Garanta
espaço para destinos de âncora e elementos focados.

### Sequência específica

1. Modele marca, navegação, ação e estado mobile como entradas distintas.
2. Use header, nav, botão de menu e lista de links com nomes acessíveis.
3. Sincronize aria-expanded, aria-controls e estado visual do menu.
4. Teste foco, Escape, rota ativa, sticky e sobreposição de conteúdo.
5. Diferencie sticky de fixed antes de reservar espaço. Confira âncoras com
   altura real, fontes carregadas, zoom e mudança de breakpoint com menu aberto.
6. Refaça o percurso após navegação com ClientRouter quando ele estiver ativo,
   verificando listeners, IDs e controles da versão responsiva oculta.

### Alteração de implementação existente

Preserve URLs e seletor de tema ao reorganizar a composição. Ajuste compensação
de âncora conforme a altura real do cabeçalho.

## Verificação

Ao focar um link ou abrir uma âncora, o destino não pode ficar encoberto.
Capture a posição do elemento depois de rolar.

O cabeçalho não cobre foco nem conteúdo de âncoras nas larguras testadas.

```bash
astrofy check --category header
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
