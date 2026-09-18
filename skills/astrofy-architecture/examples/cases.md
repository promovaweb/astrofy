# Casos de organizar arquitetura

## Uso comum

Separe a estrutura global em BaseLayout e deixe a página compor suas seções.

## Projeto existente

Um site usa src/views para layouts. Registre o caminho no contrato e preserve os imports válidos.

## Erro recorrente

Não extraia cada tag HTML em um componente. A abstração precisa reduzir repetição ou isolar comportamento.

## Conferência

Cada área tem finalidade e consumidores identificados. As rotas anteriores continuam funcionando. Use `astrofy check --category architecture` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** src/pages, layouts usados, aliases do tsconfig.json e consumidores encontrados pelos imports.
- **Alteração sob teste:** Extraia um trecho repetido em duas rotas antes de ampliar a refatoração. Compare URLs, headings e imports antes e depois; preserve diretórios personalizados.
- **Falha e resultado esperado:** Mover um layout sem atualizar um consumidor deve falhar no build. O cenário corrigido precisa renderizar ambas as rotas com os mesmos títulos.
- **Comando complementar:** `astrofy check --category architecture`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Extração de layout com duas rotas

Crie o layout no caminho já adotado pelo site:

```astro
---
interface Props { title: string }
const { title } = Astro.props;
---
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body><main><slot /></main></body>
</html>
```

Migre duas páginas com títulos diferentes para esse layout. Conserve o CSS
importado e as demais tags head existentes no site real. No build, cada rota
precisa emitir seu título, inclusive acentos, e exatamente um main com o
conteúdo do slot. Introduza um import ausente apenas na cópia de teste para
confirmar que o build falha; restaure o import e compile novamente.
