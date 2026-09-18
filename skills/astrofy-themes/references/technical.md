# Referência técnica de astrofy-themes

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia script inicial do tema, seletor, localStorage, CSS dark e ativos por modo.

Defina precedência entre escolha explícita e sistema. Em system, acompanhe
matchMedia; em light ou dark explícitos, preserve a escolha após mudança do
sistema.

## Alteração compatível

Adapte a convenção existente de classe ou data-theme. Não adicione um segundo
controlador. Confira reinicialização após navegação quando o site usa
transições.

## Diagnóstico

Armazenamento indisponível não pode lançar erro que impeça o restante da página.
Recarregar após selecionar dark deve manter o tema e o logo correto.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                 | Método      | Escopo | Verificação                                      |
| --------------------- | ----------- | ------ | ------------------------------------------------ |
| `theme.light`         | `hybrid`    | `page` | Páginas representativas revisadas em light.      |
| `theme.dark`          | `hybrid`    | `page` | Páginas representativas revisadas em dark.       |
| `theme.system`        | `automatic` | `page` | Preferência do sistema respeitada.               |
| `theme.persistence`   | `automatic` | `page` | Escolha do visitante persiste quando disponível. |
| `theme.initial-paint` | `hybrid`    | `page` | Inicialização evita tema incorreto perceptível.  |
| `theme.logos`         | `hybrid`    | `page` | Logo legível e correto por tema.                 |

## Controle de tema

A preferência explícita vence system. Listener de matchMedia só atualiza quando
a preferência atual é system. Em transições, remova listener anterior antes de
registrar outro.

CSS, logo e seletor usam o mesmo atributo ou classe no elemento html. Script
inicial respeita CSP e não espera hidratação de ilha para aplicar o modo.

## Preferência, modo resolvido e ciclo da página

Separe preference, que admite system, de resolvedTheme, limitado a light e
dark. Persistir o modo resolvido como preferência elimina o acompanhamento do
sistema depois da recarga. Valor inválido no storage volta ao padrão definido.

O script inicial aplica o seletor antes da pintura. O controle visível apenas
altera a preferência e chama a mesma resolução; não implemente duas regras
diferentes para bootstrap e clique. Ajuste color-scheme conforme o modo para
alinhar controles nativos do navegador.

Com ClientRouter, o atributo do html pode mudar durante a troca. Use o evento
adequado do ciclo, como astro:after-swap, para reaplicar o modo antes da pintura
seguinte. astro:page-load serve para associar controles do novo documento.
Mantenha um único listener de matchMedia ou faça limpeza antes de reinstalá-lo.

Teste sistema dark com preferência light, preferência system com troca do SO,
storage recusando leitura e escrita, recarga e navegação interna. Registre
preferência e estilo computado, pois o texto do botão sozinho não prova o tema.

## Fontes de implementação

- [View transitions](https://docs.astro.build/en/guides/view-transitions/):
  consulte eventos e execução de scripts antes de integrar o controlador.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Dark mode](https://tailwindcss.com/docs/dark-mode):** seletor dark e
  preferência do sistema; consulte ao integrar o controle de tema.
- **[Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/):**
  tipos e aliases DTCG 2025.10; diferencie a árvore de tokens do envelope
  Astrofy.
