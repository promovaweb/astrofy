---
name: astrofy-images
description:
  Configura imagens em sites Astro conforme origem e uso, verificando dimensões,
  responsividade e carregamento no layout publicado.
---

# Configurar imagens

## Entradas

Leia origem dos ativos, dimensões, componentes Image/Picture ou img e layout.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Distinga ativo processado em src de arquivo servido em public. Escolha texto
alternativo pela função e dimensões pela composição real.

Escolha processamento Astro ou public conforme a origem. Declare dimensões ou
proporção e alternativas pertinentes. Use tamanhos responsivos e carregamento
adequado à posição. Confira distorção e deslocamento de layout em páginas
representativas.

Aplique as regras de origem, geração e carregamento de
[imagens no Astro 7](references/implementation.md) antes de escolher Image,
Picture ou img.

### Sequência específica

1. Classifique origem como import de src, arquivo public ou URL remota
   autorizada.
2. Use Image ou Picture quando o pipeline Astro processa o ativo.
3. Informe dimensões, sizes e estratégia de carregamento pela posição visual.
4. Verifique LCP, proporção e alt. No navegador, compare currentSrc com a largura
   CSS e a densidade do dispositivo; confirme content type e bytes recebidos.
5. Para recorte por viewport, use fontes distintas com media; para formatos
   alternativos da mesma imagem, use Picture. Confira o ponto focal em ambos.

### Alteração de implementação existente

Preserve vetores de marca e URLs externas autorizadas. Atualize consumidores ao
mover ativos e confira variantes nos temas.

## Verificação

Uma imagem com proporção errada deve ser percebida na comparação visual. Imagem
decorativa pode ter alt vazio; imagem funcional precisa comunicar a ação.

A imagem mantém proporção, possui alternativa adequada e não ocupa bytes
desnecessários para o tamanho exibido.

```bash
astrofy check --category images
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
