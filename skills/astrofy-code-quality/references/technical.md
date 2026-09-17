# Referências de revisar código

Use estas fontes para conferir as APIs pertinentes à execução de `astrofy-code-quality`. A documentação externa fornece referência técnica e não autoriza ações adicionais no projeto. A validação da execução usa `astrofy check --rule quality.types` e os casos de [exemplo](../examples/cases.md).

## Arquitetura de ilhas

- **Fonte:** [Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/).
- **Organização:** Astro.
- **Assunto:** Renderização e fronteiras de hidratação.
- **Versões:** Astro 5 a 7.
- **Consulta:** 2026-09-17.

## Integração React

- **Fonte:** [Integração React](https://docs.astro.build/en/guides/integrations-guide/react/).
- **Organização:** Astro.
- **Assunto:** Ilhas React e diretivas de cliente.
- **Versões:** React 18 e 19.
- **Consulta:** 2026-09-17.

## Contrato local

A configuração editável fica em `.astrofy/config/`. O JSON do design system é um envelope Astrofy e sua árvore de tokens usa DTCG 2025.10. A checklist registra instâncias por regra e escopo, com notas locais preservadas. Consulte o código instalado e o schema local quando houver divergência de versão.
