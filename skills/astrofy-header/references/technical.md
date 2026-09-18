# Referência técnica de astrofy-header

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia Header.astro, configuração pública, logos e componente de navegação.

Separe marca, ações e controle do menu. Confira cabeçalho sticky com zoom,
teclado e âncoras. A navegação deve continuar alcançável em tela estreita.

## Alteração compatível

Preserve URLs e seletor de tema ao reorganizar a composição. Ajuste compensação
de âncora conforme a altura real do cabeçalho.

## Diagnóstico

Ao focar um link ou abrir uma âncora, o destino não pode ficar encoberto.
Capture a posição do elemento depois de rolar.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra             | Método   | Escopo    | Verificação                                    |
| ----------------- | -------- | --------- | ---------------------------------------------- |
| `header.behavior` | `hybrid` | `project` | Header e sticky não encobrem conteúdo ou foco. |

## Cabeçalho responsivo

O header global expõe banner; headers internos de artigo não representam esse
landmark. Nav recebe nome quando há mais de uma navegação.
Gatilho mobile é button com type button e controla região identificada. Link da
rota atual usa aria-current page.

Sticky pede compensação de âncoras e teste em viewport curto. Navegação aberta não
pode ocultar foco nem capturar rolagem sem restauração no fechamento.

## Geometria e mudança de breakpoint

Position sticky conserva seu espaço no fluxo; não acrescente padding global
como se fosse position fixed. Para cabeçalho fixed, reserve o espaço necessário.
Confira ancestrais com overflow, pois podem mudar o contêiner de rolagem do
sticky. Z-index alto não resolve por si só recorte ou stacking context ancestral.

Use scroll-padding no contêiner de rolagem ou scroll-margin nos destinos para
compensar o cabeçalho. Calibre pela altura renderizada com fonte carregada,
texto traduzido e zoom; uma constante copiada do desktop pode falhar no mobile.
Teste URL carregada diretamente com fragmento, clique em âncora e foco por Tab.

Ao cruzar o breakpoint com menu aberto, sincronize visibilidade, aria-expanded
e qualquer contenção de rolagem. Links da versão oculta não entram na sequência
de Tab. Não mantenha duas instâncias com o mesmo id para desktop e mobile.

## Integração ao layout Astro

O layout deve renderizar o header global uma vez. A marca vem da configuração
pública; logo e texto vizinho precisam formar um nome acessível sem repetição.
Preserve destino da home considerando base e locale do projeto.

Quando ClientRouter está ativo, a navegação precisa funcionar após troca de
documento e retorno pelo histórico. Não reinstale listeners cumulativos no
header a cada astro:page-load. Confira seleção de tema, rota ativa e menu
fechado depois da navegação conforme o comportamento definido pelo projeto.

## Fontes

- [Banner landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html):
  contexto semântico do header global e de headers internos.
- [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html):
  inspeção de elementos focados sob cabeçalhos sobrepostos.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[Dark mode](https://tailwindcss.com/docs/dark-mode):** seletor dark e
  preferência do sistema; consulte ao integrar o controle de tema.
- **[documentação para header](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/):**
  aria-expanded, Escape e foco de navegação expansível; compare os estados do
  menu.
