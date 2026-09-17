/** Conferência da publicação: sitemap, redirects estáticos e percursos paginados. */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { exists, safePath } from '../core/filesystem.js';
import { outputFiles, normalizeRoute, meta, type HtmlPage } from './html.js';
import type { Configuration } from '../core/types.js';
/** Compara as URLs efetivas de todos os sitemaps locais com rotas indexáveis e suas canônicas. */
export async function sitemapProblems(root:string,config:Configuration,pages:HtmlPage[]):Promise<string[]> {
  const files=(await outputFiles(root,config.paths.output)).filter(file=>/sitemap.*\.xml$/.test(file));
  if(!files.length)return ['Sitemap ausente na saída publicada.'];
  const urls=new Set<string>(),problems:string[]=[];
  for(const file of files){
    const xml=await readFile(await safePath(root,file),'utf8');
    if(!/<(?:sitemapindex|urlset)\b/.test(xml)){problems.push(`${file}: raiz XML desconhecida.`);continue;}
    const locations=[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match=>match[1]!.replaceAll('&amp;','&').trim());
    for(const location of locations){
      let url:URL;try{url=new URL(location);}catch{problems.push(`${file}: loc não absoluta.`);continue;}
      if(!['http:','https:'].includes(url.protocol)){problems.push(`${file}: protocolo inválido.`);continue;}
      if(/<sitemapindex\b/.test(xml)){
        const target=path.posix.join(config.paths.output,url.pathname.replace(/^\//,''));
        if(!(await exists(await safePath(root,target))))problems.push(`${file}: sitemap referenciado ausente.`);
      }else urls.add(location);
    }
  }
  for(const page of pages){
    if(meta(page,'robots').some(value=>/noindex/i.test(value))||page.route==='/404')continue;
    const canonical=page.elements.find(el=>el.tag==='link'&&el.attrs.rel==='canonical')?.attrs.href;
    if(!canonical){problems.push(`${page.route}: canônica necessária para comparar sitemap.`);continue;}
    if(!urls.has(canonical))problems.push(`${page.route}: canônica não aparece no sitemap.`);
  }
  for(const url of urls)if(!pages.some(page=>normalizeRoute(page.route)===normalizeRoute(url)))problems.push(`Sitemap aponta para rota ausente: ${new URL(url).pathname}.`);
  return problems;
}
/** Detecta ciclos de meta refresh e do formato _redirects. Formatos executáveis exigem revisão própria. */
export async function redirectProblems(root:string,config:Configuration,pages:HtmlPage[]):Promise<{problems:string[];count:number}> {
  const edges=new Map<string,string>(),problems:string[]=[];
  for(const page of pages){
    const refresh=page.elements.find(el=>el.tag==='meta'&&el.attrs['http-equiv']?.toLowerCase()==='refresh')?.attrs.content;
    if(refresh){const target=refresh.match(/url\s*=\s*['"]?([^'";]+)['"]?/i)?.[1];if(target)edges.set(normalizeRoute(page.route),normalizeRoute(new URL(target,'https://local'+page.route).pathname));else problems.push(`${page.route}: meta refresh sem destino.`);}
  }
  for(const base of [config.paths.public,config.paths.output]){
    const file=path.posix.join(base,'_redirects');if(!(await exists(await safePath(root,file))))continue;
    const text=await readFile(await safePath(root,file),'utf8');
    for(const line of text.split('\n').map(line=>line.trim()).filter(line=>line&&!line.startsWith('#'))){
      const [from,to,status='301']=line.split(/\s+/);if(!from||!to||!/^30[1278]!?$/.test(status))continue;
      if(/[*!:]/.test(from)){problems.push(`${file}: redirect com padrão exige verificação no provedor.`);continue;}
      if(to.startsWith('/'))edges.set(normalizeRoute(from),normalizeRoute(to));
    }
  }
  for(const origin of edges.keys()){
    let current=origin;const seen=new Set<string>();
    while(edges.has(current)){
      if(seen.has(current)){problems.push(`Ciclo de redirect partindo de ${origin}.`);break;}
      seen.add(current);current=edges.get(current)!;
    }
    if(!edges.has(current)&&!pages.some(page=>normalizeRoute(page.route)===current))problems.push(`${origin}: destino final ${current} ausente.`);
  }
  return {problems,count:edges.size};
}
/** Verifica links anterior/próximo, repetição e cobertura dos posts no arquivo principal. */
export function archiveProblems(pages:HtmlPage[],postRoutes:string[],blogPath='/blog/'):string[] {
  const prefix=normalizeRoute(blogPath),archives=pages.filter(page=>normalizeRoute(page.route)===prefix||new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}/[0-9]+$`).test(normalizeRoute(page.route)));
  if(!archives.length)return ['Arquivo principal do blog ausente.'];
  const seen=new Set<string>(),problems:string[]=[];
  const ordered=archives.sort((a,b)=>Number(normalizeRoute(a.route).slice(prefix.length+1)||1)-Number(normalizeRoute(b.route).slice(prefix.length+1)||1));
  ordered.forEach((page,index)=>{
    const links=[...new Set(page.links.map(href=>{try{return normalizeRoute(new URL(href,'https://local'+page.route).pathname);}catch{return '';}}).filter(route=>postRoutes.includes(route)))];
    for(const route of links){if(seen.has(route))problems.push(`${route}: post repetido entre páginas do arquivo.`);seen.add(route);}
    for(const sibling of [ordered[index-1],ordered[index+1]].filter((value):value is HtmlPage=>!!value))if(!page.links.some(href=>normalizeRoute(new URL(href,'https://local'+page.route).pathname)===normalizeRoute(sibling.route)))problems.push(`${page.route}: ligação de paginação ausente para ${sibling.route}.`);
  });
  for(const post of postRoutes)if(!seen.has(post))problems.push(`${post}: post ausente do arquivo.`);
  return problems;
}
