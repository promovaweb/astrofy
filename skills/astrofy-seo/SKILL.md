---
name: astrofy-seo
description:
  Verifica SEO no HTML renderizado de projetos Astro, relacionando metadados,
  canônicas e indexação às rotas e ao ambiente.
---

# Verificar SEO

## Entradas

Leia HTML atual, domínio de produção, política de staging, sitemap e robots. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Compare tags renderizadas por rota, inclusive paginação. Registre origem de cada
canonical e regra de indexação do ambiente.

Leia títulos, descrições e canônicas no HTML final. Compare rotas elegíveis com
sitemap e robots. Revise staging separadamente da produção. Confira arquivos
paginados e overrides documentados.

### Sequência específica

1. Gere HTML de rota comum, artigo, arquivo, 404 e staging.
2. Compare title, description, canonical, robots e sitemap com a política local.
3. Centralize tags em layout ou componente de metadados.
4. Teste subdiretório base, paginação e URL absoluta.
5. Confira status, redirects e headers do host, incluindo X-Robots-Tag e Link.
   Distinga instrução de rastreamento de instrução de indexação.
6. Compare sitemap com rotas SSR elegíveis que o build não enumera. Registre
   exclusões e a fonte de URLs adicionais, sem tratar presença no XML como
   comprovação de indexação.

### Alteração de implementação existente

Preserve overrides autorizados e URLs publicadas. Corrija duplicação no layout
responsável em vez de acrescentar outra tag na página.

## Verificação

Duas tags canonical na mesma página devem ser detectadas. Um staging
intencionalmente noindex não deve receber index por correção automática.

Cada diagnóstico identifica rota e tag. Indexação e canônica correspondem à
política do ambiente.

```bash
astrofy check --category seo
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
