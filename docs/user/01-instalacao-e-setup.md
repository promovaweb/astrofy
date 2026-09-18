# Instalação e setup

## Requisitos

- Node.js 22.12.0 ou posterior.
- Um projeto Astro existente com `package.json`.
- Permissão de escrita no diretório do projeto.

## Instalação global

```bash
npm install --global @promovaweb/astrofy
astrofy --version
```

Para manter a versão junto ao projeto:

```bash
npm install --save-dev @promovaweb/astrofy
npx astrofy --version
```

O Chromium é opcional e fica no cache do Playwright, fora do pacote npm:

```bash
astrofy browser status
astrofy browser install
```

Instale-o quando o projeto usar as verificações reais de renderização.

## Primeira execução

Comece pela skill `astrofy-setup`. Ela lê `package.json`, a configuração do
Astro, as rotas, os componentes, as coleções de conteúdo e as integrações já
instaladas. Antes de gravar arquivos, confira a leitura do CLI:

```bash
astrofy inspect --root .
astrofy init --root . --dry-run
astrofy init --root .
```

O setup preserva convenções válidas do projeto. Diretórios personalizados,
adaptadores e integrações detectadas entram no contexto usado pelas próximas
skills.

## Resultado esperado

Ao terminar, o projeto possui `.astrofy/`, configuração válida e um registro
inicial da checklist. Execute `git diff` para revisar os arquivos criados.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Instalação e primeira leitura do projeto |
| Autoridade | CLI e skill `astrofy-setup` |
