# Casos de preparar build e publicação

## Uso comum

Gere dist de um site estático e confira suas rotas no preview.

## Projeto existente

Um site usa adaptador Node. Preserve o modo servidor e documente seu comando de execução.

## Erro recorrente

Não substitua o provedor ou atualize uma major version apenas para simplificar o build.

## Conferência

O build é reproduzível e o procedimento descreve entradas, saída e teste após publicação. Use `astrofy check --rule quality.build` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** scripts, lockfile, adaptador, output, variáveis e provedor existente.
- **Alteração sob teste:** Preserve o provedor e o modo adotado. Uma migração de major ou adaptador exige escopo próprio e teste das rotas representativas.
- **Falha e resultado esperado:** Build com erro não pode reutilizar dist antigo para afirmar sucesso. Em servidor, teste uma rota dinâmica com o runtime correto.
- **Comando complementar:** `astrofy check --rule quality.build`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
