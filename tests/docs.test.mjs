/** Confere cobertura da referência pública contra os comandos e flags implementados. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {COMMANDS,FLAGS} from '../dist/cli/index.js';
for(const newline of ['\n','\r\n'])test(`documentação cobre comandos e opções com finais ${newline==='\n'?'LF':'CRLF'}`,async()=>{
 const original=await readFile(new URL('../docs/cli.md',import.meta.url),'utf8');
 const source=original.replace(/\r?\n/g,newline).replace(/\r\n/g,'\n');
 for(const heading of [...COMMANDS.map(command=>'astrofy '+command),...Object.keys(FLAGS).map(flag=>'--'+flag)]){
  const section=source.split('## '+heading+'\n')[1]?.split('\n## ')[0];
  assert.ok(section,`Seção ausente: ${heading}`);
  assert.ok((section.match(/^astrofy /gm)??[]).length>=5,`Exemplos insuficientes: ${heading}`);
 }
});
