/** Exportação e retenção de relatórios, preservando arquivos citados pela checklist e seu histórico. */
import { readFile,readdir,unlink } from 'node:fs/promises';
import path from 'node:path';
import { safePath,exists,atomicWrite,jsonText,readJson,withLock } from './filesystem.js';
import { validate } from '../schemas/index.js';
import { loadConfig } from './config.js';
import { loadChecklist } from './checklist.js';
import {AstrofyError,type Checklist,type Report} from './types.js';
import {redactReport} from './redaction.js';
/** Relatórios selecionados usam UUID, nunca um caminho vindo diretamente da linha de comando. */
export async function readReport(root:string,id:string):Promise<Report> {
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))throw new AstrofyError('Identificador de relatório inválido.');
  const report=await readJson<Report>(root,`.astrofy/reports/${id}.json`);validate('report',report);
  if(report.runId.toLowerCase()!==id.toLowerCase())throw new AstrofyError('Identificador interno não corresponde ao relatório solicitado.');
  redactReport(report);
  return report;
}
/** Compõe uma síntese legível com escopos, arquivos e ações, sem perder dados auxiliares. */
export function markdownReport(report:Report):string {
  report=structuredClone(report);redactReport(report);
  const s=report.summary;
  const clean=(value:string)=>value.replace(/[\r\n]/g,' ').replace(/([\\`*_[\]<>#|])/g,'\\$1');
  const lines=[
    '# Relatório Astrofy','',
    `Execução: ${clean(report.runId)}.`,
    `Comando: ${clean(report.command)}. Estado: ${report.status}.`,
    `Data: ${report.createdAt}. Versão do Astrofy: ${report.version}.`,'',
    `Foram avaliados ${s.evaluated} de ${s.applicable} itens aplicáveis. Há ${s.pending} pendências e ${s.blocked} avaliações não concluídas.`,'',
    '## Ambiente','',
    ...Object.entries(report.environment).map(([key,value])=>`- ${clean(key)}: ${clean(value)}.`),'',
    '## Escopo','',
    `Solicitado: ${clean(JSON.stringify(report.requestedScope))}.`,'',
    ...(report.coveredScope.length?report.coveredScope.map(scope=>`- ${scope.type}: ${clean(scope.target)}.`):['Nenhum escopo avaliado nesta execução.']),'',
    '## Resultados','',
  ];
  for(const [index,finding] of report.findings.entries()){
    lines.push(`### ${index+1}. ${clean(finding.ruleId)}`,'',
      `Estado: ${finding.status}. Severidade: ${finding.severity}.`,
      `Escopo: ${finding.scope.type} ${clean(finding.scope.target)}.`,'',
      clean(finding.message),'','Arquivos relacionados:','',
      ...(finding.files.length?finding.files.map(file=>`- ${clean(file)}`):['Nenhum arquivo listado pelo verificador.']),'',
      `Ação sugerida: ${clean(finding.suggestion)||'Nenhuma ação adicional informada.'}`,'');
  }
  if(!report.findings.length)lines.push('Nenhum achado individual foi registrado.','');
  if(report.artifacts.length)lines.push('## Arquivos gerados','',...report.artifacts.map(file=>`- ${clean(file)}`),'');
  if(report.data!==undefined)lines.push('## Dados da execução','','```json',JSON.stringify(report.data,null,2),'```','');
  return lines.join('\n');
}
/** Remove apenas relatórios reconhecidos, não referenciados e além da retenção configurada. */
export async function retainReports(root:string,checklist:Checklist,retention:number):Promise<string[]> {
  const dir=await safePath(root,'.astrofy/reports');if(!await exists(dir))return [];
  const protectedFiles=new Set(checklist.items.flatMap(item=>[...item.evidence,...item.history.flatMap(entry=>entry.evidence)]).map(e=>path.posix.normalize(e.report.replaceAll('\\','/'))));
  const candidates:{file:string;createdAt:string}[]=[];
  for(const name of await readdir(dir)){
    if(!/^[0-9a-f-]{36}\.json$/i.test(name))continue;
    const file=`.astrofy/reports/${name}`;
    try {const report=await readReport(root,name.slice(0,-5));candidates.push({file,createdAt:report.createdAt});}catch{/* Relatórios desconhecidos ou com identidade divergente permanecem intactos. */}
  }
  candidates.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));const removed:string[]=[];
  for(const candidate of candidates.slice(retention))if(!protectedFiles.has(candidate.file)){await unlink(await safePath(root,candidate.file));removed.push(candidate.file);}
  return removed;
}
export async function exportReport(root:string,report:Report,file:string,markdown=false,dryRun=false):Promise<void>{
  redactReport(report);
  await safePath(root,file);if(!dryRun)await atomicWrite(root,file,markdown?markdownReport(report):jsonText(report));
}
/** Guarda execuções auxiliares por UUID e aplica a mesma retenção usada pelo check. */
export async function persistReport(root:string,report:Report):Promise<void>{
  await withLock(root,async()=>{
    // Valida também o estado necessário à retenção antes de criar o relatório.
    const config=await loadConfig(root),checklist=await loadChecklist(root,config);
    const file=`.astrofy/reports/${report.runId}.json`;
    report.artifacts=[...new Set([...report.artifacts,file])];
    redactReport(report);
    validate('report',report);
    await atomicWrite(root,file,jsonText(report));
    if(checklist)await retainReports(root,checklist,config.checks.retention);
  });
}
