# Instalação e setup

## Requisitos

- Node.js 22.12.0 ou posterior.
- Um projeto Astro existente com `package.json`.
- Permissão de escrita no diretório do projeto.

## Instale o pacote e as skills

```bash
npm install --global @promovaweb/astrofy
cd /caminho/do/site
astrofy skills install --agent codex
```

Troque `codex` por `claude` se esse for o agente usado no projeto. O comando
coloca as skills em `.agents/skills/` ou `.claude/skills/`. Para conferir os
arquivos antes de gravar, acrescente `--dry-run`.

## Diga o que quer fazer

Na conversa aberta para o projeto, diga o que quer fazer. Por exemplo:

> Quero criar uma página de produto. Use o Astrofy para entender o projeto,
> conversar comigo sobre o conteúdo e mostrar o plano antes de implementar.

Para uma adoção ampla do framework, peça ao agente que use `astrofy-setup`.
Essa skill reconhece as convenções e integrações do site, inicializa os
contratos ausentes e registra o estado para retomadas. Para uma página
específica, explique o que quer fazer. O agente confere o que precisa preparar antes
de chamar `astrofy-page-planner`.

O agente executa as operações do Astrofy necessárias ao trabalho. Você não
precisa rodar `inspect`, `init`, `page create`, `page answer` ou `plan` por
separado. Use esses comandos diretamente apenas quando quiser conduzir a
mesma etapa pelo terminal. O [manual do CLI](../cli.md) descreve esses comandos.

## Resultado da instalação

Depois da instalação, as skills ficam disponíveis no projeto. A adoção cria
`.astrofy/` e `astrofy.checklist.json` quando o trabalho solicitado precisar
desses contratos. Confira os arquivos alterados antes de aprovar a
implementação.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Instalação e início do trabalho em conversa |
| Autoridade | CLI de instalação e skills Astrofy |
