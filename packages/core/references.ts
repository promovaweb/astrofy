/** Referências locais da checklist, com leitura limitada e sem abrir programas externos. */
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { stripVTControlCharacters } from 'node:util';
import { exists, safePath } from './filesystem.js';
import { AstrofyError, type ChecklistItem } from './types.js';

export interface LocalReference { label:string; root:string; path:string }
const distribution=fileURLToPath(new URL('../../skills/',import.meta.url));
/** Inclui relatórios citados e instruções instaladas; a biblioteca distribuída serve de fallback. */
export async function localReferences(root:string,item:ChecklistItem):Promise<LocalReference[]> {
  const references:LocalReference[]=[];
  for(const report of new Set(item.evidence.map(entry=>entry.report))){
    if(report&&await exists(await safePath(root,report)))references.push({label:report,root,path:report});
  }
  if(!/^astrofy-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.skill))throw new AstrofyError('Nome de skill inválido para referência local.');
  for(const suffix of ['SKILL.md','references/technical.md']){
    let found=false;
    for(const base of ['.agents/skills','.claude/skills']){
      const file=`${base}/${item.skill}/${suffix}`;
      if(await exists(await safePath(root,file))){references.push({label:file,root,path:file});found=true;break;}
    }
    if(!found){
      const file=`${item.skill}/${suffix}`;
      if(await exists(await safePath(distribution,file)))references.push({label:`Biblioteca distribuída: ${file}`,root:distribution,path:file});
    }
  }
  return references;
}
/** Conserva Markdown legível e remove sequências capazes de controlar o terminal. */
export async function readLocalReference(reference:LocalReference):Promise<string> {
  const file=await safePath(reference.root,reference.path);
  const info=await stat(file);
  if(!info.isFile()||info.size>512*1024)throw new AstrofyError('Referência local deve ser um arquivo de até 512 KiB.',3);
  return stripVTControlCharacters(await readFile(file,'utf8')).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'');
}
