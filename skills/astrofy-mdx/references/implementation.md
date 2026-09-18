# MDX e Content Layer no Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Coleção local

Em Astro 7, defina coleções em src/content.config.ts. Para Markdown ou MDX
local, use o loader glob() de astro/loaders, defineCollection() de astro:content
e schema Zod de astro/zod. Exporte um único objeto collections.

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({ title: z.string(), pubDate: z.coerce.date() }),
});

export const collections = { blog };
```

Consulte entradas com getCollection('blog') e obtenha uma entrada com
getEntry(). Em rota estática, a coleção alimenta getStaticPaths(). Reinicie o
servidor ou sincronize a Content Layer depois de alterar schema.

## Escolha do loader

Use glob() para um arquivo por entrada. Use file() para JSON, YAML ou TOML com
várias entradas. Coleção build-time atende conteúdo local e dados que podem ser
atualizados durante o build. Coleção live consulta a origem por requisição; ela
não renderiza MDX, não otimiza imagens em runtime e não persiste no data store.
Registre o motivo quando escolher live.

## Renderização e tipos

Consulte os metadados por entry.data e o identificador por entry.id. Para o
corpo, importe render de astro:content e obtenha Content com await render(entry).
O método entry.render da coleção legada não é o contrato da Content Layer.
Tipifique props com CollectionEntry para conservar a relação com o schema.

MDX precisa da integração @astrojs/mdx configurada. O loader que encontra .mdx
não substitui a integração que compila JSX. Ao alterar um componente usado em
MDX, procure imports no acervo e compile ao menos um consumidor real.

## Origem executável

MDX pode importar componentes e executar JSX. Aceite MDX apenas de autores ou
pipeline controlado. Para conteúdo de terceiros, trate o corpo como Markdown sem
execução, filtre HTML conforme a política do projeto e não permita import
arbitrário.

## Fontes

- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Integração MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)
