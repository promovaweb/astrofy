# Ilhas React no Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Fronteira da ilha

Componente React sem diretiva client:* renderiza HTML estático no servidor e não
executa JavaScript no navegador. Coloque a diretiva no consumidor .astro, não
dentro do componente React. Prefira o menor componente que contém estado,
efeitos, eventos e dependências do navegador.

| Necessidade                            | Diretiva       |
| -------------------------------------- | -------------- |
| Controle necessário no primeiro clique | client:load    |
| Controle fora da primeira dobra        | client:visible |
| Interação que pode esperar ocioso      | client:idle    |
| Dependência de media query             | client:media   |
| Nunca precisa interagir                | nenhuma        |

## Props e renderização

Props precisam ser serializáveis entre Astro e React. Passe strings, números,
booleanos, arrays e objetos simples. Astro também serializa Date, Map e Set; não
é obrigatório convertê-los para JSON. Funções e instâncias de classes
arbitrárias não atravessam essa fronteira. Nunca envie segredos nas props.
Confira os tipos aceitos na
[API de componentes de framework](https://docs.astro.build/en/guides/framework-components/#passing-props-to-framework-components).

Durante SSR, window, document, localStorage e matchMedia não existem. Leia-os
dentro de useEffect ou após testar o ambiente no código que só roda no cliente.
Mantenha o HTML inicial igual ao primeiro render React: hora atual, aleatório e
estado do armazenamento devem receber valor estável no servidor.

## Verificação no navegador

### Dependência exclusiva do navegador

Quando uma biblioteca acessa document ao importar, mover sua chamada para
useEffect pode ser insuficiente se o import continuar no topo do módulo.
Confira carregamento dinâmico dentro do efeito ou uma fronteira client:only
quando o componente realmente não puder renderizar no servidor. Nesse caso,
declare o framework, como client:only="react", e um fallback apropriado.
Essa opção omite o HTML de servidor do componente; não é correção automática
para divergência de hidratação que poderia ser resolvida com estado inicial estável.

### Estado e composição

Ilhas separadas não compartilham automaticamente uma árvore de contexto React.
Se dois controles precisam do mesmo provider, avalie uma fronteira comum ou
uma estratégia explícita de estado compartilhado. Não suponha que envolver
uma ilha num componente Astro transporta React context para outra ilha.

Conteúdo Astro passado como children é HTML renderizado. Documente esse limite
antes de esperar que o React reexecute um componente .astro com novas props.
Passe dados públicos mínimos para o estado dinâmico e preserve conteúdo estático
fora da ilha quando não depender desse estado.

### Efeitos e ciclo de vida

Efeitos que registram listener, timer ou assinatura precisam de limpeza.
Confira navegação de ida e volta quando ClientRouter estiver ativo e não
duplique handlers a cada montagem. Teste estado derivado de storage recusando
acesso, sem fazer a interface inteira depender dessa disponibilidade.

## Procedimento de conferência

Abra a rota com JavaScript desativado e confira o conteúdo estático. Reabra com
JavaScript ativo, capture erros de console e dispare a interação. Remova a
diretiva temporariamente: o teste deve falhar para provar que cobre a
hidratação, não apenas o HTML inicial.

## Fontes

- [Integração React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Diretivas de cliente](https://docs.astro.build/en/reference/directives-reference/)
