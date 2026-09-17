/** Leitura do HTML publicado e referências locais sem executar scripts ou conteúdo MDX. */
import { parse } from 'parse5';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { exists, safePath } from '../core/filesystem.js';
import type { Configuration } from '../core/types.js';
import { AstrofyError } from '../core/types.js';
export interface Element { tag: string; attrs: Record<string,string>; text: string; children: Element[] }
export interface HtmlPage { route: string; file: string; html: string; elements: Element[]; ids: Set<string>; links: string[] }
/** Projeta a árvore parse5 para apenas dados usados pelos verificadores. */
export function htmlElements(html: string): Element[] {
  const output: Element[] = [];
  function visit(node: unknown): Element | null {
    const data = node as { tagName?: string; attrs?: {name:string;value:string}[]; childNodes?: unknown[]; nodeName?: string; value?: string };
    const children = (data.childNodes ?? []).map(visit).filter((v): v is Element => v !== null);
    if (data.nodeName === '#text') return {tag:'#text',attrs:{},text:data.value ?? '',children:[]};
    const result: Element = {tag:data.tagName ?? '#document',attrs:Object.fromEntries((data.attrs ?? []).map(attr=>[attr.name,attr.value])),text:children.map(child=>child.text).join(''),children};
    if (data.tagName) output.push(result);
    return result;
  }
  visit(parse(html)); return output;
}
/** Diretório de saída é selecionado por configuração; symlinks não são publicados pelo scanner. */
export async function outputFiles(root: string, directory: string): Promise<string[]> {
  const start = await safePath(root,directory);
  if (!(await exists(start))) return [];
  const output: string[] = [];
  for (const entry of (await readdir(start,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))) {
    const file=path.posix.join(directory,entry.name);
    if (entry.isDirectory()) output.push(...await outputFiles(root,file));
    else if (entry.isFile()) output.push(file);
  }
  return output;
}
export async function readPages(root: string, config: Configuration): Promise<HtmlPage[]> {
  const pages: HtmlPage[] = [];
  const htmlFiles=(await outputFiles(root,config.paths.output)).filter(file=>file.endsWith('.html'));
  if(htmlFiles.length>config.checks.maxPages)throw new AstrofyError(`Saída contém ${htmlFiles.length} páginas e excede checks.maxPages. Ajuste o limite explicitamente.`,3);
  for (const file of htmlFiles) {
    const html=await readFile(await safePath(root,file),'utf8'),elements=htmlElements(html);
    const relative=path.posix.relative(config.paths.output,file);
    const route='/' + relative.replace(/(?:^|\/)index\.html$/,'/').replace(/\.html$/,'').replace(/^\//,'');
    pages.push({route:route || '/',file,html,elements,ids:new Set(elements.map(el=>el.attrs.id).filter((id):id is string=>!!id)),links:elements.filter(el=>el.tag==='a').map(el=>el.attrs.href).filter((href):href is string=>!!href)});
  }
  return pages;
}
export function normalizeRoute(route: string): string {
  const pathname=new URL(route,'https://astrofy.local').pathname;
  return pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'') || '/';
}
export function meta(page: HtmlPage, name: string): string[] {
  return page.elements.filter(el=>el.tag==='meta' && (el.attrs.name===name || el.attrs.property===name)).map(el=>el.attrs.content ?? '');
}
/** Resolve somente destinos da mesma origem; protocolo externo permanece fora do scanner local. */
export async function brokenLinks(root: string, config: Configuration, pages: HtmlPage[], page: HtmlPage): Promise<string[]> {
  const problems: string[] = [], base=config.checks.baseUrl ?? 'https://astrofy.local';
  // O endereço explícito do HTML conserva a mesma validação de âncoras da rota limpa.
  const byRoute=new Map(pages.flatMap(target=>[
    [normalizeRoute(target.route),target] as const,
    [normalizeRoute('/'+path.posix.relative(config.paths.output,target.file)),target] as const,
  ]));
  for (const href of page.links) {
    let url: URL;
    try { url=new URL(href,new URL(page.route,base)); } catch { problems.push(href); continue; }
    if (!['http:','https:'].includes(url.protocol) || url.origin!==new URL(base).origin) continue;
    const target=byRoute.get(normalizeRoute(url.pathname));
    if (!target) {
      let decoded: string;
      try { decoded=decodeURIComponent(url.pathname).replace(/^\//,''); } catch { problems.push(href); continue; }
      if (!decoded || decoded.includes('\\') || decoded.split('/').includes('..')) { problems.push(href); continue; }
      const candidates=[path.posix.join(config.paths.output,decoded),path.posix.join(config.paths.public,decoded)];
      let found=false;
      for (const candidate of candidates) {
        const file=await safePath(root,candidate);
        if (await exists(file) && (await stat(file)).isFile()) found=true;
      }
      if (!found) problems.push(href);
    } else if (url.hash) {
      try { if (!target.ids.has(decodeURIComponent(url.hash.slice(1)))) problems.push(href); } catch { problems.push(href); }
    }
  }
  return problems;
}
