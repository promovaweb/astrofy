# Casos de validar fluxos

## Uso comum

Teste que um rascunho não gera rota nem aparece no arquivo paginado.

## Projeto existente

Uma alteração no menu exige refazer o percurso de teclado, mesmo com build sem erros.

## Erro recorrente

Não use um teste de existência de arquivo como prova de funcionamento do formulário.

## Conferência

Os testes protegem comportamento observável e falham quando o contrato correspondente é violado. Use `astrofy check --category quality` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** mudança, scripts existentes, fixtures e fluxos observáveis.
- **Alteração sob teste:** Preserve o runner existente. Adicione regressão que falhe no comportamento anterior e passe após corrigir; não atualize snapshots sem revisar a diferença.
- **Falha e resultado esperado:** Retire a hidratação de uma ilha de teste: o teste de interação deve falhar mesmo que o build passe. Restaure e confira a execução verde.
- **Comando complementar:** `astrofy check --category quality`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Teste de hidratação com controle negativo

Em um consumidor de Counter React, use client:load e um botão cujo nome
acessível muda de Contagem: 0 para Contagem: 1. Com Playwright Test já instalado:

```js
await page.goto(baseUrl);
await page.getByRole('button', { name: 'Contagem: 0' }).click();
await expect(page.getByRole('button', { name: 'Contagem: 1' })).toBeVisible();
```

page e expect vêm do runner existente; baseUrl aponta ao servidor local de
teste. Na cópia descartável, retire client:load, gere novamente e repita:
o botão continua no HTML, mas a assertiva de incremento deve falhar. Restaure
a diretiva e confirme que o mesmo teste passa. Encontrar o botão ou compilar
a página não comprova a hidratação.
