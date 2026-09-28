---
name: astrofy-homepage
description:
  Monta páginas iniciais Astro com conteúdo fornecido e seções reutilizáveis,
  alinhando navegação, hierarquia e ação principal.
---

# Montar página inicial

## Entradas

Leia rota inicial, público, ação principal, conteúdo autorizado e seções
disponíveis. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

Preserve o texto aprovado. Não reescreva copy fornecida pela pessoa apenas
para ajustá-la ao layout. Se faltar conteúdo, registre a lacuna em vez de criar
texto de preenchimento. Copy criada durante a tarefa pode ser corrigida dentro
da direção aprovada.

## Execução

Relacione a abertura à ação principal e confirme seus destinos. Use conteúdo
real antes de avaliar a composição visual e os metadados.

Identifique a ação principal da página e o conteúdo necessário para sustentá-la.
Componha a abertura e as seções com componentes existentes. Verifique os
destinos e compare a leitura em celular e desktop.

### Sequência específica

1. Confirme objetivo da rota, ação principal, conteúdo autorizado e seções
   existentes.
2. Ordene hero, prova, conteúdo e CTA pela função da página.
3. Reutilize seções e tokens já disponíveis, sem duplicar componentes.
4. Teste mobile, links de CTA, headings e primeira dobra.
5. Confira conteúdo inicial antes da hidratação, mídia principal e falha de
   fontes secundárias. Use a seleção publicável ao exibir conteúdo de coleções.
6. Se criar ou alterar texto, invoque `astrofy-editorial-review` em modo de
   auditoria antes de concluir. Corrija os achados na copy criada durante a
   tarefa e repita a auditoria. Não altere conteúdo fornecido e aprovado sem
   autorização.

### Alteração de implementação existente

Substitua seções gradualmente preservando URLs, marca e informações confirmadas.
Compare primeiro celular e depois desktop.

## Verificação

O botão principal deve chegar a uma rota existente. Remover o texto de abertura
deve ser detectado pela revisão de conteúdo e hierarquia.

A página permite compreender o assunto e encontrar a ação principal com conteúdo
factual e navegação funcional.

```bash
astrofy check --page /
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
