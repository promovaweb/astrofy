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

## Erro recorrente

Não mude números ou nomes de oferta por parecerem incomuns. Consulte a fonte responsável.

## Conferência

O texto está legível e mantém o significado confirmado. Nenhuma incerteza factual foi convertida em afirmação inventada. Use `astrofy check --category editorial` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** texto completo, glossário, idioma, fontes factuais e componentes que o exibem.
- **Alteração sob teste:** Revise texto antigo respeitando a voz registrada e o glossário do projeto. Alterações de oferta e números exigem confirmação na fonte correspondente.
- **Falha e resultado esperado:** Corrigir um rótulo não deve mudar href ou nome de evento. Compare texto e atributos antes e depois da edição.
- **Comando complementar:** `astrofy check --category editorial`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
