/** Confere os builds das fixtures no Chromium, com servidores locais encerrados ao terminar. */
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const directory=fileURLToPath(new URL('.',import.meta.url));
const browser=await chromium.launch({headless:true});
try {
 for(const name of ['astro5','astro6','astro7']){
  const output=path.join(directory,name,'dist');
  await readFile(path.join(output,'index.html'));
  const server=createServer(async(request,response)=>{
   try{
    const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const file=path.resolve(output,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
    if(!file.startsWith(output+path.sep)){response.writeHead(403);response.end();return;}
    const bytes=await readFile(file);
    response.setHeader('content-type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');response.end(bytes);
   }catch{response.writeHead(404);response.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const context=await browser.newContext();
  try{
   const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
   const base=`http://127.0.0.1:${server.address().port}`;
   await page.goto(base,{waitUntil:'networkidle'});
   await page.getByRole('button',{name:'Contagem: 0'}).click();
   await page.getByRole('button',{name:'Contagem: 1'}).waitFor();
   assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(255, 255, 255)');
   await page.evaluate(()=>{document.documentElement.dataset.theme='dark';});
   assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(15, 23, 41)');
   await page.goto(base+'/artigo/',{waitUntil:'networkidle'});
   assert.equal(await page.locator('[data-note]').textContent(),'Componente renderizado pelo Astro.');
   assert.deepEqual(errors,[]);
   console.log(`${name}: hidratação, clique, Tailwind, tokens light/dark e componente MDX passaram.`);
  }finally{
   await context.close();await new Promise(resolve=>{server.closeAllConnections();server.close(resolve);});
  }
 }
}finally{await browser.close();}
