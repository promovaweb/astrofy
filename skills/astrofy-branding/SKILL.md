---
name: astrofy-branding
description:
  Registra a identidade visual de um site a partir de marca fornecida,
  exportação real ou referência, identificando inferências e autoria.
---

# Registrar identidade

## Entradas

Leia ativos fornecidos, identidade existente, design-system.json e
source-map.json quando disponível. Use os caminhos definidos em
`.astrofy/config/paths.json` quando diferirem dos exemplos. Confira a versão
instalada no lockfile e em node_modules antes de aplicar APIs da documentação
online.

## Execução

Registre origem, licença informada e uso de cada ativo. Distinga valor fornecido
de aproximação visual. Examine uma exportação Brandfy real antes de escolher o
mapeamento.

Priorize os arquivos da marca fornecidos. Examine uma exportação real do Brandfy
antes de mapear campos. Compare fontes, cores e ativos existentes. Registre a
origem em source-map.json e identifique estimativas feitas a partir de imagem.

### Sequência específica

1. Identifique fonte dos ativos, licença, variante e fundo de uso.
2. Relacione logotipo, cores e tipografia aos tokens do design system.
3. Gere variantes somente a partir do ativo autorizado.
4. Verifique legibilidade em fundos claro, escuro, reduzidos e monocromáticos.

### Alteração de implementação existente

Compare exportação recebida, importação anterior e alteração local; apresente
divergências por campo. Preserve o ajuste local até resolver a divergência.

## Verificação

Reimportar uma cor alterada localmente deve conservar ou sinalizar a
personalização; um caminho de logo ausente deve aparecer como pendência.

Cada valor adotado tem origem registrada. Reimportação conserva ajustes locais
identificados.

```bash
astrofy check --category brand
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
