# Referência técnica de astrofy-testing

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Cenários de navegador executados com Playwright 1.63.0 e Chromium.

## Arquivos e APIs

Leia mudança, scripts existentes, fixtures e fluxos observáveis.

Escolha testes pela consequência da falha: tipos para contratos, build para
integração e navegador para interação. Use seletores por função e nome; registre
viewport, tema e ambiente.

## Alteração compatível

Preserve o runner existente. Adicione regressão que falhe no comportamento
anterior e passe após corrigir; não atualize snapshots sem revisar a diferença.

## Diagnóstico

Retire a hidratação de uma ilha de teste: o teste de interação deve falhar mesmo
que o build passe. Restaure e confira a execução verde.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra           | Método      | Escopo    | Verificação                               |
| --------------- | ----------- | --------- | ----------------------------------------- |
| `quality.types` | `automatic` | `project` | Verificação de tipos concluída sem erros. |
| `quality.build` | `automatic` | `project` | Build concluído no ambiente documentado.  |
| `quality.flows` | `hybrid`    | `project` | Fluxos principais verificados.            |

## Suite Astro

astro check cobre tipos e schemas; astro build cobre rotas e transformações;
navegador cobre foco e ilhas. Um teste de client:visible deve rolar até o
elemento antes da ação.

Teste endpoint no runtime semelhante ao publicado quando há adapter. Limpe
localStorage e cookies entre cenários para não herdar estado.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[documentação para testing](https://playwright.dev/docs/test-assertions):**
  assertivas com espera pelo estado; consulte ao testar atualizações
  assíncronas.
- **[Testes no Astro](https://docs.astro.build/en/guides/testing/):** integração
  de testes ao Astro; selecione runner e camada conforme o comportamento.
- **[Locators do Playwright](https://playwright.dev/docs/locators):** seletores
  por função e nome; consulte para testes de interação resistentes a alterações
  de CSS.

## Escolha do teste pelo comportamento

| Alteração                                                                       | Verificação adequada                              | Falha que deve ser percebida                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| Props de componente                                                             | Script de tipos do projeto e consumidor compilado | Prop obrigatória ausente ou tipo inválido           |
| Layout e rotas                                                                  | Build e HTML de duas rotas                        | Import quebrado, título trocado ou conteúdo ausente |
| Ilha interativa                                                                 | Navegador após carregamento                       | Clique sem resposta ou erro de hidratação           |
| Tokens e temas                                                                  | CSS gerado e estilo computado                     | Alias inválido ou CSS não importado                 |
| Coleção                                                                         | Entrada válida e entrada inválida                 | Frontmatter obrigatório ausente                     |
| Revisão manual                                                                  | Inspeção humana registrada                        | Aprovação automática indevida                       |

Faça o teste falhar pela causa que ele pretende detectar antes de confiar no
resultado. Em uma ilha de contador, retire temporariamente client:load em uma
cópia descartável, gere o site e confirme que o incremento não ocorre. Restaure
a diretiva e repita. Um teste que só encontra o botão não detecta essa falha.

Use seletores por função e nome acessível quando descreverem o comportamento.
Aguarde o estado esperado em vez de dormir por um intervalo arbitrário. Crie um
contexto de navegador separado por cenário quando tema ou armazenamento
influenciarem o resultado. Encerre navegador e servidor mesmo após falha.

Capturas precisam registrar viewport, tema e conteúdo. Uma comparação visual é
revista antes de aceitar uma atualização de snapshot. Um teste estrutural não
comprova legibilidade, contraste ou adequação editorial.

## Fontes para testes

- **[Testes no Astro](https://docs.astro.build/en/guides/testing/):** confira
  integração das ferramentas com o projeto e sua versão.
- **[Locators do Playwright](https://playwright.dev/docs/locators):** escolha
  alvos que expressem a interação real e evitem dependência da estrutura CSS.
- **[Assertions do Playwright](https://playwright.dev/docs/test-assertions):**
  confira esperas pelo estado observado e mensagens úteis ao falhar.
