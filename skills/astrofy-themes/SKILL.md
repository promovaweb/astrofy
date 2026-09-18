---
name: astrofy-themes
description:
  Implementa light, dark e system com preferência persistente em sites Astro,
  conferindo a primeira pintura e estados dos componentes.
---

# Implementar temas

## Entradas

Leia script inicial do tema, seletor, localStorage, CSS dark e ativos por modo.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

1. Leia a preferência persistida em try/catch. Aceite somente `light`, `dark` e
   `system`; normalize valor desconhecido para o padrão documentado.
2. Resolva `system` com `matchMedia('(prefers-color-scheme: dark)')`. Uma
   preferência explícita prevalece sobre o resultado dessa consulta.
3. Aplique a classe ou o atributo de tema no elemento html antes da primeira
   pintura, respeitando a política CSP existente.
4. No seletor, atualize o estado visual, a preferência e o atributo usado pelo
   CSS. Falha de localStorage não pode interromper a troca naquela página.
5. No evento change de matchMedia, atualize o tema somente quando a preferência
   for system. Remova listeners antigos se o ciclo de navegação os recriar.
6. Confira o logo e estilos computados em cada modo; recarregue após escolher
   dark e repita com armazenamento indisponível.

### Sequência específica

1. Normalize preferência para light, dark ou system em leitura protegida.
2. Resolva system por matchMedia e aplique atributo no html antes da pintura.
3. Persistir escolha não pode impedir a página quando storage falhar.
4. Teste recarga, troca do sistema, logo e estilo calculado nos dois modos.

### Alteração de implementação existente

Conserve preferência system separada do modo resolvido. Confira o atributo de
tema após a troca de documento do ClientRouter e o estilo computado antes de
afirmar persistência; a seleção visual do botão não basta.

Adapte a convenção existente de classe ou data-theme. Não adicione um segundo
controlador. Confira reinicialização após navegação quando o site usa
transições.

## Verificação

Armazenamento indisponível não pode lançar erro que impeça o restante da página.
Recarregar após selecionar dark deve manter o tema e o logo correto.

A preferência explícita prevalece. System acompanha o sistema e o site continua
utilizável com armazenamento indisponível.

```bash
astrofy check --category theme
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
