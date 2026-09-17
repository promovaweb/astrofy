/** Exercita migração real, conservação de configurações e recusa anterior às escritas. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {initialize,loadConfig,CONFIG_NAMES} from '../dist/core/index.js';
import {migrate} from '../dist/core/migrate.js';

async function fixture(t){
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-migrate-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));
 await initialize(root);
 const project=await json(root,'project');project.contractVersion='0.1.0';project.projectId='site-personalizado';
 await save(root,'project',project);
 return root;
}
async function json(root,name){return JSON.parse(await readFile(path.join(root,'.astrofy/config',name+'.json'),'utf8'));}
async function save(root,name,value){await writeFile(path.join(root,'.astrofy/config',name+'.json'),JSON.stringify(value));}
async function configurationBytes(root){return Promise.all(CONFIG_NAMES.map(name=>readFile(path.join(root,'.astrofy/config',name+'.json'),'utf8')));}

test('plano não escreve e aplicação conserva personalizações e checklist',async t=>{
 const root=await fixture(t),paths=await json(root,'paths');
 paths.components='src/interface';delete paths.output;await save(root,'paths',paths);
 const before=await configurationBytes(root),checklist=await readFile(path.join(root,'astrofy.checklist.json'),'utf8');
 const plan=await migrate(root);
 assert.equal(plan.status,'planned');assert.equal(plan.changes.length,8);
 assert.deepEqual(await configurationBytes(root),before);
 await assert.rejects(readdir(path.join(root,'.astrofy/migrations')),{code:'ENOENT'});
 const applied=await migrate(root,false);assert.equal(applied.status,'applied');
 const config=await loadConfig(root);
 assert.equal(config.project.projectId,'site-personalizado');assert.equal(config.paths.components,'src/interface');assert.equal(config.paths.output,'dist');
 assert.equal(await readFile(path.join(root,'astrofy.checklist.json'),'utf8'),checklist);
 const records=await readdir(path.join(root,'.astrofy/migrations'));assert.equal(records.length,1);
 const record=JSON.parse(await readFile(path.join(root,'.astrofy/migrations',records[0]),'utf8'));
 assert.equal(record.status,'applied');assert.deepEqual(record.changes,applied.changes);
 assert.equal((await migrate(root,false)).status,'current');assert.deepEqual(await readdir(path.join(root,'.astrofy/migrations')),records);
});

test('valores fora dos schemas recusam o lote inteiro',async t=>{
 const root=await fixture(t),checks=await json(root,'checks');checks.timeoutMs='rápido';await save(root,'checks',checks);
 const before=await configurationBytes(root);
 await assert.rejects(migrate(root,false),/checks/);
 assert.deepEqual(await configurationBytes(root),before);
 await assert.rejects(readdir(path.join(root,'.astrofy/migrations')),{code:'ENOENT'});
});

test('validação semântica recusa plano e aplicação antes de alterar arquivos',async t=>{
 const cases=[
  ['paths',value=>{value.designSystemCss='tokens.txt';},/\.css/],
  ['paths',value=>{value.checklist='estado/checklist.json';},/raiz/],
  ['paths',value=>{value.components='../fora';},/fora|inválido/],
  ['integrations',value=>{value.providers={origem:{url:'https://usuario:senha@example.com'}};},/credenciais/],
  ['exceptions',value=>{value.items=[{ruleId:'seo.title',scope:{type:'page',target:'/'},reason:'Revisão',owner:'Equipe',createdAt:'2026-09-02T00:00:00Z',expiresAt:'2026-09-01T00:00:00Z'}];},/posterior/],
 ];
 for(const [name,change,expected] of cases){
  const root=await fixture(t),value=await json(root,name);change(value);await save(root,name,value);
  const before=await configurationBytes(root);
  await assert.rejects(migrate(root),expected);
  await assert.rejects(migrate(root,false),expected);
  assert.deepEqual(await configurationBytes(root),before);
  await assert.rejects(readdir(path.join(root,'.astrofy/migrations')),{code:'ENOENT'});
 }
});

test('contrato sem migração registrada preserva todos os arquivos',async t=>{
 const root=await fixture(t),project=await json(root,'project');project.contractVersion='9.0.0';await save(root,'project',project);
 const before=await configurationBytes(root);
 await assert.rejects(migrate(root,false),error=>error.exitCode===2);
 assert.deepEqual(await configurationBytes(root),before);
});
