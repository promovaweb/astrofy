---
name: astrofy-security
description:
  Revisa entradas, segredos e execução de HTML ou MDX em projetos Astro,
  aplicando correções delimitadas e documentando o alcance.
---

# Revisar fronteiras de execução

## Entradas

Leia entradas externas, set:html, MDX, scripts e fronteiras cliente/servidor.
Use os caminhos definidos em `.astrofy/config/paths.json` quando diferirem dos
exemplos. Confira a versão instalada no lockfile e em node_modules antes de
aplicar APIs da documentação online.

## Execução

Siga a entrada até seu ponto de renderização. Diferencie escape de texto, URL
permitida e sanitização de HTML. Registre somente amostras sem credenciais.

Localize entradas externas e seus consumidores. Confira serialização em HTML,
uso de set:html e origem do MDX. Procure credenciais em configuração pública e
examine dependências relevantes. Corrija ocorrências demonstradas e registre o
alcance da revisão.

Construa a tabela entrada, transformação e destino de
[fronteiras de execução no Astro 7](references/implementation.md) antes de
aceitar HTML, URL ou conteúdo MDX externo.

### Sequência específica

1. Trace cada entrada externa até texto, atributo, set:html, JSON-LD ou MDX.
2. Escape texto, valide URL e sanitize HTML conforme o destino.
3. Separe segredo de valor PUBLIC_ e confirme bundle de cliente.
4. Exercite payloads de tag, atributo, protocolo e fechamento de script.
5. Chame endpoints e Actions sem sessão e com usuário sem permissão para o
   recurso. Confira proteção CSRF nas mutações autenticadas por cookie.
6. Compare respostas privadas com duas sessões e visitante anônimo após
   aquecer o cache. Examine HTML e assets gerados para dados que escaparam da
   fronteira do servidor.

### Alteração de implementação existente

Corrija o consumidor afetado e mantenha o contrato válido. Não compile MDX
desconhecido durante inspeção nem importe configuração executável para listar
campos.

## Verificação

Conteúdo contendo fechamento de script não deve executar código. HTML de origem
externa precisa passar pela política de sanitização adotada.

As correções possuem caso reproduzível. O relatório não expõe credenciais nem
declara auditoria completa por análise automática.

```bash
astrofy check --rule config.secrets
```

Consulte [APIs e regras deste domínio](references/technical.md) antes da
implementação e [cenários de validação](examples/cases.md) ao conferir a saída.
