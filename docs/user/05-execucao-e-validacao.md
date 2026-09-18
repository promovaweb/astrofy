# Execução e validação

O plano indica as skills adequadas para cada tarefa. Uma sequência comum usa:

1. `astrofy-architecture`, `astrofy-routing` e `astrofy-config` para a base.
2. `astrofy-components`, `astrofy-sections` e `astrofy-page-design` para a
   interface.
3. `astrofy-images`, `astrofy-forms` ou `astrofy-react` conforme a página.
4. `astrofy-accessibility`, `astrofy-seo`, `astrofy-open-graph` e
   `astrofy-structured-data` para qualidade pública.
5. `astrofy-testing`, `astrofy-documentation` e `astrofy-checkup` para fechar
   o trabalho.

Execute somente as skills relacionadas ao escopo. Cada uma deve ler o plano,
conferir a implementação atual, registrar o que alterou e atualizar o estado da
tarefa.

## Conferência mínima

```bash
npm run check
npm run build
astrofy check --root .
```

Use também os testes próprios do projeto e revise a página no navegador em
larguras de celular e desktop. Formulários, menus, foco, links e mensagens de
erro exigem interação real.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Execução das fases e fechamento técnico |
| Autoridade | Skills técnicas e checklist do Astrofy |
