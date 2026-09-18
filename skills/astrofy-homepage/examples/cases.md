# Casos de montar página inicial

## Uso comum

Use a abertura para apresentar o blog e apontar para sua listagem.

## Projeto existente

Uma home institucional já possui ofertas confirmadas. Preserve os fatos ao alterar a ordem das seções.

## Erro recorrente

Não acrescente depoimentos, métricas ou promessas para preencher um template.

## Conferência

A página permite compreender o assunto e encontrar a ação principal com conteúdo factual e navegação funcional. Use `astrofy check --page /` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** rota inicial, público, ação principal, conteúdo autorizado e seções disponíveis.
- **Alteração sob teste:** Substitua seções gradualmente preservando URLs, marca e informações confirmadas. Compare primeiro celular e depois desktop.
- **Falha e resultado esperado:** O botão principal deve chegar a uma rota existente. Remover o texto de abertura deve ser detectado pela revisão de conteúdo e hierarquia.
- **Comando complementar:** `astrofy check --page /`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
