# Referência técnica de astrofy-open-graph

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia componente de metadados, título, descrição, imagem e domínio.

Verifique og:title, og:type, og:image e og:url no HTML. Resolva URLs absolutas e
confira acesso à imagem. Registre fallback por tipo de página.

## Alteração compatível

Preserve capas sociais próprias. Centralize a emissão sem duplicar tags já
presentes em layouts herdados.

## Diagnóstico

Remova a capa específica de um post de teste: o fallback precisa ser válido. Uma
imagem 404 deve impedir afirmar que o compartilhamento foi conferido.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra         | Método      | Escopo | Verificação                                |
| ------------- | ----------- | ------ | ------------------------------------------ |
| `og.required` | `automatic` | `page` | Metadados obrigatórios e fallback válidos. |
| `og.image`    | `hybrid`    | `page` | Imagem pública acessível e pertinente.     |

## Metadados sociais

Centralize a emissão de og:title, og:description, og:type, og:url e og:image no
head. Artigo pode incluir article:published_time e article:modified_time quando
os dados existem.

Imagem de compartilhamento tem URL absoluta e arquivo disponível no ambiente
publicado. Canonical e og:url descrevem a mesma página.

## Contrato de metadados

Use property e content nas tags Open Graph. O protocolo exige título, tipo,
imagem e URL; descrição é recomendada e pode ser obrigatória no contrato do
projeto. Não confunda essa exigência local com os quatro campos do protocolo.

O protocolo permite várias imagens. Se o projeto adotar essa opção, emita a
principal primeiro e agrupe suas propriedades estruturadas logo depois dela,
antes da imagem seguinte. Isso difere de tags duplicadas por layouts que
emitem capas conflitantes. Dimensões, MIME e alt descrevem o arquivo associado.

Locale Open Graph usa a convenção language_TERRITORY, diferente da grafia
com hífen usual em html lang. Relacione os valores por configuração; não
anuncie locales alternativos sem versões correspondentes do conteúdo.

## Integração com renderização Astro

Passe metadados da rota para um único componente do layout. Confira valores
ausentes antes de renderizar: undefined, objeto de imagem serializado como
texto e string vazia não são fallbacks. Para imagem importada, use a URL
resultante apropriada, não o objeto ImageMetadata inteiro.

Emita as tags na resposta HTML inicial. Atualizá-las somente numa ilha após
hidratação não garante leitura pelos consumidores. Teste acesso direto à
rota interna, além da navegação pelo ClientRouter.

Componha URL pública usando domínio de produção e caminho normalizado. Uma
URL iniciada por barra não herda automaticamente o base do Astro ao passar
por new URL. Não deixe host de preview ou origem arbitrária da requisição
substituir a identidade pública definida para o conteúdo.

## Entrega e atualização da imagem

Abra a URL exata emitida com uma requisição sem sessão. Confira status final,
Content-Type e bytes decodificáveis; uma página de login retornando 200 não
é imagem válida. Evite URLs assinadas que expiram antes de novo compartilhamento.
Se a imagem é gerada por endpoint, teste sua execução no adaptador de produção.

Compare dimensões declaradas com o arquivo real e leia a imagem em tamanho
reduzido. Requisitos de proporção e tamanho variam por consumidor; não trate
uma dimensão escolhida pelo projeto como obrigação universal do Open Graph.

Após trocar a capa, separe cache do CDN de cache do serviço de compartilhamento.
Registre URL e arquivo que cada teste recebeu. Versionar a URL da imagem pode
ajudar a distinguir arquivos, mas não comprova atualização de todas as prévias.
Relate separadamente HTML válido, imagem entregue e prévia observada.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Open Graph protocol](https://ogp.me/):** propriedades Open Graph e URLs;
  compare o protocolo com o HTML emitido.
