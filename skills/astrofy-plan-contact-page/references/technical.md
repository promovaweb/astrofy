# Referência técnica para página de contato

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `contactPurpose` e `recipients[]`;
- `fields[]` com nome, tipo, label, ajuda, obrigatoriedade e validação;
- `consent[]` com texto, documento e obrigatoriedade;
- `submission.kind`, `destination`, `method` e `authorization`;
- `states.loading`, `success`, `error`, `retry` e `duplicate`;
- `responseTime` e `alternatives[]`.

## Arquiteturas úteis

**Formulário direto:** introdução, formulário, prazo e alternativas. Use para
um único fluxo.

**Escolha por assunto:** introdução, categorias, formulário adaptado e canais.
Use quando destinos ou campos variam por motivo.

**Agendamento:** introdução, qualificação, agenda, preparação e alternativa.
Use quando a conversa depende de horário reservado.

## Prontidão

Cada campo possui finalidade operacional. Erro identifica o que a pessoa pode
corrigir sem apagar os demais valores. Sucesso aparece apenas após resposta
aceita. Prazo de retorno só entra quando foi confirmado.

Honeypot, rate limit, CAPTCHA ou serviço antispam pertencem ao plano técnico;
a entrevista registra necessidade e restrições. Segredo nunca entra na
especificação pública.

## Encaminhamento técnico

`astrofy-forms` escolhe Action, endpoint ou integração conforme o projeto;
`astrofy-security` revisa entrada e segredo; `astrofy-accessibility` confere
labels, mensagens, foco e anúncios; `astrofy-testing` cobre sucesso e falha.
