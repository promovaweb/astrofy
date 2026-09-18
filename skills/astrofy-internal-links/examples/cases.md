# Casos de revisar ligações internas

## Referência compartilhada no Markdown

Prepare dois links que usam a mesma definição e uma ocorrência da URL dentro
de bloco de código. Corrija a definição somente quando ambos os links precisarem
do novo destino. Se apenas um mudar, separe a referência correspondente. O bloco
de código conserva seu conteúdo literal após a edição e nova execução.

## Fragmento de heading repetido

Publique duas seções com o mesmo título e confira os IDs gerados. Ligue para a
segunda seção usando seu ID real. Renomeie a primeira e reconstrua: confira se
o ID da segunda mudou e atualize os consumidores necessários. Não suponha que
um slug derivado apenas do texto resolve duplicações.

## Destino renderizado por requisição

Inclua um link para rota SSR sem HTML físico no build. Confira a resposta do
servidor de teste e o fragmento entregue. Registre separadamente o diagnóstico
estático e o resultado HTTP, sem criar arquivo fictício para eliminar o aviso.

## Uso comum

Ligue uma menção a temas para o heading correspondente de um artigo já publicado.

## Projeto existente

Uma âncora antiga foi renomeada. Atualize os consumidores confirmados sem alterar outras ocorrências textuais.

## Erro recorrente

Não use similaridade textual como autorização para inserir links em qualquer parágrafo.

## Conferência

Links e âncoras existem. A reexecução não duplica links nem muda trechos de código. Use `astrofy links scan` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** HTML atual, rotas, headings, arquivo MDX de origem e destinos candidatos.
- **Alteração sob teste:** Atualize referências a heading renomeado após confirmar seus consumidores. Evite substituir ocorrências da URL dentro de código ou rótulos.
- **Falha e resultado esperado:** Um fragmento ausente deve ser detectado. Após corrigir o destino e repetir o scanner, o link deve existir uma única vez no parágrafo.
- **Comando complementar:** `astrofy links scan`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
