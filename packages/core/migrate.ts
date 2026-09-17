/** Migração explícita de contratos, com relatório de alterações e conservação dos campos locais. */
import { randomUUID } from 'node:crypto';
import { defaults, CONFIG_NAMES, loadConfig } from './config.js';
import { inspect } from './discovery.js';
import { validateConfigurationSemantics } from './configuration-validation.js';
import { atomicWrite, jsonText, readJson, safePath, exists, withLock } from './filesystem.js';
import { validate } from '../schemas/index.js';
import { AstrofyError, CONTRACT_VERSION } from './types.js';
/** A primeira migração preenche novos campos do contrato 0.1.0; versões desconhecidas são recusadas. */
export async function migrate(root:string,dryRun=true):Promise<{from:string;to:string;changes:string[];status:string}> {
  const run=async()=>{
    const project=await readJson<Record<string,unknown>>(root,'.astrofy/config/project.json');
    const from=String(project.contractVersion);
    if(from===CONTRACT_VERSION){await loadConfig(root);return {from,to:CONTRACT_VERSION,changes:[],status:'current'};}
    if(from!=='0.1.0')throw new AstrofyError(`Não há migração registrada de ${from} para ${CONTRACT_VERSION}.`);
    const base=defaults(await inspect(root)),planned=new Map<string,unknown>();
    for(const name of CONFIG_NAMES) {
      const file=`.astrofy/config/${name}.json`;
      const old=await exists(await safePath(root,file))?await readJson<Record<string,unknown>>(root,file):{};
      const data={...base[name],...old,schemaVersion:'1.0.0',...(name==='project'?{contractVersion:CONTRACT_VERSION}:{})};
      validate(name,data);planned.set(file,data);
      Object.assign(base,{[name]:data});
    }
    await validateConfigurationSemantics(root,base);
    const migration={schemaVersion:'1.0.0',runId:randomUUID(),from,to:CONTRACT_VERSION,createdAt:new Date().toISOString(),changes:[...planned.keys()],ruleRenames:{},status:dryRun?'planned':'applied'};
    validate('migration',migration);
    if(!dryRun) {
      for(const [file,data] of planned)await atomicWrite(root,file,jsonText(data));
      await atomicWrite(root,`.astrofy/migrations/${migration.runId}.json`,jsonText(migration));
    }
    return {from,to:CONTRACT_VERSION,changes:migration.changes,status:migration.status};
  };
  return dryRun?run():withLock(root,run);
}
