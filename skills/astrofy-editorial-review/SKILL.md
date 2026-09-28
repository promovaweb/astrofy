---
name: astrofy-editorial-review
description:
  Audita e revisa linguagem, voz e alegações em conteúdo visível de sites Astro,
  sem presumir autoria por estilo e preservando os fatos confirmados.
---

# Revisar texto visível

## Entradas

Leia o texto completo, o objetivo da página, o glossário, o idioma, as fontes
factuais e os componentes que exibem o conteúdo. Consulte as regras editoriais
e a amostra de voz do projeto, se existirem. Use os caminhos definidos em
`.astrofy/config/paths.json` quando diferirem dos exemplos. Confira a versão
instalada no lockfile e em node_modules antes de aplicar APIs da documentação
online.

## Execução

Separe correção linguística de alteração de fatos. Preserve código inline, nomes
de propriedades, URLs, citações literais e escolhas intencionais de voz.

### Modo de trabalho

- **Auditoria:** use quando a pessoa perguntar se um texto parece genérico,
  artificial ou escrito por IA, ou pedir uma avaliação sem edição. Não altere
  arquivos. Cite cada trecho relevante, nomeie o padrão, explique seu efeito e
  recomende uma ação. Não infira autoria humana ou automática.
- **Edição:** use quando a pessoa pedir correção ou reescrita. Aplique somente
  as mudanças necessárias para clareza, precisão e voz. Preserve o sentido e os
  fatos. Registre trechos sem fonte para confirmação, sem preenchê-los.
- Se o pedido não deixar claro se a pessoa quer diagnóstico ou edição, apresente
  primeiro o diagnóstico e não modifique a página silenciosamente.

Leia a página inteira antes de editar. Corrija ortografia, concordância,
nomenclatura e frases difíceis de entender. Revise também os sinais de texto
genérico abaixo. Trate cada sinal como uma pergunta para investigar. Um item
isolado não demonstra uso de IA nem exige reescrita. Considere o objetivo, o
gênero da página e a voz aprovada pelo projeto.

### Revisão de linguagem genérica

Procure ocorrências e conjuntos de sinais como estes:

- Vocabulário amplo que promete transformação sem explicar a função real do
  produto. Prefira descrever uma ação, recurso ou resultado confirmado.
- Superlativos, autoridade vaga, depoimentos ou números sem fonte. Confirme a
  origem, peça a informação que falta ou remova a alegação.
- Aberturas que anunciam o assunto em vez de apresentá-lo, intimidade
  encenada, transições que só ocupam espaço e encerramentos otimistas sem uma
  informação nova.
- Trincas repetidas, contrastes prontos, frases curtas em série, slogans com
  tom de máxima e intervalos que juntam pontos sem relação real.
- Variação de sinônimos que troca precisão por novidade, além de abstrações
  descritas como se pensassem, quisessem ou escolhessem.
- Voz passiva que omite uma pessoa ou equipe conhecida, ênfase recorrente em
  caixa alta, aspas sem função, excesso de negrito, emojis decorativos e
  qualificadores empilhados.
- Frases de preenchimento que podem sair sem mudar a informação ou a ação
  esperada da pessoa.

Leia também a página como um conjunto. Sinais recorrentes em headings,
aberturas, parágrafos e CTAs podem revelar um molde repetido mesmo quando cada
trecho parece aceitável sozinho. Procure benefícios sem mecanismo, explicações
que repetem o mesmo ponto e seções com a mesma cadência. Corte o que não
acrescenta função; não crie variação só para deixar a página irregular.

Esses sinais orientam a leitura, não formam uma lista de palavras proibidas.
Não marque uma frase só por usar vocabulário formal, uma construção passiva,
uma lista de três itens, aspas, caixa alta ou uma frase curta. Confira se a
escolha combina com o contexto e se aparece junto de outros sinais. Preserve
detalhes incomuns confirmados, humor, tensão, apartes e variações de ritmo que
pertençam à voz do projeto.

Não torne o texto neutro para remover padrões. Se a voz aprovada usar uma
expressão recorrente, uma frase fragmentada ou uma escolha de pontuação de
propósito, preserve-a. Se houver dúvida sobre uma característica marcante,
apresente o trecho e confirme com a pessoa responsável antes de apagar essa
marca.

Ao corrigir, prefira mudanças pequenas que recuperem sujeito, ação, contexto e
informação concreta. Não invente nomes, números, datas, depoimentos, recursos,
fontes ou resultados para deixar a frase mais específica. Se faltar informação,
peça a fonte, marque o trecho para confirmação ou mantenha uma formulação
limitada ao que já se sabe.

### Como reescrever sem deixar a copy com outra voz

1. Resuma a função do trecho em uma frase para você. Se ele apenas anuncia,
   elogia ou recapitula o que já está claro, corte-o.
2. Para cada benefício, procure a ação do produto e o efeito confirmado que o
   explicam. Se a fonte não explicar isso, marque a lacuna em vez de completar
   a promessa.
3. Reorganize o raciocínio conforme a ideia. Não force todas as seções a abrir
   com uma tese, seguir com três benefícios e terminar com uma chamada.
4. Compare a revisão com amostras aprovadas do projeto. Observe vocabulário,
   formalidade, pessoa, ritmo e pontuação. Imite esses traços, sem copiar
   frases nem importar a voz de outro autor.
5. Leia a página em voz alta. Se várias frases tiverem o mesmo tamanho e
   desenho, varie a construção apenas onde isso deixar o raciocínio mais
   natural. Uma fala coloquial inventada ou um erro proposital não torna a
   copy autêntica.
6. Faça uma última leitura procurando frases que poderiam servir a qualquer
   empresa. Corte-as ou ancore-as num recurso, ação, limite ou exemplo
   confirmado. Se não houver esse material, mantenha a lacuna visível.

### Ciclo de revisão

1. Leia a página inteira e anote o objetivo, a voz e as fontes usadas.
2. Localize trechos que confundem, exageram ou repetem sinais de texto
   genérico. Explique a função que o trecho deveria cumprir.
3. Confira nomes, números, ofertas, depoimentos e resultados nas fontes do
   projeto. Separe lacunas factuais das correções de linguagem.
4. Reescreva apenas o que melhorar clareza ou precisão. Preserve intenção,
   significado, fatos, código e voz.
5. Leia o texto corrigido no contexto da página. Confira a rota renderizada,
   os links, os headings, as mensagens e os nomes acessíveis afetados.
6. Compare o conteúdo completo com a voz aprovada e releia as transições entre
   seções. Relate o que mudou e o que ainda precisa de confirmação.

### Sequência específica

1. Extraia texto visível sem alterar código, URLs, datas ou identificadores.
2. Compare nomes próprios, termos do produto e fatos com as fontes fornecidas.
3. Corrija somente ocorrência confirmada e preserve a direção editorial.
4. Renderize a rota e revise texto no contexto da interface.
5. Confira mensagens, alt e nomes acessíveis além da prosa inicial. Ao alterar
   heading, verifique seus fragmentos e consumidores.
6. Separe validação de schema, compilação MDX e conferência factual conforme
   o trecho alterado. Não considere lint como comprovação do conteúdo.

### Alteração de implementação existente

Revise texto antigo respeitando a voz registrada e o glossário do projeto.
Não altere oferta, números, nomes ou promessas sem confirmar a fonte
correspondente. Uma ocorrência isolada de um padrão não justifica mudar a voz
nem rotular a origem do texto.

## Verificação

Corrigir um rótulo não deve mudar href ou nome de evento. Compare texto e
atributos antes e depois da edição.

O texto está legível, mantém o significado confirmado e representa a voz
aprovada. As alegações conferidas têm fonte, e os sinais identificados foram
avaliados no contexto. Nenhuma lacuna foi preenchida com informação inventada.

Em auditoria sem edição, entregue os trechos avaliados, os padrões encontrados,
seu efeito na leitura e as correções sugeridas. Informe também quais trechos
foram preservados por funcionarem no contexto.

```bash
astrofy check --category editorial
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.

Esta revisão aproveita ideias do projeto
[anti-slop](https://github.com/miqdadbadjuber/anti-slop), reescritas para o
escopo do Astrofy e subordinadas à voz e às regras editoriais de cada projeto.
