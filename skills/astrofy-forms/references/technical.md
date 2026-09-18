# Referência técnica de astrofy-forms

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia campos, rótulos, endpoint, validação do servidor e ambiente autorizado.

Modele envio, sucesso e falha com mensagens acessíveis. Separe validação do
cliente e do servidor. Confirme recebimento no destino do teste.

## Alteração compatível

Preserve contrato do provedor existente e nomes dos campos. Mudanças visuais não
justificam trocar endpoint nem enviar mensagens reais.

## Diagnóstico

Endpoint retornando erro deve conservar campos e apresentar falha. Resposta de
sucesso precisa corresponder ao recebimento verificado.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra              | Método   | Escopo    | Verificação                                              |
| ------------------ | -------- | --------- | -------------------------------------------------------- |
| `forms.labels`     | `hybrid` | `project` | Campos possuem rótulos e instruções adequadas.           |
| `forms.validation` | `hybrid` | `project` | Erros e sucesso comunicados corretamente.                |
| `forms.delivery`   | `hybrid` | `project` | Submissão chega ao destino esperado em teste controlado. |

## Contrato de formulário

O endpoint define método aceito, content type, limites e formato de resposta.
Campo do cliente não é dado confiável: valide tipo, comprimento e formato no
servidor. Mensagem retornada entra como texto, não HTML.

Desabilite submit enquanto a requisição está ativa e reabilite após resposta.
Região de status anuncia sucesso ou falha; foco vai para resumo de erros ou
primeiro campo inválido.

## Escolha da execução no Astro

Identifique se o destino é um provedor externo, um endpoint próprio ou uma
Astro Action. Uma página estática pode enviar a um serviço, mas arquivos HTML
publicados sozinhos não executam um handler. Confira adaptador e infraestrutura
antes de adicionar processamento no servidor.

Quando Actions já fazem parte do projeto, confira a exportação server em
src/actions/index.ts, defineAction, accept: 'form' e o schema input. Na API
atual, z vem de astro/zod. Consuma data ou error e diferencie isInputError de
falha operacional. O formulário HTML usa method="POST" e a action tipada;
renderizar seu resultado na página exige execução por requisição.

Actions são endpoints públicos. Esconder o botão não restringe quem chama o
handler. Autentique e confira permissão para o recurso antes de persistir dados.

## Corpo, arquivos e efeitos externos

FormData pode conter strings, arquivos e nomes repetidos. Campos de seleção
múltipla precisam conservar todos os valores; Object.fromEntries descarta
repetições. Checkbox desmarcado pode estar ausente. Defina significado de
ausência, string vazia e false antes da normalização.

Ao enviar FormData por fetch, deixe o navegador gerar Content-Type com boundary.
Para upload, imponha limites no servidor e no host, confira conteúdo real e
destino de armazenamento; extensão e MIME declarados pelo cliente não bastam.
Não use nome de arquivo recebido como caminho arbitrário de escrita.

Crie o FormData antes de desabilitar campos; controles disabled não participam
da submissão. Se o submitter fornece name/value, preserve esse valor no envio.
Não limpe o formulário antes da confirmação da operação.

Timeout não prova que o servidor deixou de salvar. Para operações que não
admitem duplicação, implemente chave idempotente persistida junto ao resultado
e reutilize-a na tentativa da mesma operação. Desabilitar o botão reduz cliques,
mas não impede duas requisições de clientes distintos.

## Mensagens e comprovação da entrega

Separe rejeição do schema, sessão expirada, limite de frequência e indisponibilidade
do provedor. Não exponha stack, credencial ou corpo interno do serviço ao usuário.
Associe mensagens aos campos e remova aria-invalid quando o erro for resolvido.
Status de envio pode usar aria-live="polite" sem mover o foco a cada atualização.

Resposta 202 confirma aceitação para processamento, não entrega final. Registre
ID de operação e estado consultável quando o provedor trabalha de forma assíncrona.
No teste, correlacione esse ID com o destino de sandbox, sem registrar o conteúdo
completo de campos pessoais. Teste sem JavaScript somente se esse caminho fizer
parte do contrato do formulário.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Astro Actions](https://docs.astro.build/en/guides/actions/):** declaração,
  FormData, erros de input, uso por formulário e autorização do handler.
- **[Renderização por requisição](https://docs.astro.build/en/guides/on-demand-rendering/):**
  adaptador e execução de processamento no servidor.
- **[FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects):**
  campos enviados, controles disabled e geração do boundary multipart.
- **[HTTP 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202):**
  aceitação de processamento assíncrono e consulta de estado.
- **[documentação para forms](https://www.w3.org/WAI/tutorials/forms/):** label,
  instruções, validação e notificações acessíveis; consulte ao tratar erros de
  envio.
