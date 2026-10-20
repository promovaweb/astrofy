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
Depois confira `public/llms.txt` com URLs absolutas e `public/llms-full.txt`
com a mesma informação da página canônica.

## Gerar llms.txt e llms-full.txt

Copie `templates/llms/generate-llms.mjs` para `scripts/generate-llms.mjs`,
ajuste `SITE_URL`, coleções e o filtro de publicados, execute
`node scripts/generate-llms.mjs` e confira o diff. Registre o comando no
`package.json` e rode o modo `--check` no CI antes de publicar.

## Projeto existente

Um site usa `llms.txt` e `llms-full.txt` por escolha própria. Preserve os
arquivos, regenere a partir das páginas canônicas e não os imponha como
exigência universal. Quando o projeto publica só o resumo, remova o
apontamento para o integral e anote a escolha no relatório.

## Resumo com link relativo

Um `llms.txt` com link relativo `/blog/exemplo/` reprova `geo.llms`. Troque por URL
absoluta do domínio de produção (`https://exemplo.com/blog/exemplo/`) no
gerador, regenere e repita `astrofy check --category geo`.

## Integral com rascunho

Um `llms-full.txt` com marcador `draft: true`, `TODO` ou conteúdo removido
da página canônica reprova `geo.llms-full`. Corrija a seleção do gerador
para só publicados, regenere e compare a seção com a URL canônica antes de
registrar a revisão humana.

## Erro recorrente

Não apresente uma hipótese de recomendação como garantia de ranking ou requisito oficial. Não edite o integral à mão para corrigir texto editorial; corrija a fonte e regenere.

## Conferência

A revisão mostra o trecho e a fonte que sustentam cada recomendação, sem prometer citações ou posições. Use `astrofy check --category geo` e registre o resultado da operação no escopo realmente verificado. `geo.llms-full` exige revisão humana mesmo com pré-checagem automática sem falhas.

## Regressão específica

- **Arquivos envolvidos:** HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada, mais `public/llms.txt`, `public/llms-full.txt`, coleções publicadas e script gerador.
- **Alteração sob teste:** Preserve `llms.txt` e `llms-full.txt` quando existentes e sincronize-os com as páginas canônicas por script determinístico com `--check`, sem impor os arquivos a todos os sites.
- **Falha e resultado esperado:** Uma informação acessível apenas após clique deve ser identificada na comparação do HTML. Resumo sem URL absoluta, com link relativo ou com apontamento para integral ausente reprova `geo.llms`. Integral com rascunho, link relativo ou dado ausente da página canônica reprova `geo.llms-full`. Nenhuma mudança permite garantir citação por um sistema externo.
- **Comando complementar:** `astrofy check --category geo`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
