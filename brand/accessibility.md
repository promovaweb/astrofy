# Acessibilidade das cores

Este relatório foi calculado a partir de `brand/colors/palette.json` com a
fórmula de luminância relativa da WCAG 2.2. Uma aprovação numérica não
substitui o teste do componente, dos estados e do arquivo rasterizado.

| Modo | Uso | Primeiro plano | Fundo | Proporção | Mínimo | Resultado |
| --- | --- | --- | --- | ---: | ---: | --- |
| light | texto principal | `#001117` | `#FFFFFF` | 19.22:1 | 4.5:1 | Aprovado |
| light | texto principal em superfície | `#001117` | `#F2F8F9` | 17.91:1 | 4.5:1 | Aprovado |
| light | texto secundário | `#2D4C58` | `#FFFFFF` | 9.19:1 | 4.5:1 | Aprovado |
| light | acento usado como texto | `#6D28D9` | `#FFFFFF` | 7.10:1 | 4.5:1 | Aprovado |
| light | acento usado como texto em superfície | `#6D28D9` | `#F2F8F9` | 6.62:1 | 4.5:1 | Aprovado |
| light | indicador de foco | `#15626A` | `#FFFFFF` | 7.03:1 | 3:1 | Aprovado |
| dark | texto principal | `#F2F8F9` | `#000A0E` | 18.64:1 | 4.5:1 | Aprovado |
| dark | texto principal em superfície | `#F2F8F9` | `#001117` | 17.91:1 | 4.5:1 | Aprovado |
| dark | texto secundário | `#B2C6CE` | `#000A0E` | 11.30:1 | 4.5:1 | Aprovado |
| dark | acento usado como texto | `#C4B5FD` | `#000A0E` | 10.84:1 | 4.5:1 | Aprovado |
| dark | acento usado como texto em superfície | `#C4B5FD` | `#001117` | 10.41:1 | 4.5:1 | Aprovado |
| dark | indicador de foco | `#5EEDE1` | `#000A0E` | 13.98:1 | 3:1 | Aprovado |
| light | astro do ícone (#7C3AED) sobre fundo claro | `#7C3AED` | `#FFFFFF` | 5.70:1 | 3:1 | Aprovado |
| dark | astro do ícone (#8B5CF6) sobre placa petróleo | `#8B5CF6` | `#00161E` | 4.38:1 | 3:1 | Aprovado |
| light | botão: texto branco sobre accent 600 | `#FFFFFF` | `#7C3AED` | 5.70:1 | 4.5:1 | Aprovado |

O violeta 500 (`#8B5CF6`) sobre fundo branco fica em 4.23:1: use-o como
elemento gráfico, nunca como texto sobre fundo claro.
