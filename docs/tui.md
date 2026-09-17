# TUI do Astrofy

`astrofy tui` abre uma consulta interativa da checklist. A abertura não executa
checks e não grava revisões. Sem TTY, o comando retorna o estado textual ou JSON
para permitir uso em pipelines.

O painel segue o contrato visual de TUI da Promovaweb: cabeçalho roxo, campo de
projeto, atualização, abas e três linhas de rodapé. A visão geral reúne quatro
cards e a lista apresenta o detalhe do item selecionado.

A visão geral inclui falhas por severidade e quantidade de resultados com
entradas alteradas. A data e o identificador da última avaliação vêm dos
registros atuais e históricos da checklist, inclusive quando o resultado
atual voltou a pendente. Eles não representam a última exportação de relatório
ou consulta. Use a rolagem do painel em terminais com pouca altura.

## Navegação

| Tecla | Ação |
| --- | --- |
| `Ctrl+H` | Visão geral. |
| `Ctrl+L` | Itens da checklist. |
| `Ctrl+O` | Sobre e sintaxe dos filtros. |
| `Ctrl+U` | Recarregar o estado. |
| `Tab` e `Shift+Tab` | Alternar o foco. |
| Setas ou teclas vi | Percorrer listas e painéis. |
| `Enter` | Abrir detalhe ou editar o campo de projeto. |
| `/` | Buscar e filtrar. |
| `r` | Executar novamente a regra selecionada. |
| `a` | Percorrer relatórios, skill e referência técnica locais do item. |
| `e` | Exportar a consulta como relatório JSON. |
| `m` | Registrar revisão humana. |
| `Esc` | Voltar ou cancelar a verificação ativa. |
| `q` ou `Ctrl+Q` | Sair. |

O campo de busca aceita texto livre ou filtros combinados. Por exemplo,
`categoria:seo estado:failed` mostra falhas de SEO. Os filtros disponíveis são
`categoria`, `skill`, `rota`, `componente`, `método`, `severidade` e `estado`.

## Revisão humana

O detalhe do item mostra verificador, versão, execução, data, responsável,
resultado, ambiente, relatório e arquivos usados na avaliação. Também inclui
fingerprint, notas e quantidade de avaliações anteriores. Use a rolagem do
painel para consultar registros extensos. Controles de terminal presentes
nos textos são removidos antes da exibição.

A exportação com `e` usa o lock de escrita e a retenção de relatórios do
projeto, conservando os arquivos citados pela checklist e por seu histórico.

O atalho `a` abre um arquivo por vez no painel de detalhes. Ele começa pelos
relatórios citados e segue para `SKILL.md` e `references/technical.md`.
As versões instaladas no projeto têm prioridade; quando não existem, o painel
usa a biblioteca distribuída com o CLI. O rodapé mostra a posição atual e
o mesmo atalho avança para a próxima referência. Arquivos maiores que 512 KiB
são recusados e a leitura não abre navegador nem executa comandos externos.

Selecione um item manual ou híbrido e pressione `m`. Informe o responsável,
escolha `passed`, `failed` ou `not_applicable` e escreva a justificativa. O
relatório conserva esses campos junto dos arquivos usados no fingerprint.
Uma regra automática precisa ser executada pelo seu verificador.

Durante a edição de campos, as letras de atalhos não disparam ações globais.
A TUI informa erros no rodapé e permite retornar à consulta. Cores acompanham
os rótulos textuais de estado e `--no-color` preserva a navegação.

Durante uma execução, o rodapé informa o script preparatório, a regra atual
e a quantidade de verificações concluídas. O total considera as rotas
encontradas após o build. Ao terminar as verificações, o painel informa a
gravação do relatório e da checklist. `Esc` continua disponível para cancelar;
o progresso transitório não substitui o resultado persistido.

## Terminal e validação

Os testes exercitam 80x24, 129x44 e 160x50. Em terminais estreitos, lista e
detalhe ficam empilhados e os cards mudam a quantidade de colunas.
A paleta tem teste de contraste para texto principal, secundário e foco.
