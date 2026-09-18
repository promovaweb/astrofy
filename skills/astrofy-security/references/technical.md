# Referência técnica de astrofy-security

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Arquivos e APIs

Leia entradas externas, set:html, MDX, scripts e fronteiras cliente/servidor.

Siga a entrada até seu ponto de renderização. Diferencie escape de texto, URL
permitida e sanitização de HTML. Registre somente amostras sem credenciais.

## Alteração compatível

Corrija o consumidor afetado e mantenha o contrato válido. Não compile MDX
desconhecido durante inspeção nem importe configuração executável para listar
campos.

## Diagnóstico

Conteúdo contendo fechamento de script não deve executar código. HTML de origem
externa precisa passar pela política de sanitização adotada.

## Regras do catálogo

As regras abaixo pertencem ao catálogo distribuído com o Astrofy. `automatic`
executa um verificador; `manual` exige revisão identificada; `hybrid` combina
checagem automática e revisão. A saída do comando não comprova itens manuais.

| Regra                               | Método        | Escopo        | Verificação                                  |
| ----------------------------------- | ------------- | ------------- | -------------------------------------------- |
| Nenhuma regra diretamente associada | Não se aplica | Não se aplica | Use as verificações específicas desta skill. |

## Limites de execução

Interpolação Astro escapa texto; set:html insere HTML literal e pede sanitização
antes do render. URL externa passa por parser e allowlist de protocolo e host.
JSON-LD usa serialização, não concatenação.

Auditoria de astro.config.* lê arquivo como texto ou AST. Não importe a
configuração, pois import pode executar código do projeto.

## Fontes

Consulta: 17/09/2026. As páginas online podem acompanhar uma major posterior à
instalada. Compare as APIs citadas com package.json, lockfile e o guia de
migração da major utilizada; não atualize a dependência para copiar o exemplo.

- **[Arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/):**
  fronteira entre HTML estático e ilhas; consulte antes de mover estado ou
  hidratação.
- **[Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/):**
  compilação MDX e imports de componentes; consulte ao alterar schema ou
  renderização do corpo.
- **[documentação para security](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html):**
  escape por destino e sanitização de HTML; consulte ao tratar entrada externa.
