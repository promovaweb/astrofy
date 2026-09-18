# Casos de revisar acessibilidade

## Foco sob sobreposição

Ative header sticky e um aviso fixo no rodapé. Percorra a página com Tab e
Shift+Tab em viewport curto. Registre elemento focado e parte visível, além do
indicador de foco. Separe falha do requisito mínimo AA de uma exigência adicional
do projeto para exibir integralmente o controle.

## Reflow e ordem de leitura

Teste 320 CSS px e zoom de 400% com parágrafos longos, uma tabela e navegação.
Confira que conteúdo comum não exige rolagem horizontal da página inteira.
Compare ordem visual, DOM e teclado após a mudança de colunas; a tabela pode
usar região própria de rolagem sem arrastar todo o layout.

## Fechamento de navegação expansível

Feche por Escape a partir de um link do submenu e confira retorno ao gatilho.
Depois abra novamente e clique num controle externo. O foco deve acompanhar
esse controle, sem retorno forçado ao gatilho. Esses caminhos não compartilham
uma regra incondicional de restauração de foco.

## Uso comum

Abra e feche um submenu usando Enter e Escape e confira o retorno de foco.

## Projeto existente

Um botão só tem ícone. Forneça nome acessível sem depender da aparência do ícone.

## Erro recorrente

Uma imagem decorativa pode ter alt vazio. Não force texto redundante para satisfazer uma contagem.

## Conferência

Problemas descrevem elemento, estado e correção. O relatório não declara conformidade completa por um scanner isolado. Use `astrofy check --category accessibility` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** rotas representativas, árvore acessível, estilos de foco e fluxos interativos.
- **Alteração sob teste:** Preserve relações label/for e IDs ao refatorar. Refaça o percurso de teclado depois de alterar navegação ou diálogos.
- **Falha e resultado esperado:** Um botão apenas com ícone precisa de nome acessível. O teste por função e nome deve localizar o controle e operá-lo pelo teclado.
- **Comando complementar:** `astrofy check --category accessibility`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
