# Casos de revisar texto visível

## Mesmo termo na prosa e no código

Prepare um parágrafo com erro confirmado e um bloco de código contendo a mesma
sequência como identificador. Corrija apenas a prosa. Compare o diff e compile
o MDX para conferir que imports, expressões e código permaneceram válidos.

## Heading corrigido com link de entrada

Corrija um título e gere o HTML novamente. Confira o ID emitido e um link vindo
de outra página. Atualize o consumidor ou preserve o identificador estável
conforme o contrato da rota; corrigir grafia não deve deixar âncora quebrada.

## Mensagem de envio pendente

Leia a mensagem associada a resposta assíncrona de um formulário. Se o servidor
apenas aceitou processamento, o texto não pode afirmar entrega concluída.
Confira a mensagem no estado renderizado e seu anúncio acessível.

## Uso comum

Corrija o rótulo de um botão sem alterar o destino do link.

## Projeto existente

Preserve uma expressão técnica do glossário ao revisar um artigo antigo.

## Conjunto de sinais de texto genérico

Revise uma página que combina promessa ampla, transições repetidas e
encerramento sem informação nova. Mostre os trechos, explique o efeito e
reescreva somente o que não cumpre uma função no contexto. Confirme alegações
nas fontes antes de acrescentar qualquer detalhe.

## Benefício sem mecanismo

Avalie a frase: `Nossa plataforma transforma a rotina e gera mais resultado.`
Confirme o que o produto realmente faz. Se a documentação confirmar apenas a
exportação de pedidos para CSV, uma correção possível é: `Exporte os pedidos
para CSV e abra o arquivo no sistema financeiro.` Não use essa reescrita sem a
mesma confirmação. Se a fonte não explicar o benefício, registre a pergunta
necessária em vez de inventar uma função.

## Molde repetido na página inteira

Leia headings, aberturas e CTAs de uma página com várias seções. Se cada bloco
repetir a mesma promessa e chamada, identifique a repetição do conjunto e a
função de cada seção antes de editar. Preserve uma sequência parecida quando
ela ajudar a leitura; varie apenas os blocos que repetem conteúdo sem motivo.

## Falso positivo de voz

Revise uma página com uma frase curta intencional, uma expressão recorrente da
marca e uma lista de três recursos. Preserve os trechos que funcionam no
contexto e explique por que esses sinais isolados não exigem correção. Não
classifique autoria humana ou automática pelo estilo.

## Auditoria sem edição

A pessoa pergunta se uma página parece escrita por IA, mas não pede mudanças.
Não salve alterações. Liste os trechos, nomeie os padrões, explique o efeito
na leitura e sugira uma ação. Não atribua autoria com base no estilo.

## Erro recorrente

Não mude números ou nomes de oferta por parecerem incomuns. Consulte a fonte responsável.

## Conferência

O texto está legível e mantém o significado confirmado. Nenhuma incerteza factual foi convertida em afirmação inventada. Use `astrofy check --category editorial` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** texto completo, glossário, idioma, fontes factuais e componentes que o exibem.
- **Alteração sob teste:** Revise texto antigo respeitando a voz registrada e o glossário do projeto. Alterações de oferta e números exigem confirmação na fonte correspondente.
- **Falha e resultado esperado:** Corrigir um rótulo não deve mudar href ou nome de evento. Compare texto e atributos antes e depois da edição.
- **Comando complementar:** `astrofy check --category editorial`.

## Regressão de revisão anti-slop

- **Arquivos envolvidos:** Texto da página, voz registrada, glossário e fontes factuais.
- **Alteração sob teste:** Remova uma promessa sem fonte e transições vazias, mantendo uma frase curta intencional e a expressão aprovada pela marca.
- **Falha e resultado esperado:** A revisão não deve substituir a voz por prosa neutra, atribuir autoria com base no estilo ou inventar um resultado para tornar a oferta mais concreta.
- **Comando complementar:** `astrofy check --category editorial`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
