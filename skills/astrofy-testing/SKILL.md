---
name: astrofy-testing
description:
  Organiza testes de contratos e fluxos de sites Astro conforme o impacto da
  mudança, registrando ambiente e limites da cobertura.
---

# Validar fluxos

## Entradas

Leia mudança, scripts existentes, fixtures e fluxos observáveis. Use os caminhos
definidos em `.astrofy/config/paths.json` quando diferirem dos exemplos. Confira
a versão instalada no lockfile e em node_modules antes de aplicar APIs da
documentação online.

## Execução

Escolha testes pela consequência da falha: tipos para contratos, build para
integração e navegador para interação. Use seletores por função e nome; registre
viewport, tema e ambiente.

Escolha testes que reproduzam uma falha possível. Use checagem de tipos e build
para integração, navegador para comportamento e capturas para comparação visual.
Registre tema e viewport. Evite testes que apenas repetem o código implementado.

Monte a suite segundo os níveis de
[validação Astro 7](references/implementation.md) e execute o caso no artefato
gerado quando ele depender de SSR ou hidratação.

### Sequência específica

1. Escolha tipo para contrato, build para rota e navegador para comportamento.
2. Reproduza falha anterior com entrada ou interação observável.
3. Rode preview ou runtime do adaptador para endpoint e SSR.
4. Registre Node, Astro, browser, viewport, tema e timezone.

### Alteração de implementação existente

Preserve o runner existente. Adicione regressão que falhe no comportamento
anterior e passe após corrigir; não atualize snapshots sem revisar a diferença.

## Verificação

Retire a hidratação de uma ilha de teste: o teste de interação deve falhar mesmo
que o build passe. Restaure e confira a execução verde.

Os testes protegem comportamento observável e falham quando o contrato
correspondente é violado.

```bash
astrofy check --category quality
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
