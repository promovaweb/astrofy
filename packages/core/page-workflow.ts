/** Entrevistas retomáveis, contratos de página e execução registrada dos planos. */
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {atomicWrite,exists,hash,jsonText,readJson,safePath,withLock} from './filesystem.js';
import {validate} from '../schemas/index.js';
import {AstrofyError} from './types.js';

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
function planMarkdown(plan:any):string{
  const phases=plan.phases.map((phase:any)=>{
    const tasks=phase.tasks.map((task:any)=>`### ${task.title}\n\n- ID: \`${task.id}\`\n- Estado: \`${task.status}\`\n- Skill: \`${task.primarySkill}\`\n- Estimativa: ${task.estimateMinutes} minutos\n- Arquivos: ${task.files.length?task.files.map((file:string)=>`\`${file}\``).join(', '):'nenhum'}\n- Validações: ${task.validations.map((command:string)=>`\`${command}\``).join(', ')}\n`).join('\n');
    return `## ${phase.title}\n\nEstado: \`${phase.status}\`\n\n${tasks}`;
  }).join('\n');
  return `# Plano de implementação\n\n- Especificação: \`${plan.pageSpec}\`\n- Estado: \`${plan.status}\`\n- Gerado em: \`${plan.generatedAt}\`\n\n${phases}`;
}
/** Converte a especificação pronta em tarefas ligadas às skills e à checklist. */
export async function planPage(root:string,slug:string,dryRun=false){
  const execute=async()=>{
    const relative=`${pageFile(slug)}/page-spec.json`,text=await readFile(await safePath(root,relative),'utf8');
    const spec:any=JSON.parse(text);validate<any>('page-spec',spec);if(spec.status!=='ready')throw new AstrofyError('A especificação precisa estar pronta antes do plano.');
    const task=(id:string,title:string,status:TaskStatus,primarySkill:string,dependsOn:string[],files:string[],steps:string[],validations:string[])=>({id,title,status,primarySkill,reviewSkills:[],sourceItems:[relative],checklistItems:[],files,dependsOn,estimateMinutes:60,estimateBasis:'estimativa técnica inicial',steps,validations,manualChecks:[],completion:`${title} concluída e validada.`});
    const route=routeFile(spec.route);
    const contentSkill:Record<PageType,string>={sales:'astrofy-landing-pages',product:'astrofy-page-design',service:'astrofy-page-design',homepage:'astrofy-homepage',about:'astrofy-page-design',contact:'astrofy-forms',pricing:'astrofy-landing-pages'};
    const plan={schemaVersion:'1.0.0',pageSpec:relative,pageSpecFingerprint:hash(text),status:'planned',generatedAt:new Date().toISOString(),phases:[
      {id:'foundation',title:'Estrutura',status:'ready',dependsOn:[],tasks:[task('route',`Criar ${spec.route}`,'ready','astrofy-routing',[],[route],['Criar a rota com o layout atual.'],['npm run check'])]},
      {id:'content',title:'Conteúdo e interface',status:'pending',dependsOn:['foundation'],tasks:[task('content','Aplicar conteúdo e seções','pending',contentSkill[spec.type as PageType],['route'],[route],['Implementar as seções na ordem aprovada.'],['npm run check'])]},
      {id:'validation',title:'Validação',status:'pending',dependsOn:['content'],tasks:[task('check','Validar a página','pending','astrofy-checkup',['content'],[],['Executar verificações técnicas e de browser.'],['astrofy check --browser'])]},
    ],openItems:[]};
    validate('implementation-plan',plan);
    if(!dryRun){
      await atomicWrite(root,`.astrofy/plans/${slug}/implementation-plan.json`,jsonText(plan));
      await atomicWrite(root,`.astrofy/plans/${slug}/implementation-plan.md`,planMarkdown(plan));
    }
    return plan;
  };
  return dryRun?execute():withLock(root,execute);
}

/** Avança uma tarefa elegível ou registra seu resultado para permitir retomada. */
export async function applyPlanState(root:string,slug:string,taskId?:string,status?:TaskStatus,dryRun=false){
  const execute=async()=>{
    const file=`.astrofy/plans/${slug}/implementation-plan.json`,plan=await readJson<any>(root,file);validate<any>('implementation-plan',plan);
    const tasks=plan.phases.flatMap((phase:any)=>phase.tasks);
    let task=taskId?tasks.find((candidate:any)=>candidate.id===taskId):tasks.find((candidate:any)=>candidate.status==='in_progress')??tasks.find((candidate:any)=>candidate.status==='ready');
    if(!task)throw new AstrofyError('Nenhuma tarefa pronta ou em execução foi encontrada.');
    const target=status??'in_progress';
    if(!['in_progress','completed','failed','skipped'].includes(target))throw new AstrofyError(`Estado inválido para apply: ${target}.`);
    if(target==='in_progress'&&!['ready','failed'].includes(task.status))throw new AstrofyError(`A tarefa ${task.id} não pode iniciar a partir de ${task.status}.`);
    task.status=target;
    for(const phase of plan.phases){
      if(phase.tasks.every((item:any)=>['completed','skipped'].includes(item.status)))phase.status='completed';
      else if(phase.tasks.some((item:any)=>item.status==='in_progress'))phase.status='in_progress';
      else if(phase.tasks.some((item:any)=>item.status==='ready'))phase.status='ready';
      else phase.status='pending';
    }
    for(const candidate of tasks.filter((item:any)=>item.status==='pending'))if(candidate.dependsOn.every((dependency:string)=>['completed','skipped'].includes(tasks.find((item:any)=>item.id===dependency)?.status)))candidate.status='ready';
    plan.status=tasks.every((item:any)=>['completed','skipped'].includes(item.status))?'completed':tasks.some((item:any)=>item.status==='in_progress')?'in_progress':'planned';
    validate<any>('implementation-plan',plan);if(!dryRun)await atomicWrite(root,file,jsonText(plan));return {task:task.id,status:task.status,planStatus:plan.status,plan};
  };
  return dryRun?execute():withLock(root,execute);
}
