# Referência técnica de astrofy-footer

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia Footer.astro, grupos de links, ativos e informações institucionais
fornecidas.

Organize destinos por uso e confirme cada rota. Identifique o rodapé no HTML e
confira leitura em uma coluna. Informações legais precisam de fonte fornecida.

## Alteração compatível

Mova links para configuração preservando URLs, rótulos e atributos necessários.
Confira todos os grupos após a mudança.

## Diagnóstico

Um link interno inexistente deve falhar na conferência. Um grupo vazio deve ser
omitido ou renderizado conforme o contrato do projeto.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra            | Método   | Escopo    | Verificação                                  |
| ---------------- | -------- | --------- | -------------------------------------------- |
| `footer.content` | `hybrid` | `project` | Links e informações institucionais corretos. |

## Rodapé

O footer global expõe contentinfo; footer dentro de article descreve esse artigo
e não o site. Use headings para grupos de links. Link externo
informa destino quando o contexto exigir e usa URL validada. Não duplique menu
do cabeçalho sem motivo de navegação.

Informação de copyright, canais e contatos vem de configuração pública. Teste
links no HTML gerado e em viewport reduzido.

## Estrutura e fontes dos dados

Renderize o footer global uma vez pelo layout. Um footer de cartão ou artigo
não recebe role contentinfo para imitar o rodapé global. Identifique navs de
finalidades diferentes por nomes distintos; quando dois navs repetem exatamente
o mesmo conjunto de links, mantenha nome coerente entre eles.

Modele cada item com rótulo, URL e atributos necessários. Diferencie caminho
interno, URL absoluta, mailto e tel antes de validar o destino. O verificador
de rotas internas não deve tentar abrir mailto como arquivo. Confira base,
locale e fragmentos depois da composição da URL.

Dados institucionais e links legais vêm da fonte fornecida pelo projeto.
Não transforme ausência de um documento em página jurídica inventada. Em saída
estática, um ano calculado no frontmatter fica fixo até novo build; registre
essa atualização no fluxo existente se o projeto exigir ano corrente.

## Responsividade e interação

Prefira listas e links renderizados no servidor para os grupos institucionais.
Se houver recolhimento mobile, use controle operável por teclado e mantenha
o conteúdo disponível no caminho sem JavaScript previsto pelo projeto.
Não adicione hidratação de framework somente para imprimir listas estáticas.

Teste rótulos longos, endereço de email comprido e grupo vazio. A quebra visual
preserva ordem do DOM. Ícones de redes sociais precisam de nomes acessíveis;
tooltip dependente de hover não fornece acesso equivalente pelo teclado.

Rodapé com position fixed pode cobrir os últimos controles do main. Confira
Tab e Shift+Tab perto do fim da página e com zoom, incluindo banner de cookies
quando presente. Um footer normal no fluxo não precisa dessa sobreposição.

## Fontes

- [Contentinfo landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html):
  contexto de footer global e rodapés internos.

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/):** semântica e
  interação de navegação; consulte ao alterar menus de links.
- **[documentação para footer](https://www.w3.org/WAI/tutorials/page-structure/):**
  regiões e headings; consulte ao compor a estrutura semântica da página.
