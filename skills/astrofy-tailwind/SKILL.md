---
name: astrofy-tailwind
description:
  Integra utilitários Tailwind ao design system de um projeto Astro, verificando
  versão, entrada CSS e classes emitidas pelo build.
---

# Integrar Tailwind

## Entradas

Leia versão resolvida do Tailwind, integração Vite, CSS de entrada e classes
usadas. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Confirme Tailwind 4 antes de usar o adaptador CSS-first. Relacione classe
semântica à variável emitida por @theme inline. Examine o CSS do build, não
apenas o fonte.

Selecione o adaptador compatível com a versão instalada. Mantenha uma única
importação de Tailwind. Use os utilitários semânticos gerados e examine o CSS
compilado. Registre exceções técnicas de valores literais por arquivo.

### Sequência específica

1. Identifique a major do Tailwind. Para Tailwind 4, confira plugin Vite e
   folha global efetivamente importada pelo layout.
2. Ligue tokens por variáveis CSS ou @theme sem duplicar paleta.
3. Mantenha classes detectáveis estaticamente pelo compilador.
4. Inspecione CSS final e confira dark no seletor usado pelo tema.
5. Em workspace, teste uma classe exclusiva do pacote compartilhado e confira
   descoberta de arquivos. Restrinja @source ao diretório necessário.
6. Quando uma classe emitida não surtir efeito, identifique a regra vencedora
   e a resolução de variáveis no navegador antes de alterar especificidade.

### Alteração de implementação existente

Preserve Tailwind 3 quando a migração não estiver no pedido. Em Tailwind 4,
remova importação duplicada somente depois de identificar o ponto de entrada
efetivo.

## Verificação

Uma classe bg-surface deve produzir a cor do token no navegador. Uma string
construída dinamicamente pode não gerar utilitário; use variantes explicitamente
detectáveis.

As classes usadas aparecem no CSS final. O CSS global não repete valores de
marca.

```bash
astrofy check --rule design.token-usage
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
