/** Verificações de comportamento em preview autorizado, com rede limitada à origem configurada. */
import { chromium } from 'playwright';
import { AstrofyError, type Configuration } from '../core/types.js';
export interface BrowserResult {ok:boolean;reason:string}
/** Executa somente leitura e escolha de tema, nunca submissão de formulário ou navegação externa. */
export async function browserCheck(config:Configuration,route:string,rule:string,offline=false,signal?:AbortSignal):Promise<BrowserResult> {
  if(!config.checks.baseUrl)throw new AstrofyError('Configure checks.baseUrl com o preview para executar esta regra.',3);
  if(!config.checks.trustedExecution)throw new AstrofyError('O preview executa scripts do site. Habilite checks.trustedExecution para este projeto.',3);
  const base=new URL(config.checks.baseUrl);
  if(offline&&!['localhost','127.0.0.1','[::1]'].includes(base.hostname))throw new AstrofyError('Verificação remota indisponível no modo offline.',3);
  const target=new URL(route,base);
  if(target.origin!==base.origin)throw new AstrofyError('A rota não pertence à origem configurada.');
  signal?.throwIfAborted();
  const browser=await chromium.launch({headless:true});
  const abort=()=>void browser.close();signal?.addEventListener('abort',abort,{once:true});
  try {
    signal?.throwIfAborted();
    const context=await browser.newContext({viewport:{width:1280,height:800},colorScheme:'light',serviceWorkers:'block'});
    // Esses canais não passam pela interceptação HTTP comum do contexto.
    await context.routeWebSocket('**/*',socket=>socket.close());
    await context.route('**/*',request=>{const url=new URL(request.request().url());return url.origin===base.origin&&['GET','HEAD'].includes(request.request().method())?request.continue():request.abort();});
    const page=await context.newPage();page.setDefaultTimeout(config.checks.timeoutMs);
    const errors:string[]=[];page.on('pageerror',()=>errors.push('Erro JavaScript no preview.'));
    const response=await page.goto(target.href,{waitUntil:'networkidle',timeout:config.checks.timeoutMs});
    if(!response||response.status()>=400)throw new AstrofyError('Preview não retornou uma página disponível.',3);
    const effective=async()=>page.evaluate(()=>document.documentElement.dataset.theme);
    if(rule==='theme.system') {
      const selector=page.locator('[data-theme-select]').first();
      if(!await selector.count())throw new AstrofyError('Seletor data-theme-select não encontrado. Documente a adaptação do projeto.',3);
      await selector.selectOption('system');await page.emulateMedia({colorScheme:'dark'});
      await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
      await page.emulateMedia({colorScheme:'light'});await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
      return {ok:true,reason:'Modo system acompanhou mudanças entre dark e light no preview.'};
    }
    if(rule==='theme.persistence') {
      const selector=page.locator('[data-theme-select]').first();
      if(!await selector.count())throw new AstrofyError('Seletor data-theme-select não encontrado. Documente a adaptação do projeto.',3);
      await selector.selectOption('dark');await page.reload({waitUntil:'networkidle'});
      const retained=await effective()==='dark';
      await page.emulateMedia({colorScheme:'light'});
      return {ok:retained&&await effective()==='dark',reason:'Preferência dark reavaliada após recarregar e alterar a preferência do sistema.'};
    }
    if(rule==='layout.overflow'||rule==='layout.responsive') {
      const failed:number[]=[];
      for(const width of [360,768,1280]) {await page.setViewportSize({width,height:800});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))failed.push(width);}
      return {ok:!failed.length,reason:failed.length?`Overflow horizontal nas larguras ${failed.join(', ')}.`:'Sem overflow horizontal em 360, 768 e 1280 pixels. A organização visual ainda exige revisão.'};
    }
    if(rule==='react.hydration')return {ok:!errors.length,reason:errors.length?'Erro JavaScript observado após carregar a rota.':'Nenhum erro JavaScript observado no carregamento. Interações precisam de teste próprio.'};
    if(rule==='theme.initial-paint')return {ok:['light','dark'].includes(await effective()??''),reason:'Tema explícito observado no documento. A primeira pintura deve ser comparada em captura visual.'};
    return {ok:false,reason:'Comportamento não implementado pelo adaptador de navegador.'};
  } finally {signal?.removeEventListener('abort',abort);await browser.close();}
}
