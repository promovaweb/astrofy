/** Gerencia o Chromium do Playwright sem instalar navegador durante o npm install. */
import {exists} from './filesystem.js';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export interface BrowserState {installed:boolean;executable:string;version:string|null}

/** Consulta a instalação e abre o browser somente para obter sua versão real. */
export async function browserStatus():Promise<BrowserState>{
  const executable=chromium.executablePath(),installed=await exists(executable);
  if(!installed)return {installed:false,executable,version:null};
  const browser=await chromium.launch({headless:true});
  try{return {installed:true,executable,version:browser.version()};}
  finally{await browser.close();}
}

function playwright(args:string[]):Promise<void>{
  const cli=fileURLToPath(new URL('../../node_modules/playwright/cli.js',import.meta.url));
  return new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,[cli,...args],{stdio:'inherit'});
    child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(`Playwright terminou com código ${code}.`)));
  });
}

/** Instala apenas Chromium no cache compartilhado do Playwright. */
export async function installBrowser():Promise<BrowserState>{await playwright(['install','chromium']);return browserStatus();}
/** Remove os browsers mantidos por esta instalação do Playwright. */
export async function removeBrowser():Promise<{installed:false}>{await playwright(['uninstall','--all']);return {installed:false};}
