---
name: astrofy-config
description:
  Agrupa configurações públicas por assunto em projetos Astro e atualiza
  consumidores sem duplicar valores ou expor credenciais.
---

# Separar configuração

## Entradas

Leia src/config, imports dos módulos públicos, astro.config.* e nomes das
variáveis de ambiente. Use os caminhos definidos em `.astrofy/config/paths.json`
quando diferirem dos exemplos. Confira a versão instalada no lockfile e em
node_modules antes de aplicar APIs da documentação online.

## Execução

Separe configuração de renderização e configuração interna do Astrofy. Liste
consumidores antes de unificar valores e mantenha segredos fora de módulos
enviados ao cliente.

Localize valores usados por navegação, cabeçalho e blog. Mova cada assunto para
seu módulo em src/config ou no caminho mapeado. Atualize os imports e remova a
definição anterior somente após conferir todos os consumidores.

Use o mapa de contexto e acesso de
[configuração Astro 7](references/implementation.md) para cada variável de
ambiente e para qualquer alteração em astro.config.*.

### Sequência específica

1. Classifique cada valor como conteúdo público, valor de build, segredo ou
   estado local.
2. Declare variável tipada no env.schema antes de consumi-la.
3. Mantenha site, base e URLs canônicas numa fonte configurável.
4. Teste build com valores ausentes, válidos e de ambiente alternativo.
5. Diferencie valores incorporados ao build dos lidos em runtime pelo adaptador.
   Confira imports transitivos antes de expor um módulo de configuração ao cliente.

### Alteração de implementação existente

Conserve tipos exportados e nomes consumidos. Migre um domínio, como navigation,
atualize imports e remova somente a definição já substituída.

## Verificação

Dois menus com URLs diferentes devem revelar qual fonte cada um usa. Após
centralizar, alterar uma URL precisa atualizar os dois consumidores.

O valor tem uma única fonte editável. Segredos continuam no ambiente. O build
preserva o comportamento anterior.

```bash
astrofy check --category config
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
