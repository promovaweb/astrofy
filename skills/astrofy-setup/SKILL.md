---
name: astrofy-setup
description: Inicia o trabalho em um projeto Astro, mapeia sua implementação e coordena as skills Astrofy para organizar, documentar e validar o projeto existente.
---

# Iniciar o trabalho no projeto Astro

Use esta skill como entrada inicial. Sua execução coordena a biblioteca; cada
especialista conserva a responsabilidade por sua implementação e validação.

## Reconhecimento

1. Identifique a raiz do aplicativo em package.json e astro.config.*. Em
   workspace, diferencie o aplicativo da raiz que contém o lockfile.
2. Leia instruções locais e estado Git. Registre rotas, layouts, coleções,
   integrações, adaptador, CSS, scripts e versões resolvidas sem importar
   configuração executável para inspecioná-la.
3. Consulte o catálogo instalado e leia as skills selecionadas antes de usá-las.
   Ausência de uma skill deve aparecer como pendência; não presuma execução.
4. Execute `astrofy setup --root <projeto>` para criar ou atualizar
   `.astrofy/setup-state.json`. Leia `changedFiles` antes de retomar etapas já
   concluídas.

## Coordenação

Leia o [roteamento da biblioteca](references/technical.md) e o
[grafo executável](references/workflow.json) distribuído pelo Astrofy para considerar
todas as skills e os [casos de adoção](examples/cases.md) para conferir retomada
e recursos ausentes.

Execute astrofy-init para adotar os contratos sem substituir o site. Depois,
use astrofy-architecture para mapear responsabilidades, astrofy-config para
localizar fontes de configuração e astrofy-documentation para documentar o
estado observado. Não transforme um diagnóstico em refatoração indiscriminada.

Selecione especialistas pelos recursos presentes: MDX e blog para coleções;
components e component-docs para API de UI; design-system, tailwind e themes
para estilos; routing e i18n para URLs; react e forms para interação. Inclua
as demais skills quando o assunto da tarefa e a implementação pedirem.

Quando a pessoa pedir uma página sem conteúdo e arquitetura aprovados, encaminhe
para astrofy-page-planner. Ela seleciona a entrevistadora de vendas, produto,
serviço, Home, Sobre, Contato ou Preços. Depois da aprovação da especificação,
astrofy-implementation-planner cria as fases e tarefas para as especialistas
técnicas. Não pule da solicitação curta para a implementação.

Para cada etapa, confirme que as saídas de `dependsOn` existem, informe arquivos
envolvidos, execute o procedimento da skill, registre status e `updatedAt` no
estado e forneça as saídas à próxima etapa. Não execute
especialistas com entradas ainda ausentes. A coordenação pode ocorrer no mesmo
agente; não exige subagentes nem execução paralela.

Finalize com astrofy-markdown sobre a documentação alterada e astrofy-checkup
no escopo avaliado. Documente comandos executados, rotas verificadas, falhas e
etapas não aplicáveis. Publicação e migração de major dependem do escopo pedido.
