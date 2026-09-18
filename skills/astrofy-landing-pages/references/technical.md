# Referência técnica de astrofy-landing-pages

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia oferta fornecida, rota, ação, endpoint quando houver e componentes.

Registre qual ação encerra o fluxo: navegar, enviar ou comprar. Confira termos e
valores na fonte recebida e trate estados de erro de qualquer formulário.

## Alteração compatível

Preserve destino e parâmetros de uma campanha existente. Mudanças na oferta
dependem de conteúdo autorizado, mesmo durante ajuste visual.

## Diagnóstico

Simule rejeição do endpoint em teste: a página deve informar erro e permitir
correção, sem exibir sucesso antecipado.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Landing page

Uma landing page tem h1, proposta, prova e ação rastreável. CTA não recebe URL
fictícia. Se houver formulário, use contrato do endpoint, mensagens acessíveis e
teste autorizado.

Dados de prova social, números e depoimentos entram somente com fonte no
projeto. A rota tem canonical, Open Graph e política de indexação próprios.

## Contrato da ação

Identifique se CTA navega para outra página, abre uma interface ou envia dados.
Use link para navegação e botão para ação local. Repetições do CTA devem apontar
para o mesmo contrato quando prometem o mesmo resultado. Não substitua destino
por # para terminar a composição visual.

Se o destino é checkout, confirme produto, variação e ambiente nos dados
fornecidos. Teste apenas o fluxo autorizado e registre onde termina a conferência.
Abrir a página de checkout não comprova pagamento concluído.

Para formulário, derive sucesso da resposta válida e do estado da operação,
não do clique no botão. Preserve valores em falha, trate envio pendente e
associe erros aos campos. Parâmetro de URL não deve permitir trocar endpoint
ou destino final por endereço arbitrário.

## Campanha e renderização

Preserve parâmetros necessários à campanha conforme o contrato existente.
Não copie toda query indiscriminadamente para links externos: selecione campos
conhecidos e evite encaminhar dados pessoais. Confira o destino resultante com
parâmetro ausente, repetido e codificado.

Se houver personalização por query ou cookie, defina o que depende de execução
por requisição e o que é aplicado no navegador. Uma página estática não lê
valores de cada visita no frontmatter durante build. Não sirva resposta
personalizada a outros visitantes por cache compartilhado.

Política de indexação e canonical deve considerar variantes reais da campanha.
Não torne toda landing page noindex por convenção nem remova noindex existente
sem examinar a finalidade da rota.

## Medição e estados finais

Quando analytics já fizer parte do projeto, preserve eventos e confira sua
semântica. Evento de clique não equivale a envio aceito ou compra concluída.
Reinicialização após ClientRouter não deve duplicar listeners e eventos.

Teste retorno de erro, abandono e nova tentativa além do caminho de sucesso.
Texto de oferta, preço e prazo vêm da fonte recebida; contador visual precisa
corresponder a prazo real e comportamento definido após o término.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[documentação para landing-pages](https://www.w3.org/WAI/tutorials/forms/):**
  label, instruções, validação e notificações acessíveis; consulte ao tratar
  erros de envio.
