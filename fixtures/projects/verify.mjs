/** Exercita detecção e adoção contra projetos permanentes descritos no manifesto. */
import {mkdtemp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {initialize,inspect,loadConfig} from '../../dist/core/index.js';

const manifest=JSON.parse(await readFile(new URL('./manifest.json',import.meta.url),'utf8'));
for(const fixture of manifest.projects){
  const root=await mkdtemp(path.join(os.tmpdir(),`astrofy-${fixture.id}-`));
  try{
    const dependencies={astro:fixture.astro,...fixture.dependencies};
    await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies}));
    await writeFile(path.join(root,'package-lock.json'),JSON.stringify({packages:Object.fromEntries(Object.entries(dependencies).map(([name,version])=>[`node_modules/${name}`,{version}]))}));
    for(const relative of fixture.files){await mkdir(path.dirname(path.join(root,relative)),{recursive:true});await writeFile(path.join(root,relative),relative.endsWith('.mdx')?'---\ntitle: Exemplo\n---\n# Exemplo\n':'');}
    const info=await inspect(root);assert.equal(info.features.react,fixture.features.react,fixture.id);assert.equal(info.features.blog,fixture.features.blog,fixture.id);
    await initialize(root);
    if(fixture.customPaths){
      const file=path.join(root,'.astrofy/config/paths.json'),value=JSON.parse(await readFile(file,'utf8'));Object.assign(value,fixture.customPaths);await writeFile(file,JSON.stringify(value));
      const config=await loadConfig(root);assert.equal(config.paths.pages,fixture.customPaths.pages);assert.equal(config.paths.components,fixture.customPaths.components);
    }
    console.log(`${fixture.id}: adoção conferida.`);
  }finally{await rm(root,{recursive:true,force:true});}
}
