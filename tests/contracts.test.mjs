/** Testa adoção, contratos e contenção de arquivos com projetos temporários independentes. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { initialize, discoverRoot, inspect, loadConfig, summarize, reconcile, invalidate, policyCode, CATALOG } from '../dist/core/index.js';
import { atomicWrite, safePath, withLock } from '../dist/core/filesystem.js';
import { validate } from '../dist/schemas/index.js';
import {sameScope} from '../dist/core/scopes.js';
async function project(t) {
  const root = await mkdtemp(path.join(os.tmpdir(),'astrofy com espaços '));
  t.after(()=>rm(root,{recursive:true,force:true}));
  await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'^5.13.0'}}));
  await writeFile(path.join(root,'package-lock.json'),JSON.stringify({packages:{'node_modules/astro':{version:'5.13.0'},'node_modules/tailwindcss':{version:'4.1.0'}}}));
  await mkdir(path.join(root,'src/pages'),{recursive:true});
  await writeFile(path.join(root,'src/pages/index.astro'),'<h1>Teste</h1>');
  return root;
}
test('init dry-run não grava; adoção preserva o site e reexecução mantém personalizações',async t=>{
  const root=await project(t);
  const dry=await initialize(root,{dryRun:true});
  assert.ok(dry.created.includes('.astrofy/config/project.json'));
  await assert.rejects(readFile(path.join(root,'.astrofy/config/project.json')), {code:'ENOENT'});
  const first=await initialize(root);
  assert.equal(first.created.length,dry.created.length);
  const original=await readFile(path.join(root,'src/pages/index.astro'),'utf8');
  const custom='# Arquitetura personalizada\n';
  await writeFile(path.join(root,'.astrofy/docs/architecture.md'),custom);
  const second=await initialize(root);
  assert.deepEqual(second.created,[]);
  assert.equal(await readFile(path.join(root,'.astrofy/docs/architecture.md'),'utf8'),custom);
  assert.equal(await readFile(path.join(root,'src/pages/index.astro'),'utf8'),original);
  assert.equal(await discoverRoot(path.join(root,'src/pages')),root);
  assert.equal((await inspect(root)).versions.astro,'5.13.0');
});
test('configuração inválida existente não é sobrescrita',async t=>{
  const root=await project(t); await initialize(root);
  await writeFile(path.join(root,'.astrofy/config/features.json'),'{"schemaVersion":"1.0.0","blog":"sim"}');
  await assert.rejects(initialize(root),/features:.*boolean/);
  assert.match(await readFile(path.join(root,'.astrofy/config/features.json'),'utf8'),/"sim"/);
});
test('paths recusa escapes, inclusive symlinks de diretórios ainda sem destino',async t=>{
  const root=await project(t),outside=await mkdtemp(path.join(os.tmpdir(),'astrofy-outside-'));
  t.after(()=>rm(outside,{recursive:true,force:true}));
  await symlink(outside,path.join(root,'escape'),process.platform==='win32'?'junction':'dir');
  await assert.rejects(safePath(root,'../secret'),/fora do projeto/);
  await assert.rejects(safePath(root,'escape/new/file.json'),/simbólico/);
  await assert.rejects(safePath(root,'C:\\temp\\file'),/inválido/);
  await assert.rejects(atomicWrite(root,'escape/new/file.json','{}'),/simbólico/);
});
test('lock vivo impede sobreposição e é removido mesmo após exceção',async t=>{
  const root=await project(t);
  await withLock(root,async()=>{ await assert.rejects(withLock(root,async()=>{}),error=>error.exitCode===3); });
  await assert.rejects(withLock(root,async()=>{throw Error('falha controlada');}),/controlada/);
  assert.equal(await withLock(root,async()=>42),42);
});
test('tentativas concorrentes conservam um lock que exige recuperação',async t=>{
  const root=await project(t);
  await mkdir(path.join(root,'.astrofy/cache'),{recursive:true});
  const file=path.join(root,'.astrofy/cache/write.lock');
  const original=JSON.stringify({pid:2147483647,host:os.hostname(),token:'execucao-anterior'});
  await writeFile(file,original);
  let executed=0;
  const attempts=await Promise.allSettled([withLock(root,async()=>{executed++;}),withLock(root,async()=>{executed++;})]);
  assert.equal(executed,0);
  assert.ok(attempts.every(result=>result.status==='rejected'&&result.reason.exitCode===3));
  assert.equal(await readFile(file,'utf8'),original);
});
test('escrita cancelada conserva os bytes anteriores e permite nova execução',async t=>{
  const root=await project(t);
  await atomicWrite(root,'resultado.json','{"estado":"anterior"}\n');
  const controller=new AbortController();controller.abort();
  await assert.rejects(atomicWrite(root,'resultado.json','{"estado":"novo"}\n',{signal:controller.signal}),{name:'AbortError'});
  assert.equal(await readFile(path.join(root,'resultado.json'),'utf8'),'{"estado":"anterior"}\n');
  assert.equal(await atomicWrite(root,'resultado.json','{"estado":"novo"}\n'),true);
  assert.equal(await readFile(path.join(root,'resultado.json'),'utf8'),'{"estado":"novo"}\n');
});
test('schema rejeita enum, campo desconhecido e data inválida',()=>{
  assert.throws(()=>validate('features',{schemaVersion:'1.0.0',blog:true,react:false,i18n:false,forms:false,extra:1}),/additional properties/);
  assert.throws(()=>validate('project',{schemaVersion:'1.0.0',contractVersion:'1.0.0',projectId:'site',locale:'pt-BR',adoptionMode:'all',template:null}),/allowed values/);
  assert.throws(()=>validate('exceptions',{schemaVersion:'1.0.0',items:[{ruleId:'seo.title',scope:{type:'page',target:'/'},reason:'Teste',owner:'Teste',createdAt:'ontem',expiresAt:'amanhã'}]}),/date-time/);
});
test('histórico, notas, dispensa e cobertura conservam seus significados',async t=>{
  const root=await project(t); await initialize(root); const config=await loadConfig(root);
  const list=reconcile(config,[{type:'page',target:'/'}]);
  validate('checklist',list);
  const item=list.items.find(item=>item.ruleId==='seo.title');
  item.notes=['Revisar título']; item.status='passed'; item.inputFingerprint='before';
  const updated=reconcile(config,[{type:'page',target:'/'}],list);
  const next=updated.items.find(row=>row.id===item.id);
  assert.deepEqual(next.notes,['Revisar título']); assert.equal(invalidate(next,'after'),true);
  assert.equal(next.status,'pending'); assert.equal(next.history[0].status,'passed');
  assert.equal(summarize([next]).approval,null); assert.equal(summarize([next]).coverage,0);
  next.status='failed'; assert.equal(policyCode([next],config),1);
  config.exceptions.items.push({ruleId:next.ruleId,scope:next.scope,reason:'Ajuste agendado',owner:'Teste',createdAt:'2026-01-01T00:00:00Z',expiresAt:'2027-01-01T00:00:00Z'});
  assert.equal(policyCode([next],config,new Date('2026-06-01')),0);
  assert.equal(next.status,'failed'); assert.equal(summarize([next]).passed,0);
  assert.equal(policyCode([next],config,new Date('2027-06-01')),1);
});
test('dispensa usa a mesma identidade de rota e preserva a avaliação encontrada',async t=>{
 const root=await project(t);await initialize(root);const config=await loadConfig(root);
 const list=reconcile(config,[{type:'page',target:'/blog/'},{type:'page',target:'/blog'}]);
 const matching=list.items.filter(item=>item.ruleId==='seo.title'&&item.scope.target.startsWith('/blog'));
 assert.equal(matching.length,1);
 const item=matching[0];item.status='failed';item.severity='error';
 config.exceptions.items.push({ruleId:item.ruleId,scope:{type:'page',target:'/blog'},reason:'Correção programada',owner:'Teste',createdAt:'2026-01-01T00:00:00Z',expiresAt:'2027-01-01T00:00:00Z'});
 assert.equal(policyCode([item],config,new Date('2026-06-01')),0);assert.equal(item.status,'failed');
 assert.equal(sameScope({type:'component',target:'src\\components\\Header.astro'},{type:'component',target:'src/components/Header.astro'}),true);
});
test('mudança de método restaura metadados e exige nova avaliação sem perder notas',async t=>{
  const root=await project(t);await initialize(root);const config=await loadConfig(root);
  const list=reconcile(config,[{type:'page',target:'/'}]);
  const item=list.items.find(item=>item.ruleId==='seo.title');
  const rule=CATALOG.find(rule=>rule.id===item.ruleId);
  Object.assign(item,{method:'manual',category:'anterior',skill:'astrofy-anterior',status:'passed',checkedAt:'2026-09-01T00:00:00Z',inputFingerprint:'original',notes:['Conservar ajuste local']});
  const next=reconcile(config,[{type:'page',target:'/'}],list).items.find(row=>row.id===item.id);
  assert.equal(next.method,rule.method);assert.equal(next.category,rule.category);assert.equal(next.skill,rule.skill);
  assert.equal(next.status,'pending');assert.equal(next.inputFingerprint,null);assert.equal(next.checkedAt,null);
  assert.deepEqual(next.notes,item.notes);assert.equal(next.history.length,1);assert.equal(next.history[0].status,'passed');
  assert.equal(item.status,'passed');assert.equal(item.history.length,0);
  const again=reconcile(config,[{type:'page',target:'/'}],{...list,items:[next]}).items.find(row=>row.id===item.id);
  assert.equal(again.history.length,1);
});
test('regra reativada volta à cobertura e mantém a avaliação arquivada uma única vez',async t=>{
  const root=await project(t);await initialize(root);const config=await loadConfig(root);
  const list=reconcile(config,[{type:'page',target:'/'}]);
  const item=list.items.find(item=>item.ruleId==='seo.title');
  Object.assign(item,{retired:true,status:'passed',checkedAt:'2026-09-01T00:00:00Z',inputFingerprint:'original'});
  const nextList=reconcile(config,[{type:'page',target:'/'}],list);
  const next=nextList.items.find(row=>row.id===item.id);
  assert.equal(next.retired,undefined);assert.equal(next.status,'pending');assert.equal(next.history.length,1);
  assert.equal(summarize([next]).applicable,1);
  assert.equal(reconcile(config,[{type:'page',target:'/'}],nextList).items.find(row=>row.id===item.id).history.length,1);
});
test('instância com tipo de escopo antigo é retirada sem transferir aprovação',async t=>{
  const root=await project(t);await initialize(root);const config=await loadConfig(root);
  const list=reconcile(config,[]);
  const item=list.items.find(item=>item.ruleId==='seo.title');
  Object.assign(item,{id:'id-legado',scope:{type:'project',target:'.'},status:'passed'});
  const next=reconcile(config,[{type:'page',target:'/'}],list);
  assert.equal(next.items.find(row=>row.id==='id-legado').retired,true);
  assert.equal(next.items.find(row=>row.ruleId==='seo.title'&&row.scope.target==='/').status,'pending');
  validate('checklist',next);
});
test('recurso habilitado atualiza dispensa inicial sem fabricar histórico de avaliação',async t=>{
  const root=await project(t);await initialize(root);const config=await loadConfig(root);
  const rule=CATALOG.find(rule=>rule.feature==='blog');
  config.features.blog=false;
  const initial=reconcile(config,[]);
  const original=initial.items.find(item=>item.ruleId===rule.id);
  assert.equal(original.status,'not_applicable');
  config.features.blog=true;
  const enabled=reconcile(config,[],initial);
  const item=enabled.items.find(item=>item.id===original.id);
  assert.equal(item.status,'pending');assert.deepEqual(item.history,[]);
  assert.equal(original.status,'not_applicable');
  config.features.blog=false;
  const disabled=reconcile(config,[],enabled).items.find(item=>item.id===original.id);
  assert.equal(disabled.status,'not_applicable');assert.deepEqual(disabled.history,[]);
  Object.assign(item,{status:'not_applicable',reason:'Revisão registrada',checkedAt:'2026-09-01T00:00:00Z',inputFingerprint:'avaliado'});
  config.features.blog=true;
  const reviewed=reconcile(config,[],enabled).items.find(row=>row.id===item.id);
  assert.equal(reviewed.reason,'Revisão registrada');assert.equal(reviewed.inputFingerprint,'avaliado');
});
