# Referência técnica de astrofy-react

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Combinação executada: React 19.0.0 e `@astrojs/react` 6.0.6.

## Arquivos e APIs

Leia package.json, integração React em astro.config.*, ilha JSX/TSX e diretiva
client no consumidor Astro.

Escolha hidratação pela necessidade da interação. Registre o HTML inicial
esperado e quais props cruzam a fronteira servidor/cliente. Evite dependência de
window durante renderização no servidor.

## Alteração compatível

Preserve providers e estado local. Mude uma ilha de cada vez e compare HTML
inicial, hidratação e navegação entre rotas.

## Diagnóstico

Um contador precisa incrementar após hidratar. Erros de console e diferenças
entre HTML inicial e cliente devem reprovar o fluxo mesmo com build válido.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra               | Método      | Escopo      | Verificação                                             |
| ------------------- | ----------- | ----------- | ------------------------------------------------------- |
| `react.integration` | `automatic` | `component` | Integração React válida quando utilizada.               |
| `react.hydration`   | `hybrid`    | `component` | Ilhas funcionam sem erro de hidratação observado.       |
| `react.delivery`    | `hybrid`    | `component` | JavaScript de cliente tem justificativa por componente. |

## Hidratação React

Componente React sem client:* produz HTML estático. Astro serializa Date, Map e
Set, mas não funções nem instâncias arbitrárias. Não envie segredos como props.
Use valor estável no primeiro render para evitar diferença entre servidor e
cliente.

window, document e localStorage são lidos após a hidratação. A diretiva fica no
consumidor Astro e define quando o JavaScript chega ao navegador.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Integração React](https://docs.astro.build/en/guides/integrations-guide/react/):**
  compatibilidade da integração e hidratação; consulte antes de alterar a ilha.
- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[documentação para react](https://docs.astro.build/en/reference/directives-reference/):**
  client:load, client:visible, class:list e set:html; confira o efeito da
  diretiva escolhida.
