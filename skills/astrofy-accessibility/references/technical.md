# Referência técnica de astrofy-accessibility

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Requisitos normativos conferidos contra WCAG 2.2.

## Arquivos e APIs

Leia rotas representativas, árvore acessível, estilos de foco e fluxos
interativos.

Combine semântica, teclado, contraste e revisão de nomes. Registre elemento,
estado e viewport. Um scanner isolado não comprova conformidade completa.

## Alteração compatível

Preserve relações label/for e IDs ao refatorar. Refaça o percurso de teclado
depois de alterar navegação ou diálogos.

## Diagnóstico

Um botão apenas com ícone precisa de nome acessível. O teste por função e nome
deve localizar o controle e operá-lo pelo teclado.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                        | Método   | Escopo | Verificação                                         |
| ---------------------------- | -------- | ------ | --------------------------------------------------- |
| `accessibility.landmarks`    | `hybrid` | `page` | Regiões e headings semanticamente adequados.        |
| `accessibility.focus`        | `hybrid` | `page` | Foco visível, ordenado e não encoberto.             |
| `accessibility.contrast`     | `hybrid` | `page` | Contraste revisado nos estados e temas pertinentes. |
| `accessibility.alternatives` | `hybrid` | `page` | Alternativas textuais adequadas ao significado.     |
| `accessibility.motion`       | `hybrid` | `page` | Preferência de redução de movimento respeitada.     |

## Procedimento técnico

Use o accessibility tree para confirmar nome, role e estado expostos. Teste Tab,
Shift+Tab, Enter, Space e Escape conforme o controle. Ao fechar por Escape,
devolva foco ao gatilho quando ele continuar disponível. Clique fora de uma
navegação expansível não deve roubar foco do destino clicado. Scanner localiza padrões; a inspeção no
navegador confirma o fluxo.

Em páginas Astro com ilhas, teste antes e depois da hidratação. Conteúdo útil
precisa existir sem JavaScript quando a interação não for essencial.

## Semântica e ordem de leitura

Inspecione a árvore acessível do HTML entregue e dos estados interativos.
Componentes visuais não determinam landmarks: header dentro de article não é
o banner do site. Use headings para organizar conteúdo e preserve a ordem do
DOM ao mudar grid ou flex; order visual não reorganiza leitura por teclado.

Nome de controle deve descrever sua função. Se houver rótulo visível, conserve
esse texto no nome acessível. Ícone decorativo não precisa ser anunciado junto
ao nome do botão. Placeholder não substitui label. Conteúdo com aria-hidden
não deve conter controles ainda alcançáveis por Tab.

Para cada padrão, escolha HTML nativo antes de reproduzir comportamento com
ARIA. Um botão recebe Enter e Space; link nativo recebe Enter. Não obrigue
Space a ativar links comuns nem converta navegação de páginas em menu de app.

## Reflow, foco e movimento

Teste leitura vertical com largura equivalente a 320 CSS px e zoom de 400%
num viewport inicial de 1280 CSS px. Compare ambos: estreitar viewport não
reproduz todas as consequências do zoom. Conteúdo comum deve reorganizar-se;
tabelas ou diagramas que dependem de duas dimensões precisam ser avaliados
separadamente, sem impor rolagem horizontal à página inteira.

Confira foco visível e elemento focado durante Tab e Shift+Tab com header,
rodapé fixo e aviso sobreposto. WCAG 2.2 AA 2.4.11 exige que o componente não
fique totalmente encoberto por conteúdo do autor. O contrato do projeto pode
exigir visibilidade integral; registre essa exigência sem atribuí-la ao mínimo AA.

Teste prefers-reduced-motion antes de carregar e durante a sessão. Remova ou
reduza movimento não essencial preservando a informação de estado. Transições
de rota não devem apagar foco, título ou indicação de página atual.

## Escopo da avaliação

Registre navegador, tecnologia assistiva usada, rota e estados verificados.
Inclua formulário inválido, menu aberto, diálogo e conteúdo após hidratação.
Uma captura inicial não cobre estados ocultos. Scanner, percurso por teclado e
leitura assistida fornecem resultados distintos; reporte cada um separadamente.

## Fontes

- [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): largura
  equivalente, zoom e conteúdo que depende de duas dimensões.
- [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html):
  alcance do requisito AA e diferenças da exigência de visibilidade integral.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[documentação para accessibility](https://www.w3.org/WAI/tutorials/page-structure/):**
  regiões e headings; consulte ao compor a estrutura semântica da página.
