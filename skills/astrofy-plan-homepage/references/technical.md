# Referência técnica para Home

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `siteRole`, `primaryAudience` e `secondaryAudiences`;
- `destinations[]` com público, motivo, rótulo e rota;
- `priorities[]` para produto, serviço, conteúdo ou comunidade;
- `dynamicSections[]` com coleção, seleção, limite e estado vazio;
- `globalNavigation` com itens preservados e alterações propostas.

## Arquiteturas úteis

**Uma prioridade:** hero, explicação, oferta principal, prova, conteúdo de apoio
e ação. Use quando um percurso domina o site.

**Distribuição por público:** hero, entradas por público, ofertas, conteúdo e
contato. Use quando visitantes possuem necessidades distintas.

**Ecossistema:** hero, áreas de atuação, produtos, serviços, conteúdo,
comunidade e contato. Use quando o site reúne destinos independentes.

## Prontidão

O hero aponta uma prioridade real. Cards levam a rotas existentes ou tarefas
planejadas. Conteúdo recente usa a política da coleção; rascunho, data futura e
estado vazio seguem a mesma regra do restante do site.

## Encaminhamento técnico

`astrofy-homepage` implementa a rota; header, navigation e footer tratam regiões
globais; blog fornece seleção publicável; images e page-design tratam mídia e
composição. A especificação registra o conteúdo sem escolher componente antes
da inspeção.
