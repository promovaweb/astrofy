/** Confere a distribuição autocontida da área de design nos dois agentes. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,readdir,access,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {installSkills} from '../dist/core/skills.js';

/** Percorre também referências aninhadas de componentes, temas e macroestruturas. */
async function files(directory) {
  const result=[];
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    const target=path.join(directory,entry.name);
    result.push(...(entry.isDirectory()?await files(target):[target]));
  }
  return result;
}

test('design instala a biblioteca completa, a licença e as paletas sem depender do checkout',async t=>{
  const root=await mkdtemp(path.join(tmpdir(),'astrofy-design-'));
  t.after(()=>rm(root,{recursive:true,force:true}));
  for(const agent of ['codex','claude']) {
    const base=path.join(root,agent==='codex'?'.agents/skills':'.claude/skills','astrofy-design');
    const preview=await installSkills(root,agent,['astrofy-design'],true);
    assert.ok(preview.written.length>107);
    await assert.rejects(access(base));
    await installSkills(root,agent,['astrofy-design']);
    const manifest=JSON.parse(await readFile(path.join(base,'source-manifest.json'),'utf8'));
    assert.equal(manifest.files.length,107);
    for(const entry of manifest.files) {
      assert.match(entry.sha256,/^[a-f0-9]{64}$/);
      assert.ok((await readFile(path.join(base,entry.destination))).length>0);
    }
    assert.match(await readFile(path.join(base,'LICENSE'),'utf8'),/Permission is hereby granted/);
    assert.match(await readFile(path.join(base,'assets/themes.css'),'utf8'),/data-theme/);
    for(const file of await files(base)) {
      if(path.basename(file)==='LICENSE')continue;
      const text=await readFile(file,'utf8');
      assert.doesNotMatch(text,/hallmark/i,`${file}: identidade operacional antiga`);
      if(!file.endsWith('.md'))continue;
      // Trechos de exemplo podem mencionar arquivos do futuro projeto consumidor.
      const prose=text.replace(/(`{3,})[^\n]*\n[\s\S]*?\n\1/g,'');
      for(const match of prose.matchAll(/\]\(([^)]+)\)/g)) {
        const target=match[1].split('#')[0];
        if(!target||/^[a-z]+:|^\//i.test(target))continue;
        const resolved=path.resolve(path.dirname(file),target);
        assert.ok(resolved===base||resolved.startsWith(base+path.sep),`${file}: link sai da skill`);
        await access(resolved);
      }
    }
    assert.equal((await installSkills(root,agent,['astrofy-design'])).written.length,0);
    const palette=path.join(base,'assets/themes.css');
    await writeFile(palette,'/* Paleta personalizada pelo projeto. */\n');
    await assert.rejects(installSkills(root,agent,['astrofy-design']),/personalizada/);
    assert.equal(await readFile(palette,'utf8'),'/* Paleta personalizada pelo projeto. */\n');
  }
});
