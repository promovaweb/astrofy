# Retomada e manutenção

Os arquivos em `.astrofy/` permitem continuar o trabalho em outra sessão. Abra
uma conversa no projeto e peça ao agente para retomar a página pelo slug. Ele
confere a especificação, o plano, o Git e continua pela próxima tarefa cujas
dependências estejam concluídas. Use `astrofy page status` e `astrofy apply`
quando quiser retomar pelo terminal.

Se o conteúdo mudar antes da implementação, volte à especialista da página,
atualize a especificação e gere novamente as partes afetadas do plano. Se a
mudança surgir durante a execução, registre seu impacto antes de editar código.

## Atualização do Astrofy

```bash
npm update --save-dev @promovaweb/astrofy
npx astrofy --version
npx astrofy inspect --root .
```

Leia o `CHANGELOG.md` entre a versão instalada e a nova edição. Execute as
validações do projeto depois da atualização.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Continuidade, alteração e atualização |
| Autoridade | Estado persistido e changelog do Astrofy |
