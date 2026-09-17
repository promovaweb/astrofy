/** Executa checks reais no Chromium contra previews temporários e contabiliza requisições. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {initialize,loadConfig} from '../dist/core/index.js';
import {browserCheck} from '../dist/checks/browser.js';

async function fixture(t){
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-browser-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));await initialize(root);
 const config=await loadConfig(root),requests=[];let externalRequests=0;
 const external=createServer((request,response)=>{externalRequests++;response.end('externo');});
 await new Promise(resolve=>external.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>{external.closeAllConnections();external.close(resolve);}));
 const externalUrl=`http://127.0.0.1:${external.address().port}`;
 const server=createServer((request,response)=>{
  requests.push(`${request.method} ${request.url}`);
  if(request.url==='/missing'){response.writeHead(404);response.end();return;}
  if(request.url==='/ping'){response.end('ok');return;}
  response.setHeader('content-type','text/html');
  response.end(`<!doctype html><style>body{margin:0}${request.url==='/overflow'?'main{width:2000px}':''}</style><main>Teste</main><select data-theme-select><option>system</option><option>light</option><option>dark</option></select><script>
   const select=document.querySelector('select');const media=matchMedia('(prefers-color-scheme: dark)');
   let preference=localStorage.getItem('theme')||'system';select.value=preference;
   function apply(){document.documentElement.dataset.theme=preference==='system'?(media.matches?'dark':'light'):preference;}
   select.onchange=()=>{preference=select.value;localStorage.setItem('theme',preference);apply();};media.addEventListener('change',apply);apply();
   fetch('/ping').catch(()=>{});fetch('/submit',{method:'POST'}).catch(()=>{});fetch('${externalUrl}/external').catch(()=>{});
   new WebSocket(location.origin.replace('http','ws')+'/socket');
   navigator.serviceWorker.register('/worker.js').catch(()=>{});
   ${request.url==='/error'?'throw new Error("Erro do projeto");':''}
  </script>`);
 });
 server.on('upgrade',(request,socket)=>{requests.push(`UPGRADE ${request.url}`);socket.destroy();});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>{server.closeAllConnections();server.close(resolve);}));
 config.checks.baseUrl=`http://127.0.0.1:${server.address().port}`;config.checks.trustedExecution=true;config.checks.timeoutMs=2000;
 return {config,requests,externalRequests:()=>externalRequests};
}

test('preview local offline verifica temas e restringe HTTP, sockets e workers',async t=>{
 const {config,requests,externalRequests}=await fixture(t);
 assert.equal((await browserCheck(config,'/','theme.system',true)).ok,true);
 assert.equal((await browserCheck(config,'/','theme.persistence',true)).ok,true);
 assert.ok(requests.includes('GET /ping'));
 assert.ok(!requests.some(value=>value.includes('/submit')||value.includes('/socket')||value.includes('/worker.js')));
 assert.equal(externalRequests(),0);
});

test('checks distinguem overflow, erro JavaScript e página indisponível',async t=>{
 const {config}=await fixture(t);
 assert.equal((await browserCheck(config,'/','layout.overflow')).ok,true);
 const overflow=await browserCheck(config,'/overflow','layout.overflow');assert.equal(overflow.ok,false);assert.match(overflow.reason,/360, 768, 1280/);
 assert.equal((await browserCheck(config,'/error','react.hydration')).ok,false);
 await assert.rejects(browserCheck(config,'/missing','layout.overflow'),error=>error.exitCode===3);
});

test('preview ausente, autorização desativada, destino externo e cancelamento recusam execução',async t=>{
 const {config}=await fixture(t);
 const absent=structuredClone(config);absent.checks.baseUrl=null;
 await assert.rejects(browserCheck(absent,'/','theme.system'),error=>error.exitCode===3);
 const unauthorized=structuredClone(config);unauthorized.checks.trustedExecution=false;
 await assert.rejects(browserCheck(unauthorized,'/','theme.system'),error=>error.exitCode===3);
 await assert.rejects(browserCheck(config,'https://external.example/','theme.system'),error=>error.exitCode===2);
 const remote=structuredClone(config);remote.checks.baseUrl='https://external.example';
 await assert.rejects(browserCheck(remote,'/','theme.system',true),error=>error.exitCode===3);
 const controller=new AbortController();controller.abort();
 await assert.rejects(browserCheck(config,'/','theme.system',false,controller.signal),{name:'AbortError'});
});
