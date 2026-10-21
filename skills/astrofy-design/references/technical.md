# Integração técnica do Astrofy Design

O catálogo existente registra Astro 7.3.3 em 17/09/2026 como base técnica.
Essa anotação descreve a biblioteca do projeto, não uma nova conferência de
compatibilidade. Antes de implementar, consulte o lockfile e a documentação
oficial correspondente à versão instalada.

## Arquivos e precedência

Leia `.astrofy/config/paths.json` para localizar o JSON de design e o CSS gerado.
Use o contrato existente antes de propor tokens novos. A skill de design
trabalha junto de `astrofy-design-system`, `astrofy-page-design`,
`astrofy-components`, `astrofy-themes` e `astrofy-accessibility`, quando essas
especialistas estiverem instaladas. A ausência delas não autoriza declarar
suas verificações como executadas.

O [fluxo de composição](design-flow.md) contém a seleção de gêneros, temas,
arquétipos, composição personalizada e detalhes por componente. As paletas
ficam em [themes.css](../assets/themes.css), como material de consulta.
Não importe esse arquivo inteiro para substituir o CSS do site.

As referências de exportação usam formatos genéricos. O Astrofy recebe um
envelope com `schemaVersion`, `tokenFormat`, `defaultMode`, `assets`, `tokens`
e `modes`. Uma árvore DTCG isolada não corresponde a esse envelope. Preserve o
schema e os tipos do projeto, converta os valores necessários e valide antes
de gerar CSS. Nunca edite diretamente o CSS produzido pelo gerador.

```bash
astrofy tokens validate
astrofy tokens build --dry-run
astrofy tokens build
astrofy tokens check
astrofy check --rule design.schema
```

Esses comandos dependem de um projeto inicializado e dos contratos esperados.
Use `--root` quando a aplicação estiver em outro diretório. A conferência de
tokens não substitui a revisão visual e funcional no navegador.

## Estado da composição

Guarde o histórico de implementações em `.astrofy/design/log.json`. Cada
registro informa `date`, `macrostructure`, `theme`, `enrichment` e `brief`.
Preserve os vinte registros mais recentes, com o atual no início. Um tema
personalizado também registra `theme_axes` e pode informar `vibe`. Um redesign
de várias páginas usa um registro conjunto com `scope: app`.

Leia e valide o JSON antes de alterá-lo. Se o arquivo estiver inválido, informe
o problema e preserve seus bytes. Não crie histórico durante estudo ou
auditoria. O histórico orienta variedade entre composições independentes.
Dentro do mesmo produto, mantenha a identidade compartilhada.

## Precedência sobre exemplos incorporados

Os exemplos de fontes, serviços, preços e bibliotecas são referências de
consulta. Confirme disponibilidade, licença e API antes de utilizá-los. Não
instale dependências ou use serviços pagos apenas porque aparecem num exemplo.
Os exemplos de pontuação da revisão não aprovam a entrega: registre a página,
o problema observado, a correção e o resultado da nova conferência.

As imagens citadas no guia de imagens não acompanham este pacote. Use ativos
fornecidos pelo projeto ou produza imagens autorizadas antes de referenciá-las
no HTML. Os caminhos ilustrativos não são URLs prontas para publicação.

## Cobertura e conferência

A área incorpora 106 referências técnicas e o fluxo da skill de origem,
mais as paletas CSS. Os procedimentos locais adaptam invocação, histórico,
tokens e entrega ao Astrofy. A licença de terceiros acompanha a instalação.

Confira instalação isolada, resolução de links locais, repetição sem mudanças
e preservação de arquivos personalizados. Os exemplos desta skill estão em
[casos de uso](../examples/cases.md).
