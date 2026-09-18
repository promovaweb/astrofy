---
name: astrofy-code-quality
description:
  Revisa tipos, imports e duplicações no código de projetos Astro, aplicando
  correções delimitadas e verificadas pelos testes do site.
---

# Revisar código

## Entradas

Leia tsconfig.json, scripts de check e teste, arquivos alterados e consumidores
dinâmicos. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Use o comando de tipos existente e delimite cada correção por comportamento.
Confira imports dinâmicos, coleções e rotas antes de remover código supostamente
sem uso.

Leia os contratos usados pela mudança. Execute a checagem de tipos disponível e
examine imports sem consumidores. Corrija cada ocorrência no escopo solicitado.
Marque achados de complexidade como análise humana quando não houver medição
determinística.

### Sequência específica

1. Leia os scripts e obtenha o estado inicial com as verificações pertinentes.
   Diferencie astro check, tsc, lint e build pela cobertura real.
2. Localize imports não usados, tipos fracos, duplicação e caminhos inválidos.
3. Corrija a causa na definição compartilhada. Uma supressão local exige
   justificativa específica conforme a referência técnica.
4. Rode o teste atingido e o build após cada lote coerente.
5. Confira tipos gerados, arquivos excluídos e parser de .astro quando um
   diagnóstico indicar cobertura incompleta. Não edite saída gerada.

### Alteração de implementação existente

Preserve aliases e APIs públicas ao reduzir duplicação. Uma atualização de
dependência exige escopo próprio e consulta do guia da versão correspondente.

## Verificação

Um import com caixa incorreta pode passar localmente e falhar em Linux. Confira
o nome exato no Git e teste em ambiente sensível a maiúsculas.

O código alterado passa nas verificações pertinentes e a revisão informa
limitações concretas.

```bash
astrofy check --rule quality.types
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
