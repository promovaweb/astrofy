# Casos de organizar blog

## Publicação no limite do horário

Use relógio fixo e três entradas: uma anterior, uma no instante de referência
e uma posterior. Confira a regra definida para igualdade. Compare post direto,
listagem e feed com os mesmos dados. Em saída estática, avance o relógio sem
rebuild e documente por que o arquivo publicado ainda não mudou.

## Datas empatadas

Crie posts com a mesma data e IDs distintos. Inverta a ordem de retorno da
fonte de teste e confira que a paginação permanece estável pelo desempate.
Não use a ordem incidental do filesystem como regra de publicação.

## Retirada de um post

Retire uma entrada da seleção pública, gere build limpo e confira URL individual,
arquivos, taxonomias e feed. No ambiente de teste, verifique que artefato antigo
não continua servido depois da atualização.

## Uso comum

Publique três posts com pageSize 2 e confira a segunda página.

## Projeto existente

Um blog existente usa categoria opcional. Preserve a convenção ou migre com tratamento explícito dos posts antigos.

## Erro recorrente

Um site estático não publica sozinho na data futura. Documente a necessidade de novo build.

## Conferência

Os mesmos posts elegíveis aparecem nas rotas e arquivos. Rascunhos e datas futuras obedecem à política registrada. Use `astrofy check --category blog` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** schema da coleção, seleção publicável, rotas de post, arquivos e taxonomias.
- **Alteração sob teste:** Compare campos legados e atuais antes de migrar o schema. Preserve datas factuais e slugs já publicados; redirects exigem conferência específica.
- **Falha e resultado esperado:** Com três posts elegíveis e pageSize 2, gere duas páginas. Um rascunho e um post futuro não podem aparecer quando a política os exclui.
- **Comando complementar:** `astrofy check --category blog`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
