# Referência técnica de astrofy-sitespec-create

> Base técnica conferida para Astro 7.3.3 em 12/10/2026. Revise o contrato em
> `docs/sitespec.md` ao alterar o schema.

## Arquivos e APIs

Leia `docs/sitespec.md` e `packages/schemas/sitespec.schema.json` na raiz do
pacote Astrofy. O contrato define o front matter obrigatório (`schemaVersion`,
`id`, `slug`, `title`, `summary`, `status`, `createdAt`, `updatedAt`,
`primarySkill`, `reviewSkills`, `relatedFiles`) e os campos opcionais
(`tags`, `source`, `priority`, `dependsOn`, `estimateMinutes` com
`estimateBasis`, `blockedReason`, `archivedReason`).

`astrofy sitespec list --json` lê `.sitespec/` e devolve `items`, `errors` e
`nextId`. Cada item de `items` já traz `blockedBy` (dependências de
`dependsOn` ainda não `done`) e `missingDependencies` (ids referenciados que
não existem) — não recalcule isso manualmente.

## Alteração compatível

Front matter desconhecido, fora do enum ou com tipo errado recusa a leitura
inteira do arquivo. Item de checklist sem `{#id}` ou com `{#id}` repetido
também recusa a leitura inteira. Escreva o arquivo completo de uma vez,
depois valide com `astrofy sitespec list --json`; não deixe um arquivo
parcialmente inválido no repositório entre uma escrita e a próxima.

## Diagnóstico

Se a tarefa criada aparecer em `errors` em vez de `items`, a mensagem de erro
cita o campo ou o id de checklist problemático. Corrija o arquivo e rode o
comando de novo; a leitura não grava nada, então repetir a consulta é seguro.

## Regras do catálogo

| Regra | Método | Escopo | Verificação |
| --- | --- | --- | --- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use `astrofy sitespec list --json` para validar o contrato. |

## Execução de checks

`astrofy sitespec list` é leitura pura: não executa scripts, não abre
navegador e não grava `.sitespec/`. A validação acontece em memória a cada
chamada, contra `packages/schemas/sitespec.schema.json`.

## Fontes

Consulta: 12/10/2026.

- **[JSON Schema](https://ajv.js.org/json-schema.html):** dialeto JSON
  Schema e validação Ajv; consulte ao diagnosticar um front matter recusado.
- **[GitHub Flavored Markdown — Task list items](https://github.github.com/gfm/#task-list-items-extension-):**
  sintaxe `- [ ]`/`- [x]` usada pela checklist.

## Mapear skills relacionadas antes de perguntar

`astrofy skills list --json` devolve nome, título e descrição das skills do
catálogo. Compare palavras do pedido com esse texto para achar candidatas a
`primarySkill` e `reviewSkills` antes de decidir que falta pergunta — o
`SKILL.md` de uma skill relacionada costuma já responder o que pareceria
uma dúvida. Exemplos de dúvida já resolvida pela skill, sem perguntar:

- Pedido toca formulário → `astrofy-forms` já exige destino de envio e
  mensagens acessíveis definidos; a checklist cobra isso como item, não
  como pergunta.
- Pedido toca imagem → `astrofy-images` já define que a origem e o uso da
  imagem (hero, ilustração, ícone) mudam a verificação; se o pedido já diz
  o uso, não pergunte de novo.
- Pedido toca rota nova → `astrofy-routing` já cobre colisão e 404; a
  dúvida real costuma ser outra (qual conteúdo vai na rota), não o
  comportamento de roteamento.

## Calibrar as perguntas

Zero perguntas é o resultado esperado quando o pedido já nomeia skill,
arquivo e critério de pronto, ou quando uma skill relacionada já resolve a
lacuna. Pergunte só quando a resposta mudaria `primarySkill`,
`relatedFiles` ou um item real da checklist — nunca para confirmar algo que
já está no pedido ou documentado em `SKILL.md` de uma `reviewSkill`.

Quando perguntar, até três perguntas, cada uma objetiva e com uma opção
recomendada (por exemplo: "Isso afeta só a página de preços ou o componente
de preço é usado em outro lugar? Recomendo conferir `relatedFiles` nas
tarefas existentes primeiro — ambas as páginas, se o componente for
compartilhado"). Espere a resposta antes de escrever `SITEPEC.md`; não
prossiga com suposição quando a pergunta foi feita.

## Escolha de reviewSkills e checklist

`reviewSkills` não é um catálogo fixo por tipo de tarefa — é a lista das
skills cujo conhecimento se aplica a esta tarefa específica. Leia o
`SKILL.md` de cada uma (instalado no projeto ou, na ausência, a versão
distribuída em `skills/<nome>/SKILL.md` dentro do pacote Astrofy) antes de
escrever a checklist. Uma tarefa sem revisão especializada aplicável usa
`reviewSkills: []`.

```bash
astrofy sitespec list --json
astrofy skills list --json
```

`astrofy skills list` mostra nome e descrição de cada skill do catálogo;
use para confirmar que `primarySkill` e cada entrada de `reviewSkills`
existem antes de referenciá-las no front matter.

## Identidade do item de checklist

O `{#id}` de quatro caracteres `[a-z0-9]` é gerado uma única vez, na criação
do item, e nunca muda depois — nem quando o item é reordenado. Gere valores
que não colidam com nenhum outro item da mesma checklist; não reaproveite um
id de uma tarefa diferente, já que a identidade é local ao arquivo.

## Dependências entre sitespecs

`dependsOn` só aceita `id`s que já existem em `.sitespec/`. Antes de declarar
uma dependência, confirme em `items` (do `astrofy sitespec list --json`) que
o `id` referido existe; um id inexistente aparece em `missingDependencies` da
tarefa nova, sinalizando referência quebrada em vez de bloqueio real.

## Entrega da tarefa criada

Informe à pessoa ou ao processo que pediu a tarefa: o `id` e o `slug`
atribuídos, a `primarySkill` escolhida, e se a checklist ficou vazia por
falta de critério aplicável (nesse caso, registre em `## Notas` por que
ficou vazia, em vez de inventar itens).
