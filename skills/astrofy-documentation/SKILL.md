---
name: astrofy-documentation
description:
  Mantém arquitetura, mapa de arquivos e operação de projetos Astro em Markdown,
  conferindo comandos e componentes na implementação.
---

# Manter documentação

## Entradas

Leia índice local, scripts reais, caminhos atuais e consumidores dos
componentes. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Separe guia de uso, arquitetura e operação. Exemplos devem usar comandos
existentes e indicar diretório de execução e saída esperada.

Leia a implementação e compare o índice com os arquivos existentes. Documente
configuração e responsabilidades com exemplos executáveis. Agrupe acervos
grandes por coleção. Atualize páginas de componentes afetados e verifique links
da documentação.

### Sequência específica

1. Extraia comandos do package.json e confirme diretório, entradas e saída.
2. Gere mapa de arquivos a partir do repositório, sem caches e dist.
3. Atualize links relativos quando mover código ou documento.
4. Rode astrofy docs check depois de alterar índices ou exemplos.
5. Separe formatação, links e execução de exemplos na validação. Registre
   comandos não executados e suas condições pendentes.
6. Confira referências de entrada ao mover documento e preserve guias canônicos
   existentes, evitando cópias concorrentes de instruções operacionais.

### Alteração de implementação existente

Ao mover arquivo, atualize índice, referências e documento do componente.
Preserve anotações humanas e identifique afirmações ainda não verificadas.

## Verificação

Um link relativo para arquivo removido deve falhar na conferência; após
corrigir, o documento precisa ser alcançável pelo índice.

Comandos, caminhos e exemplos correspondem ao projeto. Caches e builds não
inundam o mapa de arquivos.

```bash
astrofy docs check
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
