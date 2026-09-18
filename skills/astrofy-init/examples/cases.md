# Casos de inicializar adoção

## Uso comum

Em um site com src/pages/index.astro, inicialize e confira .astrofy/config/project.json.

## Projeto existente

Em um monorepo, selecione apps/site por --root e mantenha os caminhos já personalizados.

## Erro recorrente

Um JSON existente inválido interrompe init. Corrija o campo informado, sem apagar o arquivo.

## Conferência

A reexecução conserva configurações, notas e código do site. A checklist inicia sem aprovações presumidas. Use `astrofy init --dry-run` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** package.json, lockfile, astro.config.*, .astrofy/config/paths.json e .astrofy/config/features.json.
- **Alteração sob teste:** Conserve as oito configurações existentes; corrija somente campos inválidos. init cria arquivos ausentes e não converte o site para outra estrutura.
- **Falha e resultado esperado:** Um features.json com blog como string deve recusar init e conservar seus bytes. Um segundo init válido deve produzir created vazio.
- **Comando complementar:** `astrofy init --dry-run`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Comparação de duas adoções

Use um projeto de teste com dependência Astro e uma página existente:

```bash
astrofy inspect --root apps/site --json
astrofy init --root apps/site --dry-run --json
astrofy init --root apps/site --json
astrofy init --root apps/site --json
```

O dry-run não cria .astrofy. A primeira escrita retorna os caminhos criados.
A segunda precisa retornar created vazio e preservar os arquivos existentes.
Entre as duas escritas, acrescente uma nota em .astrofy/docs/architecture.md
para conferir que ela permanece intacta.

Na cópia de teste, troque o booleano blog por uma string em features.json.
init deve recusar o JSON e deixar seus bytes intactos. Corrija o tipo no
arquivo original, sem apagar as demais configurações.
