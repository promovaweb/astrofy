---
name: astrofy-component-docs
description:
  Documenta a API e os usos reais dos componentes Astro em Markdown, mantendo
  propriedades e exemplos alinhados à implementação.
---

# Documentar componentes

## Entradas

Leia Props, defaults, slots, imports, estilos, exemplos existentes e índice em
.astrofy/docs. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Documente valor aceito, padrão, obrigatoriedade e efeito de cada prop. Separe
exemplos observados de exemplos novos que ainda precisam ser compilados.

Leia Props, defaults e slots no código. Registre o caminho, domínio, imports e
dependências. Explique os estados, tokens e necessidade de JavaScript. Inclua um
exemplo copiado de um consumidor válido e a lista de arquivos conferidos.

### Sequência específica

1. Leia Props, defaults, slots, classes, estados e todos os consumidores.
2. Documente assinatura, HTML emitido, slot obrigatório e variantes válidas.
3. Inclua exemplos de uso que compilem no projeto atual.
4. Atualize a página da API junto com qualquer mudança do componente.
5. Confira combinações de props, atributos encaminhados e fallback dos slots.
   Valide exemplos novos num consumidor compilável, não apenas no Markdown.

### Alteração de implementação existente

Ao remover uma prop, altere assinatura, consumidores e exemplo documental no
mesmo escopo. Registre o caminho real do componente e atualize o índice.

## Verificação

Um exemplo usando prop removida deve ser identificado na revisão. Quando a API
é estrita, confira também o diagnóstico de tipos; quando aceita atributos
arbitrários, verifique HTML e comportamento. A versão corrigida deve compilar
e mostrar o estado descrito.

A página em .astrofy/docs/components descreve a API atual e é alcançável pelo
índice.

```bash
astrofy docs check
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
