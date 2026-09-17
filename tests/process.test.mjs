/** Exercita timeout e cancelamento com descendente que continua ativo após SIGTERM. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {setTimeout as delay} from 'node:timers/promises';
import path from 'node:path';
import os from 'node:os';
import {runNodeProcess} from '../dist/checks/process.js';
import {withLock} from '../dist/core/filesystem.js';

async function fixture(t){
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy processos '));
 t.after(async()=>{
  try{const pid=Number(await readFile(path.join(root,'parent.pid'),'utf8'));if(process.platform!=='win32')process.kill(-pid,'SIGKILL');}catch{}
  await rm(root,{recursive:true,force:true});
 });
 await writeFile(path.join(root,'worker.mjs'),`import {writeFileSync} from 'node:fs';
process.on('SIGTERM',()=>{});
setInterval(()=>writeFileSync('heartbeat.txt',String(Date.now())),25);
`);
 await writeFile(path.join(root,'parent.mjs'),`import {spawn} from 'node:child_process';import {writeFileSync} from 'node:fs';
writeFileSync('parent.pid',String(process.pid));process.on('SIGTERM',()=>{});
spawn(process.execPath,['worker.mjs'],{stdio:'ignore'});setInterval(()=>{},1000);
`);
 return root;
}
async function stableHeartbeat(root){
 const file=path.join(root,'heartbeat.txt');
 const before=await readFile(file,'utf8');await delay(150);
 assert.equal(await readFile(file,'utf8'),before,'Descendente continuou executando após o retorno.');
}
test('timeout encerra gerenciador e descendente que ignoram SIGTERM',{timeout:8000},async t=>{
 const root=await fixture(t);
 const result=await runNodeProcess(root,path.join(root,'parent.mjs'),[],1000);
 assert.equal(result.timedOut,true);assert.notEqual(result.code,0);await stableHeartbeat(root);
});
test('cancelamento aguarda encerramento dos descendentes',{timeout:8000},async t=>{
 const root=await fixture(t),controller=new AbortController();
 const execution=withLock(root,()=>runNodeProcess(root,path.join(root,'parent.mjs'),[],5000,controller.signal));
 const rejected=assert.rejects(execution,{name:'AbortError'});
 const deadline=Date.now()+3000;
 while(true){try{await readFile(path.join(root,'heartbeat.txt'));break;}catch{assert.ok(Date.now()<deadline);await delay(20);}}
 await readFile(path.join(root,'.astrofy/cache/write.lock'));
 controller.abort();await rejected;await stableHeartbeat(root);
 await assert.rejects(readFile(path.join(root,'.astrofy/cache/write.lock')),{code:'ENOENT'});
});
test('processo já cancelado não inicia código do projeto',async t=>{
 const root=await fixture(t),controller=new AbortController();controller.abort();
 await assert.rejects(runNodeProcess(root,path.join(root,'parent.mjs'),[],1000,controller.signal),{name:'AbortError'});
 await assert.rejects(readFile(path.join(root,'parent.pid')),{code:'ENOENT'});
});
