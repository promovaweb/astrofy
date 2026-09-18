# Validação em Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Camadas de teste

| Camada    | Comando ou ambiente      | Cobertura                    |
| --------- | ------------------------ | ---------------------------- |
| Tipo      | astro check              | Props, frontmatter e imports |
| Build     | astro build              | Rotas, coleções e integração |
| Preview   | astro preview ou adapter | Saída e resposta HTTP        |
| Navegador | Playwright ou runner     | Foco, formulário e ilha      |

astro check não substitui astro build. Um componente pode tipar corretamente e
falhar ao renderizar coleção, resolver ativo ou gerar rota dinâmica. O build não
substitui teste em navegador para diretiva client:*.

## Casos por recurso

Para getStaticPaths(), compare número de páginas geradas, slug e resposta 404
para caminho ausente. Para Content Layer, crie uma entrada com campo faltante e
confirme arquivo e campo no erro. Para React, carregue a página, execute o
evento e capture console. Para tema, teste primeira pintura, alteração explícita
e recarregamento. Para imagem, confirme dimensões, alt e URL final gerada.

Teste de endpoint deve iniciar o runtime usado na publicação quando o endpoint
depende do adaptador. Faça requisição com entrada válida, ausente e inválida,
verificando status, cabeçalho e corpo. Não teste somente a função isolada se a
rota transforma a resposta.

## Ambiente reprodutível

Registre versão Node, Astro, navegador, viewport, tema, timezone e variáveis de
teste. Limpe dados de localStorage e cookies entre cenários. O teste que cobre
client:visible deve rolar até o elemento antes de esperar interação.

## Assertivas e isolamento

Espere um estado observável, como texto atualizado ou resposta concluída, em
vez de pausa fixa. Interação que altera contagem deve conferir o novo valor;
localizar um botão no HTML não comprova hidratação.

Capture erros de página e requisições relevantes, mas associe a falha ao cenário.
Não ignore todos os erros de console para estabilizar o teste. Se uma chamada
externa não fizer parte do escopo, use substituto controlado e registre que a
integração real não foi exercitada.

Use relógio e dados estáveis para publicação agendada, ordenação e screenshots.
Cada cenário deve preparar o estado que consome. Evite depender de cookies ou
registros criados por teste anterior para que execução isolada tenha o mesmo
resultado.

## Alcance e casos negativos

Introduza a falha relevante somente em fixture descartável e confirme que a
assertiva a detecta. Restaure a implementação e confira sucesso. Isso demonstra
sensibilidade ao comportamento testado, sem comprovar todos os recursos da skill.

Registre versões resolvidas e artefato usado. Um teste local em Astro 7.3.3 não
aprova automaticamente toda a major, todos os adaptadores ou outro sistema
operacional. Separe cenários de build, SSR e navegador no relatório.

## Fontes de validação

- [Comando astro check](https://docs.astro.build/en/reference/cli-reference/#astro-check)
- [Diretivas de cliente](https://docs.astro.build/en/reference/directives-reference/)
