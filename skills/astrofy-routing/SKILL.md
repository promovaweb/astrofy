---
name: astrofy-routing
description:
  Organiza rotas e redirects em sites Astro, preservando URLs existentes e
  verificando colisões, parâmetros e comportamento de 404.
---

# Organizar rotas

## Entradas

Leia src/pages, getStaticPaths, slugs, base, trailingSlash e regras do provedor.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Compare rota de origem e URL final considerando base e modo de renderização.
Teste colisões e ciclos de redirect.

Mapeie rotas estáticas e dinâmicas. Normalize slugs e verifique colisões.
Preserve URLs publicadas ou crie redirects explícitos. Teste destino final,
ausência de ciclos e status 404 no provedor adotado.

Consulte o algoritmo de rotas de [Astro 7](references/implementation.md) antes
de criar páginas dinâmicas, endpoints ou renderização sob demanda.

### Sequência específica

1. Mapeie arquivo em src/pages, URL, params, output e prerender.
2. Gere params em getStaticPaths: strings para segmentos; undefined somente
   quando um rest parameter precisa representar a raiz.
3. Valide slug e responda 404 em rota sob demanda sem entrada válida.
4. Teste URL antiga, redirect, canonical, base e trailingSlash.

### Alteração de implementação existente

Conserve URLs publicadas ou registre a relação antiga/nova. Verifique status
HTTP no servidor utilizado, inclusive 404.

## Verificação

Dois conteúdos com o mesmo slug devem ser recusados ou resolvidos
explicitamente. Redirect circular precisa falhar no teste do destino final.

As rotas são únicas e redirects terminam no destino esperado. A página de erro
recebe status coerente.

```bash
astrofy check --category routing
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
