# Validação dos procedimentos das skills

As 40 skills usam arquivos do projeto, APIs identificadas, regras do catálogo
e resultados observáveis para orientar a execução. A validação combina
inspeção das instruções, instalação em agentes e execução de cenários locais.
Nenhum teste garante funcionamento em todos os projetos ou substitui a revisão
humana dos itens manuais.

## Cenários automatizados

Execute a partir da raiz do repositório Astrofy:

```bash
npm test
```

A suíte inclui `tests/skill-workflows.test.mjs`, que exercita:

- **Adoção:** dry-run sem escrita, segunda execução sem recriação, preservação
  de página e nota local e recusa de configuração inválida sem substituição.
- **Tokens:** validação, dry-run, geração, ciclo de aliases recusado com CSS
  anterior preservado e geração determinística após corrigir a entrada.
- **Check-up:** status sem escrita, regra manual sem aprovação automática e
  exportação Markdown com as flags aceitas pelo CLI.
- **Instalação:** referências locais das 40 skills acessíveis nos diretórios
  Codex e Claude, com reexecução sem reescrita de arquivos idênticos.
  Os testes conferem também as âncoras Markdown e os IDs de regras e
  categorias usados nos exemplos contra o catálogo instalado.
- **Setup:** grafo completo e sem ciclos, estado retomável, preservação de
  marcos e detecção de arquivos alterados.
- **Markdown:** configuração herdada, correção, preservação de frontmatter,
  URL, código e MDX, além de segunda execução sem mudança.
- **Referências:** versão e data de conferência presentes nas 40 bases técnicas.

Esses testes executam os comandos e contratos descritos pelas skills; eles
não simulam uma avaliação independente do raciocínio de outro agente.

## Build e navegador

Prepare as dependências conforme o
[guia das fixtures](../fixtures/compatibility/README.md). Depois execute:

```bash
node fixtures/compatibility/verify-skills.mjs
```

O script usa cópias descartáveis de Astro 5, 6 e 7, com dependências locais já
instaladas. Requer Chromium do Playwright e permissões locais para criar
servidores HTTP. Não publica sites nem envia formulários externos.

| Procedimento | Entrada ou alteração | Resultado exigido |
| --- | --- | --- |
| Arquitetura | Duas páginas usam o layout extraído | Título próprio, UTF-8 e conteúdo do slot em cada rota |
| Componentes | Link com href, variante e slot | Atributos corretos, foco e navegação funcional |
| Diagnóstico de build | Import de componente ausente | Build falha antes de aceitar a saída |
| Recuperação de build | Import corrigido | As duas rotas voltam a compilar |
| Hidratação ausente | Counter sem diretiva client | HTML existe, mas clicar não incrementa |
| Hidratação corrigida | Counter com client:load | O nome do botão muda após o clique |
| Design system | Consumidor de bg-surface | Cor computada corresponde aos modos light e dark |

O resultado local deve registrar a quantidade devolvida por `npm test` e os
três projetos aprovados nos cenários acima, em Linux com Node e Chromium.
Isso não comprova as mesmas combinações em Windows ou macOS,
nem todas as versões de Astro dentro da faixa aceita pelo framework.

## Conferência especializada em Astro 7

Astro 7.3.3, React 6.0.6 e MDX 8.0.1 possuem fixture, manifesto e lockfile
versionados. Além do runner comum, execute:

```bash
node fixtures/compatibility/verify-domains.mjs
```

O teste abre Chromium contra um servidor local e confere Actions com validação
de formulário, endpoint SSR com autorização por cookie, Content Layer e MDX,
paginação determinística, pares i18n e o ciclo de navegação do `ClientRouter`.

Essa execução amplia a comprovação para a combinação instalada, sem afirmar
cobertura de todas as APIs Astro 7 ou de todos os procedimentos das 40 skills.
A fixture permanente permite repetir a mesma combinação sem reconstruir um
projeto temporário manualmente.

## Correções obtidas durante os exercícios

A extração inicial de layout omitia a declaração de codificação e um título
acentuado foi decodificado incorretamente. O exemplo passou a preservar
meta charset e a conferir o título no navegador.

O caminho fixo astro/astro.js funcionou em Astro 5, mas estava ausente na
fixture Astro 6. O runner passou a consultar o campo bin do package.json
instalado. Scripts reais do projeto continuam sendo a primeira opção para
executar o build.

A revisão técnica também conferiu os estados reais da checklist e as flags
de exportação. `warning` é uma severidade, não um status da checklist;
`report --markdown` exige `--output`.

A instrução antiga de i18n usava uma categoria inexistente. O comando foi
corrigido para routing, com indicação explícita de que lang, hreflang,
traduções e fallback exigem conferência própria. O catálogo não tem uma
categoria i18n.

O lint específico das skills e dos documentos alterados passou. A execução
global `npm run validar:markdown` do Hub encontrou erros MD033 e MD038 nos
arquivos não alterados `ebooks-check-diagnostico.md` e `ebooks-check-plan.md`.
Esses erros ficam fora desta alteração.

## Conferência das instruções

Na raiz do Hub, execute:

```bash
npm run validar:skills-prohibited
npx --no-install markdownlint --config .markdownlint.json 'astrofy/skills/**/*.md' astrofy/docs/skills.md astrofy/docs/skills-validation.md
```

O primeiro comando aplica as proibições de redação das skills. O segundo
confere Markdown. O `quick_validate.py` da skill `skill-creator` confere
frontmatter e nomes de cada pasta. Essas verificações estruturais não
comprovam que uma implementação de site funciona.

Para ampliar a cobertura, reproduza o caso específico de `examples/cases.md`
em uma cópia de teste, aplique a skill, compare o resultado esperado e
registre ambiente, arquivos e interação. Formulários, provedores de deploy,
conteúdo editorial e acessibilidade completa exigem verificações próprias
do projeto consumidor. Uma referência consultada fornece orientação técnica,
não aprovação automática do site.
