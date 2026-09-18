/** Execuções parciais, relatórios preservados e consolidação protegida por lock. */
import { randomUUID } from 'node:crypto';
import { platform } from 'node:os';
import { inspect } from './discovery.js';
import { loadConfig } from './config.js';
import { atomicWrite, jsonText, withLock, walk } from './filesystem.js';
import { CATALOG, fingerprint, invalidate, loadChecklist, policyCode, reconcile, snapshot, summarize } from './checklist.js';
import { readPages } from '../checks/html.js';
import { evaluate, type CheckContext } from '../checks/evaluate.js';
import { projectScript, SCRIPT_RULES } from '../checks/execute.js';
import { validate } from '../schemas/index.js';
import { retainReports } from './reports.js';
import { sameScope } from './scopes.js';
import { redactReport } from './redaction.js';
import { AstrofyError, VERSION, type ChecklistItem, type Configuration, type Report, type RunOptions, type Scope } from './types.js';
export const environment = () => ({ node:process.versions.node,platform:platform(),arch:process.arch });
/** Constrói a saída comum sem misturar mensagens operacionais no JSON. */
export function createReport(command:string,options:RunOptions={},items:ChecklistItem[]=[]):Report {
  const startedAt=new Date().toISOString();
  return {schemaVersion:'1.0.0',command,runId:randomUUID(),status:'completed',createdAt:startedAt,version:VERSION,environment:environment(),requestedScope:{category:options.category??null,rule:options.rule??null,page:options.page??null,component:options.component??null,changed:options.changed??false,offline:options.offline??false,browser:options.browser??false},coveredScope:[],summary:summarize(items),findings:[],artifacts:[],metrics:{startedAt,completedAt:startedAt,durationMs:0,stages:{}}};
}
/** Fecha as métricas antes de validar ou persistir o relatório. */
export function finishReport(report:Report,stages:Record<string,number>={}):Report{
  report.metrics.completedAt=new Date().toISOString();report.metrics.durationMs=Math.max(0,Date.parse(report.metrics.completedAt)-Date.parse(report.metrics.startedAt));report.metrics.stages={...report.metrics.stages,...stages};return report;
}
/** Compartilhados entram no hash de cada consumidor; outras rotas conservam seu estado em check parcial. */
export function inputsFor(item:ChecklistItem,files:string[],config:Configuration):string[] {
  // O resultado da verificação não é entrada do próprio hash.
  files=files.filter(file=>file!==config.paths.checklist);
  const controls=['package.json','package-lock.json','pnpm-lock.yaml','yarn.lock',config.paths.designSystem,config.paths.designSystemCss,...['project','paths','features','policies','checks','exceptions'].map(name=>`.astrofy/config/${name}.json`)];
  if(item.scope.type==='project')return [...files,...controls];
  const shared=files.filter(file=>!file.startsWith(config.paths.pages+'/')&&!file.startsWith(config.paths.output+'/'));
  const target=item.scope.target.replace(/^\//,'').replace(/\/$/,'');
  const specific=item.scope.type==='component'?[item.scope.target]:files.filter(file=>file.startsWith(config.paths.pages+'/')&&(file.includes(target)||(!target&&file.endsWith('/index.astro'))));
  const rendered=item.scope.type==='page'?[`${config.paths.output}/${target ? target+'/' : ''}index.html`,`${config.paths.output}/${target || 'index'}.html`]:[];
  return [...shared,...specific,...rendered,...controls];
}
/** Progresso transitório do runner; não integra o relatório nem a configuração do projeto. */
export interface CheckProgress { phase:'script'|'checking'|'checked'|'saving'; completed:number; total:number; label:string }
const browserRules=new Set(['theme.system','theme.persistence','theme.initial-paint','layout.overflow','layout.responsive','react.hydration']);
/** Reavalia o filtro; o observador opcional recebe etapas síncronas sem alterar a saída JSON. */
export async function checkProject(root:string,options:RunOptions={},onProgress?:(progress:CheckProgress)=>void):Promise<{report:Report;code:number}> {
  const run=async()=>{
    const config=await loadConfig(root);
    let info=await inspect(root),pages=await readPages(root,config);
    const scopesFor=():Scope[]=>[...pages.map(page=>({type:'page' as const,target:page.route})),...info.files.filter(file=>file.startsWith(config.paths.components+'/')&&/\.(astro|tsx|jsx)$/.test(file)).map(file=>({type:'component' as const,target:file}))];
    const scopes=scopesFor();
    if(options.page&&!scopes.some(scope=>sameScope(scope,{type:'page',target:options.page!})))scopes.push({type:'page',target:options.page});
    if(options.component&&!scopes.some(scope=>sameScope(scope,{type:'component',target:options.component!})))scopes.push({type:'component',target:options.component});
    let checklist=reconcile(config,scopes,await loadChecklist(root,config));
    const report=createReport('check',options);
    const reportPath=`.astrofy/reports/${report.runId}.json`;
    report.data={versions:info.versions,packageManager:info.packageManager};
    const context:CheckContext={root,config,info,pages,signal:options.signal,offline:options.offline,dryRun:options.dryRun,scripts:new Map()};
    const select=()=>checklist.items.filter(item=>!item.retired&&(!options.category||item.category===options.category)&&(!options.rule||item.ruleId===options.rule)&&(!options.page||sameScope(item.scope,{type:'page',target:options.page}))&&(!options.component||sameScope(item.scope,{type:'component',target:options.component}))&&!config.checks.exclude.includes(item.ruleId)&&(options.browser||!browserRules.has(item.ruleId)));
    let selected=select();
    if(!selected.length)throw new AstrofyError('Nenhuma regra corresponde aos filtros informados. Use --browser para incluir verificações de navegador.');
    let allFiles=[...info.files,...pages.map(page=>page.file),...await walk(root,'.astrofy/docs',true)];
    const hashes=new Map<string,string>();
    for(const item of selected)hashes.set(item.id,await fingerprint(root,inputsFor(item,allFiles,config),config,CATALOG.find(rule=>rule.id===item.ruleId)!.version));
    if(options.changed)selected=selected.filter(item=>item.inputFingerprint!==hashes.get(item.id));
    // Scripts podem criar rotas e alterar arquivos: só depois deles fixamos HTML e fingerprints.
    if(!options.dryRun&&config.checks.trustedExecution){
      const scripts=new Set(selected.filter(item=>{
        const feature=CATALOG.find(rule=>rule.id===item.ruleId)?.feature;
        return !feature||config.features[feature as keyof Configuration['features']];
      }).map(item=>SCRIPT_RULES[item.ruleId]).filter((script):script is string=>!!script));
      for(const script of scripts){
        onProgress?.({phase:'script',completed:0,total:selected.length,label:script});
        options.signal?.throwIfAborted();
        const execution=projectScript(root,script,info,config,options.signal);
        context.scripts.set(script,execution);
        const result=await execution;
        if(script==='build'&&!result.ok)context.outputUnavailable='O build desta execução não terminou com sucesso; a saída anterior não comprova o estado atual.';
      }
      if(scripts.size){
        info=await inspect(root);pages=await readPages(root,config);
        checklist=reconcile(config,[...scopes,...scopesFor()],checklist);
        context.info=info;context.pages=pages;
        allFiles=[...info.files,...pages.map(page=>page.file),...await walk(root,'.astrofy/docs',true)];
        selected=select();
        for(const item of selected)hashes.set(item.id,await fingerprint(root,inputsFor(item,allFiles,config),config,CATALOG.find(rule=>rule.id===item.ruleId)!.version));
        if(options.changed)selected=selected.filter(item=>item.inputFingerprint!==hashes.get(item.id));
      }
    }
    for(const item of selected) {
      onProgress?.({phase:'checking',completed:report.findings.length,total:selected.length,label:`${item.ruleId} ${item.scope.target}`});
      options.signal?.throwIfAborted();
      const original=snapshot(item),currentHash=hashes.get(item.id)!;
      const invalidated=invalidate(item,currentHash);
      let finding;
      try {finding=await evaluate(item,context);}
      catch(error) {
        if(options.signal?.aborted)throw error;
        const configurationFailure=error instanceof AstrofyError&&error.exitCode===2;
        finding={ruleId:item.ruleId,scope:item.scope,status:configurationFailure?'failed' as const:'blocked' as const,severity:item.severity,message:error instanceof AstrofyError?error.message:'Não foi possível concluir a leitura ou operação da regra.',files:[],suggestion:`Execute ${item.skill} para conferir as entradas.`};
      }
      // Uma revisão manual atual permanece válida quando a parte automática não encontra falha.
      const manualCurrent=original.inputFingerprint===currentHash&&original.evidence.some(e=>e.reviewer)&&finding.status==='pending';
      if(manualCurrent) {finding.status=original.status;finding.message=original.reason;}
      else {
        // A invalidação já arquivou o resultado anterior quando as entradas mudaram.
        if(original.checkedAt&&!invalidated)item.history.push(original);
        item.status=finding.status;item.reason=finding.message;item.checkedAt=new Date().toISOString();item.inputFingerprint=currentHash;
        item.evidence=[{verifier:item.ruleId,version:VERSION,runId:report.runId,checkedAt:item.checkedAt,inputs:finding.files,result:finding.message,environment:environment(),report:reportPath}];
      }
      report.findings.push(finding);report.coveredScope.push(item.scope);
      onProgress?.({phase:'checked',completed:report.findings.length,total:selected.length,label:`${item.ruleId} ${item.scope.target}`});
    }
    report.coveredScope=[...new Map(report.coveredScope.map(scope=>[JSON.stringify(scope),scope])).values()];
    report.summary=summarize(selected);
    const code=policyCode(selected,config);report.status=code===1?'failed':code===3?'blocked':'completed';
    report.artifacts=options.dryRun?[]:[reportPath,config.paths.checklist];finishReport(report,{rules:report.findings.length});
    redactReport(report);validate('report',report);validate('checklist',checklist);
    if(!options.dryRun) {
      onProgress?.({phase:'saving',completed:selected.length,total:selected.length,label:'Gravando relatório e checklist'});
      // O relatório vem primeiro: uma interrupção nunca deixa a checklist citando arquivo inexistente.
      await atomicWrite(root,reportPath,jsonText(report),{signal:options.signal});
      await atomicWrite(root,config.paths.checklist,jsonText(checklist),{signal:options.signal});
      await retainReports(root,checklist,config.checks.retention);
    }
    return {report,code};
  };
  return options.dryRun?run():withLock(root,run);
}
/** Consulta recalcula validade em memória; não grava ou executa verificadores. */
export async function projectStatus(root:string):Promise<{report:Report;items:ChecklistItem[]}> {
  const config=await loadConfig(root),stored=await loadChecklist(root,config);
  if(!stored)throw new AstrofyError('Checklist ausente. Execute astrofy init.');
  const info=await inspect(root),pages=await readPages(root,config),files=[...info.files,...pages.map(page=>page.file),...await walk(root,'.astrofy/docs',true)];
  // A consulta inclui instâncias descobertas, mas conserva a checklist em disco.
  const scopes:Scope[]=[...pages.map(page=>({type:'page' as const,target:page.route})),...info.files.filter(file=>file.startsWith(config.paths.components+'/')&&/\.(astro|tsx|jsx)$/.test(file)).map(file=>({type:'component' as const,target:file}))];
  const checklist=reconcile(config,scopes,stored);
  for(const item of checklist.items.filter(item=>!item.retired&&item.inputFingerprint)) {
    const version=CATALOG.find(rule=>rule.id===item.ruleId)?.version??'retired';
    invalidate(item,await fingerprint(root,inputsFor(item,files,config),config,version));
  }
  const report=createReport('status',{},checklist.items);report.data={projectId:config.project.projectId,items:checklist.items};finishReport(report,{items:checklist.items.length});
  redactReport(report);
  return {report,items:checklist.items};
}
/** Registra revisão identificada, sem alterar o método original da regra. */
export async function recordReview(root:string,id:string,status:'passed'|'failed'|'not_applicable',reviewer:string,reason:string):Promise<Report> {
  if(!reviewer.trim()||!reason.trim())throw new AstrofyError('Responsável e justificativa são obrigatórios.');
  return withLock(root,async()=>{
    const config=await loadConfig(root),checklist=await loadChecklist(root,config);
    const item=checklist?.items.find(item=>item.id===id);
    if(!item||!checklist)throw new AstrofyError('Item da checklist não encontrado.');
    const rule=CATALOG.find(rule=>rule.id===item.ruleId);
    if(item.retired||!rule||rule.scope!==item.scope.type)throw new AstrofyError('Instância retirada ou ausente do catálogo atual. Execute check para reconciliar a checklist.');
    if(rule.method==='automatic')throw new AstrofyError('Regra automática deve ser executada pelo verificador.');
    // A autorização depende do catálogo atual, não de metadados antigos do arquivo.
    item.method=rule.method;item.category=rule.category;item.skill=rule.skill;item.summary=rule.summary;
    item.severity=config.policies.severities[rule.id]??rule.severity;
    const info=await inspect(root),pages=await readPages(root,config),files=[...info.files,...pages.map(page=>page.file),...await walk(root,'.astrofy/docs',true)];
    const report=createReport('review'),reportPath=`.astrofy/reports/${report.runId}.json`;
    if(item.checkedAt||item.inputFingerprint||item.evidence.length)item.history.push(snapshot(item));
    item.status=status;item.reason=reason;item.checkedAt=report.createdAt;
    item.inputFingerprint=await fingerprint(root,inputsFor(item,files,config),config,rule.version);
    item.evidence=[{verifier:'manual',version:VERSION,runId:report.runId,checkedAt:report.createdAt,inputs:inputsFor(item,files,config),result:reason,environment:environment(),report:reportPath,reviewer}];
    report.summary=summarize([item]);report.coveredScope=[item.scope];report.artifacts=[reportPath,config.paths.checklist];finishReport(report,{reviews:1});
    report.findings=[{ruleId:item.ruleId,scope:item.scope,status,severity:item.severity,message:reason,files:item.evidence[0]!.inputs,suggestion:''}];
    redactReport(report);validate('report',report);validate('checklist',checklist);
    await atomicWrite(root,reportPath,jsonText(report));await atomicWrite(root,config.paths.checklist,jsonText(checklist));return report;
  });
}
