---
name: astrofy-geo
description:
  Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta
  por IA, distinguindo orientações oficiais de hipóteses.
---

# Revisar descoberta por IA

## Entradas

Leia HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Diferencie recomendação oficial da plataforma de hipótese de melhoria. Relacione
cada sugestão ao trecho observado e à fonte consultada.

Confira se a informação principal está acessível no HTML. Relacione afirmações
às fontes fornecidas e identifique autoria quando pertinente. Consulte a
orientação da plataforma específica. Registre recomendações com justificativa e
limites de observação.

### Sequência específica

1. Leia HTML sem JavaScript e identifique autoria, data, fontes e escopo.
2. Relacione afirmações verificáveis à fonte mostrada na página.
3. Revise rotas canônicas, acesso público e conteúdo principal.
4. Registre o que foi verificado e o que depende de plataforma externa.
5. Diferencie busca, consulta e treinamento na documentação do produto avaliado.
   Não generalize uma regra de acesso entre finalidades diferentes.
6. Compare resposta pública inicial com conteúdo após interação. Confira versões
   Markdown ou índices existentes contra a mesma fonte da página canônica.

### Alteração de implementação existente

Preserve llms.txt quando existente, mas documente seu uso local sem impor o
arquivo a todos os sites.

## Verificação

Uma informação acessível apenas após clique deve ser identificada na comparação
do HTML. Nenhuma mudança permite garantir citação por um sistema externo.

A revisão mostra o trecho e a fonte que sustentam cada recomendação, sem
prometer citações ou posições.

```bash
astrofy check --category geo
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
