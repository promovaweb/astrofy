# Casos de separar configuração

## Uso comum

Mova os links repetidos do cabeçalho e rodapé para navigation.ts.

## Projeto existente

Um site já usa config/menu.ts. Preserve o nome quando a convenção estiver documentada.

## Erro recorrente

Não importe TypeScript durante uma inspeção de projeto desconhecido. A importação executa código.

## Conferência

O valor tem uma única fonte editável. Segredos continuam no ambiente. O build preserva o comportamento anterior. Use `astrofy check --category config` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** src/config, imports dos módulos públicos, astro.config.* e nomes das variáveis de ambiente.
- **Alteração sob teste:** Conserve tipos exportados e nomes consumidos. Migre um domínio, como navigation, atualize imports e remova somente a definição já substituída.
- **Falha e resultado esperado:** Dois menus com URLs diferentes devem revelar qual fonte cada um usa. Após centralizar, alterar uma URL precisa atualizar os dois consumidores.
- **Comando complementar:** `astrofy check --category config`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
