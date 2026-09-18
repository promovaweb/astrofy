# Casos de compor página

## Layout já contém main

Componha uma rota cujo layout já fornece main e título de documento. Confira
que a página preenche o slot sem criar segundo main ou head. Compare a árvore
acessível e as tags finais, além da aparência.

## Overflow localizado

Use título longo, URL extensa e bloco de código numa grade com coluna lateral.
Identifique o elemento que ultrapassa a largura disponível. Corrija sua largura
mínima ou região de rolagem sem cortar conteúdo por overflow-x hidden no body.
Repita com zoom e foco no último controle da região.

## Uso comum

Distribua três cards em colunas no desktop e em uma coluna no celular.

## Projeto existente

Uma página existente possui texto maior que o exemplo. Teste esse texto ao ajustar a grade.

## Erro recorrente

Não corte títulos com altura fixa para esconder desalinhamento. Ajuste composição e comportamento de quebra.

## Conferência

A página mantém leitura e ações acessíveis nas larguras verificadas, com comparação visual registrada. Use `astrofy check --category layout` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** conteúdo real, objetivo da rota, tokens, componentes e capturas atuais.
- **Alteração sob teste:** Altere uma região da página por vez; compare capturas com o mesmo conteúdo, viewport e tema. Reutilize espaçamentos já definidos.
- **Falha e resultado esperado:** Um título longo não pode desaparecer por altura fixa. Verifique scrollWidth, quebra de linha e foco no botão principal.
- **Comando complementar:** `astrofy check --category layout`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
