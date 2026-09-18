---
name: astrofy-i18n
description:
  Configura idiomas e relações entre páginas em sites Astro, verificando rotas,
  fallback e metadados das traduções disponíveis.
---

# Configurar idiomas

## Entradas

Leia idiomas existentes, idioma padrão, política de prefixos, traduções e
fallback. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Relacione equivalentes por identidade do conteúdo, não apenas pelo slug. Gere
alternates somente para rotas existentes e confira lang.

Defina convenção de rotas e idioma padrão. Use a integração nativa compatível
com Astro. Relacione páginas equivalentes e documente fallback. Confira
navegação entre idiomas, lang, canônicas e hreflang sem anunciar tradução
ausente.

### Sequência específica

1. Liste locales, idioma padrão, prefixo, fallback e rotas traduzidas.
2. Gere rota e hreflang apenas para pares realmente publicados.
3. Mantenha identificador estável e slug por idioma no conteúdo.
4. Teste locale padrão, tradução ausente, rota dinâmica e 404.
5. Diferencie path de locale e código de idioma; resolva a tradução antes
   de compor a URL com helpers de astro:i18n.
6. Confira redirect e rewrite por status, URL final e idioma entregue.
   Não registre fallback como tradução publicada.
7. Teste troca de idioma com slugs distintos, query e fragmentos, além de
   negociação por requisição quando ela existir no projeto.

### Alteração de implementação existente

Preserve o idioma padrão sem prefixo quando esse for o contrato atual. Ao
adicionar idioma, teste menus e fallback antes de gerar hreflang.

## Verificação

Uma tradução ausente não pode produzir link 404. Cada página traduzida deve
declarar seu idioma e alternates coerentes.

A navegação chega a páginas existentes e identifica corretamente o idioma de
cada conteúdo.

```bash
astrofy check --category routing
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
