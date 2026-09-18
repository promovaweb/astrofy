# Casos de entrada no projeto

## Site estático existente

Leia duas rotas, layout compartilhado e CSS. Adote contratos, registre o mapa e
documente componentes. React, blog e formulários ausentes ficam não aplicáveis;
não instale integrações para completar a tabela de coordenação.

## Monorepo com blog

Escolha o pacote Astro por manifesto e configuração. Use o lockfile compartilhado
para versões. Coordene MDX, blog e arquivos; confira a seleção publicável antes
de revisar sitemap e links. Preserve os demais aplicativos do workspace.

## Retomada com falha

Se o build falhar, conserve o diagnóstico. Documentação e formatação podem
continuar quando independentes. Checks de HTML precisam aguardar um build
atual; não use dist antigo para marcar o projeto como validado.

## Retomada após mudança de rota

Execute `astrofy setup` novamente depois de alterar `src/pages`. Confira o
arquivo em `changedFiles`, reabra routing e seus consumidores no workflow e
preserve marcos sem relação com URLs. Atualize o status somente após repetir as
conferências afetadas.
