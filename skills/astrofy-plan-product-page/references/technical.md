# Referência técnica para página de produto

> Base técnica conferida para Astro 7.3.3 em 18/09/2026. Revise as APIs quando
> a versão instalada do Astro ou das integrações mudar.

## Campos próprios

- `product.stage`: `available`, `beta`, `waitlist` ou `concept`;
- `product.platforms`, `requirements`, `compatibility` e `support`;
- `useCases[]`: público, entrada, percurso e resultado;
- `features[]`: nome, descrição, disponibilidade e limite;
- `integrations[]`: nome, estado, direção dos dados e link;
- `demo`: screenshot, vídeo, sandbox ou documentação;
- `acquisition`: tipo, ação, destino e pré-requisitos.

## Arquiteturas úteis

**Orientada a casos de uso:** hero, casos, demonstração, recursos, integrações,
planos, FAQ e ação. Favorece produto com públicos ou tarefas claras.

**Orientada à demonstração:** hero, mídia principal, percurso, recursos,
compatibilidade, documentação e ação. Favorece interface ou ferramenta técnica.

**Orientada à adoção:** hero, instalação ou cadastro, primeiro resultado,
recursos, requisitos, suporte e ação. Favorece CLI, biblioteca e produto
self-service.

## Prontidão

O heading precisa dizer o que o produto é. O corpo explica para quem e para
qual uso. A ação corresponde ao estágio real. Recursos futuros recebem rótulo
de roadmap somente quando existe fonte autorizada.

Screenshot registra versão e função demonstrada. Integração registra se está
disponível, beta ou planejada. Compatibilidade técnica deve ser confirmada na
documentação ou implementação do produto.

## Encaminhamento técnico

Use `astrofy-images` para mídia, `astrofy-structured-data` para SoftwareApplication
quando os dados visíveis sustentarem o tipo e `astrofy-forms` para demo ou
waitlist. Instalação e snippets exigem conferência contra a versão publicada.
