---
name: astrofy-geo
description:
  Revisa clareza, autoria e acesso ao conteúdo de sites Astro para descoberta
  por IA e gerencia public/llms.txt e public/llms-full.txt em sincronia com
  as páginas canônicas.
---

# Revisar descoberta por IA

## Entradas

Leia HTML sem interação, autoria, fontes do conteúdo e plataforma solicitada.
Para os arquivos de agentes, leia `public/llms.txt`, `public/llms-full.txt`
quando existir, o domínio de produção, as coleções de conteúdo
(`src/content` ou o caminho mapeado) e o script gerador adotado pelo projeto.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Diferencie recomendação oficial da plataforma de hipótese de melhoria. Relacione
cada sugestão ao trecho observado e à fonte consultada.

Confira se a informação principal está acessível no HTML. Relacione afirmações
às fontes fornecidas e identifique autoria quando pertinente. Consulte a
orientação da plataforma específica. Registre recomendações com justificativa e
limites de observação.

### Sequência específica

1. Leia HTML sem JavaScript e identifique autoria, data, fontes e escopo.
2. Relacione afirmações verificáveis à fonte mostrada na página.
3. Revise rotas canônicas, acesso público e conteúdo principal.
4. Registre o que foi verificado e o que depende de plataforma externa.
5. Diferencie busca, consulta e treinamento na documentação do produto avaliado.
   Não generalize uma regra de acesso entre finalidades diferentes.
6. Compare resposta pública inicial com conteúdo após interação. Confira versões
   Markdown ou índices existentes contra a mesma fonte da página canônica.
7. Gerencie `public/llms.txt` e `public/llms-full.txt`:
   - `llms.txt` resume o site com URLs absolutas do domínio de produção e
     aponta para `llms-full.txt` quando o conteúdo integral é publicado.
   - `llms-full.txt` deriva da mesma fonte das páginas canônicas, com URL
     absoluta por seção. Inclua só conteúdo publicado; exclua rascunhos,
     datas futuras, conteúdo privado e segredos.
   - Gere os dois arquivos por script determinístico com modo `--check`
     (veja `templates/llms/generate-llms.mjs`). Rode o gerador após alterar
     rotas ou coleções e antes de publicar.
   - Confira no build que os arquivos de `public/` saem na raiz publicada.

### Alteração de implementação existente

Preserve `llms.txt` e `llms-full.txt` quando existentes e sincronize-os com
as páginas canônicas em vez de reescrevê-los à mão. Não imponha os arquivos
a todos os sites; quando o projeto opta por não publicar o conteúdo integral,
remova o apontamento do resumo e anote a escolha no relatório.

## Verificação

Uma informação acessível apenas após clique deve ser identificada na comparação
do HTML. Nenhuma mudança permite garantir citação por um sistema externo.

A revisão mostra o trecho e a fonte que sustentam cada recomendação, sem
prometer citações ou posições. Os arquivos de agentes passam em:

```bash
astrofy check --category geo
```

`geo.llms` reprova resumo ausente, sem URL absoluta, com link relativo ou
com `llms-full.txt` publicado mas não apontado. `geo.llms-full` mantém
revisão humana pendente mesmo sem problema automático: compare o integral
com as páginas canônicas e confirme ausência de rascunhos e dados privados.

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
