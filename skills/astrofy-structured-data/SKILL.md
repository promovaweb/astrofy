---
name: astrofy-structured-data
description:
  Configura e valida JSON-LD em sites Astro, relacionando entidades e
  propriedades às informações presentes no conteúdo visível.
---

# Verificar JSON-LD

## Entradas

Leia conteúdo visível, entidades, IDs estáveis e serialização JSON-LD. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Derive propriedades da mesma fonte usada pelo texto. Valide JSON e
correspondência factual separadamente. Escape conteúdo inserido em script HTML.

Escolha tipos pertinentes ao conteúdo real. Derive propriedades das mesmas
fontes usadas pela página. Escape a serialização para script HTML. Valide a
sintaxe e compare cada afirmação com o texto visível.

### Sequência específica

1. Escolha tipos Schema.org compatíveis com conteúdo visível.
2. Crie objeto tipado com @id e URLs absolutas estáveis.
3. Serialize JSON e insira no script application/ld+json.
4. Compare dados emitidos com HTML e valide no preview publicado.
5. Confira entidades compartilhadas por @id, especialmente publisher e autor,
   evitando duplicações conflitantes emitidas por componentes distintos.
6. Separe validade JSON, vocabulário Schema.org, correspondência factual e
   requisitos do recurso de busca. Registre o resultado de cada conferência.

### Alteração de implementação existente

Preserve @id de entidades já publicadas ao centralizar marcação. Remova
duplicações sem fabricar avaliações, preços ou autores.

## Verificação

Um título contendo fechamento de script precisa permanecer texto no JSON-LD, sem
criar novo elemento ou executar código.

O JSON-LD é válido e não inventa autoria, avaliações, preços ou entidades.

```bash
astrofy check --category structured
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
