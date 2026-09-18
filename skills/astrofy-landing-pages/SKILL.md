---
name: astrofy-landing-pages
description:
  Monta landing pages Astro com oferta e ação fornecidas, compondo seções
  reutilizáveis e verificando destinos e estados do fluxo.
---

# Montar landing page

## Entradas

Leia oferta fornecida, rota, ação, endpoint quando houver e componentes. Use os
caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Registre qual ação encerra o fluxo: navegar, enviar ou comprar. Confira termos e
valores na fonte recebida e trate estados de erro de qualquer formulário.

Defina a sequência de leitura conforme a ação esperada. Reutilize seções do
projeto. Confira o destino do botão e, quando houver formulário, trate erros e
sucesso. Teste a página em larguras representativas.

### Sequência específica

1. Relacione promessa, prova, CTA e destino de conversão fornecidos.
2. Monte seções com componentes existentes e conteúdo autorizado.
3. Verifique cada CTA por texto, URL, método e estado do destino.
4. Teste leitura mobile, formulário e retorno de erro.
5. Confira parâmetros de campanha, personalização e cache quando presentes.
   Diferencie clique, envio aceito e conclusão da operação na medição existente.

### Alteração de implementação existente

Preserve destino e parâmetros de uma campanha existente. Mudanças na oferta
dependem de conteúdo autorizado, mesmo durante ajuste visual.

## Verificação

Simule rejeição do endpoint em teste: a página deve informar erro e permitir
correção, sem exibir sucesso antecipado.

A ação tem destino funcional e os estados presentes foram exercitados. O texto
não inventa características da oferta.

```bash
astrofy check --page /apresentacao/
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
