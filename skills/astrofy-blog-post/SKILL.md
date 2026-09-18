---
name: astrofy-blog-post
description:
  Compõe templates de post Astro com corpo MDX, autoria e metadados derivados da
  coleção, verificando leitura e mídia responsiva.
---

# Compor post individual

## Entradas

Leia entrada da coleção, layout de leitura, componentes MDX e metadados. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Derive título, autoria e datas da entrada atual. Confira código, tabela, imagem
e componente no corpo, com largura de leitura adequada.

Renderize o corpo com a API da versão instalada. Apresente autoria e datas
fornecidas. Use largura de leitura e estilos para tabelas e código. Derive
metadados do post e confira imagens e componentes embutidos.

### Sequência específica

1. Carregue uma entrada tipada da coleção e valide slug, publicação e dados
   opcionais.
2. Renderize o corpo pelo renderer da Content Layer.
3. Derive título, descrição, data, autor, canonical e imagem da mesma entrada.
4. Teste post sem capa, sem atualização e sem campos opcionais.

### Alteração de implementação existente

Preserve canonical externo autorizado e slugs existentes. Atualize layout e
metadados sem reescrever o conteúdo factual.

## Verificação

Dois artigos com títulos diferentes devem emitir títulos e canônicas
correspondentes. Uma tabela longa deve continuar legível no celular.

O post tem rota própria e corpo legível nos temas suportados. Metadados
correspondem ao artigo.

```bash
astrofy check --page /blog/exemplo/
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
