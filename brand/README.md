# Marca Astrofy

O Astrofy reúne skills, um CLI e um painel no terminal para planejar,
implementar e revisar sites Astro com método. Sua identidade combina o
petróleo e o turquesa da Promovaweb com violeta, cor própria do projeto
associada ao astro que orienta o trabalho.

## Conceito visual

O símbolo **Página em órbita** mostra uma página do site com linhas de
conteúdo, envolvida por uma órbita e acompanhada de um astro violeta. A
composição comunica sites Astro planejados e construídos com método, em torno
de páginas reais. O símbolo não usa o foguete nem o "A" do logo oficial do
Astro.

## Arquivos oficiais

| Arquivo | Uso |
| --- | --- |
| `logo/icon.svg` | ícone principal com placa petróleo |
| `logo/icon-light.svg` | ícone transparente sobre fundo claro |
| `logo/icon-dark.svg` | ícone transparente sobre fundo escuro |
| `logo/logo-light.svg` | assinatura horizontal sobre fundo claro |
| `logo/logo-dark.svg` | assinatura horizontal sobre fundo escuro |
| `logo/icon.png` | fallback raster de 512 × 512 px |
| `logo/icon-light.png`, `logo/icon-dark.png` | fallbacks raster dos ícones transparentes |
| `logo/logo-light.png`, `logo/logo-dark.png` | fallbacks raster das assinaturas, 1300 × 491 px |
| `logo/icon-16w.png` a `logo/icon-512w.png` | favicons de 16, 32, 48, 180, 192 e 512 px |

Use a variante correspondente ao fundo. Preserve 12,5% de área livre ao redor
do ativo. O tamanho mínimo é 24 px para o ícone e 140 px para a assinatura.
O nome na assinatura já está convertido em curvas (Manrope 750). Dimensões e
hashes ficam em `manifest.json`.

## Sistema digital

- `colors/palette.json`: fonte editável da paleta;
- `tokens.json`: tokens agnósticos;
- `global.css`: webfontes, variáveis CSS e troca de tema;
- `tailwind-theme.js`: extensão para Tailwind CSS;
- `accessibility.md`: relatório de contraste;
- `typography/README.md`: hierarquia tipográfica;
- `fonts/`: Manrope e Inter latinas, com as licenças OFL;
- `style-guide.html`: guia visual com logo e paleta.

## Regras para agentes

1. Use os ativos desta pasta sem redesenhá-los.
2. Violeta identifica o Astrofy e marca ação ou destaque; turquesa identifica
   a família Promovaweb.
3. Em texto sobre fundo claro, use o acento `#6D28D9`; sobre fundo escuro,
   `#C4B5FD`. O violeta 500 fica restrito a elementos gráficos.
4. Estado nunca depende apenas de cor: inclua texto, ícone ou posição.
5. Use tokens semânticos e a variante correta para light ou dark mode.
6. Não aplique filtros, gradientes, sombras, rotações ou deformações, e não
   acrescente o foguete ou o "A" do Astro ao símbolo.
