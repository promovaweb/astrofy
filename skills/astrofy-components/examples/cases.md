# Casos de compor componentes

## Uso comum

Crie Button.astro com href e variant, usando slot para o texto do link.

## Projeto existente

Um card existente recebe conteúdo por slot. Preserve esse contrato ao adicionar uma variante.

## Erro recorrente

Dezenas de flags booleanas produzem combinações ambíguas. Separe responsabilidades ou use uma união de variantes.

## Conferência

Propriedades tipadas e exemplos correspondem ao código. A composição funciona com os conteúdos reais. Use `astrofy check --category components` e registre o resultado da operação no escopo realmente verificado.

## Regressão específica

- **Arquivos envolvidos:** componente .astro, declaração Props, slots, estilos e dois consumidores reais.
- **Alteração sob teste:** Adicione uma variante sem alterar o valor padrão existente. Só remova uma prop após migrar todos os consumidores e conferir usos em MDX.
- **Falha e resultado esperado:** Uma prop obrigatória ausente deve aparecer na checagem de tipos. Um link de navegação precisa renderizar href e receber foco por teclado.
- **Comando complementar:** `astrofy check --category components`.

Execute a falha deliberada em uma cópia descartável. Compare o resultado
antes e depois da correção, mantendo os mesmos arquivos de entrada.

## Exemplo compilável de link com variante

No diretório de componentes mapeado pelo projeto, `ActionLink.astro`:

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary';
}
const { href, variant = 'primary' } = Astro.props;
---
<a href={href} data-variant={variant}><slot /></a>
```

Na página consumidora, use `<ActionLink href="/segunda/">Abrir</ActionLink>`
e outra instância com `variant="secondary"`. Importe o componente pelo caminho
real. O HTML precisa conter href, texto do slot e data-variant correspondente.
Esse exemplo testa a API; o estilo visual deve usar os tokens do site.

Verifique a ausência de href com o script que executa astro check. Depois de
restaurá-lo, abra a página, alcance o link por Tab e pressione Enter. O destino
precisa carregar e o foco precisa permanecer visível. Um build isolado não
substitui a checagem de Props nem o teste de teclado.
