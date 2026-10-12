# Plano de implementação

Depois da aprovação da página, o agente chama
`astrofy-implementation-planner`. A skill relê o projeto para relacionar cada
área com arquivos existentes e mudanças necessárias.

O plano registra:

- rota e modo de renderização;
- direção de voz para tarefas que exibem texto;
- layouts, componentes e conteúdo reutilizados;
- arquivos que serão criados ou alterados;
- integrações e variáveis de ambiente;
- acessibilidade, SEO e dados estruturados;
- testes automáticos e revisões manuais;
- revisão editorial quando a tarefa cria ou altera copy;
- documentação afetada;
- dependências, ordem e estimativa de cada tarefa.

Cada tarefa é uma sitespec comum (contrato em `docs/sitespec.md`, schema em
`packages/schemas/sitespec.schema.json`), com `page` e `task` no front
matter apontando de volta para a página. Não existe mais um arquivo de plano
separado: `astrofy sitespec list`/`progress` e a aba Specs da TUI leem essas
tarefas junto de qualquer outra tarefa do site.

O agente gera o plano estruturado depois que a entrevista estiver pronta. Se
quiser fazer essa etapa pelo terminal, use:

```bash
astrofy plan --slug atlas
```

O comando grava três tarefas mecânicas (`route`, `content`, `check`) em
`.sitespec/`. `astrofy-implementation-planner` pode acrescentar outras,
sempre com o mesmo `page` e um `task` próprio, quando a página exigir mais
decomposição. As tarefas começam em `draft`; `blockedBy` (calculado a partir
de `dependsOn`) mostra quais ainda esperam uma predecessora. Reexecutar
`astrofy plan` reconcilia sem apagar progresso ou itens já marcados.

## Aprovação

Confira se cada tarefa aponta para um resultado observável e uma forma de
conferência. Ajuste o plano antes de executar quando o caminho proposto não
combinar com a arquitetura atual. A aprovação libera as skills técnicas por
fase.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Normativo |
| Escopo | Conversão da página aprovada em trabalho técnico |
| Autoridade | `astrofy-implementation-planner` e o contrato de sitespec |
