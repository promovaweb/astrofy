---
name: astrofy-architecture
description:
  Organiza responsabilidades de rotas, layouts e componentes em sites Astro,
  documentando dependências e adaptações necessárias.
---

# Organizar arquitetura

## Entradas

Leia src/pages, layouts usados, aliases do tsconfig.json e consumidores
encontrados pelos imports. Use os caminhos definidos em
`.astrofy/config/paths.json` quando diferirem dos exemplos. Confira a versão
instalada no lockfile e em node_modules antes de aplicar APIs da documentação
online.

## Execução

Trace uma rota até seu layout, componentes, configuração e conteúdo. Distinga
execução no servidor, build e navegador. Registre a função de cada fronteira,
incluindo ilhas existentes.

Trace os imports das páginas para os layouts e componentes. Defina grupos por
responsabilidade. Extraia apenas repetições que já tenham consumidores. Registre
a arquitetura observada e as razões das mudanças em
.astrofy/docs/architecture.md.

### Sequência específica

1. Comece por cada arquivo de src/pages e trace layout, dados, componentes e
   ilhas.
2. Classifique cada módulo como rota, layout, componente, configuração, conteúdo
   ou cliente.
3. Extraia unidades por responsabilidade ou repetição demonstrada. Identifique
   os consumidores e o contrato preservado, sem exigir uma quantidade fixa.
4. Atualize aliases, imports e o mapa em .astrofy/docs/architecture.md no mesmo
   patch.
5. Registre quando dados são consultados e trace imports transitivos das ilhas.
   Confira isolamento de estado por requisição antes de compartilhar módulos SSR.

### Alteração de implementação existente

Extraia um trecho repetido em duas rotas antes de ampliar a refatoração. Compare
URLs, headings e imports antes e depois; preserve diretórios personalizados.

## Verificação

Mover um layout sem atualizar um consumidor deve falhar no build. O cenário
corrigido precisa renderizar ambas as rotas com os mesmos títulos.

Cada área tem finalidade e consumidores identificados. As rotas anteriores
continuam funcionando.

```bash
astrofy check --category architecture
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
