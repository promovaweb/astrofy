# Casos de fronteiras de execução

## JSON-LD com fechamento de script

Em fixture descartável, use uma propriedade de texto contendo fechamento de
script e uma tag com evento. Renderize com o serializador de produção. O DOM
não deve ganhar a tag injetada, nenhum evento deve executar e JSON.parse do
textContent deve recuperar o texto original. JSON.parse isolado antes de
renderizar não testa o parser HTML do navegador.

## HTML recebido de CMS

Envie ao sanitizador uma amostra com formatação permitida, atributo onerror,
href javascript e HTML malformado. A formatação permitida permanece; atributos
executáveis e protocolos não autorizados desaparecem. Repita pelo consumidor
que usa set:html para confirmar que não existe caminho sem sanitização.

## Permissão sobre recurso

Crie dois usuários e dois recursos no ambiente de teste. Com sessão do primeiro,
tente alterar o recurso do segundo usando o endpoint direto, mesmo sem link na
UI. Espere rejeição sem mudança no banco. Repita sem sessão e com origem externa
para cobrir autenticação e proteção CSRF separadamente.

## Cache compartilhado

Aqueça a URL privada com sessão A. Requisite a mesma URL com sessão B e sem
sessão, passando pelo CDN de teste. Nenhuma resposta deve conter dados de A.
Inspecione configuração e headers junto ao corpo; teste local sem CDN não
comprova a política aplicada no host.

## Segredo refletido no cliente

Use valor fictício identificável no ambiente do servidor. Confira se ele aparece
em props hidratadas, HTML, arquivos estáticos ou respostas de erro. O relatório
registra apenas o marcador fictício e os caminhos encontrados.

Execute `astrofy check --rule config.secrets` como verificação complementar.
Esse comando não comprova sanitização, autorização, CSRF ou isolamento de cache.
