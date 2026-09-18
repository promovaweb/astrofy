# Referência técnica de astrofy-documentation

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia índice local, scripts reais, caminhos atuais e consumidores dos
componentes.

Separe guia de uso, arquitetura e operação. Exemplos devem usar comandos
existentes e indicar diretório de execução e saída esperada.

## Alteração compatível

Ao mover arquivo, atualize índice, referências e documento do componente.
Preserve anotações humanas e identifique afirmações ainda não verificadas.

## Diagnóstico

Um link relativo para arquivo removido deve falhar na conferência; após
corrigir, o documento precisa ser alcançável pelo índice.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra             | Método   | Escopo    | Verificação                                                   |
| ----------------- | -------- | --------- | ------------------------------------------------------------- |
| `docs.index`      | `hybrid` | `project` | Índice de documentação atualizado.                            |
| `docs.files`      | `hybrid` | `project` | Mapa de arquivos corresponde à arquitetura atual.             |
| `docs.operations` | `hybrid` | `project` | Desenvolvimento e publicação reproduzíveis pela documentação. |

## Documentação executável

Um comando documentado deve existir no package.json ou ser executável pelo bin
declarado. Informe diretório de trabalho, variável necessária, arquivo produzido
e modo dry-run quando houver.

Mapa de arquitetura aponta para fonte, não para cópia. Link interno precisa
resolver na árvore publicada; anchors usam o heading final depois da formatação
Markdown.

## Fonte e alcance de cada afirmação

Relacione comportamento documentado ao arquivo que o implementa e à verificação
executada. Diferencie configuração declarada, resultado observado e etapa ainda
não testada. Um script chamado deploy não comprova publicação concluída.

Use a documentação existente como ponto de integração. Índice em .astrofy/docs
pode apontar para guias canônicos do projeto quando esse for o contrato; não
duplique instruções operacionais inteiras em dois lugares que divergem depois.
Confira se os links continuam válidos no formato de distribuição utilizado.

## Comandos reproduzíveis

Para cada comando, informe diretório, gerenciador de pacotes, pré-condições e
efeito esperado. Use scripts reais, preservando flags e repasse de argumentos.
Não apresente comando inexistente como convenção universal de projetos Astro.

Documente nomes de variáveis necessárias sem copiar seus valores secretos.
Separe variável exigida no build da exigida no runtime do adaptador. Use valores
fictícios identificáveis nos exemplos e deixe claro quando uma operação escreve
arquivos ou chama um serviço externo.

Dry-run comprova somente o alcance implementado pelo comando. Não suponha que
todo CLI oferece essa opção. Para exemplo não executado, registre a condição
faltante em vez de afirmar que a sequência foi validada.

## Arquitetura e manutenção

O mapa deve explicar rotas, layouts, fontes de conteúdo, estilos, ilhas e saída
de deploy. Liste caminhos estáveis e responsabilidades; milhares de arquivos
gerados não tornam o documento mais útil. Em monorepo, diferencie raiz do app,
lockfile compartilhado e pacote que fornece cada comando.

Ao mover documento, confira links de entrada além dos links contidos nele.
Heading renomeado pode invalidar fragmentos em outras páginas. Para referências
ao código, preserve o caminho e atualize exemplos que ainda importam a localização
anterior.

## Validação da documentação

Docs check confere o contrato coberto pela ferramenta; não executa automaticamente
todo bloco de código nem comprova conteúdo factual. Use markdownlint para forma,
checagem de links para navegação e execução controlada para comandos relevantes.
Exemplo Astro ou MDX novo precisa de consumidor compilável quando houver promessa
de funcionamento.

Registre falhas restantes por arquivo e comando. Não substitua notas humanas
por um resumo gerado que omite limitações operacionais ou procedimentos ainda
necessários ao projeto.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Routing](https://docs.astro.build/en/guides/routing/):** rotas de arquivo,
  getStaticPaths e paginate; consulte ao alterar URLs ou paginação.
- **[documentação para documentation](https://docs.astro.build/en/guides/typescript/):**
  Props e astro check; escolha a checagem que alcança arquivos .astro.
