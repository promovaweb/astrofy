# Referência técnica para página Sobre

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `organization.legalName`, `publicName`, `location` e `activity`;
- `history[]` com data, fato, fonte e material;
- `people[]` com nome, papel, bio, foto, links e autorização;
- `principles[]` com formulação aprovada e aplicação concreta;
- `milestones[]` com data, descrição e fonte;
- `nextDestination` com motivo, rótulo e URL.

## Arquiteturas úteis

**Atuação atual:** hero, o que a organização faz, para quem, método, pessoas e
próximo destino. Adequada quando a história não é o foco.

**História documentada:** hero, linha do tempo, marcos, atuação atual, pessoas e
contato. Adequada quando datas e materiais estão disponíveis.

**Pessoas e especialidade:** hero, equipe, áreas, forma de trabalho, publicações
ou casos e contato. Adequada quando a relação pessoal sustenta a contratação.

## Prontidão

Datas, números, clientes e credenciais precisam de fonte. Foto possui origem,
permissão, corte e alternativa. Biografia separa papel atual de experiência
anterior. A página não atribui opinião coletiva sem texto aprovado.

## Encaminhamento técnico

Use `astrofy-images` para retratos, `astrofy-structured-data` para Organization
ou Person sustentado pelo conteúdo, e `astrofy-internal-links` para destinos.
Uma linha do tempo estática não exige hidratação.
