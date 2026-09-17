/** Confere seleção de referências locais e leitura segura para apresentação no terminal. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {localReferences,readLocalReference} from '../dist/core/references.js';
test('skill distribuída abre sem relatório e instalação local tem prioridade',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy referencias '));t.after(()=>rm(root,{recursive:true,force:true}));
 const item={skill:'astrofy-init',evidence:[]};
 const bundled=await localReferences(root,item);
 assert.equal(bundled.length,2);assert.match(await readLocalReference(bundled[0]),/astrofy-init/);
 const directory=path.join(root,'.agents/skills/astrofy-init');await mkdir(directory,{recursive:true});
 await writeFile(path.join(directory,'SKILL.md'),'# Referência local\n\u001b[31mTexto\u001b[0m\u0007\n');
 const local=await localReferences(root,item);
 assert.equal(local[0].root,root);assert.equal(await readLocalReference(local[0]),'# Referência local\nTexto\n');
 assert.match(local[1].label,/Biblioteca distribuída/);
});
test('referências recusam escape e arquivos acima do limite de leitura',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy referencias '));t.after(()=>rm(root,{recursive:true,force:true}));
 await assert.rejects(localReferences(root,{skill:'../../outside',evidence:[]}),error=>error.exitCode===2);
 await assert.rejects(localReferences(root,{skill:'astrofy-init',evidence:[{report:'../outside.json'}]}),error=>error.exitCode===2);
 await writeFile(path.join(root,'grande.md'),'x'.repeat(512*1024+1));
 await assert.rejects(readLocalReference({root,path:'grande.md',label:'Grande'}),error=>error.exitCode===3);
});
