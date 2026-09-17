/** Confere cobertura da referência pública contra os comandos e flags implementados. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {COMMANDS,FLAGS} from '../dist/cli/index.js';
test('cada comando e opção tem seção própria com ao menos cinco exemplos',async()=>{
 const source=await readFile(new URL('../docs/cli.md',import.meta.url),'utf8');
 for(const heading of [...COMMANDS.map(command=>'astrofy '+command),...Object.keys(FLAGS).map(flag=>'--'+flag)]){
  const section=source.split('## '+heading+'\n')[1]?.split('\n## ')[0];
  assert.ok(section,`Seção ausente: ${heading}`);
  assert.ok((section.match(/^astrofy /gm)??[]).length>=5,`Exemplos insuficientes: ${heading}`);
 }
});
