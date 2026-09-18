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
- fatos que precisam de fonte;
- conteúdo ainda pendente.

## Como responder

Você pode responder uma etapa por vez. Use `aprovar`, `ajustar` ou `manter
pendente` para cada proposta. Quando fornecer um texto final, diga que ele deve
ser preservado. Quando quiser ajuda editorial, informe os fatos disponíveis e
o tom desejado.

Áreas opcionais podem ficar pendentes. A aprovação final registra seu estado e
impede que uma lacuna seja preenchida silenciosamente durante a implementação.

## Estado retomável no CLI

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
