/** Extrai a seção da versão vigente para as notas da GitHub Release. */

import {readFile,writeFile} from 'node:fs/promises';

const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
const changelog=await readFile(new URL('../CHANGELOG.md',import.meta.url),'utf8');
const start=changelog.indexOf(`## [${pkg.version}]`);
if(start<0)throw new Error(`CHANGELOG.md não contém ${pkg.version}.`);
const next=changelog.indexOf('\n## [',start+4);
const notes=changelog.slice(start,next<0?undefined:next).trim();
const output=process.argv[2]??'release-notes.md';
await writeFile(output,`${notes}\n`);
console.log(`Notas de v${pkg.version} gravadas em ${output}.`);
