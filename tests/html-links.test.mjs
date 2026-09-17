/** Confere destinos publicados, arquivos reais e âncoras em URLs de HTML explícitas. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {initialize,loadConfig} from '../dist/core/index.js';
import {readPages,brokenLinks} from '../dist/checks/html.js';

test('scanner recusa diretórios, âncoras ausentes e escapes codificados',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-links-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));
 await initialize(root);const config=await loadConfig(root);
 await mkdir(path.join(root,'dist/vazia'),{recursive:true});
 await mkdir(path.join(root,'public/imagens'),{recursive:true});
 await writeFile(path.join(root,'public/imagens/logo.svg'),'<svg></svg>');
 await writeFile(path.join(root,'dist/sobre.html'),'<h1 id="seção">Sobre</h1>');
 const valid=['/sobre#se%C3%A7%C3%A3o','/sobre.html#se%C3%A7%C3%A3o','/imagens/logo.svg','https://externo.example/arquivo'];
 const invalid=['/vazia/','/imagens/','/sobre.html#ausente','/sobre#ausente','/%2e%2e%2fpackage.json','/%5cpackage.json'];
 await writeFile(path.join(root,'dist/index.html'),[...valid,...invalid].map(href=>`<a href="${href}">Link</a>`).join(''));
 const pages=await readPages(root,config),home=pages.find(page=>page.route==='/');
 assert.deepEqual(await brokenLinks(root,config,pages,home),invalid);
});
