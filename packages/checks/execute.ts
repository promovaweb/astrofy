/** Execução explícita de scripts do site, com argumentos separados, timeout e cancelamento. */
import { createRequire } from 'node:module';
import { realpath } from 'node:fs/promises';
import path from 'node:path';
import { exists, readJson } from '../core/filesystem.js';
import type { Configuration, Inspection } from '../core/types.js';
import { runNodeProcess } from './process.js';
/** Scripts compartilhados por verificadores, executados antes da leitura do HTML. */
export const SCRIPT_RULES:Record<string,string>={'architecture.imports':'check','components.types':'check','quality.types':'check','mdx.schema':'build','mdx.components':'build','quality.build':'build'};
export async function projectScript(root: string, script: string, info: Inspection, config: Configuration, signal?: AbortSignal): Promise<{ok:boolean; reason:string; blocked?:boolean}> {
  if (!config.checks.trustedExecution) return {ok:false,reason:'Execução de código do projeto não habilitada em checks.trustedExecution.'};
  const pkg=await readJson<{scripts?:Record<string,string>}>(root,'package.json');
  if (!pkg.scripts?.[script]) return {ok:false,reason:`Script ${script} não definido no package.json.`};
  const candidates: string[]=[];
  if (process.env.npm_execpath && info.packageManager==='npm') candidates.push(process.env.npm_execpath);
  try {
    const require=createRequire(import.meta.url);
    const packageName=info.packageManager==='yarn'?'yarn':info.packageManager==='pnpm'?'pnpm':'npm';
    candidates.push(path.join(path.dirname(require.resolve(`${packageName}/package.json`)),packageName==='npm'?'bin/npm-cli.js':packageName==='pnpm'?'bin/pnpm.cjs':'bin/yarn.js'));
  } catch { /* Nem todo gerenciador está instalado junto do framework. */ }
  if (info.packageManager==='npm') candidates.push(path.resolve(path.dirname(process.execPath),'../lib/node_modules/npm/bin/npm-cli.js'));
  // Instalações globais podem ficar fora do prefixo do Node; resolvemos a entrada sem shell.
  if(['npm','pnpm','yarn'].includes(info.packageManager??'')){
    const manager=info.packageManager!;
    for(const directory of (process.env.PATH??'').split(path.delimiter).filter(Boolean)){
      try{
        const resolved=await realpath(path.join(directory,manager));
        if(/\.(?:c|m)?js$/.test(resolved))candidates.push(resolved);
      }catch{/* Diretórios do PATH nem sempre contêm o gerenciador selecionado. */}
      if(manager==='npm')candidates.push(path.join(directory,'node_modules/npm/bin/npm-cli.js'));
    }
  }
  let entry: string|undefined;
  for (const candidate of candidates) if (await exists(candidate)) {entry=candidate;break;}
  if (!entry || info.packageManager==='bun') return {ok:false,reason:'Entrada Node do gerenciador não encontrada; execute o script diretamente e registre a revisão.'};
  const {code,timedOut}=await runNodeProcess(root,entry,['run',script],config.checks.timeoutMs,signal);
  return {ok:code===0&&!timedOut,blocked:timedOut,reason:timedOut?`Script ${script} excedeu o timeout.`:`Script ${script}: código ${code}. Código do projeto foi executado.`};
}
