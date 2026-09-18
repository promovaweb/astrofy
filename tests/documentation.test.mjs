/** Confere contratos navegáveis do manual e do ebook. */

import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile,readdir} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const docs=join(root,'docs','user');
const read=(path)=>readFile(join(root,path),'utf8');

test('ordem de leitura cobre todos os capítulos uma vez',async()=>{
  const order=(await read('docs/user/reading-order.txt')).trim().split(/\r?\n/);
  const chapters=(await readdir(docs)).filter(name=>name.endsWith('.md')).map(name=>`docs/user/${name}`).sort();
  assert.deepEqual([...order].sort(),chapters);
  assert.equal(new Set(order).size,order.length);
  assert.equal(order[0],'docs/user/README.md');
});

test('links locais do manual apontam para arquivos existentes',async()=>{
  const files=(await readdir(docs)).filter(name=>name.endsWith('.md'));
  for(const name of files){
    const text=await read(`docs/user/${name}`);
    for(const match of text.matchAll(/!?\[[^\]]*\]\(([^)#]+)(?:#[^)]+)?\)/g)){
      if(/^[a-z]+:/i.test(match[1]))continue;
      await access(resolve(docs,match[1]));
    }
  }
});

test('manual cobre os sete tipos, estados e comandos públicos',async()=>{
  const examples=await read('docs/user/06-exemplos-por-tipo-de-pagina.md');
  for(const heading of ['Landing page de vendas','Página de produto','Página de serviço','Página inicial','Página Sobre','Página de contato','Página de preços']) assert.match(examples,new RegExp(`## ${heading}`));
  const execution=await read('docs/user/07-execucao-retomavel.md');
  for(const state of ['pending','ready','in_progress','completed','failed','skipped']) assert.match(execution,new RegExp(`\\b${state}\\b`));
  const installation=await read('docs/user/01-instalacao-e-setup.md');
  for(const command of ['astrofy inspect','astrofy init']) assert.ok(installation.includes(command));
});

test('versões do pacote, CLI, catálogo e ebook são iguais',async()=>{
  const pkg=JSON.parse(await read('package.json'));
  const values=[(await read('VERSION')).trim(),(await read('ebook/VERSION')).trim(),JSON.parse(await read('skills/catalog.json')).version];
  const types=await read('packages/core/types.ts');
  for(const value of values)assert.equal(value,pkg.version);
  assert.ok(types.includes(`VERSION = '${pkg.version}'`));
});
