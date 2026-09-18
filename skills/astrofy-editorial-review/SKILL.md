---
name: astrofy-editorial-review
description:
  Revisa ortografia e nomenclatura em textos visíveis de sites Astro,
  preservando fatos, código e a direção editorial fornecida.
---

# Revisar texto visível

## Entradas

Leia texto completo, glossário, idioma, fontes factuais e componentes que o
exibem. Use os caminhos definidos em `.astrofy/config/paths.json` quando
diferirem dos exemplos. Confira a versão instalada no lockfile e em node_modules
antes de aplicar APIs da documentação online.

## Execução

Separe correção linguística de alteração de fatos. Preserve código inline, nomes
de propriedades, URLs e citações que exigem reprodução literal.

Leia a página completa e seu objetivo. Corrija ortografia no texto visível e
preserve identificadores de código. Confira nomes próprios na fonte fornecida.
Registre lacunas factuais separadas das correções de linguagem e confira a
renderização final.

### Sequência específica

1. Extraia texto visível sem alterar código, URLs, datas ou identificadores.
2. Compare nomes próprios, termos do produto e fatos com as fontes fornecidas.
3. Corrija somente ocorrência confirmada e preserve a direção editorial.
4. Renderize a rota e revise texto no contexto da interface.
5. Confira mensagens, alt e nomes acessíveis além da prosa inicial. Ao alterar
   heading, verifique seus fragmentos e consumidores.
6. Separe validação de schema, compilação MDX e conferência factual conforme
   o trecho alterado. Não considere lint como comprovação do conteúdo.

### Alteração de implementação existente

Revise texto antigo respeitando a voz registrada e o glossário do projeto.
Alterações de oferta e números exigem confirmação na fonte correspondente.

## Verificação

Corrigir um rótulo não deve mudar href ou nome de evento. Compare texto e
atributos antes e depois da edição.

O texto está legível e mantém o significado confirmado. Nenhuma incerteza
factual foi convertida em afirmação inventada.

```bash
astrofy check --category editorial
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
