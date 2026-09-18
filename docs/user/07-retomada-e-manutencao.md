# Retomada e manutenção

Os arquivos em `.astrofy/` permitem continuar o trabalho em outra sessão. Ao
retomar, execute o setup, leia a especificação e o plano, confira o Git e
continue pela primeira tarefa pendente cujas dependências estejam concluídas.

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
