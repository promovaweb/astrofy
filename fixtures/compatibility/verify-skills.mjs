/** Valida procedimentos de arquitetura, componentes e testes em cópias descartáveis de Astro 5, 6 e 7. */
import {mkdtemp,cp,symlink,mkdir,writeFile,readFile,rm,access} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const execute=promisify(execFile);
const source=fileURLToPath(new URL('.',import.meta.url));
const temporary=await mkdtemp(path.join(os.tmpdir(),'astrofy skill browser '));
let browser;

/** Serve somente arquivos do build de teste, sem acesso externo ou publicação. */
async function serve(directory) {
  const server=createServer(async(request,response)=>{
    try {
      const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
      const file=path.resolve(directory,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
      if(!file.startsWith(directory+path.sep)){response.writeHead(403);response.end();return;}
      const bytes=await readFile(file);
      response.setHeader('content-type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
      response.end(bytes);
    } catch {response.writeHead(404);response.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  return server;
}

try {
  browser=await chromium.launch({headless:true});
  for(const version of ['astro5','astro6','astro7']) {
    const original=path.join(source,version),root=path.join(temporary,version);
    const manifest=JSON.parse(await readFile(path.join(original,'node_modules/astro/package.json'),'utf8'));
    const executable=typeof manifest.bin==='string'?manifest.bin:manifest.bin.astro;
    await access(path.join(original,'node_modules/astro',executable));
    await cp(original,root,{recursive:true,filter:file=>!['node_modules','dist','.astro','.astrofy'].includes(path.basename(file))});
    await symlink(path.join(original,'node_modules'),path.join(root,'node_modules'),process.platform==='win32'?'junction':'dir');
    const build=()=>execute(process.execPath,[path.join(root,'node_modules/astro',executable),'build'],{cwd:root,timeout:120000,maxBuffer:4*1024*1024});
    await mkdir(path.join(root,'src/layouts'),{recursive:true});
    await writeFile(path.join(root,'src/layouts/Base.astro'),`---
/** Layout de teste: título por rota e conteúdo pelo slot. */
import '../../designsystem.css';
interface Props { title: string }
const {title}=Astro.props;
---
<html lang="pt-BR"><head><meta charset="utf-8" /><title>{title}</title></head><body class="bg-surface"><main><slot /></main></body></html>
`);
    await writeFile(path.join(root,'src/components/ActionLink.astro'),`---
/** Link de teste com variante finita, href obrigatório e slot textual. */
interface Props { href: string; variant?: 'primary' | 'secondary' }
const {href,variant='primary'}=Astro.props;
---
<a href={href} data-variant={variant}><slot /></a>
`);
    const page=hydration=>`---
/** Consumidor usado para comparar hidratação e renderização estática. */
import Base from '../layouts/Base.astro';
import ActionLink from '../components/ActionLink.astro';
import Counter from '../components/Counter.jsx';
---
<Base title="Página inicial"><h1>Página inicial</h1><ActionLink href="/segunda/">Abrir segunda página</ActionLink><Counter ${hydration}/></Base>
`;
    await writeFile(path.join(root,'src/pages/index.astro'),page(''));
    await writeFile(path.join(root,'src/pages/segunda.astro'),`---
/** Segundo consumidor comprova título, slot e variante próprios. */
import Base from '../layouts/Base.astro';
import ActionLink from '../components/ActionLink.astro';
---
<Base title="Segunda página"><h1>Segunda página</h1><ActionLink href="/" variant="secondary">Voltar</ActionLink></Base>
`);
    // Import ausente deve reprovar o build, mesmo quando a saída anterior existe.
    await writeFile(path.join(root,'src/pages/quebrada.astro'),"---\nimport Missing from '../components/Ausente.astro';\n---\n<Missing />\n");
    await assert.rejects(build(),error=>/Ausente|resolve|ENOENT/.test(String(error.stderr)+String(error.stdout)));
    await rm(path.join(root,'src/pages/quebrada.astro'));
    await build();
    const server=await serve(path.join(root,'dist'));
    const context=await browser.newContext({viewport:{width:390,height:844}});
    try {
      const pageBrowser=await context.newPage(),errors=[];
      pageBrowser.on('pageerror',error=>errors.push(error.message));
      const origin=`http://127.0.0.1:${server.address().port}`;
      await pageBrowser.goto(origin,{waitUntil:'networkidle'});
      assert.equal(await pageBrowser.locator('astro-island[component-url]').count(),0);
      await pageBrowser.getByRole('button',{name:'Contagem: 0'}).click();
      assert.equal(await pageBrowser.getByRole('button',{name:'Contagem: 0'}).count(),1);
      // A mesma verificação exige incremento depois de restaurar a diretiva.
      await writeFile(path.join(root,'src/pages/index.astro'),page('client:load'));
      await build();
      await pageBrowser.goto(origin,{waitUntil:'networkidle'});
      await pageBrowser.getByRole('button',{name:'Contagem: 0'}).click();
      await pageBrowser.getByRole('button',{name:'Contagem: 1'}).waitFor({timeout:5000});
      assert.equal(await pageBrowser.title(),'Página inicial');
      const link=pageBrowser.getByRole('link',{name:'Abrir segunda página'});
      assert.equal(await link.getAttribute('data-variant'),'primary');
      await link.focus();
      assert.equal(await link.evaluate(element=>document.activeElement===element),true);
      assert.equal(await pageBrowser.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(255, 255, 255)');
      await pageBrowser.evaluate(()=>{document.documentElement.dataset.theme='dark';});
      assert.equal(await pageBrowser.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(15, 23, 41)');
      await link.click();
      await pageBrowser.getByRole('heading',{name:'Segunda página'}).waitFor();
      assert.equal(await pageBrowser.title(),'Segunda página');
      assert.equal(await pageBrowser.getByRole('link',{name:'Voltar'}).getAttribute('data-variant'),'secondary');
      assert.equal(await pageBrowser.locator('main').count(),1);
      assert.deepEqual(errors,[]);
      console.log(`${version}: import inválido recusado; layout, props, slot, foco, tokens e hidratação conferidos com caso negativo.`);
    } finally {
      await context.close();
      await new Promise(resolve=>{server.closeAllConnections();server.close(resolve);});
    }
  }
} finally {
  if(browser)await browser.close();
  await rm(temporary,{recursive:true,force:true});
}
