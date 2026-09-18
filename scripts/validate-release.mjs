/** Confere a coerência da versão e da automação antes da publicação. */

import {readFile} from 'node:fs/promises';

const read=(path)=>readFile(new URL(`../${path}`,import.meta.url),'utf8');
const pkg=JSON.parse(await read('package.json'));
const version=pkg.version;
for(const path of ['VERSION','ebook/VERSION'])if((await read(path)).trim()!==version)throw new Error(`${path} diverge de package.json.`);
if(!(await read('CHANGELOG.md')).includes(`## [${version}]`))throw new Error(`CHANGELOG.md não contém ${version}.`);
const manifest=JSON.parse(await read('ebook/build.json'));
if(manifest.version!==version)throw new Error('ebook/build.json diverge da versão da release.');
for(const path of ['.ebook/build-ebook.mjs','.ebook/pdf.css','.ebook/epub.css'])if(!pkg.files.includes('.ebook'))throw new Error(`${path} não está coberto por package.json#files.`);
const workflow=await read('.github/workflows/release.yml');
for(const value of ['npm publish','gh release','package:verify','ebook:verify','extract-release-notes.mjs'])if(!workflow.includes(value))throw new Error(`workflow de release não contém: ${value}`);
const tag=process.argv[2];
if(tag&&tag!==`v${version}`)throw new Error(`tag ${tag} diverge de v${version}.`);
console.log(`Release v${version} coerente.`);
