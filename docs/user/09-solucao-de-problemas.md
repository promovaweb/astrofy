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

Execute novamente `astrofy-implementation-planner` após reler o projeto. Peça
uma atualização das tarefas afetadas e preserve o histórico das concluídas.

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
