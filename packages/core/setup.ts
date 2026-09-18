/** Mantém o estado retomável da coordenação das skills sem executar código do projeto. */
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {inspect} from './discovery.js';
import {initialize} from './init.js';
import {atomicWrite,exists,jsonText,readJson,safePath,withLock} from './filesystem.js';
import {validate} from '../schemas/index.js';
import type {RunOptions} from './types.js';

type StepStatus='completed'|'pending'|'not_applicable';
interface WorkflowStep {skill:string;dependsOn:string[];inputs:string[];outputs:string[]}
interface Workflow {schemaVersion:string;entrypoint:string;finalizers:string[];steps:WorkflowStep[]}
interface SetupStep extends WorkflowStep {status:StepStatus;updatedAt:string|null}
interface SetupRun {startedAt:string;completedAt:string;durationMs:number;resumed:boolean;changedFiles:string[]}
interface SetupState {schemaVersion:string;workflowVersion:string;createdAt:string;updatedAt:string;files:Record<string,string>;changedFiles:string[];steps:SetupStep[];runs?:SetupRun[]}

const stateFile='.astrofy/setup-state.json';
const workflowFile=fileURLToPath(new URL('../../skills/astrofy-setup/references/workflow.json',import.meta.url));
const hash=(value:string)=>createHash('sha256').update(value).digest('hex');

/** Lê o grafo distribuído e recusa dependências ausentes ou ciclos. */
export async function readWorkflow():Promise<Workflow>{
  const workflow=JSON.parse(await readFile(workflowFile,'utf8')) as Workflow;
  const names=new Set(workflow.steps.map(step=>step.skill));
  if(names.size!==workflow.steps.length||!names.has(workflow.entrypoint))throw new Error('Workflow de skills possui nomes repetidos ou entrada ausente.');
  for(const step of workflow.steps)for(const dependency of step.dependsOn)if(!names.has(dependency))throw new Error(`Dependência ausente no workflow: ${dependency}.`);
  const visiting=new Set<string>(),visited=new Set<string>();
  const visit=(name:string)=>{if(visiting.has(name))throw new Error(`Ciclo no workflow de skills: ${name}.`);if(visited.has(name))return;visiting.add(name);for(const dependency of workflow.steps.find(step=>step.skill===name)!.dependsOn)visit(dependency);visiting.delete(name);visited.add(name);};
  for(const name of names)visit(name);
  return workflow;
}

/** Gera hashes apenas de arquivos observados pela inspeção estática. */
async function snapshot(root:string,files:string[]):Promise<Record<string,string>>{
  const result:Record<string,string>={};
  for(const relative of files.sort()){
    const target=await safePath(root,relative);
    if(await exists(target))result[relative]=hash(await readFile(target,'utf8'));
  }
  return result;
}

const applicable=(skill:string,features:Record<string,boolean>):boolean=>{
  if(skill==='astrofy-react')return !!features.react;
  if(['astrofy-blog','astrofy-blog-post','astrofy-blog-archives','astrofy-mdx'].includes(skill))return !!features.blog;
  if(skill==='astrofy-i18n')return !!features.i18n;
  if(skill==='astrofy-forms')return !!features.forms;
  return true;
};

/** Prepara ou retoma o setup, preservando marcos registrados e listando arquivos alterados. */
export async function setupProject(root:string,options:RunOptions={}):Promise<SetupState>{
  await initialize(root,options);
  const execute=async()=>{
    const startedAt=new Date().toISOString();
    const info=await inspect(root),workflow=await readWorkflow();
    const files=await snapshot(root,info.files.filter(file=>!file.startsWith('.astrofy/')));
    const target=await safePath(root,stateFile);
    const previous=await exists(target)?await readJson<SetupState>(root,stateFile):null;
    if(previous)validate<SetupState>('setup-state',previous);
    const now=new Date().toISOString();
    const changedFiles=previous?[...new Set([...Object.keys(previous.files),...Object.keys(files)])].filter(file=>previous.files[file]!==files[file]).sort():[];
    const previousSteps=new Map(previous?.steps.map(step=>[step.skill,step]));
    const steps=workflow.steps.map(step=>{
      const old=previousSteps.get(step.skill);
      const status:StepStatus=!applicable(step.skill,info.features)?'not_applicable':step.skill==='astrofy-setup'||step.skill==='astrofy-init'?'completed':old?.status??'pending';
      return {...step,status,updatedAt:status==='completed'?(old?.updatedAt??now):old?.updatedAt??null};
    });
    const completedAt=new Date().toISOString();
    const runs=[...(previous?.runs??[]),{startedAt,completedAt,durationMs:Math.max(0,Date.parse(completedAt)-Date.parse(startedAt)),resumed:!!previous,changedFiles}].slice(-50);
    const state:SetupState={schemaVersion:'1.0.0',workflowVersion:workflow.schemaVersion,createdAt:previous?.createdAt??now,updatedAt:now,files,changedFiles,steps,runs};
    validate<SetupState>('setup-state',state);
    if(!options.dryRun)await atomicWrite(root,stateFile,jsonText(state),{signal:options.signal});
    return state;
  };
  return options.dryRun?execute():withLock(root,execute);
}
