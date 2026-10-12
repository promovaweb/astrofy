/** Entrevistas retomáveis, contratos de página e execução registrada dos planos. */
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {atomicWrite,exists,hash,jsonText,readJson,safePath,withLock} from './filesystem.js';
import {validate} from '../schemas/index.js';
import {AstrofyError} from './types.js';
import {listSitespecs,renderSitespec,type Sitespec,type SitespecFrontmatter,type SitespecChecklistItem,type SitespecStatus} from './sitespec.js';

export const PAGE_TYPES=['sales','product','service','homepage','about','contact','pricing'] as const;
export type PageType=typeof PAGE_TYPES[number];
type InterviewStatus='collecting'|'ready';
interface Question {field:string;prompt:string}
interface Interview {
  schemaVersion:'1.0.0';slug:string;type:PageType;status:InterviewStatus;
  createdAt:string;updatedAt:string;answers:Record<string,string|null>;
  rejected:string[];missing:string[];nextQuestions:Question[];
}
type TaskStatus='pending'|'ready'|'in_progress'|'completed'|'failed'|'skipped';

const common:Question[]=[
  {field:'title',prompt:'Qual é o título de trabalho da página?'},
  {field:'route',prompt:'Qual rota a página deve usar?'},
  {field:'objective',prompt:'Qual resultado principal a página deve produzir?'},
  {field:'audience',prompt:'Para quem esta página será escrita?'},
  {field:'primaryActionLabel',prompt:'Qual texto identifica a ação principal?'},
  {field:'primaryActionHref',prompt:'Qual é o destino da ação principal?'},
];
const specialized:Record<PageType,Question[]>={
  sales:[{field:'offer',prompt:'Qual oferta será apresentada?'},{field:'price',prompt:'Qual preço ou condição comercial pode ser publicado?'},{field:'proof',prompt:'Quais provas sustentam a oferta?'},{field:'guarantee',prompt:'Existe garantia ou condição que precisa aparecer?'}],
  product:[{field:'problem',prompt:'Qual problema o produto resolve?'},{field:'capabilities',prompt:'Quais capacidades precisam ser demonstradas?'},{field:'integrations',prompt:'Quais integrações precisam aparecer?'},{field:'pricingModel',prompt:'Como o acesso ao produto é contratado?'}],
  service:[{field:'scope',prompt:'Qual é o escopo do serviço?'},{field:'deliverables',prompt:'Quais entregas fazem parte do serviço?'},{field:'process',prompt:'Como funciona o processo de contratação e execução?'},{field:'qualification',prompt:'Quem deve ou não contratar este serviço?'}],
  homepage:[{field:'positioning',prompt:'Como o site deve apresentar a organização em uma frase?'},{field:'destinations',prompt:'Quais destinos principais a Home deve distribuir?'},{field:'proof',prompt:'Quais provas institucionais podem aparecer?'}],
  about:[{field:'story',prompt:'Qual história precisa ser contada?'},{field:'values',prompt:'Quais valores orientam a atuação?'},{field:'people',prompt:'Quais pessoas, funções ou equipes serão apresentadas?'}],
  contact:[{field:'channels',prompt:'Quais canais de contato estarão disponíveis?'},{field:'fields',prompt:'Quais campos o formulário precisa coletar?'},{field:'responseTime',prompt:'Qual prazo de resposta pode ser informado?'},{field:'consent',prompt:'Qual consentimento precisa ser registrado?'}],
  pricing:[{field:'plans',prompt:'Quais planos serão comparados?'},{field:'billing',prompt:'Quais períodos e formas de cobrança existem?'},{field:'comparison',prompt:'Quais recursos diferenciam os planos?'},{field:'limitations',prompt:'Quais limites ou condições precisam ficar explícitos?'}],
};
const questions=(type:PageType)=>[...common,...specialized[type]];
const normalizedRoute=(value:string)=>value.startsWith('/')?value:`/${value}`;
const pageFile=(slug:string)=>`.astrofy/pages/${slug}`;

function refresh(interview:Interview):Interview{
  const pending=questions(interview.type).filter(question=>!interview.answers[question.field]?.trim());
  interview.missing=pending.map(question=>question.field);
  interview.nextQuestions=pending.slice(0,3);
  interview.status=pending.length?'collecting':'ready';
  interview.updatedAt=new Date().toISOString();
  return interview;
}

/** Cria a entrevista sem inventar respostas e devolve as três próximas perguntas. */
export async function createPageInterview(root:string,slug:string,type:PageType,dryRun=false):Promise<Interview>{
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw new AstrofyError('O slug usa apenas letras minúsculas, números e hífens.');
  if(!PAGE_TYPES.includes(type))throw new AstrofyError(`Tipo de página inválido: ${type}.`);
  const execute=async()=>{
    const file=`${pageFile(slug)}/interview.json`;
    if(await exists(await safePath(root,file)))return readPageInterview(root,slug);
    const now=new Date().toISOString();
    const interview=refresh({schemaVersion:'1.0.0',slug,type,status:'collecting',createdAt:now,updatedAt:now,answers:Object.fromEntries(questions(type).map(question=>[question.field,null])),rejected:[],missing:[],nextQuestions:[]});
    validate('page-interview',interview);
    if(!dryRun)await atomicWrite(root,file,jsonText(interview));
    return interview;
  };
  return dryRun?execute():withLock(root,execute);
}

/** Lê e valida a entrevista usada para retomada. */
export async function readPageInterview(root:string,slug:string):Promise<Interview>{
  const interview=await readJson<Interview>(root,`${pageFile(slug)}/interview.json`);
  validate('page-interview',interview);return interview;
}

function buildSpec(interview:Interview){
  const answer=(field:string)=>interview.answers[field]!.trim();
  const details=Object.fromEntries(specialized[interview.type].map(question=>[question.field,answer(question.field)]));
  return {
    schemaVersion:'1.0.0',id:interview.slug,type:interview.type,status:'ready',title:answer('title'),route:normalizedRoute(answer('route')),objective:answer('objective'),
    audience:{status:'ready',value:answer('audience')},primaryAction:{status:'ready',label:answer('primaryActionLabel'),href:answer('primaryActionHref')},
    sections:[{id:'conteudo-principal',type:interview.type,status:'ready',purpose:answer('objective'),content:details,actions:[{label:answer('primaryActionLabel'),href:answer('primaryActionHref'),kind:interview.type==='sales'||interview.type==='pricing'?'purchase':'link',status:'ready'}],media:[],sourceNotes:[]}],
    assets:[],behaviors:[],openItems:[],sources:[],approvedAt:new Date().toISOString(),
    seo:{title:answer('title'),description:null,canonical:normalizedRoute(answer('route')),indexable:true},
    integrations:interview.type==='product'?answer('integrations').split(',').map(value=>value.trim()).filter(Boolean):[],
    accessibility:{landmarks:true,keyboard:true,mediaAlternatives:true},
    tests:['renderização da rota','ação principal','responsividade','acessibilidade','metadados'],
  };
}

function specMarkdown(spec:ReturnType<typeof buildSpec>):string{
  return `# ${spec.title}\n\n- Tipo: \`${spec.type}\`\n- Rota: \`${spec.route}\`\n- Objetivo: ${spec.objective}\n- Público: ${spec.audience.value}\n- Ação principal: [${spec.primaryAction.label}](${spec.primaryAction.href})\n\n## Conteúdo coletado\n\n\`\`\`json\n${JSON.stringify(spec.sections[0]!.content,null,2)}\n\`\`\`\n`;
}

/** Registra uma resposta e materializa o contrato quando todas as entradas obrigatórias existem. */
export async function answerPageInterview(root:string,slug:string,field:string,value:string,dryRun=false):Promise<Interview>{
  const execute=async()=>{
    const interview=await readPageInterview(root,slug);
    if(!(field in interview.answers))throw new AstrofyError(`Campo desconhecido para ${interview.type}: ${field}.`);
    if(!value.trim())throw new AstrofyError('A resposta não pode ficar vazia.');
    interview.answers[field]=value.trim();refresh(interview);validate('page-interview',interview);
    if(!dryRun){
      await atomicWrite(root,`${pageFile(slug)}/interview.json`,jsonText(interview));
      if(interview.status==='ready'){
        const spec=buildSpec(interview);validate('page-spec',spec);
        await atomicWrite(root,`${pageFile(slug)}/page-spec.json`,jsonText(spec));
        await atomicWrite(root,`${pageFile(slug)}/page.md`,specMarkdown(spec));
      }
    }
    return interview;
  };
  return dryRun?execute():withLock(root,execute);
}

const routeFile=(route:string)=>`src/pages/${route.replace(/^\//,'').replace(/\/$/,'')||'index'}.astro`;

interface TaskTemplate {taskId:string;title:string;primarySkill:string;dependsOn:string[];files:string[];steps:string[]}
const TASK_ORDER=['route','content','check'];
/** Três tarefas fixas por página: rota, conteúdo e validação, nessa ordem de dependência. */
function taskTemplates(route:string,contentSkill:string):TaskTemplate[] {
  return [
    {taskId:'route',title:`Criar a rota ${route}`,primarySkill:'astrofy-routing',dependsOn:[],files:[route],steps:['Criar a rota com o layout atual.']},
    {taskId:'content',title:'Aplicar conteúdo e seções',primarySkill:contentSkill,dependsOn:['route'],files:[route],steps:['Implementar as seções na ordem aprovada.']},
    {taskId:'check',title:'Validar a página',primarySkill:'astrofy-checkup',dependsOn:['content'],files:[],steps:['Executar npm run check.','Executar astrofy check --browser.']},
  ];
}
/** Lê nomes de diretório para reservar ids sem colidir, antes de qualquer escrita. */
async function allocateSitespecIds(root:string,count:number):Promise<string[]> {
  const used=new Set<number>(),base=await safePath(root,'.sitespec');
  if(await exists(base))for(const entry of await readdir(base,{withFileTypes:true})){const match=entry.name.match(/^([0-9]{4})-/);if(entry.isDirectory()&&match)used.add(Number(match[1]));}
  const ids:string[]=[];let next=1;
  while(ids.length<count){if(!used.has(next)){used.add(next);ids.push(String(next).padStart(4,'0'));}next++;}
  return ids;
}
/** Hash curto e estável por conteúdo; um choque dentro do mesmo arquivo soma um sufixo. */
function checklistId(seed:string,used:Set<string>):string {
  let attempt=0;
  while(true) {
    const candidate=hash(`${seed}:${attempt}`).slice(0,4);
    if(!used.has(candidate)){used.add(candidate);return candidate;}
    attempt++;
  }
}
/** Converte a especificação pronta em sitespecs ligadas à página; reexecutar reconcilia sem perder progresso. */
export async function planPage(root:string,slug:string,dryRun=false) {
  const execute=async()=>{
    const relative=`${pageFile(slug)}/page-spec.json`,text=await readFile(await safePath(root,relative),'utf8');
    const spec:any=JSON.parse(text);validate<any>('page-spec',spec);if(spec.status!=='ready')throw new AstrofyError('A especificação precisa estar pronta antes do plano.');
    const contentSkillByType:Record<PageType,string>={sales:'astrofy-landing-pages',product:'astrofy-page-design',service:'astrofy-page-design',homepage:'astrofy-homepage',about:'astrofy-page-design',contact:'astrofy-forms',pricing:'astrofy-landing-pages'};
    const templates=taskTemplates(routeFile(spec.route),contentSkillByType[spec.type as PageType]);
    const {items:existingAll}=await listSitespecs(root);
    const existingByTask=new Map(existingAll.filter(item=>item.frontmatter.page===slug).map(item=>[item.frontmatter.task,item]));
    const allocated=await allocateSitespecIds(root,templates.filter(template=>!existingByTask.has(template.taskId)).length);
    const idByTask=new Map(templates.map(template=>[template.taskId,existingByTask.get(template.taskId)?.frontmatter.id??allocated.shift()!]));
    const now=new Date().toISOString(),written:{dir:string;id:string;slug:string;task:string;status:SitespecStatus}[]=[];
    for(const template of templates) {
      const existing=existingByTask.get(template.taskId),id=idByTask.get(template.taskId)!,sitespecSlug=`${slug}-${template.taskId}`;
      const usedChecklistIds=new Set((existing?.checklist??[]).map(item=>item.id));
      const checklist:SitespecChecklistItem[]=template.steps.map((stepText,index)=>{
        const previous=existing?.checklist.find(item=>item.text===stepText);
        return {id:previous?.id??checklistId(`${id}:${template.taskId}:${index}:${stepText}`,usedChecklistIds),text:stepText,done:previous?.done??false,skill:''};
      });
      const frontmatter={
        schemaVersion:'1.0.0',id,slug:sitespecSlug,title:template.title,
        summary:`Tarefa "${template.taskId}" do plano de implementação da página ${slug}.`,
        status:existing?.frontmatter.status??'draft',
        createdAt:existing?.frontmatter.createdAt??now,updatedAt:now,
        primarySkill:template.primarySkill,reviewSkills:existing?.frontmatter.reviewSkills??[],
        relatedFiles:template.files,dependsOn:template.dependsOn.map(dependency=>idByTask.get(dependency)!),
        page:slug,task:template.taskId,source:`Gerado por astrofy plan a partir de ${relative}.`,
        ...(existing?.frontmatter.status==='blocked'?{blockedReason:existing.frontmatter.blockedReason}:{}),
        ...(existing?.frontmatter.status==='archived'?{archivedReason:existing.frontmatter.archivedReason}:{}),
      } as SitespecFrontmatter;
      validate<SitespecFrontmatter>('sitespec',frontmatter);
      const dir=existing?.dir??`${id}-${sitespecSlug}`;
      const description=existing?.description??`Tarefa gerada automaticamente a partir do plano de implementação da página **${slug}**.`;
      if(!dryRun)await atomicWrite(root,`.sitespec/${dir}/SITEPEC.md`,renderSitespec(frontmatter,description,checklist,existing?.notes??''));
      written.push({dir,id,slug:sitespecSlug,task:template.taskId,status:frontmatter.status});
    }
    return {page:slug,pageSpec:relative,pageSpecFingerprint:hash(text),tasks:written};
  };
  return dryRun?execute():withLock(root,execute);
}

const STATUS_FROM_TASK:Record<TaskStatus,SitespecStatus>={pending:'draft',ready:'draft',in_progress:'in_progress',completed:'done',failed:'blocked',skipped:'archived'};
/** Avança a tarefa elegível da página (sitespec com `page` e `task`) ou registra seu resultado. */
export async function applyPlanState(root:string,slug:string,taskId?:string,status?:TaskStatus,dryRun=false) {
  const execute=async()=>{
    const {items}=await listSitespecs(root);
    const tasks=items.filter(item=>item.frontmatter.page===slug).sort((a,b)=>TASK_ORDER.indexOf(a.frontmatter.task!)-TASK_ORDER.indexOf(b.frontmatter.task!));
    if(!tasks.length)throw new AstrofyError('Nenhuma tarefa de plano encontrada para esta página. Execute astrofy plan.');
    const task=taskId?tasks.find(candidate=>candidate.frontmatter.task===taskId):tasks.find(candidate=>candidate.frontmatter.status==='in_progress')??tasks.find(candidate=>candidate.frontmatter.status==='draft'&&!candidate.blockedBy.length);
    if(!task)throw new AstrofyError('Nenhuma tarefa pronta ou em execução foi encontrada.');
    const target=status??'in_progress';
    if(!['in_progress','completed','failed','skipped'].includes(target))throw new AstrofyError(`Estado inválido para apply: ${target}.`);
    if(target==='in_progress') {
      if(!['draft','blocked'].includes(task.frontmatter.status))throw new AstrofyError(`A tarefa ${task.frontmatter.task} não pode iniciar a partir de ${task.frontmatter.status}.`);
      if(task.blockedBy.length)throw new AstrofyError(`A tarefa ${task.frontmatter.task} depende de outra ainda não concluída: ${task.blockedBy.join(', ')}.`);
    }
    const nextStatus=STATUS_FROM_TASK[target];
    const frontmatter={...task.frontmatter,status:nextStatus,updatedAt:new Date().toISOString()} as SitespecFrontmatter;
    delete frontmatter.blockedReason;delete frontmatter.archivedReason;
    if(nextStatus==='blocked')frontmatter.blockedReason='Falha registrada via astrofy apply.';
    if(nextStatus==='archived')frontmatter.archivedReason='Tarefa marcada como skipped via astrofy apply.';
    validate<SitespecFrontmatter>('sitespec',frontmatter);
    // O contrato de sitespec exige checklist completa para status done; completar a tarefa marca os itens.
    const checklist=nextStatus==='done'?task.checklist.map(item=>({...item,done:true})):task.checklist;
    if(!dryRun)await atomicWrite(root,`.sitespec/${task.dir}/SITEPEC.md`,renderSitespec(frontmatter,task.description,checklist,task.notes));
    const pageTasks:Sitespec[]=dryRun?tasks.map(candidate=>candidate===task?{...candidate,frontmatter}:candidate):(await listSitespecs(root)).items.filter(item=>item.frontmatter.page===slug);
    const planStatus=pageTasks.every(item=>['done','archived'].includes(item.frontmatter.status))?'completed':pageTasks.some(item=>item.frontmatter.status==='in_progress')?'in_progress':'planned';
    return {task:task.frontmatter.task,status:target,planStatus,tasks:pageTasks};
  };
  return dryRun?execute():withLock(root,execute);
}
