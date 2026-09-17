/** Confere âncoras por AST e diagnósticos locais de documentação Markdown/MDX. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {markdownAnchors,checkDocs,replaceLink} from '../dist/checks/markdown.js';

test('headings formatados, Setext e repetidos geram âncoras distintas',()=>{
 const source='---\ntitle: Metadado\n---\n# Uso de **Astro** e `MDX`\n\nSeção repetida\n---\n\n## Seção repetida\n\n## Seção repetida-1\n\n## Seção repetida\n\n```md\n# Falso\n```\n';
 assert.deepEqual([...markdownAnchors(source)],['uso-de-astro-e-mdx','seção-repetida','seção-repetida-1','seção-repetida-1-1','seção-repetida-2']);
 assert.deepEqual([...markdownAnchors('import X from "./x";\n\n# Texto <span>formatado</span>\n',true)],['texto-formatado']);
});

test('docs reconhece âncoras MDX e continua após URL malformada',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-md-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await mkdir(path.join(root,'.astrofy/docs'),{recursive:true});
 await writeFile(path.join(root,'.astrofy/docs/guia.mdx'),'# Guia\n\n## Seção\n\n## Seção\n\n```md\n# Falso\n```\n');
 await writeFile(path.join(root,'.astrofy/docs/index.md'),'# Índice\n\n[Repetida](guia.mdx#se%C3%A7%C3%A3o-1)\n\n[Código](guia.mdx#falso)\n\n[Inválido](guia.mdx#%ZZ)\n\n[Ausente](nao-existe.md)\n');
 const result=await checkDocs(root);
 assert.equal(result.files.length,2);assert.equal(result.problems.length,3);
 assert.ok(result.problems.some(problem=>problem.includes('âncora ausente')));
 assert.ok(result.problems.some(problem=>problem.includes('URL malformada')));
 assert.ok(result.problems.some(problem=>problem.includes('destino ausente')));
});
test('substituição altera destinos e conserva URL repetida em texto, título e código',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-replace-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const source='[/antigo](/antigo "Título /antigo")\n\n![Imagem /antigo](/antigo "Legenda /antigo")\n\n[Referência][id]\n\n[id]: /antigo "Título /antigo"\n\n`[Código](/antigo)`\n';
 const expected='[/antigo](/novo "Título /antigo")\n\n![Imagem /antigo](/novo "Legenda /antigo")\n\n[Referência][id]\n\n[id]: /novo "Título /antigo"\n\n`[Código](/antigo)`\n';
 const file=path.join(root,'documento.md');await writeFile(file,source);
 assert.equal(await replaceLink(root,'documento.md','/antigo','/novo',true),true);
 assert.equal(await readFile(file,'utf8'),source);
 assert.equal(await replaceLink(root,'documento.md','/antigo','/novo'),true);
 assert.equal(await readFile(file,'utf8'),expected);
 assert.equal(await replaceLink(root,'documento.md','/antigo','/novo'),false);
 assert.equal(await replaceLink(root,'documento.md','/novo','/novo'),false);
 assert.equal(await readFile(file,'utf8'),expected);
});
