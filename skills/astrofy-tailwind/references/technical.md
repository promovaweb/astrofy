# Referência técnica de astrofy-tailwind

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.
> Combinação executada: Tailwind CSS 4.3.3, `@tailwindcss/vite` 4.3.3 e Vite
> 8.3.0.

## Arquivos e APIs

Leia versão resolvida do Tailwind, integração Vite, CSS de entrada e classes
usadas.

Confirme Tailwind 4 antes de usar o adaptador CSS-first. Relacione classe
semântica à variável emitida por @theme inline. Examine o CSS do build, não
apenas o fonte.

## Alteração compatível

Preserve Tailwind 3 quando a migração não estiver no pedido. Em Tailwind 4,
remova importação duplicada somente depois de identificar o ponto de entrada
efetivo.

## Diagnóstico

Uma classe bg-surface deve produzir a cor do token no navegador. Uma string
construída dinamicamente pode não gerar utilitário; use variantes explicitamente
detectáveis.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Tailwind 4

Tailwind 4 usa @import tailwindcss na entrada. Classe montada por concatenação
pode não chegar ao CSS gerado; use mapa estático de variantes. Confira os
peerDependencies do plugin contra o Vite resolvido pelo projeto Astro 7;
o nome da major do Astro não comprova compatibilidade de qualquer plugin.

Tema escuro usa classe ou atributo no html, igual ao controlador de
astrofy-themes. Verifique regra emitida e valor calculado no navegador.

## Entrada CSS e integração

Em Tailwind 4, confira @tailwindcss/vite em vite.plugins do astro.config.* e
o import da folha global no layout utilizado pelas rotas. Instalar o pacote
não carrega CSS na página. Preserve plugins Vite existentes ao acrescentar a
integração. Não mantenha processamento duplicado por Vite e PostCSS sem uma
necessidade demonstrada pelo projeto.

O caminho legado @astrojs/tailwind pertence à integração de Tailwind 3. Não
misture diretivas e configuração de duas majors. Antes de migrar, examine
plugins de terceiros, navegadores atendidos, Preflight e utilitários alterados.
A skill pode integrar a versão existente sem iniciar essa migração.

## Descoberta de classes no workspace

Tailwind examina texto dos arquivos; não executa templates para resolver nomes
de classe. Um mapa com valores completos permite detecção; concatenar partes
de nomes não. class:list do Astro organiza classes no HTML, mas não torna uma
classe construída dinamicamente detectável pelo Tailwind.

Verifique de onde o build roda e quais arquivos entram na descoberta. Pacotes
de componentes externos ou arquivos ignorados podem exigir @source explícito.
Na sintaxe atual, caminhos @source são relativos à folha CSS. Restrinja-os ao
pacote necessário, evitando varrer todo node_modules.

Conteúdo remoto recebido somente durante a requisição não entra na compilação
de CSS. Mapeie variantes do CMS para um conjunto finito de classes existentes.
Quando usar @source inline para inclusão explícita, confirme suporte na versão
resolvida e mantenha a lista limitada ao contrato real dos componentes.

## Tokens e folhas processadas separadamente

Use namespaces @theme para gerar utilitários: --color-surface habilita classes
como bg-surface. Uma variável CSS comum --surface não cria esse utilitário por
si só. Quando um token semântico aponta para outra variável, confira @theme
inline e a resolução no elemento consumidor, especialmente sob escopos de tema.

Não copie o valor de light para uma segunda paleta dark independente dos tokens.
Altere as variáveis ou o seletor definido pelo projeto e confira estilo computado.
Classe presente no arquivo CSS ainda pode perder na cascata ou usar variável
indefinida no elemento.

Se @apply em folha processada separadamente precisar do tema global, avalie
@reference para disponibilizar definições sem duplicar sua emissão. Não use
@reference esperando que ele carregue estilos na página. Prefira variável CSS
direta quando ela expressar a propriedade sem necessidade de @apply.

## Conferência do build

Teste uma classe comum, uma variante semântica, um estado de foco e dark na
saída de produção. Para pacote compartilhado, escolha classe exclusiva dele;
uma classe também usada no app pode esconder ausência de @source.

Se a classe existe mas não produz o resultado, inspecione seletor, media query,
camada, especificidade e origem da variável. Ordem dos nomes no atributo class
não define qual utilitário vence na cascata. Registre a regra vencedora no
navegador antes de acrescentar important.

## Fontes

- [Integração com Astro](https://tailwindcss.com/docs/installation/framework-guides/astro):
  plugin Vite e entrada CSS.
- [Detecção de classes](https://tailwindcss.com/docs/detecting-classes-in-source-files):
  classes completas, descoberta de arquivos e fontes explícitas.
- [Diretivas](https://tailwindcss.com/docs/functions-and-directives): @theme,
  @source, @apply e @reference.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Theme variables](https://tailwindcss.com/docs/theme):** namespaces de
  variáveis e utilitários do Tailwind 4; confira o CSS compilado.
- **[Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/):**
  tipos e aliases DTCG 2025.10; diferencie a árvore de tokens do envelope
  Astrofy.
