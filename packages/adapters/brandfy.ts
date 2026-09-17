/** Adapta o formato real de brandfy/brand/tokens.json e conserva ajustes locais rastreados. */
import { resolveTokens, type DesignSystem, type Token } from '../design-system/index.js';
import { AstrofyError } from '../core/types.js';
interface BrandfyPalette { name:string; families:Record<string,Record<string,string>>; light:Record<string,string>; dark:Record<string,string>; harmony?:unknown }
export interface SourceEntry {path:string;source:string;kind:'imported';value:unknown;localOverride?:boolean}
export interface SourceMap {schemaVersion:string;sources:SourceEntry[]}
const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
function color(hex:string):Token {
  if(!/^#[0-9a-f]{6}$/i.test(hex))throw new AstrofyError('A exportação Brandfy exige cores hexadecimais com seis dígitos.');
  return {$type:'color',$value:{colorSpace:'srgb',components:hex.slice(1).match(/../g)!.map(part=>parseInt(part,16)/255),alpha:1}};
}
function get(design:DesignSystem,key:string):unknown{
  if(key.startsWith('modes.dark.overrides.'))return design.modes.dark.overrides[key.slice('modes.dark.overrides.'.length)];
  let result:unknown=design;
  for(const part of key.split('.'))result=result&&typeof result==='object'?(result as Record<string,unknown>)[part]:undefined;
  return result;
}
function set(design:DesignSystem,key:string,value:unknown):void{
  if(key.startsWith('modes.dark.overrides.')){design.modes.dark.overrides[key.slice('modes.dark.overrides.'.length)]=value;return;}
  const parts=key.split('.');let parent=design as unknown as Record<string,unknown>;
  for(const part of parts.slice(0,-1)){if(!parent[part])parent[part]={};parent=parent[part] as Record<string,unknown>;}
  parent[parts.at(-1)!]=value;
}
/** Entrada deriva de um exemplo real. Mudança local não marcada interrompe a reimportação. */
export function importBrandfy(raw:unknown,source:string,existing?:DesignSystem,sourceMap?:SourceMap):{design:DesignSystem;sourceMap:SourceMap;changed:string[];preserved:string[]} {
  if(!raw||typeof raw!=='object')throw new AstrofyError('Exportação Brandfy inválida.');
  const palette=raw as BrandfyPalette;
  if(typeof palette.name!=='string'||!palette.families||!palette.light||!palette.dark)throw new AstrofyError('Esperados name, families, light e dark na exportação Brandfy.');
  const design:DesignSystem=existing?structuredClone(existing):{schemaVersion:'1.0.0',name:palette.name,tokenFormat:'DTCG-2025.10',defaultMode:'light',assets:{},tokens:{primitive:{color:{}},semantic:{color:{}}},modes:{light:{overrides:{}},dark:{overrides:{}}}};
  const entries=new Map((sourceMap?.sources??[]).map(entry=>[entry.path,structuredClone(entry)])),changes=new Map<string,unknown>(),changed:string[]=[],preserved:string[]=[];
  for(const [family,scale]of Object.entries(palette.families))for(const [shade,hex]of Object.entries(scale)){
    if(!/^[a-zA-Z0-9_-]+$/.test(family)||!/^[a-zA-Z0-9_-]+$/.test(shade))throw new AstrofyError('Nome de família ou escala Brandfy inválido.');
    changes.set(`tokens.primitive.color.${family}.${shade}`,color(hex));
  }
  const mapping:Record<string,string>={background:'surface',surface:'panel',text:'content',textMuted:'muted',border:'line',accent:'action',focus:'focus',success:'success',warning:'warning',error:'error',info:'info'};
  for(const [key,hex]of Object.entries(palette.light)){
    const mapped=mapping[key];if(!mapped)throw new AstrofyError(`Função Brandfy sem mapeamento: ${key}.`);
    if(!palette.dark[key])throw new AstrofyError(`Função ${key} ausente no modo dark.`);
    changes.set(`tokens.semantic.color.${mapped}`,color(hex));changes.set(`modes.dark.overrides.semantic.color.${mapped}`,color(palette.dark[key]!).$value);
  }
  for(const [key,value]of changes){
    const old=entries.get(key),current=get(design,key);
    if(old?.localOverride){preserved.push(key);continue;}
    if(current!==undefined&&!same(current,value)&&(!old||!same(current,old.value)))throw new AstrofyError(`Ajuste local em ${key}. Registre localOverride no source-map para preservá-lo.`);
    if(!same(current,value)){set(design,key,value);changed.push(key);}
    entries.set(key,{path:key,source,kind:'imported',value:structuredClone(value)});
  }
  resolveTokens(design,'light');resolveTokens(design,'dark');
  return {design,sourceMap:{schemaVersion:'1.0.0',sources:[...entries.values()]},changed,preserved};
}
