/** Verifica a autorização de revisão pelo catálogo e a conservação dos registros anteriores. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {initialize,CATALOG} from '../dist/core/index.js';
import {recordReview} from '../dist/core/runner.js';

async function fixture(t){
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-review-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));
 await initialize(root);
 const file=path.join(root,'astrofy.checklist.json');
 const checklist=JSON.parse(await readFile(file,'utf8'));
 return {root,file,checklist};
}

test('revisão recusa método adulterado, regra removida e instância retirada sem gravação',async t=>{
 const {root,file,checklist}=await fixture(t);
 const automatic=checklist.items.find(item=>item.method==='automatic');automatic.method='manual';
 const retired=checklist.items.find(item=>item.method==='hybrid');retired.retired=true;
 const absent=checklist.items.find(item=>item.method==='manual'&&item.id!==automatic.id);absent.ruleId='regra.removida';
 await writeFile(file,JSON.stringify(checklist));const before=await readFile(file,'utf8');
 for(const item of [automatic,retired,absent]){
  await assert.rejects(recordReview(root,item.id,'passed','Equipe','Conferência local'),error=>error.exitCode===2);
  assert.equal(await readFile(file,'utf8'),before);
 }
});

test('revisão mantém responsável e histórico e atualiza metadados do catálogo',async t=>{
 const {root,file,checklist}=await fixture(t);
 const item=checklist.items.find(item=>item.method==='manual');
 const rule=CATALOG.find(rule=>rule.id===item.ruleId);
 item.category='anterior';item.skill='astrofy-anterior';item.notes=['Conservar esta nota'];
 await writeFile(file,JSON.stringify(checklist));
 const first=await recordReview(root,item.id,'passed','Equipe','Conferência local');
 const readItem=async()=>JSON.parse(await readFile(file,'utf8')).items.find(row=>row.id===item.id);
 const initial=await readItem();
 assert.deepEqual(initial.history,[]);assert.deepEqual(initial.notes,item.notes);
 assert.equal(initial.category,rule.category);assert.equal(initial.skill,rule.skill);
 assert.equal(initial.evidence[0].reviewer,'Equipe');assert.equal(initial.evidence[0].runId,first.runId);
 assert.deepEqual(JSON.parse(await readFile(path.join(root,initial.evidence[0].report),'utf8')),first);
 await recordReview(root,item.id,'failed','Outra pessoa','Ajuste solicitado');
 const next=await readItem();assert.equal(next.history.length,1);assert.equal(next.history[0].status,'passed');
 assert.equal(next.history[0].evidence[0].reviewer,'Equipe');assert.equal(next.evidence[0].reviewer,'Outra pessoa');
});
