# Casos de revisar código

## Build sem checagem de tipos

Em fixture descartável, passe uma prop incompatível com o contrato de um
componente .astro. Compare build e astro check. Registre qual ferramenta detecta
o erro e corrija o consumidor, sem tratar compilação concluída como comprovação
de tipos corretos.

## Resposta externa malformada

Faça a API de teste retornar estrutura incompatível com o tipo esperado. A
validação deve rejeitar ou tratar o dado antes da renderização. Uma asserção
TypeScript não pode converter esse cenário em sucesso silencioso.

## Dependência consumida pela configuração

Escolha uma dependência usada por astro.config.* ou plugin de Markdown, sem
import nos componentes. A análise deve encontrá-la antes de sugerir remoção.
Confira também scripts e imports dinâmicos, preservando consumidores reais.

## Uso comum

Remova uma propriedade sem uso depois de conferir os consumidores.

## Projeto existente

Um site possui aliases próprios. Corrija o import sem substituir toda a configuração TypeScript.

## Erro recorrente

Não remova código apenas porque uma busca literal não achou uso. Rotas e imports dinâmicos exigem inspeção própria.

## Conferência

O código alterado passa nas verificações pertinentes e a revisão informa limitações concretas. Use `astrofy check --rule quality.types` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** tsconfig.json, scripts de check e teste, arquivos alterados e consumidores dinâmicos.
- **Alteração sob teste:** Preserve aliases e APIs públicas ao reduzir duplicação. Uma atualização de dependência exige escopo próprio e consulta do guia da versão correspondente.
- **Falha e resultado esperado:** Um import com caixa incorreta pode passar localmente e falhar em Linux. Confira o nome exato no Git e teste em ambiente sensível a maiúsculas.
- **Comando complementar:** `astrofy check --rule quality.types`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
