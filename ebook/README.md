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
`pdftotext` e `unzip`.
