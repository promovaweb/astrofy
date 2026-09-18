# Ebook do Astrofy

O PDF e o EPUB são gerados a partir de `docs/user/`, na ordem declarada em
`docs/user/reading-order.txt`.

## Arquivos vigentes

- `ebook-astrofy.pdf`
- `ebook-astrofy.epub`

Os arquivos com `v<versão>` preservam a edição ligada à release. `build.json`
registra as fontes e os hashes dos artefatos.

## Gerar e conferir

```bash
npm run ebook
npm run ebook:verify
```

O ambiente de geração requer Pandoc, WeasyPrint, ImageMagick, `xmllint`,
`pdftotext`, `pdftohtml`, `pdffonts` e `unzip`. Inter e Manrope vêm das
dependências fixadas no pacote e são incorporadas aos artefatos.

`npm run ebook:verify` também confere XML, navegação interna, fontes, aliases e
o conteúdo mínimo de cada edição. A CI executa essa conferência e instala o
tarball em isolamento antes de uma release.
