# Casos de gerar design system

## Uso comum

Mude semantic.color.action por meio do alias e confira o botão nos dois temas.

## Projeto existente

Formalize as cores atuais do site e migre um componente por vez, comparando capturas.

## Erro recorrente

Um override não pode criar token novo ou trocar color por dimension. Corrija a entrada indicada pelo gerador.

## Conferência

A geração é determinística. Aliases não formam ciclos, os tipos são preservados e tokens check confirma a sincronização. Use `astrofy tokens check` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** design-system.json, paths.json, CSS gerado, manifesto e consumidores dos tokens.
- **Alteração sob teste:** Mapeie cores atuais para primitivos e funções semânticas. Migre um consumidor por vez. Gere CSS pelo CLI e compare bytes e aparência, mantendo o JSON como fonte editável.
- **Falha e resultado esperado:** Um alias circular deve falhar antes da geração; corrigido o alias, duas gerações idênticas precisam produzir os mesmos bytes e tokens check válido.
- **Comando complementar:** `astrofy tokens check`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Alias semântico e falha circular

Dentro de tokens.semantic.color, um token pode apontar a um primitivo existente:

```json
{
  "surface": {
    "$type": "color",
    "$value": "{primitive.color.white}"
  }
}
```

O trecho não é um envelope completo. Integre-o ao design-system.json já
validado. Gere CSS, guarde os bytes e rode tokens check. Depois, na cópia de
teste, faça surface referenciar content e content referenciar surface.
tokens build deve recusar o ciclo e preservar o CSS anterior. Restaure o
alias válido, gere novamente e compare os bytes com a saída inicial.

Confira também o consumidor: em light, a cor computada precisa corresponder
a white; após o override dark, precisa corresponder ao primitivo escolhido
para esse modo. Ausência da importação CSS deve ser percebida nessa etapa.
