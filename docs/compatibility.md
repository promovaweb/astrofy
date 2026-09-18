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

## Conferência por versão

A versão 0.1.0 passou na CI em Linux com Node 22.12.0, 24 e 26. Nos jobs de
macOS, um teste comparava o caminho temporário com sua forma canônica. No
Windows, essa comparação e a leitura de Markdown com CRLF falhavam.

A versão 0.1.1 compara os caminhos reais e confere a documentação com LF e
CRLF. Ela também testa o CLI chamado por link de diretório ou junction, com
espaços no caminho, e confirma que importar o módulo não executa comandos.
A suíte tem 73 testes. O workflow instala o CLI globalmente e executa a ajuda
e a consulta de versão para conferir o atalho criado pelo npm.

O [workflow de validação](https://github.com/promovaweb/astrofy/actions/workflows/ci.yml)
executa nove combinações: Linux, Windows e macOS com Node 22.12.0, 24 e 26.
Consulte a execução correspondente ao commit ou à tag usada; configurar uma
combinação no workflow não comprova que ela passou.

O pacote `@promovaweb/astrofy` é público no npm. A licença continua
`UNLICENSED`, e o repositório GitHub permanece privado. As notas das releases
registram a versão publicada e as validações da distribuição.

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

As fixtures adicionais em `fixtures/projects/manifest.json` cobrem projeto
mínimo, Tailwind, React, Content Layer com MDX, projeto vindo do Astro 6 e
estrutura personalizada. `npm run test:project-fixtures` cria cada cenário em
diretório temporário e confere detecção, adoção e caminhos locais.

A matriz principal executa somente `test:unit`. Chromium fica nos jobs
`browser` e `compatibility`, com cache pela versão do lockfile.
