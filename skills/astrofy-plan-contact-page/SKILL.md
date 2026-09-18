---
name: astrofy-plan-contact-page
description:
  Entrevista a pessoa sobre finalidade, campos, consentimento, envio e retorno
  para definir páginas de contato, orçamento e demonstração.
---

# Definir página de contato

Use para contato geral, orçamento, diagnóstico, demonstração ou suporte. O
formulário deve pedir somente dados usados pelo fluxo declarado.

## Entrevista

1. Confirme motivo do contato e quem recebe cada tipo de mensagem.
2. Colete campos, obrigatoriedade, formato, ajuda e validação.
3. Confirme consentimento, política de privacidade e retenção informada.
4. Registre endpoint, Astro Action, serviço externo ou alternativa atual.
5. Defina carregamento, sucesso, erro, nova tentativa, duplicidade e ausência de
   JavaScript.
6. Confirme prazo de resposta publicado e canais alternativos.

Apresente três formatos: formulário único, seleção por assunto ou contato com
agendamento. Leia a [referência de contato](references/technical.md) e os
[casos](examples/cases.md).

## Saída

Entregue fragmento `type: contact` com finalidade, campos, consentimento,
destino, estados, alternativas e pendências. Não teste envio real sem ambiente
e autorização adequados.
