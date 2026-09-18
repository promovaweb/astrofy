/** Exercita domínios das skills contra a fixture versionada do Astro 7. */
import {mkdtemp,cp,mkdir,writeFile,rm,readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import os from 'node:os';
import net from 'node:net';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const source=fileURLToPath(new URL('./astro7/',import.meta.url));
const temporary=await mkdtemp(path.join(os.tmpdir(),'astrofy-domains-'));
const root=path.join(temporary,'astro7');
let browser,server;

/** Reserva uma porta local antes de iniciar o servidor de desenvolvimento. */
async function availablePort(){
  const socket=net.createServer();
  await new Promise(resolve=>socket.listen(0,'127.0.0.1',resolve));
  const port=socket.address().port;
  await new Promise(resolve=>socket.close(resolve));
  return port;
}

/** Aguarda uma resposta HTTP e inclui a saída do processo se o servidor falhar. */
async function waitForServer(url,output){
  for(let attempt=0;attempt<80;attempt++){
    if(server.exitCode!==null)throw new Error(`Servidor Astro terminou antes de responder.\n${output.join('')}`);
    try{const response=await fetch(url);if(response.ok)return;}catch{}
    await new Promise(resolve=>setTimeout(resolve,250));
  }
  throw new Error(`Servidor Astro não respondeu no prazo.\n${output.join('')}`);
}

try{
  await cp(source,root,{recursive:true,filter:file=>!['node_modules','dist','.astro','.astrofy'].includes(path.basename(file))});
  // ClientRouter usa módulos virtuais associados ao caminho real; uma cópia
  // evita que o realpath de um symlink misture a fixture e o projeto temporário.
  await cp(path.join(source,'node_modules'),path.join(root,'node_modules'),{recursive:true});
  await writeFile(path.join(root,'astro.config.mjs'),`/** Configuração isolada do runner para não compartilhar o cache Vite. */
import {defineConfig} from 'astro/config';import react from '@astrojs/react';import mdx from '@astrojs/mdx';import tailwindcss from '@tailwindcss/vite';
export default defineConfig({integrations:[react(),mdx()],vite:{cacheDir:'.vite-cache',plugins:[tailwindcss()]}});
`);
  await mkdir(path.join(root,'src/actions'),{recursive:true});
  await mkdir(path.join(root,'src/content/blog'),{recursive:true});
  await mkdir(path.join(root,'src/layouts'),{recursive:true});
  await mkdir(path.join(root,'src/pages/arquivo'),{recursive:true});
  await mkdir(path.join(root,'src/pages/api'),{recursive:true});
  await mkdir(path.join(root,'src/pages/pt'),{recursive:true});
  await mkdir(path.join(root,'src/pages/en'),{recursive:true});

  await writeFile(path.join(root,'src/actions/index.ts'),`/** Action local usada para conferir validação de formulário no servidor. */
import {defineAction} from 'astro:actions';
import {z} from 'astro/zod';
export const server={contact:defineAction({accept:'form',input:z.object({email:z.email()}),handler:async({email})=>({received:email})})};
`);
  await writeFile(path.join(root,'src/pages/formulario.astro'),`---
/** Página de teste da Action sem serviço externo. */
---
<form><label>Email <input name="email" type="email" required /></label><button>Enviar</button></form><output aria-live="polite"></output>
<script>import {actions} from 'astro:actions';const form=document.querySelector('form');const output=document.querySelector('output');form?.addEventListener('submit',async event=>{event.preventDefault();const {data,error}=await actions.contact(new FormData(form));output.textContent=error?'Erro':data.received;});</script>
`);
  await writeFile(path.join(root,'src/pages/api/private.ts'),`/** Endpoint SSR de teste com autenticação derivada de cookie local. */
export const prerender=false;
export function GET({cookies}){return cookies.get('session')?.value==='valid'?new Response('autorizado'):new Response('não autorizado',{status:401});}
`);
  await writeFile(path.join(root,'src/content.config.ts'),`/** Coleção local usada para conferir schema e renderização MDX. */
import {defineCollection} from 'astro:content';import {glob} from 'astro/loaders';import {z} from 'astro/zod';
const blog=defineCollection({loader:glob({base:'./src/content/blog',pattern:'**/*.{md,mdx}'}),schema:z.object({title:z.string(),pubDate:z.coerce.date()})});export const collections={blog};
`);
  await writeFile(path.join(root,'src/content/blog/exemplo.mdx'),`---\ntitle: Exemplo tipado\npubDate: 2026-09-17\n---\n# Corpo MDX tipado\n`);
  await writeFile(path.join(root,'src/pages/conteudo.astro'),`---
/** Renderiza uma entrada real da Content Layer. */
import {getEntry,render} from 'astro:content';const entry=await getEntry('blog','exemplo');if(!entry)throw new Error('Entrada ausente');const {Content}=await render(entry);
---
<h1>{entry.data.title}</h1><Content />
`);
  await writeFile(path.join(root,'src/pages/arquivo/[page].astro'),`---
/** Paginação determinística com duas entradas por página. */
export function getStaticPaths({paginate}){return paginate(['a','b','c'],{pageSize:2});}const {page}=Astro.props;
---
<h1>Arquivo {page.currentPage}</h1><ul>{page.data.map(item=><li>{item}</li>)}</ul>
`);
  await writeFile(path.join(root,'src/pages/pt/sobre.astro'),`---
/** Rota em português com relação somente para tradução publicada. */
---
<html lang="pt-BR"><head><title>Sobre</title><link rel="alternate" hreflang="en" href="/en/about/" /></head><body><h1>Sobre</h1></body></html>
`);
  await writeFile(path.join(root,'src/pages/en/about.astro'),`---
/** Rota equivalente em inglês. */
---
<html lang="en"><head><title>About</title><link rel="alternate" hreflang="pt-BR" href="/pt/sobre/" /></head><body><h1>About</h1></body></html>
`);
  await writeFile(path.join(root,'src/layouts/Router.astro'),`---
/** Layout comum que ativa ClientRouter nas duas rotas do teste. */
import {ClientRouter} from 'astro:transitions';const {title}=Astro.props;
---
<html lang="pt-BR"><head><meta charset="utf-8" /><title>{title}</title><ClientRouter /></head><body><slot /><script>globalThis.pageLoads=globalThis.pageLoads??0;document.addEventListener('astro:page-load',()=>{globalThis.pageLoads++;document.body.dataset.loads=String(globalThis.pageLoads);});</script></body></html>
`);
  await writeFile(path.join(root,'src/pages/router-a.astro'),`---
import Router from '../layouts/Router.astro';
---
<Router title="Rota A"><h1>Rota A</h1><a href="/router-b/">Avançar</a></Router>
`);
  await writeFile(path.join(root,'src/pages/router-b.astro'),`---
import Router from '../layouts/Router.astro';
---
<Router title="Rota B"><h1>Rota B</h1><a href="/router-a/">Voltar</a></Router>
`);

  const port=await availablePort(),output=[];
  const manifest=JSON.parse(await readFile(path.join(root,'node_modules/astro/package.json'),'utf8'));
  const executable=path.join(root,'node_modules/astro',typeof manifest.bin==='string'?manifest.bin:manifest.bin.astro);
  server=spawn(process.execPath,[executable,'dev','--ignore-lock','--host','127.0.0.1','--port',String(port)],{cwd:root,stdio:['ignore','pipe','pipe']});
  server.stdout.on('data',chunk=>output.push(chunk.toString()));server.stderr.on('data',chunk=>output.push(chunk.toString()));
  const origin=`http://127.0.0.1:${port}`;
  await waitForServer(origin,output);
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage();

  await page.goto(`${origin}/formulario/`);await page.getByLabel('Email').fill('teste@example.com');await page.getByRole('button',{name:'Enviar'}).click();await page.getByText('teste@example.com').waitFor();
  assert.equal((await fetch(`${origin}/api/private`)).status,401);
  assert.equal((await fetch(`${origin}/api/private`,{headers:{cookie:'session=valid'}})).status,200);
  await page.goto(`${origin}/conteudo/`);await page.getByRole('heading',{name:'Corpo MDX tipado'}).waitFor();
  await page.goto(`${origin}/arquivo/2/`);assert.deepEqual(await page.locator('li').allTextContents(),['c']);
  await page.goto(`${origin}/pt/sobre/`);assert.equal(await page.locator('html').getAttribute('lang'),'pt-BR');assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),'/en/about/');
  const routerResponse=await page.goto(`${origin}/router-a/`);const routerHtml=await page.content();assert.equal(routerResponse.status(),200,`${routerHtml}\n${output.join('')}`);assert.match(routerHtml,/Avançar/);await page.getByRole('link',{name:'Avançar'}).click();await page.getByRole('heading',{name:'Rota B'}).waitFor();assert.ok(Number(await page.locator('body').getAttribute('data-loads'))>=2);
  console.log('astro7: Actions, autenticação SSR, MDX, paginação, i18n e ClientRouter conferidos.');
}finally{
  if(browser)await browser.close();
  if(server&&server.exitCode===null){server.kill('SIGTERM');await new Promise(resolve=>server.once('exit',resolve));}
  await rm(temporary,{recursive:true,force:true});
}
