---
name: astrofy-footer
description:
  Organiza rodapés Astro configuráveis com links e informações fornecidas,
  conferindo responsividade e destinos publicados.
---

# Configurar rodapé

## Entradas

Leia Footer.astro, grupos de links, ativos e informações institucionais
fornecidas. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Organize destinos por uso e confirme cada rota. Identifique o rodapé no HTML e
confira leitura em uma coluna. Informações legais precisam de fonte fornecida.

Agrupe os links pelo uso real e leia a configuração do rodapé. Reutilize os
ativos de marca apropriados. Teste quebra de colunas e destinos internos.
Registre a composição e os campos opcionais.

### Sequência específica

1. Agrupe links por finalidade e origem de configuração.
2. Valide URL, texto, destino externo e estado da rota.
3. Mantenha informações institucionais numa fonte única.
4. Teste ordem de foco, quebra de colunas e contraste no mobile.
5. Confira contentinfo somente no rodapé global e diferencie caminhos internos,
   mailto, tel e URLs externas ao verificar os destinos.
6. Teste grupos vazios, rótulos longos e links sociais sem texto visível. Documente
   quando dados calculados durante build dependem de nova publicação.

### Alteração de implementação existente

Mova links para configuração preservando URLs, rótulos e atributos necessários.
Confira todos os grupos após a mudança.

## Verificação

Um link interno inexistente deve falhar na conferência. Um grupo vazio deve ser
omitido ou renderizado conforme o contrato do projeto.

Links existem e o rodapé conserva leitura em celular. Informações institucionais
possuem fonte fornecida.

```bash
astrofy check --category footer
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
