# Referência de uso do Astrofy Design

Os quatro modos do Astrofy Design recebem instruções na conversa com o agente.
Esta referência descreve o que informar em cada pedido, qual resultado esperar
e quais arquivos podem mudar. Para acompanhar exemplos comentados de uso,
consulte o [guia prático](11-astrofy-design.md).

## Disponibilizar a skill no projeto

A instalação completa das skills inclui `astrofy-design` quando ela está
presente no catálogo da edição instalada. Confira o catálogo antes de tentar
selecionar apenas essa skill:

```bash
astrofy skills list --json
astrofy skills install --agent codex --skill astrofy-design --dry-run
astrofy skills install --agent codex --skill astrofy-design
```

Execute os comandos na raiz do site ou informe `--root /caminho/do/site`.
Troque `codex` por `claude` para instalar no Claude. O `--dry-run` lista os
arquivos previstos sem gravá-los. Se o nome não aparecer no catálogo, use uma
edição que contenha a skill ou siga a instalação pelo checkout descrita na
[referência de implementação](../design.md).

O destino do Codex é `.agents/skills/astrofy-design/`. O destino do Claude é
`.claude/skills/astrofy-design/`. A instalação inclui as instruções, as
referências, as paletas de consulta e a licença. Ela não importa o CSS no site
nem executa um redesign. Arquivos personalizados precisam ser conciliados
antes de uma atualização que substituiria seu conteúdo.

## Build: criar uma interface

O modo `build` atende a páginas e componentes novos dentro do projeto Astro.
Ele também é o padrão quando o pedido de criação não contém um verbo explícito.
Informe o conteúdo aprovado, a finalidade e o escopo da interface. O caminho
de destino pode ser proposto pelo agente depois da leitura das rotas existentes.

| Entrada | Tipo e obrigatoriedade | Uso |
| --- | --- | --- |
| Finalidade e escopo | Texto necessário | Delimita a página ou o componente |
| Conteúdo | Texto ou arquivo necessário para a composição final | Define o que a interface apresenta |
| Destino | Caminho opcional | Indica a rota ou o componente a criar |
| Identidade | Arquivos ou descrição, quando disponíveis | Orienta fontes, cores e componentes |
| Preferência visual | Texto opcional, sem valor padrão obrigatório | Orienta a proposta dentro da identidade existente |

A entrega inclui a implementação, os arquivos alterados e as verificações
executadas. O agente pode criar ou editar componentes, estilos e tokens dentro
do escopo autorizado. Uma implementação também pode atualizar o histórico
visual. Conteúdo ausente, imagem indisponível ou verificação não executada
precisa aparecer na entrega.

### Exemplos de build

1. **Página de produto:** “Use astrofy-design build para criar a página deste
   produto com o conteúdo aprovado em produto.md e os componentes atuais.”
2. **Tabela de preços:** “Use astrofy-design build para uma tabela com estes
   três planos. Preserve os preços e explique os estados dos botões.”
3. **Página de evento:** “Use astrofy-design build para esta programação.
   Organize horários, palestrantes e inscrição usando os ativos fornecidos.”
4. **Componente de depoimento:** “Use astrofy-design build para apresentar
   este depoimento autorizado, com nome e cargo exatamente como fornecidos.”
5. **Estado vazio:** “Use astrofy-design build para o estado vazio da busca,
   mantendo o campo de pesquisa e uma ação para remover os filtros.”

## Study: analisar uma referência

O modo `study` recebe uma URL ou uma imagem. Seu resultado descreve a
composição observada e os limites da análise. Uma URL permite consultar HTML
e CSS quando acessíveis. Uma imagem permite analisar apenas o que aparece
na captura, sem confirmar fontes exatas ou comportamentos interativos.

| Entrada | Tipo e obrigatoriedade | Uso |
| --- | --- | --- |
| Referência | URL ou imagem necessária | Fornece o objeto do estudo |
| Foco da análise | Texto opcional | Delimita tipografia, composição ou outra parte |
| Conteúdo próprio | Texto opcional | Permite discutir uma aplicação posterior |
| Exportação | Pedido explícito, ausente por padrão | Solicita um `design.md` portátil |

O estudo não altera o site nem cria histórico. Um relatório em arquivo exige
pedido específico. Uma URL inacessível não produz um diagnóstico visual
completo. A skill recusa a reprodução de templates pagos e a cópia de páginas
por pixels. A exportação baseada em URL precisa confirmar que a referência é
própria ou pública para orientar a marca do projeto.

### Exemplos de study

1. **Hierarquia:** “Use astrofy-design study nesta captura e explique a relação
   entre o título, a imagem principal e o botão.”
2. **Página própria:** “Use astrofy-design study na URL da nossa página de
   produto e descreva a composição que existe hoje.”
3. **Tipografia:** “Use astrofy-design study nesta imagem e descreva os papéis
   tipográficos, sem presumir os nomes das fontes.”
4. **Comparação de telas:** “Use astrofy-design study nas capturas desktop e
   mobile fornecidas e compare a distribuição do conteúdo.”
5. **Especificação portátil:** “Use astrofy-design study nesta página nossa e
   registre o sistema visual em design.md para reutilização no projeto.”

## Audit: revisar sem editar

O modo `audit` examina uma página, um componente ou um conjunto de arquivos.
Informe o alvo e, se necessário, o aspecto a conferir. O agente consulta o
contrato visual disponível e relaciona cada problema ao arquivo ou ao elemento
afetado, com uma sugestão de correção.

| Entrada | Tipo e obrigatoriedade | Uso |
| --- | --- | --- |
| Alvo | Caminho ou conjunto de caminhos necessário | Delimita a revisão |
| Foco | Texto opcional | Prioriza uma parte da interface |
| Contrato visual | Arquivo existente, quando disponível | Permite comparar a implementação com a identidade |
| Relatório em disco | Caminho solicitado explicitamente | Grava o diagnóstico no destino indicado |

A entrega padrão acontece na conversa. O modo não edita a implementação,
não cria `design.md` e não atualiza o histórico visual. O relatório pode
classificar problemas por gravidade, mas um total de achados ou uma nota não aprova a
página. Quando a análise não incluir navegador, essa limitação deve aparecer.

### Exemplos de audit

1. **Página inicial:** “Use astrofy-design audit em src/pages/index.astro e
   confira a hierarquia e a repetição de seções.”
2. **Cabeçalho:** “Use astrofy-design audit em src/components/Header.astro e
   examine a navegação, o foco e a leitura no celular.”
3. **Tokens:** “Use astrofy-design audit nestas duas páginas e compare as
   cores e as fontes com o design.md existente.”
4. **Formulário:** “Use astrofy-design audit no formulário de contato e
   confira os estados de erro, envio e sucesso sem editar os arquivos.”
5. **Relatório:** “Use astrofy-design audit na página de preços e salve o
   diagnóstico em docs/revisao-visual.md, preservando a implementação.”

## Redesign: mudar a composição existente

O modo `redesign` recebe uma interface existente e a mudança visual desejada.
Ele preserva textos aprovados, rotas, integrações e funcionalidades dentro do
escopo solicitado. Num conjunto de páginas, o contrato visual comum orienta
todas as mudanças.

| Entrada | Tipo e obrigatoriedade | Uso |
| --- | --- | --- |
| Alvo | Caminho ou conjunto de caminhos necessário | Define a interface existente |
| Mudança desejada | Texto necessário para delimitar a intervenção | Explica o resultado visual esperado |
| Elementos a preservar | Texto ou contrato existente | Explicita as restrições da mudança |
| `--mood` | Texto opcional na conversa | Sugere um tom visual, sem substituir a marca |

A notação `--mood` pertence ao pedido dirigido ao agente, não ao parser do CLI.
Na ausência dessa preferência, o agente usa a direção já confirmada ou pergunta
somente o que falta para propor a composição. Uma escolha anterior compatível
não precisa ser confirmada novamente.

A entrega inclui os arquivos alterados, a explicação da composição e a
conferência do resultado. O trabalho pode atualizar o histórico visual. Uma
revisão de várias páginas pode estabelecer `design.md` quando esse contrato
fizer parte do escopo aprovado. O agente preserva o documento existente e não
remove rotas ou diretórios apenas para simplificar a implementação.

### Exemplos de redesign

1. **Produto:** “Use astrofy-design redesign na página de produto para dar
   mais espaço à demonstração, preservando textos e formulário.”
2. **Cabeçalho:** “Use astrofy-design redesign no cabeçalho mobile, mantendo
   os links, os destinos e o comportamento de autenticação.”
3. **Duas rotas:** “Use astrofy-design redesign nas páginas de produto e
   preços com o mesmo padrão de títulos, botões e espaçamento.”
4. **Preferência visual:** “Use astrofy-design redesign na página do evento
   com --mood editorial, respeitando as cores e fontes da marca.”
5. **Redução de movimento:** “Use astrofy-design redesign nesta seção para
   reduzir animações e manter a leitura com prefers-reduced-motion.”

## Arquivos de consulta e arquivos alterados

A instalação da skill e a execução de um trabalho visual têm efeitos
diferentes. A tabela separa os arquivos de instrução daqueles que pertencem
à interface ou ao histórico do projeto.

| Caminho | Função | Quando muda |
| --- | --- | --- |
| `.agents/skills/astrofy-design/` | Biblioteca instalada no Codex | Instalação ou atualização das skills |
| `.claude/skills/astrofy-design/` | Biblioteca instalada no Claude | Instalação ou atualização das skills |
| `.astrofy/config/paths.json` | Caminhos de design e CSS do projeto | Configuração explícita do projeto |
| `.astrofy/design/log.json` | Até vinte composições recentes | Implementação com build ou redesign |
| `design.md` ou `DESIGN.md` | Contrato visual portátil | Exportação solicitada ou escopo aprovado de várias páginas |
| JSON de design e CSS gerado | Tokens e resultado do gerador | Mudança de tokens dentro do escopo |
| Rotas e componentes indicados | Interface do site | Build ou redesign autorizado |

Cada entrada do histórico registra `date`, `macrostructure`, `theme`,
`enrichment` e `brief`. Temas personalizados acrescentam `theme_axes` e podem
informar `vibe`. Uma execução sobre várias páginas pode usar `scope: app`.
Se o JSON estiver inválido, o agente deve preservá-lo e informar o problema.
Esse histórico é escrito pelo agente conforme a skill, não por um comando
automático de design do CLI.

## Tokens e verificações técnicas

Em um projeto inicializado, valide a fonte dos tokens antes de gerar CSS.
A simulação permite conferir a operação antes da escrita:

```bash
astrofy tokens validate
astrofy tokens build --dry-run
astrofy tokens build
astrofy tokens check
astrofy check --rule design.schema
```

Os comandos usam os caminhos configurados pelo projeto. O Astrofy espera um
envelope próprio para os tokens, por isso uma exportação DTCG genérica precisa
ser adaptada antes de ser usada como entrada. O arquivo CSS gerado não deve
receber correções manuais que desapareceriam na geração seguinte.

O build do site e a inspeção no navegador completam essa conferência. A skill
prevê larguras de 320, 375, 414 e 768 pixels, além de desktop. Confira teclado,
foco, contraste, zoom, tema e redução de movimento conforme os componentes
alterados. Uma validação não executada precisa permanecer como pendência.
