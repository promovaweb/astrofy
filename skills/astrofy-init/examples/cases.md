# Casos de inicializar adoção

## Uso comum

Em um site com src/pages/index.astro, inicialize e confira .astrofy/config/project.json.

## Projeto existente

Em um monorepo, selecione apps/site por --root e mantenha os caminhos já personalizados.

## Erro recorrente

Um JSON existente inválido interrompe init. Corrija o campo informado, sem apagar o arquivo.

## Conferência

A reexecução conserva configurações, notas e código do site. A checklist inicia sem aprovações presumidas. Use `astrofy init --dry-run` e registre o resultado da operação no escopo realmente verificado.
