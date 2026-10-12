# Contrato técnico do plano de implementação

> Base técnica conferida para Astro 7.3.3 em 12/10/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Formato

Cada tarefa de página é uma sitespec comum (contrato completo em
`docs/sitespec.md`, schema em `packages/schemas/sitespec.schema.json`), só
que com dois campos extras no front matter:

```yaml
page: produto
task: product-route-config
```

`page` é o slug da página em `.astrofy/pages/<page>/`. `task` é o
identificador estável da tarefa dentro da página — use slug descritivo, como
`product-route-config` ou `contact-form-errors`, não posição numérica. As
três tarefas mecânicas que `astrofy plan` já grava usam `task: route`,
`task: content` e `task: check`; uma tarefa adicional criada por você usa
qualquer outro `task` que não colida com essas três.

`id` (o prefixo numérico de quatro dígitos do diretório) é só identidade de
arquivo, atribuído por ordem de criação; `task` é a identidade estável da
tarefa dentro do plano da página.

## Ordem de análise

1. **Fundação:** rota, layout, configuração, fontes de conteúdo e metadados.
2. **Composição:** seções, componentes, estados sem conteúdo e responsividade.
3. **Interação:** formulário, ilhas, navegação, consentimento e integrações.
4. **Descoberta:** SEO, Open Graph, JSON-LD e links internos.
5. **Conferência:** tipos, build, navegador, acessibilidade e checklist.
6. **Operação:** documentação e publicação apenas quando solicitadas.

Esses grupos ajudam a ordenar; omita os que não se aplicam. Uma página estática
sem formulário não recebe fase de interação apenas para preencher o plano.

## Dependências

Modele dependência pelo artefato consumido. Metadados podem depender da
configuração da rota, mas não precisam esperar o CSS. Teste visual depende da
composição e dos ativos. A conferência de formulário depende do endpoint ou da
Action e dos estados visíveis.

`dependsOn` lista os `id`s (não os `task`s) das tarefas predecessoras da
mesma página. `astrofy sitespec list`/`progress` calculam `blockedBy` a
partir disso; `astrofy apply` recusa iniciar (`in_progress`) uma tarefa com
`blockedBy` não vazio. `status: done` exige a checklist inteira marcada —
`astrofy apply --status completed` já marca todos os itens ao concluir uma
das três tarefas mecânicas; uma tarefa adicional criada por você precisa
ter cada item marcado de fato antes de chegar em `done`.

## Relação com a checklist

Itens `failed` podem originar correção. Itens `blocked` ou `pending` podem
originar preparação, revisão humana ou configuração do ambiente. Não descreva
uma revisão manual como automação. Itens `passed` entram apenas para apontar
comportamento que precisa ser preservado.

Depois da execução, rode o check mais estreito que cobre a alteração e então o
checkup do escopo completo da página. O código de saída precisa ser interpretado
junto do relatório.

## Estimativas

Use histórico do projeto quando existir. Sem histórico, estime em minutos e
adicione `estimateBasis: "expectativa técnica"`. Inclua leitura, implementação
e validação. Mídia ainda ausente ou integração sem ambiente configurado gera
intervalo ou pendência, não precisão inventada.

## Mapeamento recorrente

| Trabalho | Skill principal |
| --- | --- |
| Rota e parâmetros | `astrofy-routing` |
| Configuração pública | `astrofy-config` |
| Composição da página | `astrofy-page-design` |
| Seção reutilizável | `astrofy-sections` |
| Formulário | `astrofy-forms` |
| Imagem responsiva | `astrofy-images` |
| Metadados | `astrofy-seo` |
| Compartilhamento | `astrofy-open-graph` |
| Entidades JSON-LD | `astrofy-structured-data` |
| Teclado e semântica | `astrofy-accessibility` |
| Teste do percurso | `astrofy-testing` |
| Conferência final | `astrofy-checkup` |
