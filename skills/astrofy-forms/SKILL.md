---
name: astrofy-forms
description:
  Integra formulários em páginas Astro com validação e mensagens acessíveis,
  verificando o destino de envio em ambiente autorizado.
---

# Integrar formulários

## Entradas

Leia campos, rótulos, endpoint, validação do servidor e ambiente autorizado. Use
os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

1. Leia método, endpoint, nomes dos campos, tipo do corpo e formato das
   respostas do provedor existente. Confirme o destino de teste antes de enviar.
2. Associe cada label ao ID do campo. Relacione instruções e erros por
   aria-describedby; use aria-invalid quando a validação reprovar o campo.
3. Valide no servidor campos obrigatórios, formatos e limites. A validação HTML
   ou JavaScript do cliente não substitui essa etapa.
4. Durante o envio, impeça submissões duplicadas. Em erro HTTP, de rede ou de
   validação, conserve valores preenchidos e reabilite a tentativa.
5. Anuncie o resultado numa região acessível e direcione o foco para o erro
   quando necessário. Não renderize mensagens recebidas como HTML arbitrário.
6. Em teste autorizado, confira recebimento no endpoint. Resposta visual de
   sucesso sem confirmação do destino não encerra a verificação.

### Sequência específica

1. Diferencie provedor externo, endpoint e Astro Action; confira qual runtime
   executa o processamento depois do deploy.
2. Preserve campos repetidos, checkbox ausente e arquivos conforme o contrato.
   Construa o corpo antes de desabilitar os controles.
3. Separe erro de input, autorização e serviço indisponível. Confirme permissão
   no handler, mesmo quando a página oculta o formulário.
4. Teste sucesso, 4xx, 5xx e timeout após persistência. Confira idempotência
   quando uma nova tentativa não puder repetir o efeito externo.
5. Distinga aceitação assíncrona de entrega e correlacione o ID retornado com
   a operação registrada no destino de teste.

### Alteração de implementação existente

Preserve contrato do provedor existente e nomes dos campos. Mudanças visuais não
justificam trocar endpoint nem enviar mensagens reais.

## Verificação

Endpoint retornando erro deve conservar campos e apresentar falha. Resposta de
sucesso precisa corresponder ao recebimento verificado.

O envio de teste chega ao destino, mensagens são acessíveis e nenhuma credencial
aparece no cliente.

```bash
astrofy check --category forms
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
