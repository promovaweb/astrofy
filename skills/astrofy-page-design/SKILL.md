---
name: astrofy-page-design
description:
  Compõe páginas Astro a partir de conteúdo e identidade fornecidos, conferindo
  hierarquia, leitura e comportamento responsivo.
---

# Compor página

## Entradas

Leia conteúdo real, objetivo da rota, tokens, componentes e capturas atuais. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Defina ordem de leitura antes da grade visual. Teste largura estreita, desktop,
zoom e conteúdo maior que o exemplo. Preserve acesso a ações e texto completo.

Organize a ordem das seções conforme a tarefa de leitura. Use larguras e
espaçamentos do design system. Examine a página em celular e desktop com
conteúdo real. Ajuste overflow e foco sem esconder informação necessária.

### Sequência específica

1. Levante conteúdo autorizado, rota, tokens e componentes existentes.
2. Estruture landmarks e h1 antes de definir estilos ou ilhas.
3. Escolha grid, espaço e tipografia por token sem criar valores locais.
4. Compare mobile e desktop com conteúdo longo e estados sem mídia.
5. Confira a estrutura fornecida pelo layout antes de adicionar landmarks.
   Localize a causa do overflow sem escondê-la globalmente.
6. Compare capturas com condições equivalentes e confira teclado, links e
   estados interativos separadamente da aparência.

### Alteração de implementação existente

Altere uma região da página por vez; compare capturas com o mesmo conteúdo,
viewport e tema. Reutilize espaçamentos já definidos.

## Verificação

Um título longo não pode desaparecer por altura fixa. Verifique scrollWidth,
quebra de linha e foco no botão principal.

A página mantém leitura e ações acessíveis nas larguras verificadas, com
comparação visual registrada.

```bash
astrofy check --category layout
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
