# Referência técnica de astrofy-geo

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada.

Diferencie recomendação oficial da plataforma de hipótese de melhoria. Relacione
cada sugestão ao trecho observado e à fonte consultada.

## Alteração compatível

Preserve llms.txt quando existente, mas documente seu uso local sem impor o
arquivo a todos os sites.

## Diagnóstico

Uma informação acessível apenas após clique deve ser identificada na comparação
do HTML. Nenhuma mudança permite garantir citação por um sistema externo.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra            | Método   | Escopo | Verificação                                                   |
| ---------------- | -------- | ------ | ------------------------------------------------------------- |
| `geo.authorship` | `manual` | `page` | Autoria e responsabilidade identificáveis quando pertinentes. |
| `geo.sources`    | `manual` | `page` | Fontes e afirmações relevantes revisadas.                     |
| `geo.access`     | `hybrid` | `page` | Conteúdo principal acessível no modo de renderização adotado. |

## Conteúdo legível por agentes

Páginas Astro devem expor conteúdo essencial no HTML inicial quando não há
motivo para hidratá-lo. Título, autor, data, navegação e fonte aparecem de forma
semântica. Dados estruturados complementam a página, sem substituir texto
visível.

Não trate comportamento de mecanismo externo como garantia. Verifique somente
HTML, metadados, disponibilidade e dados fornecidos pelo site.

## Plataforma e finalidade

Identifique o produto avaliado e o comportamento esperado: descoberta por busca,
consulta pontual, apresentação de fontes ou treinamento. Regras de uma finalidade
não descrevem automaticamente as demais. Registre fonte oficial e data antes
de recomendar alteração de acesso.

Para AI Overviews e AI Mode, a orientação do Google mantém os fundamentos de
SEO e não exige arquivo de texto especial ou marcação exclusiva para IA.
Não apresente llms.txt ou novo tipo de schema como requisito desses recursos.
Essa conclusão pertence ao produto documentado, não a todos os agentes.

## Resposta recebida

Colete status, redirects, Content-Type, headers e HTML da URL pública. Separe
resposta inicial, conteúdo após JavaScript e conteúdo obtido depois de interação.
Um acordeão cujo texto já está no HTML difere de um botão que busca a resposta
remotamente após clique.

Em Astro, confira se a informação principal ficou dentro de client:only ou
depende de requisição cliente. Quando o conteúdo público pode ser renderizado
no servidor, mantenha-o na resposta da rota. Preserve a interação como melhoria
do documento quando isso atender ao produto.

Confira CDN, autenticação e desafios de navegador. Um teste local 200 não
demonstra acesso público. Simular User-Agent ajuda a comparar respostas, mas
não autentica o crawler nem comprova visita real da plataforma.

## Fontes e atualização

Relacione afirmação, fonte, data aplicável e entidade mencionada. Diferencie
publicação, revisão editorial e geração técnica do site. Não altere datas
editoriais a cada build para sugerir atualização inexistente.

Se houver versão Markdown ou índice para agentes, derive-os da mesma fonte do
conteúdo publicado. Confira links, conteúdo retirado e versões desatualizadas.
Um resumo técnico não deve contradizer a página canônica nem incluir dados
privados apenas porque o destinatário é uma ferramenta automatizada.

## Resultados observáveis

Registre falhas técnicas por URL e resposta coletada. Para observação num produto
externo, registre consulta, data, produto, idioma e URL citada. Ausência de
citação numa resposta não demonstra que a página não foi rastreada.

Não atribua mudança de tráfego ou citações a uma alteração isolada sem comparação
adequada. A skill entrega correções verificadas de acesso, consistência e clareza;
qualquer hipótese de efeito externo permanece identificada como hipótese.

## Fontes

- [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309):
  regras de rastreamento; não substituem autenticação do site.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[AI features and your website](https://developers.google.com/search/docs/appearance/ai-features):**
  orientações do Google para recursos de IA; não generalize recomendações a
  outras plataformas.
- **[Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data):**
  relação entre marcação e conteúdo visível; confira elegibilidade separadamente
  da sintaxe JSON.
