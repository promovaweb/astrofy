# Changelog

## [0.1.0] - 2026-09-17

### Adicionado

- CLI Node.js para adoção em projetos Astro, inspeção, checks por escopo,
  geração de tokens, documentação, links, relatórios e migração de contratos.
- Biblioteca de 38 skills com referências e instalação local em Codex e Claude.
- Checklist com 90 regras, histórico, revisão manual e atualização de validade.
- TUI com filtros, detalhes, progresso, cancelamento e exportação de relatórios.
- Schemas locais, geração CSS light/dark, importação Brandfy e proteção de
  escrita, caminhos, processos e credenciais reconhecidas nos relatórios.

### Distribuição

- Pacote npm com acesso restrito e licença `UNLICENSED`.
- Node.js 22.12.0 ou posterior; Chromium instalado separadamente para checks
  de navegador. A instalação inicial não exige migração de contrato.
- O template de site não integra esta release.

### Validação

- `npm test`: 71 testes em Linux com Node 22.12.0.
- `npm pack` e instalação do tarball em diretório temporário.
- Validação das skills e Markdown no Hub.
- A matriz remota de Windows, macOS e outras versões de Node permanece
  identificada separadamente na documentação de compatibilidade.
