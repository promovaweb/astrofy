# Casos de configurar rodapé

## Rodapé global e rodapé de artigo

Renderize uma página com footer interno do artigo e Footer.astro no layout.
Na árvore acessível, confira que apenas o rodapé global representa contentinfo.
Não acrescente role redundante ao footer interno para fazê-lo aparecer igual.

## Coluna estreita e links heterogêneos

Use um grupo vazio, um email longo, um link tel, uma rota com base e uma URL
externa. Confira ordem de Tab, quebra de linha e destinos no HTML emitido.
O grupo vazio segue o contrato sem heading solto; mailto e tel não são tratados
como rotas ausentes. Link social apenas com ícone expõe nome da rede ou destino.

## Uso comum

Exiba links para início, blog e componentes do próprio site.

## Projeto existente

Um rodapé possui endereço confirmado. Preserve a informação ao reorganizar as colunas.

## Erro recorrente

Não invente CNPJ, endereço ou texto legal para preencher espaço visual.

## Conferência

Links existem e o rodapé conserva leitura em celular. Informações institucionais possuem fonte fornecida. Use `astrofy check --category footer` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** Footer.astro, grupos de links, ativos e informações institucionais fornecidas.
- **Alteração sob teste:** Mova links para configuração preservando URLs, rótulos e atributos necessários. Confira todos os grupos após a mudança.
- **Falha e resultado esperado:** Um link interno inexistente deve falhar na conferência. Um grupo vazio deve ser omitido ou renderizado conforme o contrato do projeto.
- **Comando complementar:** `astrofy check --category footer`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.
