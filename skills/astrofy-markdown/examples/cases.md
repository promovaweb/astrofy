# Casos de formatação

## Heading sem espaçamento

Em cópia de teste, remova a linha vazia antes de um heading. A verificação deve
informar MD022. A correção restaura o espaço sem alterar texto ou nível.

## Conteúdo preservado

Use um documento com frontmatter, URL com fragmento, tabela e bloco TypeScript.
Compare esses valores antes e depois. Depois de formatar, repita a correção;
nenhuma mudança adicional deve aparecer no diff.

## Configuração herdada

Execute num pacote cuja configuração está na raiz do workspace. O comando deve
passar o caminho explícito e respeitar as regras herdadas. Não crie outra
configuração dentro do pacote para contornar um diagnóstico.
