# Fronteiras de execução no Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Tabela de fluxo

Para cada dado externo, registre origem, tipo, transformação, destino e teste.
Exemplos de destinos: texto interpolado, atributo href, atributo src, set:html,
JSON-LD, endpoint, MDX e componente React hidratado. Texto interpolado pelo
Astro recebe escape. set:html recebe HTML literal e pede sanitização antes do
ponto de renderização.

Não use substituição de caracteres como sanitizador. A política deve permitir as
tags, atributos, protocolos e embeds necessários ao produto e remover o
restante. Teste script, atributo onerror, URL javascript, fechamento de tag e
HTML malformado na mesma biblioteca usada em produção.

## URLs e JSON

Para links construídos com entrada externa, aceite protocolo e host definidos
pela aplicação. Use URL para analisar o valor antes de renderizar href ou src.
Para JSON-LD, gere JSON com serializador e trate a sequência de fechamento de
script antes de inserir no elemento script. Nunca monte JSON com concatenação.

## Ambiente e conteúdo executável

PUBLIC_ entrega valor ao cliente. Revise nome e uso de cada variável pública e
importe segredo apenas de astro:env/server ou código que roda no servidor.
astro.config.* pode executar código durante importação; auditoria de arquivos
deve ler texto ou AST, nunca importar a configuração.

MDX aceita JSX e imports. Conteúdo de origem desconhecida não entra no
compilador MDX. Em coleções remotas, separe metadados estruturados de corpo que
poderia executar JSX.

## Autorização, cookies e origem da requisição

Liste endpoints, Actions e middleware que alteram dados ou retornam conteúdo
privado. Para cada operação, confira identidade e permissão sobre o recurso
solicitado. ID vindo do corpo ou URL não determina propriedade. Uma Action
continua acessível por requisição direta mesmo sem botão na interface.

Quando autenticação usa cookies, examine proteção CSRF do framework e do
adaptador realmente instalados. Confira validação de Origin, token quando
aplicável e atributos Secure, HttpOnly e SameSite. SameSite é uma camada adicional,
não substitui toda a proteção. Não use GET para alterar dados.

CORS controla acesso de scripts a respostas entre origens; não substitui
autorização nem impede todo envio cross-origin. Teste requisição sem sessão,
sessão de outro usuário e origem externa contra o mesmo handler. Defina como
tratar Origin ausente para clientes permitidos, sem liberar toda a rota.

## Cache e dados privados

Confira se HTML, JSON ou fragmento contém dados da sessão antes de permitir
cache compartilhado. Não deduza isolamento por existir cookie na requisição:
revise headers e configuração do CDN. Teste a mesma URL com duas sessões e
uma requisição anônima, observando corpo e headers após aquecer o cache.

Segredos usados no servidor também podem vazar por props de ilha, mensagens de
erro, logs ou conteúdo gerado. Procure valores de teste identificáveis no HTML
e nos assets produzidos; buscar apenas nomes PUBLIC_ não cobre esses caminhos.
Se uma credencial real foi publicada, removê-la do arquivo não a invalida.

## Verificação de JSON-LD no HTML

JSON válido não garante inserção segura dentro de script. A sequência de
fechamento pode encerrar o elemento no parser HTML antes do parser JSON.
Serialize um objeto permitido e substitua cada caractere menor-que do JSON
pelo escape JSON literal barra invertida seguido de u003c antes de set:html.
Não aplique codificação de entidades HTML ao JSON dentro de script.

Teste um valor contendo fechamento de script seguido de um elemento com evento.
Inspecione o DOM: deve existir somente o script JSON-LD pretendido, sem elemento
injetado. Parseie seu textContent com JSON.parse e compare o valor recuperado
com a entrada original. Essa transformação protege o contêiner de JSON; ela
não substitui um sanitizador para HTML que será mostrado como marcação.

## Fontes

- [Diretivas Astro](https://docs.astro.build/en/reference/directives-reference/)
- [Variáveis de ambiente](https://docs.astro.build/en/guides/environment-variables/)
- [OWASP Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Segurança de Actions](https://docs.astro.build/en/guides/actions/#security-when-using-actions)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
