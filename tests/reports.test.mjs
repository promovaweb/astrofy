/** Confere retenção sem perder relatórios citados e recusa identidade divergente. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import {createReport} from '../dist/core/runner.js';
import {retainReports,readReport,persistReport,markdownReport} from '../dist/core/reports.js';
import {initialize} from '../dist/core/init.js';

test('Markdown conserva escopo, arquivos, sugestões e dados auxiliares com credenciais ocultas',()=>{
 const report=createReport('check');report.coveredScope=[{type:'page',target:'/blog/'}];
 report.findings=[{ruleId:'links.broken',scope:{type:'page',target:'/blog/'},status:'failed',severity:'error',message:'Destino ausente.',files:['dist/blog/index.html'],suggestion:'Corrija o destino e execute novamente.'}];
 report.data={diagnostic:'Bearer segredo-markdown'};report.artifacts=['.astrofy/reports/exemplo.json'];
 const text=markdownReport(report);
 for(const fragment of ['## Ambiente','## Escopo','### 1. links.broken','dist/blog/index.html','Corrija o destino','## Arquivos gerados','## Dados da execução'])assert.ok(text.includes(fragment),fragment);
 assert.ok(!text.includes('segredo-markdown'));assert.equal(report.data.diagnostic,'Bearer segredo-markdown');
 const auxiliary=createReport('docs check');auxiliary.data={problems:['Documento ausente']};
 assert.match(markdownReport(auxiliary),/Documento ausente/);
});

test('configuração inválida impede persistência de relatório auxiliar',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-report-preflight-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));
 await initialize(root);
 const config=path.join(root,'.astrofy/config/checks.json');
 const original=await readFile(config,'utf8');
 await writeFile(config,original.replace('"retention": 30','"retention": -1'));
 const report=createReport('status');
 await assert.rejects(persistReport(root,report));
 await assert.rejects(readFile(path.join(root,`.astrofy/reports/${report.runId}.json`)),{code:'ENOENT'});
 assert.deepEqual(report.artifacts,[]);
 await writeFile(config,original);
 await persistReport(root,report);
 assert.deepEqual(await readReport(root,report.runId),report);
});

test('retenção conserva referências atuais, históricas e arquivos desconhecidos',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy relatorios '));t.after(()=>rm(root,{recursive:true,force:true}));
 await mkdir(path.join(root,'.astrofy/reports'),{recursive:true});
 const paths=[];
 for(let index=0;index<4;index++){
  const report=createReport('check');report.createdAt=`2026-01-0${index+1}T00:00:00Z`;
  const file=`.astrofy/reports/${report.runId}.json`;paths.push(file);
  await writeFile(path.join(root,file),JSON.stringify(report));
 }
 const unknown=`.astrofy/reports/${randomUUID()}.json`;
 await writeFile(path.join(root,unknown),'conteúdo preservado');
 const wrong=`.astrofy/reports/${randomUUID()}.json`;
 await writeFile(path.join(root,wrong),JSON.stringify(createReport('check')));
 const checklist={items:[{evidence:[{report:'./'+paths[0]}],history:[{evidence:[{report:paths[1].replaceAll('/','\\')}]}]}]};
 assert.deepEqual(await retainReports(root,checklist,1),[paths[2]]);
 for(const file of [paths[0],paths[1],paths[3],unknown,wrong])await readFile(path.join(root,file));
 await assert.rejects(readReport(root,path.basename(wrong,'.json')),error=>error.exitCode===2);
});
