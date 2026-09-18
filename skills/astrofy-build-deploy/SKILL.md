---
name: astrofy-build-deploy
description:
  Prepara build e operação de publicação em projetos Astro, respeitando o
  adaptador e o provedor existentes e validando o ambiente.
---

# Preparar build e publicação

## Entradas

Leia scripts, lockfile, adaptador, output, variáveis e provedor existente. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

1. Leia engines e peerDependencies de Astro, integração e adaptador instalados.
   Compare com o Node do CI e do host; registre versões exatas no relatório.
2. Classifique as rotas por prerender. output static pode conter rotas sob
   demanda com adaptador e prerender false; output server apenas muda o padrão.
3. Leia scripts antes de executá-los. Instale com o lockfile pelo gerenciador
   adotado e gere uma saída nova, sem remover artefatos personalizados.
4. Identifique o diretório publicável e o entrypoint produzidos pelo adaptador.
   Para Node, dist/server/entry.mjs em standalone inicia o servidor; middleware
   precisa do servidor hospedeiro. Não publique apenas dist/client num site SSR.
5. Teste uma rota prerenderizada, uma sob demanda, ativo e URL inexistente no
   runtime correspondente. Capture status e cabeçalhos além do corpo.
6. Para publicação autorizada, associe artefato ao commit, registre variáveis
   pelo nome e mantenha o identificador da implantação anterior para restauração.
   Confira a URL pública depois da troca de versão.

Siga a matriz de artefatos de
[build e runtime no Astro 7](references/implementation.md) antes de alterar
output, adaptador ou configuração do provedor.

### Alteração de implementação existente

Preserve o provedor e o modo adotado. Uma migração de major ou adaptador exige
escopo próprio e teste das rotas representativas.

## Verificação

Build com erro não pode reutilizar dist antigo para afirmar sucesso. Em
servidor, teste uma rota dinâmica com o runtime correto.

O build é reproduzível e o procedimento descreve entradas, saída e teste após
publicação.

```bash
astrofy check --rule quality.build
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
