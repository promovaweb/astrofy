/** Parsing Markdown/MDX para validar links e aplicar substituições delimitadas e idempotentes. */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import GithubSlugger from 'github-slugger';
import { visit } from 'unist-util-visit';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { atomicWrite, exists, safePath, walk, withLock } from '../core/filesystem.js';
import { AstrofyError } from '../core/types.js';
interface Link { url: string; start: number; end: number }
/** AST ignora código, frontmatter e imports; offsets permitem conservar os bytes não alterados. */
export function markdownLinks(source: string, mdx = false): Link[] {
  const parser=unified().use(remarkParse).use(remarkFrontmatter,['yaml','toml']);
  if (mdx) parser.use(remarkMdx);
  const tree=parser.parse(source),links: Link[]=[];
  visit(tree,(node: unknown)=>{
    const data=node as { type:string; url?:string; position?:{start:{offset?:number};end:{offset?:number}} };
    if (['link','definition','image'].includes(data.type) && data.url && data.position?.start.offset!==undefined && data.position.end.offset!==undefined) links.push({url:data.url,start:data.position.start.offset,end:data.position.end.offset});
  });
  return links;
}
/** Extrai headings reais, inclusive Setext, sem interpretar blocos de código como títulos. */
export function markdownAnchors(source: string, mdx = false): Set<string> {
  const parser=unified().use(remarkParse).use(remarkFrontmatter,['yaml','toml']);
  if(mdx)parser.use(remarkMdx);
  const slugs=new GithubSlugger(),anchors=new Set<string>();
  type TextNode={type:string;value?:string;alt?:string;children?:TextNode[]};
  const text=(node:TextNode):string=>node.type==='text'||node.type==='inlineCode'?node.value??'':node.type==='image'?node.alt??'':(node.children??[]).map(text).join('');
  visit(parser.parse(source),'heading',node=>{anchors.add(slugs.slug(text(node as TextNode)));});
  return anchors;
}
/** Verifica existência de documentos e âncoras Markdown sem baixar URLs externas. */
export async function checkDocs(root: string): Promise<{files:string[]; problems:string[]}> {
  const files=(await walk(root,'.astrofy/docs',true)).filter(file=>/\.mdx?$/.test(file));
  const problems:string[]=[];
  if (!files.includes('.astrofy/docs/index.md')) problems.push('.astrofy/docs/index.md ausente.');
  for (const file of files) {
    const source=await readFile(await safePath(root,file),'utf8');
    let links:Link[];
    try { links=markdownLinks(source,file.endsWith('.mdx')); } catch { problems.push(`${file}: Markdown inválido.`); continue; }
    for (const link of links) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(link.url)) continue;
      const [targetPart,fragment]=link.url.split('#');
      let decodedTarget:string,decodedFragment:string;
      try {decodedTarget=decodeURIComponent(targetPart??'');decodedFragment=decodeURIComponent(fragment??'');}
      catch {problems.push(`${file}: URL malformada ${link.url}.`);continue;}
      const target=decodedTarget ? path.posix.normalize(path.posix.join(path.posix.dirname(file),decodedTarget)) : file;
      const absolute=await safePath(root,target);
      if (!(await exists(absolute))) problems.push(`${file}: destino ausente ${link.url}.`);
      else if (fragment && /\.mdx?$/.test(target)) {
        const text=await readFile(absolute,'utf8');
        let anchors:Set<string>;
        try {anchors=markdownAnchors(text,target.endsWith('.mdx'));}
        catch {problems.push(`${file}: documento de destino inválido ${link.url}.`);continue;}
        if (!anchors.has(decodedFragment)) problems.push(`${file}: âncora ausente ${link.url}.`);
      }
    }
  }
  return {files,problems};
}
/** Troca um destino existente usando AST; não altera código, imports, frontmatter ou outros links. */
export async function replaceLink(root: string, file: string, from: string, to: string, dryRun = false): Promise<boolean> {
  if(from===to)return false;
  const run=async()=>{
    const source=await readFile(await safePath(root,file),'utf8');
    const links=markdownLinks(source,file.endsWith('.mdx')).filter(link=>link.url===from);
    if (!links.length) return false;
    if (/[\s()<>\\]/.test(to)) throw new AstrofyError('O destino precisa estar codificado como URL.');
    let result=source;
    for (const link of links.sort((a,b)=>b.start-a.start)) {
      const part=source.slice(link.start,link.end);
      // Texto e título podem repetir a URL. Só aceitamos a ocorrência que muda o destino no AST.
      let replaced=false;
      for(let index=part.indexOf(from);index>=0;index=part.indexOf(from,index+from.length)){
        const start=link.start+index;
        const candidate=result.slice(0,start)+to+result.slice(start+from.length);
        try {
          if(markdownLinks(candidate,file.endsWith('.mdx')).some(node=>node.start===link.start&&node.url===to)){
            result=candidate;replaced=true;break;
          }
        } catch { /* A ocorrência no texto pode produzir sintaxe inválida; tente o destino. */ }
      }
      if(!replaced)throw new AstrofyError('Destino escapado exige edição manual.');
    }
    markdownLinks(result,file.endsWith('.mdx'));
    if (!dryRun) await atomicWrite(root,file,result);
    return true;
  };
  return dryRun ? run() : withLock(root,run);
}
