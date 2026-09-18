---
name: astrofy-open-graph
description:
  Configura metadados Open Graph em páginas Astro com URLs absolutas e fallback
  por tipo de conteúdo, conferindo as imagens publicadas.
---

# Configurar Open Graph

## Entradas

Leia componente de metadados, título, descrição, imagem e domínio. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Verifique og:title, og:type, og:image e og:url no HTML. Resolva URLs absolutas e
confira acesso à imagem. Registre fallback por tipo de página.

Derive os campos do conteúdo atual. Use URLs absolutas e defina fallback
documentado. Confira a imagem publicada, texto alternativo e proporção. Compare
o HTML de uma página comum e de um artigo.

### Sequência específica

1. Derive título, descrição, tipo, URL e imagem a partir da rota atual.
2. Converta URL e imagem para absoluto usando site e base configurados.
3. Defina fallback por tipo de página e não sobrescreva capa própria.
4. Abra imagem emitida e confira status, dimensões e acesso público.
5. Confira o HTML inicial de acesso direto, sem depender de hidratação ou
   navegação cliente para inserir tags.
6. Separe duplicação acidental de múltiplas imagens intencionais. Neste último
   caso, confira ordem e associação das propriedades de cada imagem.

### Alteração de implementação existente

Preserve capas sociais próprias. Centralize a emissão sem duplicar tags já
presentes em layouts herdados.

## Verificação

Remova a capa específica de um post de teste: o fallback precisa ser válido. Uma
imagem 404 deve impedir afirmar que o compartilhamento foi conferido.

Tags obrigatórias não entram em conflito e a imagem pode ser acessada no ambiente
publicado. Se houver várias imagens intencionais, sua ordem e propriedades
correspondem ao contrato documentado.

```bash
astrofy check --category og
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
