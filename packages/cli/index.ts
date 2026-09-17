#!/usr/bin/env node
/** Entrada do CLI: argumentos estritos, saída JSON limpa e códigos de término estáveis. */
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { realpathSync } from 'node:fs';
import { discoverRoot, inspect } from '../core/discovery.js';
import { initialize } from '../core/init.js';
import { loadConfig } from '../core/config.js';
import { createReport, checkProject, projectStatus } from '../core/runner.js';
import { tokensCommand } from '../design-system/index.js';
import { checkDocs } from '../checks/markdown.js';
import { readPages, brokenLinks, meta } from '../checks/html.js';
import { migrate } from '../core/migrate.js';
import { installSkills, skillCatalog } from '../core/skills.js';
import { exportReport, readReport, persistReport } from '../core/reports.js';
import { importBrandfyFile } from '../core/branding.js';
import { redactReport, redactText } from '../core/redaction.js';
import { AstrofyError, VERSION, type Report, type RunOptions } from '../core/types.js';
export const COMMANDS=['init','inspect','check','status','tui','tokens validate','tokens build','tokens check','tokens import-brandfy','docs check','links scan','report','migrate','skills list','skills install'] as const;
export const FLAGS={root:'string',json:'boolean',ci:'boolean',offline:'boolean','no-color':'boolean','dry-run':'boolean',category:'string',rule:'string',page:'string',component:'string',changed:'boolean',help:'boolean',version:'boolean',apply:'boolean',agent:'string',skill:'string',run:'string',output:'string',markdown:'boolean',source:'string'} as const;
export const COMMAND_OPTIONS:Record<string,string[]>={
  init:['dry-run'],inspect:[],check:['dry-run','category','rule','page','component','changed'],status:[],tui:[],
  'tokens validate':[],'tokens build':['dry-run'],'tokens check':[],'tokens import-brandfy':['source','dry-run'],
  'docs check':[],'links scan':[],report:['run','output','markdown','dry-run'],migrate:['apply','dry-run'],
  'skills list':[],'skills install':['agent','skill','dry-run'],
};
/** Retorna objeto e código, permitindo que testes invoquem o CLI sem interceptar process.exit. */
export async function run(argv:string[],signal?:AbortSignal):Promise<{report:Report;code:number}> {
  let parsed:ReturnType<typeof parseArgs>;
  try {parsed=parseArgs({args:argv,allowPositionals:true,strict:true,options:Object.fromEntries(Object.entries(FLAGS).map(([name,type])=>[name,{type}]))});}
  catch {throw new AstrofyError('Argumentos inválidos. Consulte --help para nomes e tipos aceitos.');}
  const values=parsed.values as Record<string,string|boolean|undefined>;
  const command=parsed.positionals.join(' ')||'status';
  if(values.help||values.version){const report=createReport(values.help?'help':'version');report.data=values.help?{commands:COMMANDS,flags:FLAGS,version:VERSION}:VERSION;return {report,code:0};}
  if(!COMMANDS.includes(command as typeof COMMANDS[number]))throw new AstrofyError(`Comando desconhecido: ${command}. Use --help.`);
  const common=['root','json','ci','offline','no-color','help','version'];
  for(const key of Object.keys(values))if(!common.includes(key)&&!COMMAND_OPTIONS[command]?.includes(key))throw new AstrofyError(`--${key} não se aplica a ${command}.`);
  if(values.markdown&&!values.output)throw new AstrofyError('--markdown exige --output com um arquivo Markdown.');
  const options:RunOptions={root:values.root as string|undefined,json:!!values.json,ci:!!values.ci,offline:!!values.offline,noColor:!!values['no-color'],dryRun:!!values['dry-run'],category:values.category as string|undefined,rule:values.rule as string|undefined,page:values.page as string|undefined,component:values.component as string|undefined,changed:!!values.changed,signal};
  if(options.page&&options.component)throw new AstrofyError('--page e --component não podem ser combinados.');
  if(values.apply&&command!=='migrate')throw new AstrofyError('--apply só se aplica a migrate.');
  if(values.apply&&options.dryRun)throw new AstrofyError('--apply e --dry-run não podem ser combinados.');
  if(command==='skills list'){const report=createReport(command);report.data=await skillCatalog();return {report,code:0};}
  const root=await discoverRoot(options.root,!!options.root);
  if(command==='check')return checkProject(root,options);
  if(command==='status'||command==='report'){
    const report=command==='report'&&values.run?await readReport(root,String(values.run)):(await projectStatus(root)).report;
    if(command==='report'&&!values.run)report.command='report';
    if(values.output)await exportReport(root,report,String(values.output),!!values.markdown,!!options.dryRun);
    return {report,code:0};
  }
  const report=createReport(command,options);
  let code=0;
  if(command==='init'){
    const state=await initialize(root,options);report.data=state;
    if(!options.dryRun)report.artifacts=state.created;
  }
  else if(command==='skills install'){
    if(!['codex','claude'].includes(String(values.agent)))throw new AstrofyError('Informe --agent codex ou --agent claude.');
    const state=await installSkills(root,values.agent as 'codex'|'claude',values.skill?String(values.skill).split(','):[],!!options.dryRun);
    report.data=state;if(!options.dryRun)report.artifacts=[...state.written,`.astrofy/config/installed-${values.agent}.json`];
  }
  else if(command==='inspect')report.data=await inspect(root);
  else if(command==='tokens import-brandfy'){
    if(typeof values.source!=='string')throw new AstrofyError('Informe --source com o JSON exportado pelo Brandfy dentro do projeto.');
    report.data=await importBrandfyFile(root,values.source,!!options.dryRun);
    if(!options.dryRun)report.artifacts=[(await loadConfig(root)).paths.designSystem,'.astrofy/design/source-map.json'];
  }
  else if(command==='migrate')report.data=await migrate(root,!values.apply);
  else if(command==='tui') {
    if(!process.stdin.isTTY||!process.stdout.isTTY||options.json||options.ci){const result=await projectStatus(root);result.report.command='tui';return {report:result.report,code:0};}
    const {startTui}=await import('./tui.js');await startTui(root,options);report.data={closed:true};
  } else if(command.startsWith('tokens ')) {
    const state=await tokensCommand(root,await loadConfig(root),command.split(' ')[1] as 'validate'|'build'|'check',options);
    report.data={synchronized:state.synchronized};report.artifacts=state.artifacts;
    if(command==='tokens check'&&!state.synchronized)code=1;
  } else if(command==='docs check') {
    report.data=await checkDocs(root);code=(report.data as {problems:string[]}).problems.length?1:0;
  } else if(command==='links scan') {
    const config=await loadConfig(root),pages=await readPages(root,config);
    if(!pages.length)throw new AstrofyError('HTML renderizado ausente. Gere o site antes de escanear os links.',3);
    const rows=[];
    for(const page of pages){
      signal?.throwIfAborted();
      rows.push({route:page.route,
        title:page.elements.find(element=>element.tag==='title')?.text.trim()??'',
        description:meta(page,'description')[0]??'',
        headings:page.elements.filter(element=>/^h[1-6]$/.test(element.tag)).map(element=>({level:Number(element.tag[1]),text:element.text.trim(),id:element.attrs.id??null})),
        taxonomies:{tags:[...new Set([...meta(page,'article:tag'),...page.elements.filter(element=>element.tag==='a'&&element.attrs.rel?.split(/\s+/).includes('tag')).map(element=>element.text.trim())])],categories:[...new Set(meta(page,'article:section'))]},
        links:page.links,broken:await brokenLinks(root,config,pages,page)});
    }
    report.data=rows;code=rows.some(row=>row.broken.length)?1:0;
  }
  report.status=code===1?'failed':'completed';
  const persistent=['init','skills install','tokens build','tokens import-brandfy','docs check','links scan'].includes(command)||command==='migrate'&&!!values.apply;
  if(persistent&&!options.dryRun){
    report.coveredScope=command==='links scan'?(report.data as {route:string}[]).map(row=>({type:'page',target:row.route})):[{type:'project',target:'.'}];
    await persistReport(root,report);
  }
  return {report,code};
}
/** A interface textual sempre distingue ausência de avaliação de aprovação. */
export function renderText(report:Report):string {
  const summary=report.summary;
  const coverage=summary.coverage===null?'sem avaliações':`${Math.round(summary.coverage*100)}% avaliados`;
  const lines=[`Astrofy ${VERSION} | ${report.command} | ${report.status}`,`${summary.passed} passaram; ${summary.failed} falharam; ${summary.pending} pendentes; ${summary.blocked} não puderam ser avaliados; ${summary.not_applicable} não aplicáveis. ${coverage}.`];
  if(report.data!==undefined)lines.push(JSON.stringify(report.data,null,2));
  for(const finding of report.findings)lines.push(`${finding.status} ${finding.ruleId} ${finding.scope.target}: ${finding.message}`);
  return lines.join('\n')+'\n';
}
/** Reconhece a entrada direta e os links do npm sem executar o CLI quando importado. */
function isCliEntry():boolean {
  if(!process.argv[1])return false;
  try {return realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url));}
  catch {return false;}
}
if(isCliEntry()) {
  const controller=new AbortController();
  process.once('SIGINT',()=>controller.abort());
  process.once('SIGTERM',()=>controller.abort());
  try {
    const {report,code}=await run(process.argv.slice(2),controller.signal);
    redactReport(report);
    process.stdout.write(process.argv.includes('--json')?JSON.stringify(report)+'\n':renderText(report));process.exitCode=code;
  } catch(error) {
    const code=controller.signal.aborted?130:error instanceof AstrofyError?error.exitCode:3;
    const message=redactText(controller.signal.aborted?'Execução cancelada.':error instanceof AstrofyError?error.message:'Não foi possível concluir a operação. Confira os caminhos e as permissões de acesso.');
    const report=createReport(process.argv.slice(2).find(arg=>!arg.startsWith('-'))??'unknown');report.status=code===130?'cancelled':code===3?'blocked':'failed';report.data={error:message};
    redactReport(report);
    if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(report)+'\n');
    process.stderr.write(message+'\n');process.exitCode=code;
  }
}
