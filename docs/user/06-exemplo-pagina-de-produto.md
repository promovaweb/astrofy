# Exemplo: página de produto

## Pedido inicial

```text
Quero criar uma página para o Atlas, nosso produto de atendimento.
```

`astrofy-page-planner` seleciona `astrofy-plan-product-page`. A entrevista
confirma que a página apresenta o produto a equipes de suporte e direciona a
uma demonstração.

## Conteúdo definido

Uma arquitetura aprovada pode conter:

1. Hero com proposta e ação de demonstração.
2. Problemas atendidos pelo produto.
3. Casos de uso por perfil de equipe.
4. Recursos ligados a resultados verificáveis.
5. Demonstração visual com legendas.
6. Integrações disponíveis.
7. Perguntas frequentes.
8. Chamada final para demonstração.

Cada área recebe texto, mídia, origem das afirmações e estado de aprovação. O
brief e o JSON ficam em `.astrofy/pages/atlas/`.

## Plano técnico

O planner técnico encontra o layout e os componentes do site, associa seções
reutilizáveis, define a rota `/atlas/` e cria tarefas para formulário, imagens,
metadados, JSON-LD, testes e documentação. O resultado fica em
`.astrofy/plans/atlas/`.

Após a aprovação, as skills executam as tarefas na ordem das dependências e o
checkup confere a página renderizada.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Exemplo |
| Escopo | Percurso completo de uma página de produto |
| Autoridade | Fluxo público das orquestradoras |
