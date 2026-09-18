---
name: astrofy-init
description:
  Prepara a adoção do Astrofy em um projeto Astro existente, preservando
  arquivos personalizados e registrando o estado inicial.
---

# Inicializar adoção

## Entradas

Leia package.json, lockfile, astro.config.*, .astrofy/config/paths.json e
.astrofy/config/features.json. Use os caminhos definidos em
`.astrofy/config/paths.json` quando diferirem dos exemplos. Confira a versão
instalada no lockfile e em node_modules antes de aplicar APIs da documentação
online.

## Execução

Diferencie versão declarada, resolvida no lockfile e instalada. Use --root
apontando ao pacote Astro, inclusive em monorepo. Confira caminhos e recursos
detectados antes da primeira escrita.

Execute astrofy inspect com a raiz explícita. Compare caminhos detectados com as
convenções do site. Use astrofy init --dry-run, confira a lista e execute init
para criar apenas os arquivos ausentes.

Para projetos Astro 7, siga o procedimento de adoção em
[Astro 7](references/implementation.md). Ele separa atualização de Astro,
integrações e plugins Vite 8 da criação do contrato Astrofy. Migração de major
só ocorre quando incluída no pedido; init não substitui nem recria o site.

### Sequência específica

1. Compare versão declarada, lockfile e Astro instalado.
2. Execute inspect e init dry-run com --root do pacote Astro.
3. Leia os oito contratos criados e ajuste paths para a estrutura existente.
4. Execute init novamente e confirme created vazio.

### Alteração de implementação existente

Conserve as oito configurações existentes; corrija somente campos inválidos.
init cria arquivos ausentes e não converte o site para outra estrutura.

## Verificação

Um features.json com blog como string deve recusar init e conservar seus bytes.
Um segundo init válido deve produzir created vazio.

A reexecução conserva configurações, notas e código do site. A checklist inicia
sem aprovações presumidas.

```bash
astrofy init --dry-run
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
