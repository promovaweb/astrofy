# Casos de integrar tailwind

## Componente fora da raiz do app

Use uma classe exclusiva de um componente do pacote compartilhado. Execute o
build a partir do mesmo diretório usado pela CI e abra a saída. Se a classe
não for emitida, confira descoberta e @source relativo ao CSS antes de copiar
o componente para src. Uma classe já usada no app não serve para esse teste.

## Variante vinda de conteúdo remoto

Faça o CMS fornecer uma chave de variante, como destaque, e mapeie-a para
classes completas. Teste chave válida e desconhecida; a segunda segue o padrão
definido sem construir classe arbitrária. Confira no build, pois a resposta
remota recebida em produção não recompila Tailwind.

## Token presente, cor incorreta

Use bg-surface num componente e alterne o tema no html. Confira a declaração
emitida, variável resolvida e regra vencedora. Repita dentro de um contêiner
que redefine o token. O resultado deve acompanhar o contrato de escopo; não
adicione important para ocultar uma variável ausente.

## Uso comum

Troque bg-purple-600 por bg-action depois de conferir o token semântico.

## Projeto existente

Um site usa Tailwind 3. Registre a incompatibilidade do adaptador CSS-first e preserve sua versão até uma migração autorizada.

## Erro recorrente

A classe container possui significado próprio no Tailwind. Use um nome distinto para um componente de layout autoral.

## Conferência

As classes usadas aparecem no CSS final. O CSS global não repete valores de marca. Use `astrofy check --rule design.token-usage` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** versão resolvida do Tailwind, integração Vite, CSS de entrada e classes usadas.
- **Alteração sob teste:** Preserve Tailwind 3 quando a migração não estiver no pedido. Em Tailwind 4, remova importação duplicada somente depois de identificar o ponto de entrada efetivo.
- **Falha e resultado esperado:** Uma classe bg-surface deve produzir a cor do token no navegador. Uma string construída dinamicamente pode não gerar utilitário; use variantes explicitamente detectáveis.
- **Comando complementar:** `astrofy check --rule design.token-usage`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
