# Referência técnica de astrofy-design-system

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia design-system.json, paths.json, CSS gerado, manifesto e consumidores dos
tokens.

O arquivo é um envelope Astrofy com tokens DTCG 2025.10. Resolva aliases por
tipo em cada modo. Overrides alteram tokens existentes; não criam um caminho nem
mudam seu tipo.

## Alteração compatível

Mapeie cores atuais para primitivos e funções semânticas. Migre um consumidor
por vez. Gere CSS pelo CLI e compare bytes e aparência, mantendo o JSON como
fonte editável.

## Diagnóstico

Um alias circular deve falhar antes da geração; corrigido o alias, duas gerações
idênticas precisam produzir os mesmos bytes e tokens check válido.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                  | Método      | Escopo    | Verificação                                         |
| ---------------------- | ----------- | --------- | --------------------------------------------------- |
| `design.schema`        | `automatic` | `project` | Design system válido.                               |
| `design.references`    | `automatic` | `project` | Aliases resolvem sem ciclos ou tipos incompatíveis. |
| `design.css-sync`      | `automatic` | `project` | CSS corresponde ao JSON e gerador atuais.           |
| `design.global-import` | `automatic` | `project` | CSS global está integrado ao build.                 |
| `design.token-usage`   | `hybrid`    | `project` | Desvios de tokens identificados e tratados.         |
| `design.states`        | `hybrid`    | `project` | Estados visuais dos componentes definidos.          |

## Tokens e CSS

Aliases só apontam para token compatível e o resolvedor recusa ciclos. Token
semântico representa surface, content, border ou action; componente não deve
consumir paleta crua. O arquivo CSS gerado é derivado e não recebe edição
manual.

O seletor de modo no CSS precisa ser igual ao seletor usado por astrofy-themes.
Confira valores calculados no navegador em ambos os modos.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/):**
  tipos e aliases DTCG 2025.10; diferencie a árvore de tokens do envelope
  Astrofy.
- **[Theme variables](https://tailwindcss.com/docs/theme):** namespaces de
  variáveis e utilitários do Tailwind 4; confira o CSS compilado.
- **[Dark mode](https://tailwindcss.com/docs/dark-mode):** seletor dark e
  preferência do sistema; consulte ao integrar o controle de tema.

## Contrato de geração e modos

Leia paths.designSystem e paths.designSystemCss antes de editar. O envelope
Astrofy inclui schemaVersion, tokenFormat, defaultMode, assets, tokens e modes.
A árvore tokens contém valores DTCG; assets e modes pertencem ao envelope do
framework. Não trate uma exportação DTCG arbitrária como entrada pronta.

No exemplo distribuído, semantic.color.surface referencia primitive.color.white.
No modo dark, esse caminho recebe o alias primitive.color.ink. O gerador aplica
o override antes de resolver aliases. Um token do tipo color não pode passar a
referenciar dimension. Confira também aliases ausentes, ciclos e colisões entre
caminhos convertidos para nomes CSS.

```bash
astrofy tokens validate --root apps/site
astrofy tokens build --root apps/site --dry-run
astrofy tokens build --root apps/site
astrofy tokens check --root apps/site
```

Os comandos exigem os contratos e o JSON presentes; geração CSS usa o adaptador
Tailwind 4. O dry-run não deve alterar o CSS. Duas gerações da mesma entrada
devem manter os bytes. Depois, confira a propriedade computada do consumidor em
light e dark; CSS válido não comprova importação pelo layout.

Durante correção de alias inválido, preserve a última saída válida e corrija a
origem JSON. Não edite o CSS gerado para mascarar o erro. Se houver
personalização de marca, registre sua origem antes de reimportar.

## Contrato dos consumidores

Para cada token semântico alterado, localize consumidores por variável e por
utilitário gerado. Renomear o caminho pode mudar o nome CSS e quebrar referências
sem produzir erro TypeScript. Migre consumidores junto à origem e confira
fallbacks que poderiam esconder a ausência da variável.

Modele estados necessários do componente, como foco, hover, disabled e erro,
sem deduzir todos por alteração de opacidade. Opacidade afeta texto e fundo em
conjunto e pode produzir contraste inadequado. Confira pares reais de cores nos
temas oferecidos e no estado efetivamente renderizado.

Separação entre primitivo e semântico não exige criar token para cada número
do CSS. Use função reutilizável e contrato do design system para escolher o
nível. Valores específicos de algoritmo ou geometria podem permanecer locais
quando sua razão estiver registrada e não duplicarem uma regra visual existente.

## Mudança compatível do sistema

Antes de remover token, confira JSON, CSS autoral, classes e componentes de
framework. Token sem consumidor direto pode ser alias intermediário. Resolva
o grafo completo antes de classificá-lo como sem uso.

Compare entrada e saída na falha de validação. A geração recusada não deve
substituir a última saída válida por arquivo parcial. Depois da correção,
tokens check confirma sincronização; o navegador confirma aplicação pela
cascata e pelo seletor de modo.

## Fontes para tokens e CSS

- **[DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/):** consulte
  tipos e referências; confira separadamente as restrições do envelope Astrofy.
- **[Theme variables do Tailwind](https://tailwindcss.com/docs/theme):**
  consulte a relação entre variáveis de tema e utilitários no Tailwind 4.
- **[Dark mode](https://tailwindcss.com/docs/dark-mode):** confira a convenção
  de seletor adotada pelo site antes de combinar variantes dark com os tokens.
