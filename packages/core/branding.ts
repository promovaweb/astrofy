/** Importação explícita da paleta Brandfy, com preflight e relatório das alterações propostas. */
import { importBrandfy,type SourceMap } from '../adapters/brandfy.js';
import { type DesignSystem } from '../design-system/index.js';
import { loadConfig } from './config.js';
import { atomicWrite,exists,jsonText,readJson,safePath,withLock } from './filesystem.js';
export async function importBrandfyFile(root:string,source:string,dryRun=false):Promise<{changed:string[];preserved:string[]}> {
  const run=async()=>{
    const config=await loadConfig(root),file=config.paths.designSystem,mapPath='.astrofy/design/source-map.json';
    const existing=await exists(await safePath(root,file))?await readJson<DesignSystem>(root,file):undefined;
    const sourceMap=await exists(await safePath(root,mapPath))?await readJson<SourceMap>(root,mapPath):undefined;
    const result=importBrandfy(await readJson(root,source),source,existing,sourceMap);
    if(!dryRun){await atomicWrite(root,file,jsonText(result.design));await atomicWrite(root,mapPath,jsonText(result.sourceMap));}
    return {changed:result.changed,preserved:result.preserved};
  };
  return dryRun?run():withLock(root,run);
}
