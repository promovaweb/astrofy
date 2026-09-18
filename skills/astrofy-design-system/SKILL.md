---
name: astrofy-design-system
description:
  Valida tokens hierárquicos e gera o CSS do design system em sites Astro,
  preservando aliases tipados e os modos claro e escuro.
---

# Gerar design system

## Entradas

Leia design-system.json, paths.json, CSS gerado, manifesto e consumidores dos
tokens. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

O arquivo é um envelope Astrofy com tokens DTCG 2025.10. Resolva aliases por
tipo em cada modo. Overrides alteram tokens existentes; não criam um caminho nem
mudam seu tipo.

Modele valores primitivos e funções semânticas. Confira overrides existentes nos
dois modos. Execute tokens validate, tokens build --dry-run e tokens build.
Compare o CSS e o manifesto e confira os componentes consumidores.

### Sequência específica

1. Valide tipo, unidade e alias no JSON antes de gerar CSS.
2. Organize tokens base, semânticos e de componente.
3. Aplique overrides de modo somente nos tokens que variam.
4. Gere CSS duas vezes e compare a saída antes de integrar no site.

### Alteração de implementação existente

Mapeie cores atuais para primitivos e funções semânticas. Migre um consumidor
por vez. Gere CSS pelo CLI e compare bytes e aparência, mantendo o JSON como
fonte editável.

## Verificação

Um alias circular deve falhar antes da geração; corrigido o alias, duas gerações
idênticas precisam produzir os mesmos bytes e tokens check válido.

A geração é determinística. Aliases não formam ciclos, os tipos são preservados
e tokens check confirma a sincronização.

```bash
astrofy tokens check
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
