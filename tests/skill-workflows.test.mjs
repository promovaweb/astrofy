/** Exercita adoção, geração e revisão nas mesmas condições descritas pelas skills. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile, rm, access} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import {run} from '../dist/cli/index.js';
import {installSkills, skillCatalog} from '../dist/core/skills.js';
import {CATALOG} from '../dist/core/index.js';
import {readWorkflow} from '../dist/core/setup.js';

/** Projeto isolado com versões resolvidas; nenhum script do site é executado. */
async function project(t) {
  const root=await mkdtemp(path.join(os.tmpdir(),'astrofy skill fluxo '));
  t.after(()=>rm(root,{recursive:true,force:true}));
  await mkdir(path.join(root,'src/pages'),{recursive:true});
  await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0',tailwindcss:'4.3.3'}}));
  await writeFile(path.join(root,'package-lock.json'),JSON.stringify({packages:{'node_modules/astro':{version:'5.13.0'},'node_modules/tailwindcss':{version:'4.3.3'}}}));
  await writeFile(path.join(root,'src/pages/index.astro'),'<h1>Preservar</h1>');
  return root;
}

test('fluxo da skill init conserva código, notas e JSON inválido',async t=>{
  const root=await project(t);
  const exec=(...args)=>run([...args,'--root',root,'--json']);
  assert.equal((await exec('init','--dry-run')).code,0);
  await assert.rejects(access(path.join(root,'.astrofy/config/project.json')));
  await exec('init');
  const note=path.join(root,'.astrofy/docs/architecture.md');
  await writeFile(note,'# Estrutura local\n\nLayouts em src/views.\n');
  assert.deepEqual((await exec('init')).report.data.created,[]);
  const invalid=path.join(root,'.astrofy/config/features.json');
  await writeFile(invalid,'{"schemaVersion":"1.0.0","blog":"sim"}');
  await assert.rejects(exec('init'),/boolean/);
  assert.equal(await readFile(invalid,'utf8'),'{"schemaVersion":"1.0.0","blog":"sim"}');
  assert.match(await readFile(note,'utf8'),/src\/views/);
  assert.equal(await readFile(path.join(root,'src/pages/index.astro'),'utf8'),'<h1>Preservar</h1>');
});

test('setup registra o workflow completo e retoma a partir dos arquivos alterados',async t=>{
  const root=await project(t);
  const exec=(...args)=>run([...args,'--root',root,'--json']);
  const preview=await exec('setup','--dry-run');
  assert.equal(preview.report.data.steps.length,49);
  await assert.rejects(access(path.join(root,'.astrofy/setup-state.json')));
  const first=await exec('setup');
  assert.equal(first.code,0);
  assert.equal(first.report.data.steps.length,49);
  assert.equal(first.report.data.steps[0].skill,'astrofy-setup');
  assert.equal(first.report.data.steps.find(step=>step.skill==='astrofy-setup').status,'completed');
  assert.equal(first.report.data.steps.find(step=>step.skill==='astrofy-init').status,'completed');
  assert.equal(first.report.data.changedFiles.length,0);
  const state=path.join(root,'.astrofy/setup-state.json');
  const created=JSON.parse(await readFile(state,'utf8'));
  created.steps.find(step=>step.skill==='astrofy-architecture').status='completed';
  created.steps.find(step=>step.skill==='astrofy-architecture').updatedAt='2026-09-17T12:00:00.000Z';
  await writeFile(state,JSON.stringify(created));
  await writeFile(path.join(root,'src/pages/index.astro'),'<h1>Alterado</h1>');
  const resumed=await exec('setup');
  assert.deepEqual(resumed.report.data.changedFiles,['src/pages/index.astro']);
  assert.equal(resumed.report.data.steps.find(step=>step.skill==='astrofy-architecture').status,'completed');
  const invalid=JSON.parse(await readFile(state,'utf8'));
  invalid.steps[0].status='approved';
  await writeFile(state,JSON.stringify(invalid));
  await assert.rejects(exec('setup'),/setup-state:.*status/);
  assert.equal(JSON.parse(await readFile(state,'utf8')).steps[0].status,'approved');
});

test('workflow cobre o catálogo uma vez, possui entrada, finalizadores e não contém ciclos',async()=>{
  const workflow=await readWorkflow();
  const catalog=(await skillCatalog()).map(skill=>skill.name).sort();
  assert.deepEqual(workflow.steps.map(step=>step.skill).sort(),catalog);
  assert.equal(workflow.entrypoint,'astrofy-setup');
  assert.deepEqual(workflow.finalizers,['astrofy-markdown','astrofy-checkup']);
});

test('referências técnicas registram versão e data da conferência',async()=>{
  for(const skill of await skillCatalog()){
    for(const relative of ['references/technical.md']){
      const text=await readFile(new URL(`../skills/${skill.name}/${relative}`,import.meta.url),'utf8');
      assert.match(text,/Astro 7\.3\.3 em \d{2}\/\d{2}\/\d{4}/,`${skill.name}: base técnica sem versão e data`);
    }
  }
});

test('fluxo de tokens detecta ciclo, conserva CSS e recupera geração determinística',async t=>{
  const root=await project(t);
  const exec=(...args)=>run([...args,'--root',root,'--json']);
  await exec('init');
  const design=JSON.parse(await readFile(new URL('../fixtures/design-system.json',import.meta.url),'utf8'));
  const source=path.join(root,'.astrofy/design/design-system.json');
  await mkdir(path.dirname(source),{recursive:true});
  await writeFile(source,JSON.stringify(design));
  assert.equal((await exec('tokens','validate')).code,0);
  await exec('tokens','build','--dry-run');
  await assert.rejects(access(path.join(root,'designsystem.css')));
  await exec('tokens','build');
  const css=await readFile(path.join(root,'designsystem.css'),'utf8');
  const invalid=structuredClone(design);
  invalid.tokens.semantic.color.surface.$value='{semantic.color.content}';
  invalid.tokens.semantic.color.content.$value='{semantic.color.surface}';
  await writeFile(source,JSON.stringify(invalid));
  await assert.rejects(exec('tokens','build'),/ciclo/);
  assert.equal(await readFile(path.join(root,'designsystem.css'),'utf8'),css);
  await writeFile(source,JSON.stringify(design));
  await exec('tokens','build');
  assert.equal(await readFile(path.join(root,'designsystem.css'),'utf8'),css);
  assert.equal((await exec('tokens','check')).code,0);
});

test('checkup conserva revisão pendente e exporta relatório com as flags documentadas',async t=>{
  const root=await project(t);
  const exec=(...args)=>run([...args,'--root',root,'--json']);
  await exec('init');
  const before=await readFile(path.join(root,'astrofy.checklist.json'),'utf8');
  await exec('status');
  assert.equal(await readFile(path.join(root,'astrofy.checklist.json'),'utf8'),before);
  const list=JSON.parse(before),manual=list.items.find(item=>item.method==='manual');
  const result=await exec('check','--rule',manual.ruleId);
  assert.ok(result.report.findings.length>0);
  assert.ok(result.report.findings.every(item=>item.status!=='passed'));
  await exec('report','--markdown','--output','.astrofy/reports/resumo.md');
  assert.match(await readFile(path.join(root,'.astrofy/reports/resumo.md'),'utf8'),/^#/);
});

test('as 49 skills instaladas resolvem todas as referências locais nos dois agentes',async t=>{
  const root=await project(t);
  for(const agent of ['codex','claude']) {
    await installSkills(root,agent);
    const directory=path.join(root,agent==='codex'?'.agents/skills':'.claude/skills');
    for(const skill of await skillCatalog()) {
      const required=['SKILL.md','references/technical.md','examples/cases.md'];
      if(skill.name==='astrofy-setup')required.push('references/workflow.json');
      for(const relative of required) {
        const file=path.join(directory,skill.name,relative);
        const text=await readFile(file,'utf8');
        // Exemplos precisam apontar para regras e categorias executáveis.
        for(const command of text.matchAll(/^astrofy .+$/gm)) {
          const rule=command[0].match(/--rule\s+(\S+)/)?.[1];
          const category=command[0].match(/--category\s+(\S+)/)?.[1];
          if(rule)assert.ok(CATALOG.some(item=>item.id===rule),`${skill.name}: regra inexistente ${rule}`);
          if(category)assert.ok(CATALOG.some(item=>item.category===category),`${skill.name}: categoria inexistente ${category}`);
        }
        for(const match of text.matchAll(/\]\(([^)]+)\)/g)) {
          const [target,anchor]=match[1].split('#');
          if(!target||/^[a-z]+:/i.test(target))continue;
          const resolved=path.resolve(path.dirname(file),target);
          assert.ok(resolved.startsWith(path.join(directory,skill.name)+path.sep),`${skill.name}: referência externa ao pacote da skill`);
          await access(resolved);
          if(anchor) {
            const linked=await readFile(resolved,'utf8'),slugger=new GithubSlugger();
            const headings=[...linked.matchAll(/^#{1,6} (.+)$/gm)].map(heading=>slugger.slug(heading[1]));
            assert.ok(headings.includes(decodeURIComponent(anchor)),`${skill.name}: seção ausente ${anchor}`);
          }
        }
      }
    }
    assert.equal((await installSkills(root,agent)).written.length,0);
  }
});
