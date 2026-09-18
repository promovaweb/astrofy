---
name: astrofy-sections
description:
  Cria seções reutilizáveis para páginas Astro com conteúdo explícito,
  composição por slots e comportamento responsivo documentado.
---

# Criar seções

## Entradas

Leia seções consumidoras, componentes primitivos, conteúdo tipado e slots. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Modele uma responsabilidade por seção e separe conteúdo repetido de ações
compostas. Preserve hierarquia de headings definida pela página.

Defina o objetivo da seção e suas entradas. Reutilize botões e cards do projeto.
Prefira slots para ações compostas e dados tipados para itens paralelos.
Documente as larguras e os estados realmente usados.

### Sequência específica

1. Delimite responsabilidade visual e conteúdo da seção.
2. Declare props e slots por região estrutural.
3. Use tokens e componentes primitivos já existentes.
4. Teste ausência de slot, texto longo, imagem ausente e viewport estreito.
5. Confira a semântica no documento completo e o responsável pelo nível do
   heading. Teste duas instâncias para encontrar IDs e listeners compartilhados.
6. Diferencie lista vazia prevista de falha de dados obrigatórios e confira
   composição dentro de contêiner estreito, mesmo em viewport desktop.

### Alteração de implementação existente

Extraia a seção de um consumidor real e valide um segundo uso com conteúdo
diferente antes de acrescentar variações.

## Verificação

Duas FAQs na mesma página não podem repetir IDs. Links de âncora precisam chegar
à pergunta correta e manter o foco visível.

A seção funciona em mais de um consumidor sem flags conflitantes nem conteúdo
institucional inventado.

```bash
astrofy check --category components
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
