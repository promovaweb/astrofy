# Referência técnica de astrofy-navigation

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia árvore de links, controle de abertura, IDs, aria-expanded e rota atual.

Use links para destinos e botões para expandir. Modele fechar por Escape e
retorno do foco. Links invisíveis do menu fechado não podem permanecer no
percurso de Tab.

## Alteração compatível

Preserve caminhos publicados e estados existentes ao centralizar a árvore. Teste
duas instâncias quando houver navegação de desktop e móvel.

## Diagnóstico

Abrir com Enter, avançar com Tab e fechar com Escape deve retornar o foco ao
controle. Menu fechado não pode receber foco interno.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                 | Método      | Escopo    | Verificação                               |
| --------------------- | ----------- | --------- | ----------------------------------------- |
| `navigation.links`    | `automatic` | `project` | Destinos internos existentes.             |
| `navigation.mobile`   | `hybrid`    | `project` | Menu opera por toque nas larguras móveis. |
| `navigation.keyboard` | `hybrid`    | `project` | Menu e submenus operam por teclado.       |
| `navigation.current`  | `hybrid`    | `project` | Página atual identificada corretamente.   |

## Menu acessível

Menu de site usa nav e listas de links; não aplique role menu a navegação comum.
Submenu controlado recebe id estável, botão com aria-expanded e região oculta
fora do estado aberto.

Ao fechar com Escape enquanto o foco está no submenu, devolva-o ao botão.
Fechamento por clique fora não deve roubar foco do destino clicado. Em
transições Astro, remova listeners duplicados antes de registrar controles.

## Estado, instâncias e mudança de rota

Modele cada disclosure com botão, região identificada e estado aberto. A
função que altera estado atualiza aria-expanded e hidden na mesma operação.
Não use apenas opacity para fechar: links transparentes continuam focáveis.
IDs devem ser únicos mesmo quando header e footer usam os mesmos dados.

Compare a rota ativa após remover query e fragmento e aplicar a política de
barra final. Igualdade marca a página; prefixo pode marcar um grupo, mas não
deve dar aria-current page a todos os descendentes. Teste /blog e /blogue para
evitar correspondência parcial indevida.

Com ClientRouter, reobtenha elementos após astro:page-load. Listener global
de teclado deve ser registrado uma vez ou removido com referência estável.
Teste abrir, navegar, voltar e abrir de novo: um clique produz uma transição.
Um disclosure comum não prende Tab; reserva de foco pertence a diálogo modal.

## Fontes

- [Ciclo de navegação Astro](https://docs.astro.build/en/guides/view-transitions/):
  eventos de troca de documento e execução de scripts com ClientRouter.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/):**
  aria-expanded, Escape e foco de navegação expansível; compare os estados do
  menu.
