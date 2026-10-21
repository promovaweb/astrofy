---
name: astrofy-design
description: Cria, estuda, audita e redesenha interfaces Astro com composição, temas, tipografia e movimento integrados ao design system do projeto.
---

# Astrofy Design

Use esta skill para projetar a aparência e a interação de páginas ou componentes.
Leia primeiro a [integração técnica](references/technical.md). As instruções
locais e os tokens existentes prevalecem sobre os exemplos da biblioteca.

## Modos de trabalho

As expressões abaixo são pedidos ao agente, não subcomandos do CLI Astrofy.

| Pedido | Entrada | Entrega |
| --- | --- | --- |
| `astrofy-design build` | Brief, conteúdo aprovado e arquivos do projeto | Interface implementada e conferida |
| `astrofy-design study` | URL ou imagem fornecida | Análise visual, sem alterar a página |
| `astrofy-design audit` | Página, componente ou diretório | Problemas localizados e correções sugeridas, sem edição |
| `astrofy-design redesign` | Interface existente e mudança desejada | Composição revisada com rotas e funcionalidades preservadas |

Sem verbo, use `build` quando o pedido for criar uma interface. Uma URL isolada
não autoriza copiar uma página ou substituir o projeto. Confirme se o objetivo
é estudo ou implementação quando isso não estiver explicado na conversa.

## Plano e execução

Apresente um plano curto com os arquivos envolvidos, a entrega e as verificações.
Informe o progresso ao concluir a leitura do projeto, a proposta de composição
e a conferência no navegador. No encerramento, informe alterações, comandos
executados e verificações que não puderam ser feitas.

1. Leia as instruções do projeto, o estado Git, as rotas, os componentes e a
   configuração `.astrofy/config/paths.json`, quando existir. Diferencie um
   componente isolado de uma página e de um conjunto de rotas.
2. Leia o contrato visual existente, o conteúdo aprovado e o histórico em
   `.astrofy/design/log.json`. A identidade compartilhada entre páginas tem
   prioridade sobre a rotação de temas entre projetos independentes.
3. Carregue o procedimento correspondente conforme a tabela seguinte. Leia
   apenas os temas, componentes e técnicas necessários ao trabalho atual.
4. Apresente a composição antes da implementação quando ainda houver escolhas
   abertas. Respeite o escopo autorizado e as preferências já registradas.
5. Implemente a camada visual na estrutura Astro existente. Preserve handlers,
   formulários, integrações, conteúdo aprovado e os imports globais de CSS.
6. Confira a página renderizada, os estados interativos e os tokens. Registre
   falhas observadas e o que foi corrigido, sem usar uma nota como aprovação.

| Modo | Leitura necessária |
| --- | --- |
| Criar | [Fluxo de composição](references/design-flow.md), [estrutura](references/structure.md) e [macroestruturas](references/macrostructures.md) |
| Estudar | [Análise de referências](references/study.md) e [especificação portátil](references/design-md.md), quando solicitada |
| Auditar | [Auditoria](references/verbs/audit.md), [padrões a evitar](references/anti-patterns.md) e [conferência visual](references/slop-test.md) |
| Redesenhar | [Redesign](references/verbs/redesign.md), [estrutura](references/structure.md) e [conferência visual](references/slop-test.md) |

## Integração e limites

A biblioteca técnica incorporada conserva o idioma de origem. Escreva as
entregas, a documentação e os comentários novos em Português do Brasil.
Preserve nomes de APIs, propriedades CSS e termos técnicos usados no projeto.

A orientação de copy da biblioteca não substitui as regras editoriais locais.
Não invente depoimentos, clientes, números ou resultados. Se o trabalho exigir
texto novo, siga o processo editorial do projeto antes de preencher a interface.

Os exemplos mostram possibilidades de composição. Não imponha fontes, cores,
movimento ou assimetria que contrariem a identidade aprovada ou a acessibilidade.
Não esconda overflow para simular responsividade. Corrija a largura do elemento
que ultrapassa a viewport. Não torne uma ação inacessível para manter o layout.

Em auditoria ou estudo, apresente o resultado na conversa. Grave um relatório
somente quando solicitado. A criação de `design.md` exige pedido de exportação
ou faz parte de um redesign de várias páginas já autorizado. Não sobrescreva
um contrato visual existente. Uma preferência confirmada não precisa ser
perguntada novamente por causa de uma sugestão da biblioteca.

## Validação final

Confira 320, 375, 414 e 768 pixels, além de uma largura desktop. Teste teclado,
foco, zoom, contraste, tema, estados de erro e `prefers-reduced-motion` conforme
o escopo. Se não houver navegador disponível, registre a conferência visual
como pendente. Uma leitura de HTML não comprova o resultado renderizado.

Execute os comandos declarados pelo projeto para build e verificações. Em
projetos inicializados com Astrofy, confira também os tokens e as regras de
design. Consulte os [casos de uso](examples/cases.md) e o
[contrato de entrega](references/contract.md).
