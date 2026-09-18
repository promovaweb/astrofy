# Casos de criar seções

## Duas instâncias interativas

Renderize duas FAQs com perguntas de mesmo título. Abra uma pergunta da segunda
instância por teclado e confira que a primeira não muda. IDs, aria-controls e
listeners devem permanecer associados à instância correta.

## Seção sem mídia em coluna estreita

Use a mesma seção numa página ampla e numa coluna lateral, com texto longo e
sem slot de mídia. Confira ordem de leitura, ausência de coluna vazia e foco
visível nas ações. O breakpoint do viewport sozinho não comprova essa composição.

## Uso comum

Hero recebe title e description, com ações no slot padrão.

## Projeto existente

Adapte uma seção de FAQ existente preservando seus IDs e links de âncora.

## Erro recorrente

Não crie uma seção universal com dezenas de layouts condicionais. Separe composições que tenham responsabilidades diferentes.

## Conferência

A seção funciona em mais de um consumidor sem flags conflitantes nem conteúdo institucional inventado. Use `astrofy check --category components` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** seções consumidoras, componentes primitivos, conteúdo tipado e slots.
- **Alteração sob teste:** Extraia a seção de um consumidor real e valide um segundo uso com conteúdo diferente antes de acrescentar variações.
- **Falha e resultado esperado:** Duas FAQs na mesma página não podem repetir IDs. Links de âncora precisam chegar à pergunta correta e manter o foco visível.
- **Comando complementar:** `astrofy check --category components`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
