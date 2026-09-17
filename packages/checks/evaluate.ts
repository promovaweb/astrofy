/** Verificadores determinísticos; revisão visual ou editorial nunca é aprovada por heurística. */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { inspect } from '../core/discovery.js';
import { safePath, exists, readJson } from '../core/filesystem.js';
import { loadConfig } from '../core/config.js';
import { validate } from '../schemas/index.js';
import { resolveTokens, tokensCommand, type DesignSystem } from '../design-system/index.js';
import { checkDocs } from './markdown.js';
import { brokenLinks, meta, normalizeRoute, type HtmlPage } from './html.js';
import { projectScript, SCRIPT_RULES } from './execute.js';
import { browserCheck } from './browser.js';
import { sitemapProblems, redirectProblems, archiveProblems } from './publication.js';
import type { ChecklistItem, Configuration, Finding, Inspection } from '../core/types.js';
export interface CheckContext {
  root:string; config:Configuration; info:Inspection; pages:HtmlPage[]; signal?:AbortSignal; offline?:boolean;
  scripts:Map<string,Promise<{ok:boolean;reason:string;blocked?:boolean}>>;
  dryRun?:boolean; outputUnavailable?:string;
}
/** Associa o resultado ao escopo solicitado e inclui arquivos para o relatório e fingerprint. */
export async function evaluate(item:ChecklistItem, context:CheckContext):Promise<Finding> {
  const {root,config,info,pages}=context;
  const rule=item.ruleId;
  const files:string[]=[];
  const result=(status:Finding['status'],message:string,suggestion='')=>({ruleId:rule,scope:item.scope,status,severity:item.severity,message,files,suggestion});
  const assessed=(ok:boolean,message:string)=>result(ok?'passed':'failed',message,ok?'':`Execute ${item.skill} no escopo ${item.scope.target}.`);
  const hybrid=(problems:string[],message:string)=>result(problems.length?'failed':'pending',problems.length?problems.join(' '):message,`Complete a revisão com ${item.skill}.`);
  const read=async(file:string)=>{files.push(file);return readFile(await safePath(root,file),'utf8');};
  const page=pages.find(page=>normalizeRoute(page.route)===normalizeRoute(item.scope.target));
  const catalogFeature = ['blog','mdx'].includes(item.category)?'blog':['react','i18n','forms'].includes(item.category)?item.category:undefined;
  if(catalogFeature && !config.features[catalogFeature as keyof Configuration['features']]) return result('not_applicable',`Recurso ${catalogFeature} desabilitado na configuração.`);
  if(context.outputUnavailable&&(item.scope.type==='page'||['seo.sitemap','blog.archives','blog.drafts','routing.collisions','routing.redirects','navigation.links'].includes(rule)))return result('blocked',context.outputUnavailable);
  if(item.method==='manual') return result('pending','A avaliação exige revisão humana identificada e com justificativa.');
  if(item.scope.type==='page') {
    if(!page) return result('blocked','HTML renderizado da rota não está disponível. Gere o site e confira paths.output.');
    files.push(page.file);
  }
  if(rule==='project.detected') {files.push('package.json',...(info.lockfile?[info.lockfile]:[]));return assessed(!!info.versions.astro&&!!info.lockfile,'Manifesto, versão do Astro e lockfile analisados.');}
  if(rule==='project.compatibility') return assessed(info.limitations.length===0,info.limitations.join(' ')||'Dependências dentro das faixas implementadas.');
  if(rule==='project.contract'||rule==='config.schema') {await loadConfig(root);return assessed(true,'Arquivos de configuração respeitam os schemas locais.');}
  if(rule==='project.paths') {
    const absent:string[]=[];
    for(const [key,value] of Object.entries(config.paths)) {
      if(['schemaVersion','output','designSystem','designSystemCss'].includes(key)||key==='content'&&!config.features.blog)continue;
      if(!(await exists(await safePath(root,value))))absent.push(value);
    }
    return assessed(!absent.length,absent.length?`Caminhos ausentes: ${absent.join(', ')}.`:'Caminhos locais presentes.');
  }
  if(rule==='project.features') {
    const mismatch=Object.entries(info.features).filter(([key,value])=>config.features[key as keyof Configuration['features']]!==value);
    return hybrid(mismatch.map(([name])=>`Recurso ${name} diverge da detecção estática.`),'Recursos detectados; confirme configuração e uso nas páginas.');
  }
  if(rule==='design.schema'||rule==='design.references') {
    files.push(config.paths.designSystem);
    const design=await readJson<DesignSystem>(root,config.paths.designSystem);validate('design-system',design);
    resolveTokens(design,'light');resolveTokens(design,'dark');return assessed(true,'Tokens e aliases válidos nos dois modos.');
  }
  if(rule==='design.css-sync') {
    files.push(config.paths.designSystem,config.paths.designSystemCss,'.astrofy/design/build-manifest.json');
    const state=await tokensCommand(root,config,'check');return assessed(state.synchronized,state.synchronized?'CSS e manifesto sincronizados.':'CSS ou manifesto divergem da geração atual.');
  }
  if(rule==='design.global-import') {
    const styles=info.files.filter(file=>/\.(astro|css|[cm]?[jt]sx?)$/.test(file));
    const sources=await Promise.all(styles.map(file=>read(file)));
    const basename=path.basename(config.paths.designSystemCss);
    const imported=sources.some(source=>source.includes(basename));
    const emitted=pages.some(page=>page.elements.some(el=>el.tag==='link'&&el.attrs.rel==='stylesheet')||page.html.includes('--astrofy-'));
    return assessed(imported&&emitted,'Importação de CSS gerado e saída de estilos no HTML verificadas.');
  }
  if(rule==='react.integration') {
    const astroConfig=info.files.find(file=>/^astro\.config\./.test(file));
    const source=astroConfig?await read(astroConfig):'';
    return assessed(!!info.versions['@astrojs/react']&&source.includes('@astrojs/react'),'Dependência e referência à integração React verificadas estaticamente.');
  }
  if(['theme.system','theme.persistence','layout.overflow','layout.responsive','theme.initial-paint'].includes(rule)) {
    const check=await browserCheck(config,item.scope.target,rule,context.offline,context.signal);
    return item.method==='automatic'?assessed(check.ok,check.reason):hybrid(check.ok?[]:[check.reason],check.reason);
  }
  if(SCRIPT_RULES[rule]) {
    if(context.dryRun)return result('blocked','Dry-run não executa scripts que podem alterar o projeto.');
    const script=SCRIPT_RULES[rule]!;
    if(!context.scripts.has(script))context.scripts.set(script,projectScript(root,script,info,config,context.signal));
    const execution=await context.scripts.get(script)!;
    files.push('package.json',...(info.lockfile?[info.lockfile]:[]));
    if(execution.blocked||!config.checks.trustedExecution||/não definida|não definido|não encontrada/.test(execution.reason))return result('blocked',execution.reason);
    return assessed(execution.ok,execution.reason);
  }
  if(rule==='docs.index'||rule==='docs.files'||rule==='docs.operations'||rule==='architecture.map') {
    const docs=await checkDocs(root);files.push(...docs.files);
    return hybrid(docs.problems,'Links da documentação conferidos; o conteúdo requer comparação humana com a implementação.');
  }
  if(['blog.slugs','blog.dates','blog.drafts'].includes(rule)) {
    if(rule==='blog.drafts'&&!pages.length)return result('blocked','HTML renderizado ausente; não é possível conferir a exclusão de rascunhos.');
    const content=info.files.filter(file=>file.startsWith(config.paths.content+'/')&&file.endsWith('.mdx'));
    const problems:string[]=[],slugs=new Set<string>();
    for(const file of content) {
      const data=matter(await read(file)).data;
      const slug=String(data.slug??path.basename(file,'.mdx'));
      if(rule==='blog.slugs') {if(slugs.has(slug)||!/^\p{Ll}[\p{Ll}\p{N}-]*(?:\/[\p{Ll}\p{N}-]+)*$/u.test(slug))problems.push(`${file}: slug duplicado ou fora da convenção.`);slugs.add(slug);}
      if(rule==='blog.dates') {
        const published=Date.parse(String(data.publishedAt)),updated=data.updatedAt?Date.parse(String(data.updatedAt)):published;
        if(!Number.isFinite(published)||!Number.isFinite(updated)||updated<published)problems.push(`${file}: datas inválidas.`);
        if(published>Date.now()&&pages.some(page=>normalizeRoute(page.route)===normalizeRoute(`/blog/${slug}`)))problems.push(`${file}: post com data futura publicado.`);
      }
      if(rule==='blog.drafts'&&data.draft===true&&pages.some(page=>normalizeRoute(page.route)===normalizeRoute(`/blog/${slug}`)))problems.push(`${file}: rascunho publicado.`);
    }
    if(!content.length)return result('blocked','Nenhum arquivo MDX encontrado no caminho configurado.');
    return assessed(!problems.length,problems.join(' ')||'Arquivos MDX verificados no escopo da regra.');
  }
  if(rule==='navigation.links') {
    if(!pages.length)return result('blocked','HTML renderizado indisponível.');
    const bad=(await Promise.all(pages.map(page=>brokenLinks(root,config,pages,page)))).flat();
    files.push(...pages.map(page=>page.file));return assessed(!bad.length,bad.length?`${bad.length} destinos internos ausentes.`:'Destinos internos do HTML existem.');
  }
  if(rule==='links.broken'&&page) {
    const bad=await brokenLinks(root,config,pages,page);return assessed(!bad.length,bad.length?`Destinos inválidos: ${bad.join(', ')}.`:'Destinos e âncoras internas encontrados.');
  }
  if(rule==='routing.collisions') {
    const routes=pages.map(page=>normalizeRoute(page.route));return assessed(new Set(routes).size===routes.length,'Unicidade de rotas da saída renderizada verificada.');
  }
  if(rule==='seo.sitemap') {
    const problems=await sitemapProblems(root,config,pages);
    return assessed(!problems.length,problems.join(' ')||'Sitemap corresponde às canônicas das rotas indexáveis.');
  }
  if(rule==='routing.redirects') {
    const check=await redirectProblems(root,config,pages);
    return assessed(!check.problems.length,check.problems.join(' ')||`${check.count} redirects estáticos conferidos, sem ciclos ou destinos ausentes.`);
  }
  if(rule==='blog.archives') {
    const posts=pages.filter(page=>meta(page,'og:type').includes('article')).map(page=>normalizeRoute(page.route));
    if(!posts.length)return result('blocked','Nenhuma rota de artigo identificada pelo og:type para comparar o arquivo.');
    const problems=archiveProblems(pages,posts);
    return assessed(!problems.length,problems.join(' ')||'Arquivo principal cobre os artigos sem duplicação e com paginação navegável.');
  }
  if(rule==='images.dimensions'&&page) {
    const images=page.elements.filter(el=>el.tag==='img');
    return assessed(images.every(el=>Number(el.attrs.width)>0&&Number(el.attrs.height)>0),'Dimensões explícitas das imagens verificadas.');
  }
  if(rule==='structured.valid'&&page) {
    const scripts=page.elements.filter(el=>el.tag==='script'&&el.attrs.type==='application/ld+json');
    if(!scripts.length)return result('not_applicable','A página não publica dados estruturados.');
    try {for(const script of scripts)JSON.parse(script.text);}catch{return assessed(false,'JSON-LD com sintaxe inválida.');}
    return assessed(true,'JSON-LD sintaticamente válido; veracidade exige revisão própria.');
  }
  if(rule==='og.required'&&page) {
    const missing=['og:title','og:type','og:url','og:image'].filter(key=>meta(page,key).length!==1||!meta(page,key)[0]?.trim());
    for(const key of ['og:url','og:image'])if(!/^https?:\/\//.test(meta(page,key)[0]??''))missing.push(`${key} absoluta`);
    return assessed(!missing.length,missing.length?`Open Graph inválido: ${missing.join(', ')}.`:'Metadados Open Graph obrigatórios presentes e absolutos.');
  }
  if(rule==='seo.title'&&page) {const titles=page.elements.filter(el=>el.tag==='title');return hybrid(titles.length!==1||!titles[0]?.text.trim()?['Título ausente, vazio ou duplicado.']:[],'Título presente; adequação ao conteúdo requer revisão.');}
  if(rule==='seo.description'&&page)return hybrid(meta(page,'description').length!==1||!meta(page,'description')[0]?.trim()?['Descrição ausente, vazia ou duplicada.']:[],'Descrição presente; adequação requer revisão.');
  if(rule==='seo.canonical'&&page) {
    const links=page.elements.filter(el=>el.tag==='link'&&el.attrs.rel==='canonical');
    const canonical=links[0]?.attrs.href;
    const bad=links.length!==1||!canonical||!/^https?:\/\//.test(canonical)||normalizeRoute(canonical)!==normalizeRoute(page.route);
    return hybrid(bad?['Canônica ausente, duplicada, relativa ou divergente da rota.']:[],'Canônica coincide com a rota; confirme domínio e política de publicação.');
  }
  if(rule==='seo.language'&&page)return hybrid(page.elements.some(el=>el.tag==='html'&&el.attrs.lang)?[]:['Idioma ausente no HTML.'],'Idioma declarado; compare com o conteúdo.');
  if(rule==='accessibility.landmarks'&&page)return hybrid(page.elements.filter(el=>el.tag==='main').length===1&&page.elements.some(el=>el.tag==='h1')?[]:['Região main ou heading principal ausente.'],'Regiões básicas presentes; revise ordem e semântica dos headings.');
  if(rule==='accessibility.alternatives'&&page)return hybrid(page.elements.filter(el=>el.tag==='img'&&!('alt' in el.attrs)).map(()=> 'Imagem sem atributo alt.'),'Alternativas presentes; significado exige revisão.');
  if(rule==='links.orphans'&&page){
    // A página de erro é alcançada por URLs ausentes, sem depender da navegação editorial.
    if(['/404','/404/'].includes(page.route)&&meta(page,'robots').some(value=>/\bnoindex\b/i.test(value)))return result('not_applicable','Página 404 com noindex; descoberta por links internos não se aplica.');
    return hybrid(page.route==='/'||pages.some(other=>other!==page&&other.links.some(href=>{try{return normalizeRoute(new URL(href,'https://astrofy.local'+other.route).pathname)===normalizeRoute(page.route);}catch{return false;}}))?[]:['Nenhuma ligação interna para esta rota.'],'Rota possui ligação; confirme contexto editorial.');
  }
  if(rule==='config.categories') {
    const entries=info.files.filter(file=>file.startsWith(config.paths.siteConfig+'/'));
    return hybrid(entries.length?[]:['Nenhum arquivo na pasta de configuração do site.'],'Configurações localizadas; revise responsabilidades por assunto.');
  }
  if(rule==='config.secrets') {
    const targets=info.files.filter(file=>file.startsWith(config.paths.siteConfig+'/'));
    let found=false;for(const file of targets)if(/-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|(?:api[_-]?key|secret|password)\s*[:=]\s*['"][^'"]{8,}['"]/i.test(await read(file)))found=true;
    return hybrid(found?['Possível credencial em configuração pública; valor omitido do relatório.']:[],'Padrões conhecidos não encontrados; revisão de fluxo de segredos permanece necessária.');
  }
  if(rule==='design.token-usage') {
    const offenders:string[]=[];
    for(const file of info.files.filter(file=>/\.(astro|css|tsx)$/.test(file)&&file!==config.paths.designSystemCss&&!config.policies.tokenUsage.allowedFiles.includes(file))) {
      const source=await read(file);
      if(/#[0-9a-f]{3,8}\b|(?:bg|text|border)-(?:red|blue|green|slate|gray)-\d{2,3}/i.test(source))offenders.push(file);
    }
    return hybrid(offenders.length?[`Valores visuais literais para revisar: ${offenders.join(', ')}.`]:[],'Nenhum desvio conhecido; compare estados e exceções com a identidade.');
  }
  if(rule==='brand.assets') {
    const design=await readJson<DesignSystem>(root,config.paths.designSystem);const absent:string[]=[];
    for(const group of Object.values(design.assets))for(const [key,value] of Object.entries(group))if(key!=='alt'&&value.startsWith('/')&&!(await exists(await safePath(root,path.posix.join(config.paths.public,value.slice(1))))))absent.push(value);
    return hybrid(absent.length?[`Ativos ausentes: ${absent.join(', ')}.`]:[],'Arquivos presentes; confirme autoria e adequação por tema.');
  }
  if(item.method==='automatic')return result('blocked',`A regra ${rule} depende de execução ou dados ainda indisponíveis no escopo.`, `Use ${item.skill} para completar a preparação.`);
  return result('pending','Revisão funcional, visual ou contextual ainda não registrada.',`Use ${item.skill} e registre responsável, justificativa e arquivos conferidos.`);
}
