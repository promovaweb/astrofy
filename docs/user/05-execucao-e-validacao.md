# Execução e validação

O plano indica as skills adequadas para cada tarefa. O agente executa as que
se aplicam ao escopo aprovado. Uma sequência comum usa:

1. `astrofy-architecture`, `astrofy-routing` e `astrofy-config` para a base.
2. `astrofy-components`, `astrofy-sections` e `astrofy-page-design` para a
   interface.
3. `astrofy-images`, `astrofy-forms` ou `astrofy-react` conforme a página.
4. `astrofy-accessibility`, `astrofy-seo`, `astrofy-open-graph` e
   `astrofy-structured-data` para qualidade pública.
5. `astrofy-editorial-review` quando uma tarefa criar ou alterar texto visível.
   A skill pode auditar sem editar ou corrigir a copy dentro do escopo aprovado.
6. `astrofy-testing`, `astrofy-documentation` e `astrofy-checkup` para fechar
   o trabalho.

Cada skill lê o plano, confere a implementação atual, registra o que alterou e
atualiza o estado da tarefa. Se preferir acompanhar as tarefas pelo terminal,
use `apply` para marcar o início e a conclusão:

```bash
astrofy apply --slug atlas
astrofy apply --slug atlas --task route --status completed
```

## Conferência mínima

```bash
npm run check
npm run build
astrofy check --root .
astrofy check --root . --browser
```

O primeiro `check` não abre navegador. A opção `--browser` inclui Chromium e
confere temas, overflow, responsividade e erros de runtime no preview local.

O agente executa os checks aplicáveis e informa o que ainda precisa de revisão
manual. Revise a página no navegador em larguras de celular e desktop.
Formulários, menus, foco, links e mensagens de erro exigem interação real.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Execução das fases e fechamento técnico |
| Autoridade | Skills técnicas e checklist do Astrofy |
