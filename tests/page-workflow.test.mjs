/** Exercita entrevista condicional, retomada, plano e transições de execução. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {initialize} from '../dist/core/init.js';
import {applyPlanState,answerPageInterview,createPageInterview,planPage,readPageInterview} from '../dist/core/page-workflow.js';

test('entrevista de produto retoma respostas e materializa o contrato completo',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-page-'));t.after(()=>rm(root,{recursive:true,force:true}));
  await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'7.3.3'}}));await initialize(root);
  let interview=await createPageInterview(root,'produto','product');
  assert.deepEqual(interview.nextQuestions.map(question=>question.field),['title','route','objective']);
  const answers={title:'Produto',route:'/produto/',objective:'Solicitar demonstração',audience:'Equipes técnicas',primaryActionLabel:'Solicitar demonstração',primaryActionHref:'/contato/',problem:'Processo manual',capabilities:'Automação, relatórios',integrations:'GitHub, ClickUp',pricingModel:'Assinatura'};
  for(const [field,value] of Object.entries(answers))interview=await answerPageInterview(root,'produto',field,value);
  assert.equal(interview.status,'ready');assert.deepEqual((await readPageInterview(root,'produto')).answers,interview.answers);
  const spec=JSON.parse(await readFile(path.join(root,'.astrofy/pages/produto/page-spec.json'),'utf8'));
  assert.deepEqual(spec.integrations,['GitHub','ClickUp']);assert.equal(spec.accessibility.keyboard,true);assert.ok(spec.tests.includes('responsividade'));
  const plan=await planPage(root,'produto');assert.equal(plan.phases[0].tasks[0].status,'ready');
  assert.match(await readFile(path.join(root,'.astrofy/plans/produto/implementation-plan.md'),'utf8'),/# Plano de implementação/);
  assert.deepEqual((await applyPlanState(root,'produto')).task,'route');
  assert.equal((await applyPlanState(root,'produto','route','completed')).plan.phases[1].tasks[0].status,'ready');
  assert.equal((await applyPlanState(root,'produto','content','failed')).status,'failed');
  assert.equal((await applyPlanState(root,'produto','content')).status,'in_progress');
});

test('tipos de página possuem perguntas próprias e dry-run não grava',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-pages-'));t.after(()=>rm(root,{recursive:true,force:true}));
  await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'7.3.3'}}));
  for(const type of ['sales','product','service','homepage','about','contact','pricing']){
    const interview=await createPageInterview(root,`pagina-${type}`,type,true);assert.equal(interview.type,type);assert.ok(interview.missing.length>6);
  }
  await assert.rejects(readFile(path.join(root,'.astrofy/pages/pagina-sales/interview.json')),{code:'ENOENT'});
});
