/** Gera SHA-256 para os arquivos de uma release. */

import {createHash} from 'node:crypto';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const directory=resolve(process.argv[2]??'release-assets');
const files=(await readdir(directory)).filter(name=>name!=='SHA256SUMS').sort();
const lines=[];
for(const file of files)lines.push(`${createHash('sha256').update(await readFile(resolve(directory,file))).digest('hex')}  ${file}`);
await writeFile(resolve(directory,'SHA256SUMS'),`${lines.join('\n')}\n`);
console.log(`Checksums gerados para ${files.length} arquivo(s).`);
