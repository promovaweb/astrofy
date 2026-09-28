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

O JSON segue `packages/schemas/implementation-plan.schema.json`. O Markdown
equivalente permite revisar o plano sem ferramentas adicionais.

O agente gera o plano estruturado depois que a entrevista estiver pronta. Se
quiser fazer essa etapa pelo terminal, use:

```bash
astrofy plan --slug atlas
```

As tarefas começam como `pending` ou `ready`. Dependências concluídas liberam
a próxima tarefa sem apagar o histórico do plano.

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
| Autoridade | `astrofy-implementation-planner` e schema do plano |
