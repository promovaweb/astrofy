# Referência técnica de astrofy-checkup

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia policies.json, checks.json, paths.json, checklist e relatórios citados.

Selecione escopo antes de executar. Observe trustedExecution e baseUrl.
Diferencie falha de regra, execução incompleta e item manual pendente.

## Alteração compatível

Reconcilie catálogo preservando notas e histórico. Alteração de entrada invalida
avaliação anterior; dispensa muda política, não aprova o resultado.

## Diagnóstico

Uma regra manual pendente não pode receber passed por scanner. Sem build atual,
um relatório não deve afirmar validação do HTML publicado.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Execução de checks

status reconcilia catálogo em memória sem executar scripts. check changed cobre
apenas entradas alteradas desde a última execução e não representa o site
completo. Preview ausente deixa checagem de navegador incompleta.

Código 0 segue a política selecionada; leia relatório e método de cada regra
antes de interpretar o resultado.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[JSON Schema](https://ajv.js.org/json-schema.html):** dialeto JSON Schema e
  validação Ajv; consulte ao diagnosticar campos recusados.
- **[documentação para checkup](https://docs.astro.build/en/guides/testing/):**
  integração de testes ao Astro; selecione runner e camada conforme o
  comportamento.
- **[Assertions do Playwright](https://playwright.dev/docs/test-assertions):**
  assertivas com espera pelo estado; consulte ao testar atualizações
  assíncronas.

## Interpretação de resultado e política

Consulte o catálogo instalado antes de escolher rule ou category. Nome de skill
e ID de regra são identificadores diferentes. O relatório pode conter passed,
failed, blocked, pending ou not_applicable; leia a justificativa e o método da
regra, além do código de saída do processo.

```bash
astrofy status --root apps/site --json
astrofy check --root apps/site --rule links.broken --page /artigo/ --json
astrofy check --root apps/site --changed --json
astrofy report --root apps/site --markdown --output .astrofy/reports/resumo.md
```

Adapte a rota ao projeto. status recalcula a validade em memória; não executa o
site nem grava aprovação. check registra resultados no escopo escolhido.
--changed reduz a avaliação às entradas alteradas; não equivale a uma revisão
completa. Confira a cobertura por regra e escopo antes de resumir o site.

Checks que executam scripts dependem de checks.trustedExecution; navegador
precisa de preview compatível com checks.baseUrl. Leia scripts antes de
habilitar execução. Não habilite essa opção durante uma inspeção sem pedido de
executar o projeto. Um build que falha impede usar HTML anterior como resultado
atual; não apague a falha para aproveitar relatórios antigos.

Use a revisão manual da TUI para regras manuais ou híbridas com responsável e
justificativa do que foi observado. Não altere method nem status no JSON para
simular aprovação. Uma exceção com prazo afeta a política de saída, mas conserva
o resultado original e suas notas. Após alterar uma entrada, a avaliação
anterior pode perder validade e exigir nova execução.

## Identidade do artefato avaliado

Registre raiz do pacote, versão instalada do Astrofy, configuração selecionada
e saída de build usada. Em workspace, dois aplicativos podem ter rotas iguais;
o caminho do pacote faz parte do escopo do resultado.

Confira se baseUrl serve o artefato esperado, incluindo base e ambiente. Um
servidor respondendo na porta configurada pode pertencer a outro projeto ou a
um build anterior. Verifique uma rota ou marcador identificável antes de
interpretar o resultado do navegador.

Não confunda arquivo de relatório existente com execução atual. Compare o
escopo registrado e as entradas relevantes. Ao corrigir um componente comum,
confira consumidores atingidos; validar apenas a página inicialmente citada
pode deixar outras variantes sem avaliação.

## Leitura dos achados

Para cada falha, identifique regra, instância, entrada examinada e condição que
o verificador observou. Diferencie ausência de recurso esperado de ausência
de pré-condição para executar a regra. Não marque not_applicable apenas porque
o teste não pôde rodar.

Em regras híbridas, confira qual parte foi automatizada e qual observação ainda
depende de revisão. Screenshot, código de saída e nota humana não são substitutos
intercambiáveis: cada registro precisa sustentar a propriedade avaliada.

Depois de corrigir, execute novamente o escopo afetado e preserve a comparação
com o resultado anterior. Se uma exceção expirou, reavalie sua aplicação pela
política atual sem apagar o histórico para obter uma checklist limpa.

## Entrega do relatório

Informe conjunto avaliado, ambiente, falhas, revisões pendentes e partes não
executadas. Uma amostra de rotas não autoriza concluir sobre todas as páginas.
O relatório exportado deve apontar para resultados que continuam disponíveis,
sem incluir credenciais ou dados pessoais coletados durante os testes.

## Fontes e limites do check-up

- **[Testes no Astro](https://docs.astro.build/en/guides/testing/):** consulte
  quando um achado exigir teste específico do projeto além do check.
- **[Assertions do Playwright](https://playwright.dev/docs/test-assertions):**
  use para converter uma falha observável em teste de navegador reproduzível.

O schema e o catálogo distribuídos com a versão instalada definem os campos
aceitos. A documentação externa não define os estados internos do Astrofy.
