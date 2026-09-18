# Contrato técnico do plano de implementação

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Formato

```json
{
  "schemaVersion": "1.0.0",
  "pageSpec": ".astrofy/pages/produto/page-spec.json",
  "pageSpecFingerprint": "sha256",
  "status": "planned",
  "generatedAt": "2026-09-18T12:00:00.000Z",
  "phases": [],
  "openItems": []
}
```

Cada fase possui `id`, `title`, `status`, `dependsOn` e `tasks`. Cada tarefa
possui `id`, `title`, `status`, `primarySkill`, `reviewSkills`, `sourceItems`,
`checklistItems`, `files`, `dependsOn`, `estimateMinutes`, `steps`,
`validations`, `manualChecks` e `completion`.

IDs são estáveis dentro da página. Use slug descritivo, como
`product-route-config` ou `contact-form-errors`; não use posição numérica como
identidade persistente.

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

Antes de marcar uma tarefa como `ready`, confirme que todas as tarefas listadas
em `dependsOn` estão `completed`. `in_progress` exige arquivos ou atividade
identificada. `completed` exige a condição de conclusão e as validações
registradas, com resultado atual.

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
