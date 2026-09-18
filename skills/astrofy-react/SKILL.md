---
name: astrofy-react
description:
  Integra React apenas nas interações necessárias de um site Astro, escolhendo
  hidratação e verificando o comportamento no navegador.
---

# Configurar ilhas React

## Entradas

Leia package.json, integração React em astro.config.*, ilha JSX/TSX e diretiva
client no consumidor Astro. Use os caminhos definidos em
`.astrofy/config/paths.json` quando diferirem dos exemplos. Confira a versão
instalada no lockfile e em node_modules antes de aplicar APIs da documentação
online.

## Execução

Escolha hidratação pela necessidade da interação. Registre o HTML inicial
esperado e quais props cruzam a fronteira servidor/cliente. Evite dependência de
window durante renderização no servidor.

Confirme a integração no manifesto e em astro.config. Delimite a ilha e
serialize apenas props necessárias. Escolha client:visible, client:idle ou
client:load conforme a interação. Verifique erros de hidratação e teste o fluxo
após carregar a rota.

Use a matriz de hidratação de
[ilhas React no Astro 7](references/implementation.md) para escolher a diretiva
e limitar dados enviados ao navegador.

### Sequência específica

1. Isole o menor trecho que exige estado ou evento.
2. Escolha client:load, idle, visible ou media pela primeira interação.
3. Passe somente props serializáveis da página Astro para a ilha.
4. Teste HTML sem JavaScript, hidratação, console e interação.

### Alteração de implementação existente

Preserve providers e estado local. Mude uma ilha de cada vez e compare HTML
inicial, hidratação e navegação entre rotas.

## Verificação

Um contador precisa incrementar após hidratar. Erros de console e diferenças
entre HTML inicial e cliente devem reprovar o fluxo mesmo com build válido.

A ilha responde à interação. Conteúdo estático continua renderizado pelo Astro.

```bash
astrofy check --category react
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
