# Referência técnica de astrofy-geo

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada.

Diferencie recomendação oficial da plataforma de hipótese de melhoria. Relacione
cada sugestão ao trecho observado e à fonte consultada.

## Alteração compatível

Preserve `llms.txt` e `llms-full.txt` quando existentes e sincronize-os com
as páginas canônicas em vez de reescrevê-los à mão. Não imponha os arquivos
a todos os sites; documente o uso local e se o projeto publica ou não o
conteúdo integral.

## Diagnóstico

Uma informação acessível apenas após clique deve ser identificada na comparação
do HTML. Nenhuma mudança permite garantir citação por um sistema externo.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra            | Método      | Escopo    | Verificação                                                              |
| ---------------- | ----------- | --------- | ------------------------------------------------------------------------ |
| `geo.authorship` | `manual`    | `page`    | Autoria e responsabilidade identificáveis quando pertinentes.            |
| `geo.sources`    | `manual`    | `page`    | Fontes e afirmações relevantes revisadas.                                |
| `geo.access`     | `hybrid`    | `page`    | Conteúdo principal acessível no modo de renderização adotado.            |
| `geo.llms`       | `automatic` | `project` | Resumo presente em `public/` com URLs absolutas e apontamento integral.  |
| `geo.llms-full`  | `hybrid`    | `project` | Integral deriva das páginas canônicas, sem rascunhos ou dados privados.  |

## Conteúdo legível por agentes

Páginas Astro devem expor conteúdo essencial no HTML inicial quando não há
motivo para hidratá-lo. Título, autor, data, navegação e fonte aparecem de forma
semântica. Dados estruturados complementam a página, sem substituir texto
visível.

Não trate comportamento de mecanismo externo como garantia. Verifique somente
HTML, metadados, disponibilidade e dados fornecidos pelo site.

## llms.txt e llms-full.txt

`public/llms.txt` é o resumo para agentes: nome do site, resumo curto,
recursos principais com URLs absolutas do domínio de produção e apontamento
para `/llms-full.txt` quando o integral é publicado. `public/llms-full.txt`
é o conteúdo integral derivado da mesma fonte das páginas canônicas, com
URL absoluta por seção.

Regras de conteúdo:

- Inclua só rotas publicadas e conteúdo com status publicado. Exclua
  rascunhos, datas futuras, conteúdo privado, credenciais e dados pessoais
  não publicados.
- Cada seção do integral informa a URL absoluta da página correspondente.
  Links internos usam URL absoluta; link relativo reprova `geo.llms` e
  `geo.llms-full`.
- O resumo aponta para o integral quando ele existe. Resumo que anuncia
  `llms-full.txt` ausente reprova a sincronia.
- Não inclua no integral dado que a página canônica não exibe. Resumo
  técnico não contradiz a página nem expõe dado privado porque o
  destinatário é uma ferramenta automatizada.

Regras de geração:

- Gere os dois arquivos por script determinístico versionado no projeto,
  com modo `--check` que falha quando o arquivo gravado diverge do esperado
  (modelo em `templates/llms/generate-llms.mjs`). Ordenação estável,
  mesma fonte das páginas e mesma normalização de URLs a cada execução.
- Rode o gerador após alterar rotas ou coleções, confira o diff e publique
  os arquivos pela raiz (`public/` sai na raiz do build Astro por padrão).
- Não edite os arquivos gerados à mão para corrigir conteúdo editorial;
  corrija a fonte (página ou coleção) e regenere.

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
