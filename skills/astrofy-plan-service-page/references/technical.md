# Referência técnica para página de serviço

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `service.scope`, `deliverables`, `exclusions`, `format` e `duration`;
- `process[]` com etapa, entrada, atividade, saída e participante;
- `responsibilities.provider[]` e `responsibilities.client[]`;
- `commercial.model`, `price`, `payment`, `reschedule` e `cancellation`;
- `qualification.fields`, `destination` e `nextStep`;
- `proof[]` com fonte e autorização.

## Arquiteturas úteis

**Diagnóstico primeiro:** hero, situações, entregas, processo, para quem serve,
casos, FAQ e solicitação. Use para escopo ajustado após conversa.

**Pacote definido:** hero, resultado, itens incluídos, cronograma, preço,
responsabilidades, FAQ e contratação. Use para serviço repetível.

**Especialidade e casos:** hero, atuação, método, casos, entregas, processo e
contato. Use quando a confiança depende de experiência demonstrável.

## Prontidão

A página precisa distinguir resultado, entregáveis e atividades. Prazo depende
das entradas do cliente quando isso for verdadeiro. O formulário não deve pedir
dado que não participa da qualificação ou do atendimento.

Caso publicado precisa informar alcance permitido. Logos e nomes dependem de
autorização. Um resultado anterior não vira promessa para toda contratação.

## Encaminhamento técnico

Agenda externa exige URL e retorno. Formulário usa `astrofy-forms`. Processo
pode usar seção ordenada sem JavaScript. Dados estruturados usam Service apenas
quando nome, provedor e área atendida aparecem no conteúdo visível.
