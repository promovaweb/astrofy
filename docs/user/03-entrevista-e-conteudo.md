# Entrevista e conteúdo

A especialista pergunta somente o necessário para o tipo escolhido. Ela aceita
texto pronto, notas incompletas ou autorização para propor alternativas.

## Informações comuns

- finalidade e ação principal;
- público e contexto de chegada;
- áreas da página e ordem de leitura;
- títulos, textos, rótulos e mensagens de estado;
- imagens, vídeos, ilustrações e suas fontes;
- links, formulários e integrações;
- amostra de texto aprovada, tom desejado e expressões a preservar ou evitar;
- fatos que precisam de fonte;
- conteúdo ainda pendente.

## Como responder

Você pode responder uma etapa por vez. Use `aprovar`, `ajustar` ou `manter
pendente` para cada proposta. Quando fornecer um texto final, diga que ele deve
ser preservado. Quando quiser ajuda editorial, informe os fatos disponíveis e
o tom desejado. Você também pode fornecer uma amostra de texto aprovada ou
descrever como quer que a página soe. O Astrofy registra essa orientação para
as skills que vão implementar e revisar a copy.

Propostas escritas pelo agente permanecem como rascunho até sua aprovação.
Copy fornecida e aprovada não será reescrita apenas para caber no layout.

Áreas opcionais podem ficar pendentes. A aprovação final registra seu estado e
impede que uma lacuna seja preenchida silenciosamente durante a implementação.

## Conduza a entrevista na conversa

Responda às perguntas do agente na ordem apresentada. Você pode aprovar,
ajustar ou deixar uma área opcional pendente. O agente registra as respostas e
monta a especificação para sua revisão.

## Alternativa pelo CLI

Use estes comandos se quiser conduzir a mesma entrevista pelo terminal. Eles
não são necessários quando o agente conduz a conversa.

Inicie a entrevista informando o tipo da página:

```bash
astrofy page create --slug atlas --type product
astrofy page status --slug atlas
```

A saída apresenta até três itens em `nextQuestions`. Registre cada resposta
com o identificador recebido:

```bash
astrofy page answer --slug atlas --field title --value "Atlas"
astrofy page answer --slug atlas --field route --value /atlas/
```

O arquivo `interview.json` conserva respostas e lacunas. Quando todas as
entradas obrigatórias existem, o CLI gera `page-spec.json` com conteúdo, SEO,
integrações, acessibilidade e testes.

O schema atual do CLI não tem campos para amostras de voz. Registre a direção
confirmada na seção `Voz e redação` de `page.md` durante a revisão da
especificação.

## Exemplo curto

```text
Usuário: Quero uma página do produto Atlas.
Astrofy: A ação principal deve iniciar teste, solicitar demonstração ou comprar?
Usuário: Solicitar demonstração.
Astrofy: Vou propor três arquiteturas para uma página de produto orientada à demo.
```

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Coleta e aprovação do conteúdo de páginas |
| Autoridade | Contrato das entrevistadoras do Astrofy |
