# Retomada e manutenção

Os arquivos em `.astrofy/` e `.sitespec/` existem justamente para que o
trabalho não dependa de uma conversa contínua — eles permitem continuar
em outra sessão, dias depois, sem reconstituir o contexto de memória.
Abra uma conversa no projeto e peça ao agente para retomar a página pelo
slug, ou simplesmente descreva o que você quer continuar. O agente
confere a especificação aprovada, as tarefas de `.sitespec/` ligadas a
essa página, o estado do Git e continua pela próxima tarefa cujas
dependências já estejam concluídas — exatamente a mesma lógica descrita
no capítulo 7, só que iniciada pelo agente em vez de por você digitando
comandos. Use `astrofy page status` e `astrofy apply` quando quiser
conduzir essa retomada diretamente pelo terminal.

## Quando o conteúdo muda depois que o plano já existe

Se a especificação de conteúdo mudar antes da implementação ter
começado — você decide trocar a oferta, ajustar o público, reescrever
uma seção — volte à especialista da página (capítulo 2 ou 3) para
registrar a mudança primeiro, e só depois gere novamente as partes
afetadas do plano com `astrofy plan --slug <slug>`. O comando reconcilia
em vez de recriar do zero (capítulo 4 detalha exatamente o que é
preservado e o que é atualizado nesse processo).

Se a mudança surgir depois que a execução já começou — uma tarefa já
está `in_progress` ou até `done` quando você percebe que o conteúdo
precisa mudar — não edite o código silenciosamente para acomodar a
mudança. Registre o impacto primeiro: qual tarefa precisa ser revisitada,
o que exatamente mudou na especificação, e só então edite. Isso existe
porque uma tarefa marcada `done` é, por contrato, uma tarefa com
checklist inteira cumprida — reabrir o trabalho sem reabrir o registro
deixa o estado do projeto mentindo sobre o que de fato está pronto.

## Atualização do Astrofy

```bash
npm update --save-dev @promovaweb/astrofy
npx astrofy --version
npx astrofy inspect --root .
```

Leia o `CHANGELOG.md` entre a versão instalada e a nova edição antes de
assumir que nada mudou de comportamento — o Astrofy já passou por pelo
menos uma mudança de ruptura documentada (a remoção de
`.astrofy/plans/<slug>/implementation-plan.json` em favor de sitespecs
ligadas à página, capítulo 4), e futuras mudanças de contrato seguem o
mesmo padrão: documentadas no changelog, nunca silenciosas. Depois de
atualizar, execute as validações do projeto (`astrofy check`, os testes
do próprio site) antes de considerar a atualização concluída — uma
versão nova do CLI pode exigir que uma tarefa antiga seja replanejada ou
revisitada, e é melhor descobrir isso por uma verificação explícita do
que por uma falha inesperada depois.

## Manutenção contínua

Fora de uma tarefa específica, duas consultas cobrem a maior parte do
que vale verificar periodicamente num projeto que já usa o Astrofy:

- `astrofy status` (ou simplesmente `astrofy`, que abre o mesmo estado
  na TUI — capítulo 1) para conferir o que está pendente de verificação
  no checklist técnico do site.
- `astrofy sitespec progress` para conferir o que está pendente de
  execução entre as tarefas registradas, de página ou pontuais.

As duas consultas preservam os arquivos do projeto. O valor delas é justamente permitir
voltar ao projeto depois de um tempo e saber, antes de decidir o que
fazer, exatamente onde o trabalho estava.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Continuidade, alteração e atualização |
| Autoridade | Estado persistido e changelog do Astrofy |
