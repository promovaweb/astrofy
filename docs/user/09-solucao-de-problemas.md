# Solução de problemas

## O projeto não é reconhecido

Execute `astrofy inspect --root <diretório>` apontando para a pasta que contém
o `package.json` do site. Confira se `astro` aparece em `dependencies` ou
`devDependencies`.

## O setup encontrou JSON inválido

Abra o caminho informado, corrija a sintaxe e repita `astrofy init --dry-run`.
O comando preserva arquivos existentes e interrompe a gravação quando não pode
interpretá-los.

## O tipo de página ficou ambíguo

Informe a finalidade principal e a ação esperada. A orquestradora usa essas
duas respostas para escolher a especialista e mantém necessidades secundárias
na especificação.

## A implementação divergiu do conteúdo aprovado

Pare a tarefa, compare a página com `brief.md` e `page-spec.json` e corrija a
implementação. Mudanças editoriais precisam voltar à etapa de conteúdo.

## O plano ficou desatualizado

Execute `astrofy plan --slug <slug>` após reler o projeto. O comando recria as
tarefas a partir do contrato atual da página. Preserve no Git o plano anterior
quando precisar consultar o histórico das tarefas concluídas.

## O Chromium não está disponível

Consulte a instalação controlada pelo Astrofy:

```bash
astrofy browser status
astrofy browser install
```

Depois execute `astrofy check --browser`. No CI, mantenha o cache indicado no
workflow distribuído para evitar baixar o Chromium a cada execução.

## A migração pendente deve falhar no CI

Use o modo de conferência:

```bash
astrofy migrate --check
```

O comando retorna código 1 quando o contrato precisa de migração e código 0
quando a configuração já usa a versão atual.

## O ebook não confere

Na raiz do Astrofy, execute:

```bash
npm run ebook
npm run ebook:verify
```

O primeiro comando recompila PDF, EPUB e manifesto. O segundo compara a edição
com todos os capítulos e arquivos do pipeline.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Referência |
| Escopo | Falhas comuns no fluxo e no ebook |
| Autoridade | Comandos e contratos distribuídos pelo Astrofy |
