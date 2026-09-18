# Referência técnica de astrofy-homepage

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia rota inicial, público, ação principal, conteúdo autorizado e seções
disponíveis.

Relacione a abertura à ação principal e confirme seus destinos. Use conteúdo
real antes de avaliar a composição visual e os metadados.

## Alteração compatível

Substitua seções gradualmente preservando URLs, marca e informações confirmadas.
Compare primeiro celular e depois desktop.

## Diagnóstico

O botão principal deve chegar a uma rota existente. Remover o texto de abertura
deve ser detectado pela revisão de conteúdo e hierarquia.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Página inicial

Hero tem um h1, mensagem principal e ação verificável. Seção não recebe texto
fictício para preencher espaço. Dados usados em cards, métricas e logos precisam
ter fonte registrada no projeto.

A homepage usa componentes estáticos por padrão. Hidrate somente o controle que
exige estado, como carrossel ou filtro, e confirme leitura útil antes da
hidratação.

## Rota inicial e composição

Confirme qual URL corresponde à home considerando base e locale. O arquivo
index.astro pode receber layout que já define main, metadados e navegação.
Componha os slots existentes sem duplicar landmarks ou emitir duas canonicals.
O link da marca deve resolver para a home pública correta.

Separe conteúdo fixo de blocos derivados de coleções. Uma lista de posts recentes
usa a política de publicação do blog, inclusive datas e rascunhos. Defina estado
vazio sem inventar itens; conteúdo removido não pode permanecer num card manual
desconectado da fonte.

## Carregamento inicial

Confira a resposta HTML antes da hidratação. Título, proposta e destino principal
precisam estar disponíveis no caminho de uso definido pelo projeto. Um botão
que só aparece depois de carregar carrossel ou vídeo pode tornar a entrada
dependente de código sem necessidade.

Reserve dimensões da mídia e confira a fonte carregada antes de avaliar mudanças
de layout. Não aplique lazy loading indiscriminadamente à imagem principal
visível no carregamento. Identifique o elemento de LCP na medição antes de
alterar prioridade de todas as imagens.

Se houver dados consultados no servidor, documente falha e conteúdo alternativo
para a abertura não depender de serviço secundário. Não converta falha de API
em números fictícios ou depoimentos de exemplo.

## Verificação dos caminhos principais

Percorra a ação principal e os destinos das seções com teclado. Confira se o
texto da ação descreve o resultado real. Uma âncora exige alvo existente e
posição legível sob header; link externo exige URL final correta.

Teste entrada direta, retorno pelo histórico e mudança de tema quando presentes.
Para carrossel, confira acesso aos itens e pausa conforme seu comportamento;
não use rotação automática para esconder informação essencial fora da abertura.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Theme variables](https://tailwindcss.com/docs/theme):** namespaces de
  variáveis e utilitários do Tailwind 4; confira o CSS compilado.
- **[documentação para homepage](https://www.w3.org/WAI/tutorials/page-structure/):**
  regiões e headings; consulte ao compor a estrutura semântica da página.
