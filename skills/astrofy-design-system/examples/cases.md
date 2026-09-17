# Casos de gerar design system

## Uso comum

Mude semantic.color.action por meio do alias e confira o botão nos dois temas.

## Projeto existente

Formalize as cores atuais do site e migre um componente por vez, comparando capturas.

## Erro recorrente

Um override não pode criar token novo ou trocar color por dimension. Corrija a entrada indicada pelo gerador.

## Conferência

A geração é determinística. Aliases não formam ciclos, os tipos são preservados e tokens check confirma a sincronização. Use `astrofy tokens check` e registre o resultado da operação no escopo realmente verificado.
