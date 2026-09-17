/** Instalação local e conservadora da biblioteca em agentes explicitamente selecionados. */
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { atomicWrite, exists, hash, jsonText, readJson, safePath, walk, withLock } from './filesystem.js';
import { AstrofyError, VERSION } from './types.js';
import { validate } from '../schemas/index.js';
const distribution=fileURLToPath(new URL('../../skills/',import.meta.url));
export interface SkillEntry { name:string;title:string;description:string }
interface InstalledSkills {schemaVersion:string;version:string;agent:'codex'|'claude';files:Record<string,string>}
export async function skillCatalog():Promise<SkillEntry[]> {
  const source=JSON.parse(await readFile(new URL('../../skills/catalog.json',import.meta.url),'utf8'));
  validate<{skills:SkillEntry[]}>('skill-catalog',source);
  if(new Set(source.skills.map(skill=>skill.name)).size!==source.skills.length)throw new AstrofyError('Nome duplicado no catálogo de skills.');
  return source.skills;
}
/** Nunca escreve em diretórios globais. Arquivos locais divergentes exigem conciliação explícita. */
export async function installSkills(root:string,agent:'codex'|'claude',names:string[]=[],dryRun=false):Promise<{written:string[];preserved:string[]}> {
  if(!['codex','claude'].includes(agent))throw new AstrofyError('Agente suportado: codex ou claude.');
  const run=async()=>{
    const catalog=await skillCatalog();
    const preferences=await exists(await safePath(root,'.astrofy/config/skills.json'))?await readJson<{schemaVersion:string;enabled:string[];disabled:string[]}>(root,'.astrofy/config/skills.json'):{schemaVersion:'1.0.0',enabled:[],disabled:[]};
    validate('skills',preferences);
    if([...preferences.enabled,...preferences.disabled].some(name=>!catalog.some(skill=>skill.name===name)))throw new AstrofyError('Configuração de skills contém nome ausente do catálogo distribuído.');
    if(preferences.enabled.some(name=>preferences.disabled.includes(name)))throw new AstrofyError('Uma skill não pode estar habilitada e desabilitada simultaneamente.');
    const chosen=names.length?catalog.filter(skill=>names.includes(skill.name)):catalog.filter(skill=>(!preferences.enabled.length||preferences.enabled.includes(skill.name))&&!preferences.disabled.includes(skill.name));
    if(names.some(name=>!catalog.some(skill=>skill.name===name)))throw new AstrofyError('Skill não encontrada no catálogo distribuído.');
    const target=agent==='codex'?'.agents/skills':'.claude/skills';
    const manifestPath=`.astrofy/config/installed-${agent}.json`;
    const previous=await exists(await safePath(root,manifestPath))?await readJson<InstalledSkills>(root,manifestPath):{schemaVersion:'1.0.0',version:VERSION,agent,files:{}};
    validate('installed-skills',previous);
    // O manifesto só pode autorizar substituições dentro do agente selecionado.
    if(previous.agent!==agent||Object.keys(previous.files).some(file=>!file.startsWith(target+'/')))throw new AstrofyError('Manifesto de instalação pertence a outro agente.');
    const planned=new Map<string,string>(),written:string[]=[],preserved:string[]=[],hashes={...previous.files};
    for(const skill of chosen)for(const file of await walk(distribution,skill.name,true)){
      const content=await readFile(await safePath(distribution,file),'utf8'),destination=`${target}/${file}`,absolute=await safePath(root,destination);
      if(await exists(absolute)){
        const current=await readFile(absolute,'utf8');
        if(current===content){preserved.push(destination);hashes[destination]=hash(content);continue;}
        if(!previous.files[destination]||hash(current)!==previous.files[destination])throw new AstrofyError(`Skill personalizada: ${destination}. Concilie o arquivo antes de atualizar.`);
      }
      planned.set(destination,content);written.push(destination);hashes[destination]=hash(content);
    }
    const manifest={schemaVersion:'1.0.0',version:VERSION,agent,files:hashes};
    validate('installed-skills',manifest);
    if(!dryRun){for(const [file,content]of planned)await atomicWrite(root,file,content);await atomicWrite(root,manifestPath,jsonText(manifest));}
    return {written,preserved};
  };
  return dryRun?run():withLock(root,run);
}
