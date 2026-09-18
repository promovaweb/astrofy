# Casos de revisar descoberta por ia

## Conteúdo em acordeão

Compare um acordeão com texto no HTML e outro que faz fetch após clique. Colete
a resposta inicial e o DOM após interação. Registre a diferença sem classificar
todo conteúdo visualmente recolhido como ausente do documento.

## Resumo desatualizado

Altere uma informação na fonte do artigo e gere a versão Markdown existente.
Compare página e resumo: ambos devem refletir o mesmo conteúdo vigente. Confira
que uma entrada retirada também deixa de ser anunciada no índice para agentes.

## Resposta pública diferente da local

Compare a mesma rota no servidor local e no ambiente de teste com CDN. Registre
status, redirects e presença do texto principal. Uma página de desafio com 200
não comprova entrega do artigo. Não interprete User-Agent simulado como visita
confirmada do serviço externo.

## Uso comum

Verifique se a explicação principal de um artigo aparece no HTML sem interação.

## Projeto existente

Um site usa llms.txt por escolha própria. Preserve o arquivo, sem torná-lo exigência universal.

## Erro recorrente

Não apresente uma hipótese de recomendação como garantia de ranking ou requisito oficial.

## Conferência

A revisão mostra o trecho e a fonte que sustentam cada recomendação, sem prometer citações ou posições. Use `astrofy check --category geo` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada.
- **Alteração sob teste:** Preserve llms.txt quando existente, mas documente seu uso local sem impor o arquivo a todos os sites.
- **Falha e resultado esperado:** Uma informação acessível apenas após clique deve ser identificada na comparação do HTML. Nenhuma mudança permite garantir citação por um sistema externo.
- **Comando complementar:** `astrofy check --category geo`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
