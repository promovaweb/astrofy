/** Verifica o HTML produzido pela execução atual e a preservação do site em dry-run. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm,access} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {initialize} from '../dist/core/init.js';
import {checkProject,projectStatus} from '../dist/core/runner.js';
import {CATALOG} from '../dist/core/checklist.js';

async function fixture(t){
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy build '));t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'},scripts:{build:'node build.mjs'}}));
 await writeFile(path.join(root,'package-lock.json'),JSON.stringify({packages:{'node_modules/astro':{version:'5.13.0'}}}));
 await mkdir(path.join(root,'dist'),{recursive:true});
 await writeFile(path.join(root,'dist/index.html'),'<html><head></head><body><main><h1>Anterior</h1></main></body></html>');
 await initialize(root);
 const configPath=path.join(root,'.astrofy/config/checks.json');
 const config=JSON.parse(await readFile(configPath,'utf8'));config.trustedExecution=true;
 config.exclude=CATALOG.filter(rule=>!['quality.build','links.broken'].includes(rule.id)).map(rule=>rule.id);
 await writeFile(configPath,JSON.stringify(config));
 await writeFile(path.join(root,'build.mjs'),`import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('dist/nova',{recursive:true});
await writeFile('executado.txt','uma vez');
await writeFile('dist/index.html','<html><body><main><a href="/ausente/">Ausente</a></main></body></html>');
await writeFile('dist/nova/index.html','<html><body><main><a href="/">Início</a></main></body></html>');
`);
 return root;
}
test('build cria rotas antes dos checks e fingerprints usam a saída atual',async t=>{
 const root=await fixture(t);
 const progress=[];
 const {report}=await checkProject(root,{},event=>progress.push(event));
 assert.equal(progress[0].phase,'script');assert.equal(progress[0].label,'build');
 const finished=progress.filter(event=>event.phase==='checked');
 assert.equal(finished.length,report.findings.length);
 assert.deepEqual(finished.map(event=>event.completed),[1,2,3]);
 assert.ok(finished.every(event=>event.total===3));
 assert.equal(progress.at(-1).phase,'saving');
 assert.equal(report.findings.find(row=>row.ruleId==='quality.build').status,'passed');
 assert.equal(report.findings.find(row=>row.ruleId==='links.broken'&&row.scope.target==='/').status,'failed');
 assert.equal(report.findings.find(row=>row.ruleId==='links.broken'&&row.scope.target==='/nova/').status,'passed');
 const status=await projectStatus(root);
 assert.equal(status.items.find(row=>row.ruleId==='quality.build').status,'passed');
 assert.equal(status.items.find(row=>row.ruleId==='links.broken'&&row.scope.target==='/nova/').status,'passed');
});
test('cancelamento pelo observador de progresso conserva a checklist anterior',async t=>{
 const root=await fixture(t),controller=new AbortController();
 const file=path.join(root,'astrofy.checklist.json'),before=await readFile(file,'utf8');
 await assert.rejects(checkProject(root,{signal:controller.signal},event=>{
  if(event.phase==='script')controller.abort();
 }),{name:'AbortError'});
 assert.equal(await readFile(file,'utf8'),before);
 await assert.rejects(access(path.join(root,'executado.txt')));
});
test('dry-run não executa o build mesmo quando scripts são autorizados',async t=>{
 const root=await fixture(t),before=await readFile(path.join(root,'dist/index.html'),'utf8');
 const {report}=await checkProject(root,{dryRun:true});
 assert.equal(report.findings.find(row=>row.ruleId==='quality.build').status,'blocked');
 await assert.rejects(access(path.join(root,'executado.txt')));
 assert.equal(await readFile(path.join(root,'dist/index.html'),'utf8'),before);
});
test('build com erro impede aprovação baseada no HTML anterior',async t=>{
 const root=await fixture(t);await writeFile(path.join(root,'build.mjs'),'process.exit(1);\n');
 const {report}=await checkProject(root);
 assert.equal(report.findings.find(row=>row.ruleId==='quality.build').status,'failed');
 assert.equal(report.findings.find(row=>row.ruleId==='links.broken').status,'blocked');
});
test('timeout de build retorna execução incompleta em vez de falha avaliada',async t=>{
 const root=await fixture(t),file=path.join(root,'.astrofy/config/checks.json');
 const config=JSON.parse(await readFile(file,'utf8'));config.timeoutMs=1000;
 await writeFile(file,JSON.stringify(config));
 await writeFile(path.join(root,'build.mjs'),'setInterval(()=>{},1000);\n');
 const {report,code}=await checkProject(root);
 assert.equal(code,3);assert.equal(report.status,'blocked');
 assert.equal(report.findings.find(row=>row.ruleId==='quality.build').status,'blocked');
});
