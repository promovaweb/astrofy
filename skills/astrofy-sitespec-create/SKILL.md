---
name: astrofy-sitespec-create
description:
  Cria tarefas de desenvolvimento do site em .sitespec/, esclarecendo o
  pedido só quando necessário e derivando a checklist das skills de
  revisão relacionadas, com id, dependências e estimativa do contrato.
---

# Criar sitespec

## Entradas

Leia `docs/sitespec.md` na raiz do pacote Astrofy para o contrato completo do
arquivo e `packages/schemas/sitespec.schema.json` para os campos fechados.
Execute `astrofy sitespec list --json` antes de escrever qualquer arquivo:
o retorno traz `items` (tarefas existentes, com `blockedBy` e
`missingDependencies` já resolvidos), `errors` (tarefas com problema) e
`nextId`, o próximo id de quatro dígitos livre.

Leia o pedido que deu origem à tarefa — issue, mensagem, trecho de código.
Rode `astrofy skills list --json` e compare nome e descrição de cada skill
com o pedido para encontrar as candidatas a `primarySkill` e `reviewSkills`.

## Execução

1. Rode `astrofy sitespec list --json` e anote `nextId`. Se a lista já tiver
   uma tarefa com o mesmo objetivo, não crie uma duplicata: aponte a
   existente e pare.
2. Mapeie as skills relacionadas ao pedido com `astrofy skills list --json`
   e leia o `SKILL.md` das candidatas mais próximas. Isso sozinho já resolve
   boa parte das dúvidas: o `SKILL.md` de `astrofy-forms`, por exemplo, já
   diz que todo formulário precisa de destino de envio definido, então a
   checklist usa isso sem perguntar.
3. Liste o que ainda falta para escrever uma checklist correta — tipicamente
   qual skill executa, qual arquivo é afetado e o que conta como "pronto".
   Pergunte somente o que as skills relacionadas não respondem e que mudaria
   a tarefa dependendo da resposta. Não pergunte o que já está implícito no
   pedido ou já é convenção documentada de uma skill.
   - **Pedido já específico** (skill, arquivo e critério de pronto claros):
     siga direto para o passo 4, sem perguntar nada.
   - **Pedido ambíguo em algum ponto que muda a tarefa**: faça no máximo
     três perguntas objetivas, cada uma com uma opção recomendada e espaço
     para resposta livre. Espere a resposta antes de continuar. Não
     transforme isso numa entrevista fixa — a contagem varia com a dúvida
     real, incluindo zero.
4. Escolha `slug` em kebab-case, estável, que não mude depois.
5. Escolha `primarySkill` entre os nomes do catálogo. Escolha `reviewSkills`:
   as skills cujas boas práticas moldam a checklist (por exemplo, uma tarefa
   de SEO consulta `astrofy-seo`; uma tarefa de acessibilidade consulta
   `astrofy-accessibility`). Pode ser uma lista vazia quando a tarefa não
   tem revisão especializada aplicável.
6. Para cada skill em `reviewSkills`, leia o `SKILL.md` e o
   `references/technical.md` dela instalados no projeto (ou distribuídos com
   o pacote, quando a skill ainda não foi instalada) e extraia os critérios
   que valem para esta tarefa específica — não copie a lista inteira de uma
   skill genérica para uma tarefa pontual.
7. Escreva cada item da checklist com um `{#id}` próprio: quatro caracteres
   `[a-z0-9]` que não se repitam dentro do arquivo. Marque a skill
   responsável pelo item com `` `#astrofy-skill` `` quando divergir de
   `primarySkill`.
8. Se a tarefa depende de outra sitespec ainda não concluída, declare
   `dependsOn` com o `id` dela. Confira em `items` que o `id` existe e que
   seu `status` importa para decidir se esta tarefa pode começar.
9. Preencha `priority` quando a urgência for conhecida; omita para `medium`.
   Preencha `estimateMinutes` e `estimateBasis` juntos quando houver base
   real para estimar; não invente um número sem justificativa.
10. Crie o diretório `.sitespec/<nextId>-<slug>/` e escreva `SITEPEC.md` com
    `status: draft`, `createdAt` e `updatedAt` iguais ao momento da criação,
    e as três seções do corpo na ordem do contrato: `## Descrição`,
    `## Checklist`, `## Notas`. Se alguma pergunta foi feita no passo 3,
    registre em `## Notas` a pergunta e a resposta recebida.
11. Rode `astrofy sitespec list --json` de novo e confirme que a tarefa nova
    aparece em `items`, não em `errors`.

### Sequência específica

1. Verifique duplicidade antes de criar.
2. Mapeie skills relacionadas antes de decidir se falta pergunta.
3. Pergunte só o que muda a tarefa e as skills relacionadas não respondem;
   no máximo três perguntas, zero é o resultado mais comum.
4. Derive a checklist das `reviewSkills`, não de suposição genérica.
5. Gere um `{#id}` por item, sem repetição.
6. Valide o arquivo escrito com `astrofy sitespec list --json`.

### Alteração de implementação existente

Uma tarefa `draft` pode ser reescrita livremente antes de alguém começar a
trabalhar nela. Depois que `status` sai de `draft`, use
`astrofy-sitespec-implement` para alterar o arquivo, não esta skill.

## Verificação

`astrofy sitespec list --json` precisa devolver a tarefa criada dentro de
`items`, sem entrada correspondente em `errors`. Confira que cada item da
checklist tem `skill` resolvido (próprio ou herdado de `primarySkill`) e que
`dependsOn`, quando presente, aponta para um `id` existente. Confira também
que nenhuma pergunta foi feita sobre algo que uma `reviewSkill` já
respondia, e que a quantidade de perguntas fez sentido para a ambiguidade
real do pedido.

```bash
astrofy sitespec list --json
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a
saída.
