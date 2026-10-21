# Execução e validação

O plano (capítulo 4) indica a skill principal de cada tarefa. O agente
executa, uma tarefa por vez, as skills que se aplicam ao escopo aprovado
— ele não dispara todas de uma vez nem decide sozinho pular uma etapa
que a tarefa pede. Uma sequência possível de aplicação usa:

1. `astrofy-architecture`, `astrofy-routing` e `astrofy-config` para a
   base — rota, estrutura de pastas e configuração pública.
2. `astrofy-components`, `astrofy-sections` e `astrofy-page-design` para
   a interface — o que a página mostra e como se organiza.
3. `astrofy-images`, `astrofy-forms` ou `astrofy-react` conforme a
   página exigir — mídia, formulário ou interação que precise de
   hidratação.
4. `astrofy-accessibility`, `astrofy-seo`, `astrofy-open-graph` e
   `astrofy-structured-data` para qualidade pública — o que torna a
   página utilizável e descobrível, não só visualmente correta.
5. `astrofy-editorial-review` quando uma tarefa criar ou alterar texto
   visível. Essa skill pode auditar sem editar, ou corrigir a copy
   dentro do escopo aprovado na entrevista — ela não tem autorização
   para mudar o que foi decidido no capítulo 3, só para corrigir
   linguagem, voz e alegações dentro desse limite.
6. `astrofy-testing`, `astrofy-documentation` e `astrofy-checkup` para
   fechar o trabalho — confirmar que o comportamento esperado está
   coberto por teste e que a documentação do projeto reflete o que
   mudou.

Essa ordem não é arbitrária: cada camada depende da anterior existir
primeiro. Revisar acessibilidade antes de a interface existir, ou
revisar SEO antes do conteúdo final estar aplicado, produziria uma
avaliação sobre algo que ainda vai mudar.

Cada skill lê a tarefa (hoje, uma sitespec — capítulos 4 e 8), confere a
implementação atual contra o que a tarefa descreve, registra o que
alterou e atualiza o estado. Se você preferir acompanhar isso pelo
terminal em vez de deixar o agente conduzir, use `apply` para marcar o
início e a conclusão de cada tarefa:

```bash
astrofy apply --slug atlas
astrofy apply --slug atlas --task route --status completed
```

O primeiro comando, sem `--task`, seleciona automaticamente a tarefa a
iniciar — a que já está `in_progress`, ou a primeira `draft` sem
dependência pendente (`blockedBy` vazio). O segundo marca `route` como
concluída: isso grava `status: done` na sitespec e marca cada item da
checklist dela como `[x]`, e libera `content` (que dependia de `route`)
para começar. O capítulo 7 detalha todos os estados e o que cada
transição exige.

## Conferência mínima

```bash
npm run check
npm run build
astrofy check --root .
astrofy check --root . --browser
```

`npm run check` e `npm run build` são do próprio projeto Astro, não do
Astrofy — rode-os sempre, independente do que o Astrofy reporta, porque
eles detectam erro de tipo e falha de build que nenhuma skill substitui.

O primeiro `astrofy check` não abre navegador: ele avalia regras
estáticas (estrutura, configuração, metadados presentes no HTML
renderizado). A opção `--browser` inclui Chromium e confere
comportamento que só existe em runtime — tema persistente, overflow em
larguras diferentes, responsividade real, erros de JavaScript durante o
carregamento. Rodar sem `--browser` primeiro é mais rápido para iterar;
rodar com `--browser` antes de considerar a tarefa concluída é o que
confirma que o comportamento, não só a estrutura, está correto.

## O que fica para revisão manual, e como registrar o resultado

Nem toda verificação pode ser automática. O agente executa os checks
aplicáveis e informa explicitamente o que ainda precisa de revisão
manual — ele não declara uma tarefa concluída com uma pendência dessas
em aberto. Revise a página no navegador em larguras de celular e
desktop, não só numa. Formulários, menus, foco de teclado, links e
mensagens de erro exigem interação real: um check estático pode
confirmar que um atributo existe, mas não que o formulário de fato
funciona quando você preenche e envia.

Depois de confirmar visualmente, registre o resultado — não deixe a
confirmação só na sua cabeça ou na conversa, porque isso se perde entre
sessões. Use `astrofy tui` (tecla `m`, dentro da aba Itens) quando
estiver num terminal interativo, ou `astrofy review` quando não
estiver — por exemplo, num script, ou quando você (ou um agente de IA
sem terminal interativo) está registrando o resultado de uma verificação
feita em outro lugar:

```bash
astrofy review --rule accessibility.alternatives --page /produtos/atlas/ --status passed --reviewer "QA" --reason "Alt text confere com a imagem publicada."
```

`--rule` identifica a regra avaliada; `--page` ou `--component`
desambiguam quando a mesma regra se aplica a mais de uma rota ou
componente — uma regra de escopo `project`, que vale para o site inteiro,
não precisa de nenhum dos dois. `--reviewer` e `--reason` são
obrigatórios e não podem ficar vazios: o registro existe justamente para
que a pessoa indicada em `--reviewer` explique a conferência realizada.

Uma regra `automatic` não aceita esse registro manual — ela só é
aprovada pelo próprio verificador, dentro de `astrofy check`. Isso evita
que uma verificação que deveria ser objetiva seja aprovada por
julgamento humano só porque é mais rápido.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Procedimental |
| Escopo | Execução das fases e fechamento técnico |
| Autoridade | Skills técnicas e checklist do Astrofy |
