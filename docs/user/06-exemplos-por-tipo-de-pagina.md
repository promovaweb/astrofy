# Exemplos por tipo de página

Os exemplos abaixo mostram o pedido, as respostas centrais, a arquitetura
aprovada e o foco do plano técnico. Nomes e textos são ilustrativos.

## Landing page de vendas

**Pedido:** “Quero vender a formação Operação DevOps.”

**Respostas centrais:** profissionais de desenvolvimento; inscrição como ação
principal; turma com data e vagas; depoimentos autorizados; pagamento externo.

**Arquitetura:** hero com oferta, transformação esperada, programa, formato,
instrutor, depoimentos, preço, perguntas frequentes e chamada final.

**Plano técnico:** rota da campanha, componentes de prova e preço, integração
do checkout, eventos da ação principal, metadados e testes do percurso.

## Página de produto

**Pedido:** “Quero criar uma página para o Atlas, nosso produto de
atendimento.”

**Respostas centrais:** equipes de suporte; demonstração como ação principal;
capturas reais do produto; integrações confirmadas pela documentação.

**Arquitetura:** hero, problemas atendidos, casos de uso, recursos, demonstração
visual, integrações, perguntas frequentes e chamada final.

**Plano técnico:** rota `/atlas/`, seções reutilizáveis, formulário de
demonstração, imagens responsivas, `SoftwareApplication` em JSON-LD e testes.

## Página de serviço

**Pedido:** “Preciso apresentar nossa consultoria de modernização.”

**Respostas centrais:** empresas com aplicações legadas; diagnóstico como ação;
escopo por etapas; entregas e responsabilidades explícitas; contato comercial.

**Arquitetura:** cenário atendido, resultados, entregas, processo, requisitos do
cliente, equipe, casos relacionados, perguntas e contato.

**Plano técnico:** composição com componentes existentes, formulário com
qualificação, confirmação de envio, metadados `Service` e teste dos estados.

## Página inicial

**Pedido:** “Quero reorganizar a Home para explicar a empresa.”

**Respostas centrais:** três públicos; produto como destino principal; serviços
e conteúdos como rotas secundárias; mensagem institucional já aprovada.

**Arquitetura:** proposta central, caminhos por público, produto em destaque,
serviços, recursos recentes, comprovação institucional e contato.

**Plano técnico:** revisão da rota inicial, navegação, seções compartilhadas,
ordem responsiva, links internos, metadados da organização e regressão visual.

## Página Sobre

**Pedido:** “Quero uma página Sobre que conte nossa trajetória.”

**Respostas centrais:** fatos documentados; marcos com datas; pessoas com
autorização; princípios descritos por ações; contato para imprensa.

**Arquitetura:** atuação atual, história, marcos, pessoas, princípios, presença
pública e canais institucionais.

**Plano técnico:** conteúdo estruturado, imagens com texto alternativo, schema
`Organization`, links para fontes públicas e revisão de todas as afirmações.

## Página de contato

**Pedido:** “Quero separar suporte de oportunidades comerciais.”

**Respostas centrais:** dois destinos; campos mínimos por assunto;
consentimento; prazo de retorno informado; email como canal alternativo.

**Arquitetura:** escolha do assunto, formulário adaptado, orientações de
privacidade, mensagens de envio, prazo de retorno e canais alternativos.

**Plano técnico:** validação no cliente e servidor, proteção contra abuso,
integrações por ambiente, foco após envio, testes de falha e documentação.

## Página de preços

**Pedido:** “Quero comparar três planos do produto.”

**Respostas centrais:** cobrança mensal e anual; limites por plano; impostos e
moeda explícitos; teste gratuito; contato para volume maior.

**Arquitetura:** contexto da cobrança, seletor de período, cartões dos planos,
tabela comparativa, condições comerciais, perguntas e ação por plano.

**Plano técnico:** fonte única para preços, seletor acessível, URLs do checkout,
dados estruturados compatíveis com o conteúdo e testes das combinações.

## Resultado comum

Cada exemplo termina com `page-spec.json`, `brief.md`,
`implementation-plan.json` e `implementation-plan.md`. A implementação somente
usa fatos e textos aprovados na entrevista.

## Classificação

| Campo | Valor |
| --- | --- |
| Natureza | Exemplo |
| Escopo | Sete tipos de página atendidos pelas especialistas |
| Autoridade | Fluxo público das orquestradoras |
