# Casos de formulários Astro

## FormData com seleção múltipla

Prepare dois campos com o mesmo name e valores diferentes, um checkbox
desmarcado e um submitter com name/value. Capture o corpo enviado antes de
chamar o provedor. Os dois valores devem chegar ao schema, o checkbox segue
a regra de ausência e o submitter conserva a operação escolhida.

Repita com campos temporariamente disabled durante o envio. Construa o corpo
antes dessa mudança de estado. Confirme labels, erros associados e foco após
rejeição de um campo obrigatório pelo servidor.

## Timeout depois da gravação

Em ambiente descartável, faça o handler persistir a submissão e atrasar a
resposta além do timeout do cliente. Reenvie a mesma operação. Quando o contrato
exigir idempotência, o destino deve conter um registro e retornar o mesmo ID.
Confira armazenamento no servidor; um botão desabilitado não prova isso.

## Action acessível diretamente

Chame a Action com corpo válido sem sessão e depois com sessão sem permissão
para o recurso. Nenhuma chamada deve persistir a alteração. Em seguida, use a
sessão autorizada e confira uma única alteração. Separe erro de autorização
de erro do schema para não apresentar uma sessão expirada como campo inválido.

## Provedor com fila

Configure sandbox que devolve 202 e ID de operação. A interface deve comunicar
recebimento para processamento. Simule sucesso e falha posteriores e consulte
o estado por ID. Não declare entrega final apenas por response.ok.

## Conferência do escopo

Execute `astrofy check --category forms` como apoio. Registre separadamente
corpo recebido, resposta HTTP, resultado no destino e comportamento por teclado.
O comando do catálogo não substitui chamadas ao handler nem confirma entrega.
