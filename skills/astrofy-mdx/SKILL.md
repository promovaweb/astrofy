---
name: astrofy-mdx
description:
  Configura integração MDX e schemas de conteúdo em sites Astro, documentando
  componentes permitidos e a origem confiável dos arquivos.
---

# Configurar conteúdo MDX

## Entradas

Leia integração MDX, coleção, schema, imports e origem do conteúdo. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Diferencie API de coleções da versão instalada de exemplos de outra major.
Compile apenas conteúdo de origem autorizada, pois MDX pode executar código.

Confirme a integração compatível com Astro. Defina campos obrigatórios e limites
por tipo de post. Documente imports de componentes e exemplos de uso. Compile
conteúdo válido e um caso inválido que deve apontar o arquivo e o campo.

Para coleções e renderização, use o fluxo atual de
[MDX e Content Layer no Astro 7](references/implementation.md).

### Sequência específica

1. Defina loader, schema e coleção em src/content.config.ts.
2. Compile uma entrada válida e uma com frontmatter inválido.
3. Limite imports MDX aos componentes aprovados pelo projeto.
4. Teste renderização do corpo e campos derivados no HTML.

### Alteração de implementação existente

Mapeie campos antigos sem mudar seu significado. Valide uma entrada antes de
migrar o acervo e registre componentes permitidos.

## Verificação

Um campo obrigatório ausente precisa apontar a entrada inválida; o mesmo arquivo
corrigido deve renderizar o componente MDX no HTML.

O MDX renderiza componentes e o schema recusa frontmatter inválido. A origem do
conteúdo está documentada.

```bash
astrofy check --category mdx
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
