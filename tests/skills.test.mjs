/** Instalação em agente local com preservação e integridade das referências da biblioteca. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,rm,writeFile,readFile,access} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {skillCatalog,installSkills} from '../dist/core/skills.js';
test('catálogo completo instala referências locais e recusa perda de personalização',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-skills-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const catalog=await skillCatalog();assert.equal(catalog.length,38);assert.equal(new Set(catalog.map(skill=>skill.name)).size,38);
 const result=await installSkills(root,'codex',['astrofy-themes'],true);assert.equal(result.written.length,3);
 await assert.rejects(access(path.join(root,'.agents')));
 await installSkills(root,'codex',['astrofy-themes']);
 const skill=path.join(root,'.agents/skills/astrofy-themes/SKILL.md');
 assert.match(await readFile(skill,'utf8'),/references\/technical.md/);
 await access(path.join(root,'.agents/skills/astrofy-themes/references/technical.md'));
 assert.equal((await installSkills(root,'codex',['astrofy-themes'])).written.length,0);
 await writeFile(skill,'# Personalizado\n');
 await assert.rejects(installSkills(root,'codex',['astrofy-themes']),/personalizada/);
 assert.equal(await readFile(skill,'utf8'),'# Personalizado\n');
 await assert.rejects(installSkills(root,'unknown'),/Agente suportado/);
});
test('preferências inválidas não criam arquivos no agente',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-preferencias-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await mkdir(path.join(root,'.astrofy/config'),{recursive:true});
 for(const preferences of [
  {schemaVersion:'1.0.0',enabled:'astrofy-themes',disabled:[]},
  {schemaVersion:'1.0.0',enabled:['astrofy-ausente'],disabled:[]},
  {schemaVersion:'1.0.0',enabled:['astrofy-themes'],disabled:['astrofy-themes']},
 ]){
  await writeFile(path.join(root,'.astrofy/config/skills.json'),JSON.stringify(preferences));
  await assert.rejects(installSkills(root,'codex'),error=>error.exitCode===2);
  await assert.rejects(access(path.join(root,'.agents')));
 }
 await writeFile(path.join(root,'.astrofy/config/skills.json'),JSON.stringify({schemaVersion:'1.0.0',enabled:['astrofy-themes'],disabled:[]}));
 const result=await installSkills(root,'codex');
 assert.equal(result.written.length,3);
 assert.ok(result.written.every(file=>file.includes('/astrofy-themes/')));
});
test('manifesto adulterado é recusado antes de alterar skills existentes',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-manifesto-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await installSkills(root,'codex',['astrofy-themes']);
 const manifestPath=path.join(root,'.astrofy/config/installed-codex.json');
 const original=JSON.parse(await readFile(manifestPath,'utf8'));
 const skillPath=path.join(root,'.agents/skills/astrofy-themes/SKILL.md');
 const bytes=await readFile(skillPath,'utf8');
 for(const manifest of [
  {...original,schemaVersion:'99.0.0'},
  {...original,agent:'claude'},
  {...original,files:{'../../outside.md':'a'.repeat(64)}},
  {...original,files:{'.agents/skills/astrofy-themes/SKILL.md':'hash-invalido'}},
 ]){
  const encoded=JSON.stringify(manifest);
  await writeFile(manifestPath,encoded);
  await assert.rejects(installSkills(root,'codex',['astrofy-themes']),error=>error.exitCode===2);
  assert.equal(await readFile(skillPath,'utf8'),bytes);
  assert.equal(await readFile(manifestPath,'utf8'),encoded);
 }
});
