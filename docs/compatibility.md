# Compatibilidade

O runtime do framework é Node.js 22.12 ou posterior. O desenvolvimento usa
TypeScript, e o pacote distribui JavaScript compilado. Python, Deno e Bun não
são runtimes obrigatórios.

## Faixas implementadas

| Dependência | Faixa do adaptador |
| --- | --- |
| Astro | 5, 6 e 7. |
| Tailwind | 4 para geração CSS-first. |
| React | 18 e 19 quando a integração estiver habilitada. |
| JSON Schema | Draft 2020-12 com Ajv 8. |
| Tokens | Envelope Astrofy 1.0.0 com tipos DTCG 2025.10. |

A faixa de um adaptador não representa uma declaração de teste de todas as
combinações possíveis. A validação de integração desta implementação usa
Astro 7.3.3, MDX 8.0.1 e Tailwind 4.3.3 no template. Os testes de adoção também
usam manifests mínimos de projetos existentes.

As [fixtures de integração](../fixtures/compatibility/README.md) acrescentam
builds reais com Astro 5.13.0, React 18.3.1 e MDX 4.0.0, e com Astro 6.0.0,
React 19.0.0 e MDX 5.0.0. Ambas usam Tailwind 4.3.3. Os testes locais
confirmaram hidratação, clique, componente Astro em MDX e CSS dos tokens em
light/dark. A referência registra Node, Vite, lockfiles e comandos usados.

## Dependências e ambientes

A inspeção reconhece lockfiles npm, pnpm, Yarn e Bun. A leitura de versões usa
manifests instalados quando disponíveis. O framework não converte o gerenciador
do site e não executa Bun como runtime de verificação.

A escrita usa APIs Node de caminho e arquivos. Os testes incluem caminhos com
espaços e detecção de escapes por links simbólicos. A suíte local foi executada
em Linux. Validação nativa de Windows e macOS deve ser feita nos jobs de CI
correspondentes, sem transformar testes Linux em comprovação desses sistemas.

Os 71 testes do framework passaram localmente em Linux com Node
22.12.0, incluindo os checks de Chromium. A mesma versão compilou o
TypeScript distribuído. O script
`npm test` usa a descoberta de testes do Node, sem depender da expansão de
globs pelo shell.

O tarball npm também foi instalado em um diretório temporário fora do
repositório, com Node 26.8.1. Nessa instalação, `init` criou os contratos,
`check --rule project.detected` passou e `skills install` instalou
`astrofy-init` no diretório local do Codex. O pacote incluiu os schemas e o
catálogo das 90 regras. Essa conferência não representa publicação no npm.

O workflow `.github/workflows/ci.yml` prepara nove combinações: Linux,
Windows e macOS com Node 22.12.0, 24 e 26. Cada job instala o lockfile,
compila, executa a suíte e confere o conteúdo do pacote npm. Esses jobs ainda
não foram executados remotamente; o arquivo do workflow não comprova a matriz.

## Navegador

As verificações que dependem de comportamento usam Chromium via Playwright.
O navegador precisa estar instalado no ambiente de teste. A ausência dele
produz avaliação não concluída, e não uma aprovação.

```bash
npx playwright install chromium
```

O template possui testes próprios de temas, navegação e hidratação. Eles usam
um servidor efêmero sobre seu build, evitando que outra aplicação já aberta
na máquina seja confundida com o site em teste.
