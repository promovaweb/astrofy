# Casos de verificar json-ld

## Publisher compartilhado

Renderize dois artigos da mesma organização. Confira que publisher referencia
a mesma entidade e que cada artigo mantém seu próprio identificador. Adicione
temporariamente uma segunda emissão com nome divergente para o mesmo @id e
confirme que a revisão aponta o conflito, mesmo com ambos os JSONs válidos.

## Texto contendo fechamento de script

Use título fictício com fechamento de script numa fixture descartável. Confira
que o DOM conserva somente os elementos previstos. JSON.parse do textContent
deve recuperar o título completo. Validar apenas o objeto antes da renderização
não verifica a inserção no HTML.

## Informação desatualizada

Altere um valor na fonte usada pelo conteúdo visível e gere a página novamente.
Compare esse valor com o JSON-LD extraído da mesma resposta. O resultado deve
ser coerente sem editar manualmente uma segunda cópia do dado.

## Uso comum

Um post fornece headline e datePublished a partir da coleção.

## Projeto existente

Uma página institucional já tem Organization. Preserve o identificador ao centralizar a marcação.

## Erro recorrente

JSON válido não comprova veracidade nem garante apresentação especial na busca.

## Conferência

O JSON-LD é válido e não inventa autoria, avaliações, preços ou entidades. Use `astrofy check --category structured` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** conteúdo visível, entidades, IDs estáveis e serialização JSON-LD.
- **Alteração sob teste:** Preserve @id de entidades já publicadas ao centralizar marcação. Remova duplicações sem fabricar avaliações, preços ou autores.
- **Falha e resultado esperado:** Um título contendo fechamento de script precisa permanecer texto no JSON-LD, sem criar novo elemento ou executar código.
- **Comando complementar:** `astrofy check --category structured`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
