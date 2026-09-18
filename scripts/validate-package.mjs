/** Instala o tarball em isolamento e confere CLI, ebook e conteúdo distribuído. */

import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const tarball=resolve(process.argv[2]??'');
if(!process.argv[2])throw new Error('Uso: node scripts/validate-package.mjs <pacote.tgz>');
function run(command,args,cwd){const result=spawnSync(command,args,{cwd,encoding:'utf8',maxBuffer:32*1024*1024});if(result.status!==0)throw new Error(`${command} falhou: ${(result.stderr||result.stdout).trim()}`);return result.stdout;}
const listing=run('tar',['-tf',tarball],process.cwd());
for(const expected of ['package/.ebook/build-ebook.mjs','package/.ebook/pdf.css','package/docs/user/README.md','package/ebook/ebook-astrofy.pdf','package/ebook/ebook-astrofy.epub'])if(!listing.includes(expected))throw new Error(`arquivo ausente no pacote: ${expected}`);
if(listing.includes('package/.ebook/build/'))throw new Error('.ebook/build não pode integrar o pacote.');
const directory=await mkdtemp(join(tmpdir(),'astrofy-package-'));
try{
  await import('node:fs/promises').then(({writeFile})=>writeFile(join(directory,'package.json'),'{}\n'));
  run('npm',['install','--ignore-scripts',tarball],directory);
  const packageRoot=join(directory,'node_modules','@promovaweb','astrofy');
  const pkg=JSON.parse(await readFile(join(packageRoot,'package.json'),'utf8'));
  const version=run('node',['dist/cli/index.js','--version'],packageRoot);
  if(!version.includes(pkg.version))throw new Error('CLI instalada diverge da versão do pacote.');
  run('npm',['run','ebook:verify'],packageRoot);
  console.log(`Pacote ${pkg.version} validado em isolamento.`);
}finally{await rm(directory,{recursive:true,force:true});}
