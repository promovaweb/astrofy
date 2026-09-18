---
name: astrofy-accessibility
description:
  Revisa semântica, foco e operação por teclado em sites Astro, combinando
  verificações automáticas com revisão manual de estados.
---

# Revisar acessibilidade

## Entradas

Leia rotas representativas, árvore acessível, estilos de foco e fluxos
interativos. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Combine semântica, teclado, contraste e revisão de nomes. Registre elemento,
estado e viewport. Um scanner isolado não comprova conformidade completa.

Teste landmarks, headings e nomes acessíveis. Percorra a página com Tab e opere
menus por teclado. Confira contraste nos dois temas e alternativas de imagem.
Registre separadamente scanner e revisão humana, com referência a WCAG 2.2 AA.

### Sequência específica

1. Percorra landmarks, headings e links pelo accessibility tree do navegador.
2. Faça o percurso completo por teclado com foco visível, inclusive menus e
   diálogos.
3. Meça contraste nos modos claro e escuro com os pares reais de cor.
4. Registre rota, controle, estado, viewport e correção aplicada.
5. Confira reflow a 320 CSS px e zoom de 400%, incluindo conteúdo longo,
   elementos sobrepostos e estados após hidratação.
6. Separe o resultado do scanner do percurso por teclado e da leitura com
   tecnologia assistiva. Informe o que permaneceu sem avaliação.

### Alteração de implementação existente

Preserve relações label/for e IDs ao refatorar. Refaça o percurso de teclado
depois de alterar navegação ou diálogos.

## Verificação

Um botão apenas com ícone precisa de nome acessível. O teste por função e nome
deve localizar o controle e operá-lo pelo teclado.

Problemas descrevem elemento, estado e correção. O relatório não declara
conformidade completa por um scanner isolado.

```bash
astrofy check --category accessibility
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
