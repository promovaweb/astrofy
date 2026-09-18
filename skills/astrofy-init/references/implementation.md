# Adoção em Astro 7

> Base técnica conferida para Astro 7.3.3 em 17/09/2026. Revise os links
> oficiais ao alterar a versão do framework ou da integração citada.

## Sequência obrigatória

1. Leia package.json, o lockfile e node_modules/astro/package.json. Registre a
   faixa declarada, a versão resolvida e a versão instalada.
2. Quando o projeto ainda não usa Astro 7, registre a versão e as diferenças
   relevantes. Adoção do Astrofy não autoriza migração de major. Execute uma
   atualização somente quando ela fizer parte do pedido, com versão de destino
   explícita e conferência das integrações.
3. Leia os scripts disponíveis e registre o resultado das verificações pertinentes
   antes de criar .astrofy/. Não presuma que npm run check existe. Uma falha
   anterior à adoção deve permanecer identificada no registro inicial.
4. Inspecione astro.config.* por plugins Vite, aliases, adaptadores e flags
   experimentais. Astro 7 usa Vite 8; plugin que acessa internals do Vite deve
   acompanhar a migração própria.
5. Rode astrofy inspect --root caminho/do/pacote --json e astrofy init
   --root caminho/do/pacote --dry-run --json.
6. Compare a lista do dry-run com a escrita. O segundo init deve informar
   created vazio.

## Monorepo e raiz

--root recebe o diretório que contém o package.json do aplicativo Astro. Não
aponte para a raiz do workspace apenas porque ela contém um lockfile. Em um
workspace, confirme o pacote com astro nas dependências e o astro.config.*
correspondente. O lockfile compartilhado continua útil para confirmar a versão
resolvida.

O inspect deve analisar arquivos como dados. Não use import dinâmico de
astro.config.*: a configuração pode chamar código do projeto, carregar variáveis
ou iniciar conexões.

## Saída esperada

Compare estado Git e arquivos existentes antes e depois. Init não deve criar
template de site, instalar integração Astro ou mover conteúdo para satisfazer
um caminho padrão. Ajuste o contrato de caminhos ao projeto observado.

Se faltar node_modules, a versão instalada permanece não conferida; o lockfile
não comprova instalação. Não execute instalação apenas para completar uma tabela
quando a inspeção de arquivos já permite iniciar a adoção.

Em retomada parcial, confira cada arquivo criado anteriormente. Um JSON inválido
precisa de correção delimitada, preservando o conteúdo original para comparação.
Ausência de saída no comando não deve ser interpretada como sucesso: registre
código de saída e diagnóstico antes de continuar as etapas dependentes.

O contrato inicial contém project.json, paths.json, features.json,
policies.json, skills.json, checks.json, integrations.json e exceptions.json.
Leia todos após a escrita. Corrija apenas a chave apontada pela validação de
schema. Não recrie o diretório para corrigir uma chave, pois isso descarta
anotações locais.

Astro 7 promoveu recursos antes experimentais, como cache e route rules, para
configuração estável. Mova configurações antigas de experimental somente depois
de confirmar o formato na versão instalada.

## Fontes

- [Migração para Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Referência de configuração](https://docs.astro.build/en/reference/configuration-reference/)
