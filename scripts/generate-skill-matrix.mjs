/** Gera a matriz operacional canônica a partir do workflow e do catálogo de regras. */
import {readFile,writeFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const workflow=JSON.parse(await readFile(new URL('skills/astrofy-setup/references/workflow.json',root),'utf8'));
const rules=JSON.parse(await readFile(new URL('packages/checks/catalog.json',root),'utf8'));
const categories=new Map();
for(const rule of rules.rules??rules)categories.set(rule.skill,[...new Set([...(categories.get(rule.skill)??[]),rule.category])].sort());
const cell=value=>value.map(item=>`\`${item}\``).join(', ')||'Nenhum';
const lines=['# Matriz operacional das skills','','Esta matriz é gerada pelo workflow canônico. Ela mostra dependências, entradas,','saídas e o comando que confere o domínio associado a cada skill.','','| Skill | Depende de | Entradas | Saídas | Validação |','| --- | --- | --- | --- | --- |'];
for(const step of workflow.steps){
  const checks=categories.get(step.skill)??[];
  const validation=checks.length?checks.map(category=>`\`astrofy check --category ${category}\``).join(', '):'Revisão do artefato de saída';
  lines.push(`| \`${step.skill}\` | ${cell(step.dependsOn)} | ${cell(step.inputs)} | ${cell(step.outputs)} | ${validation} |`);
}
lines.push('','## Entrada e encerramento','',`A entrada é \`${workflow.entrypoint}\`. O fluxo termina com ${cell(workflow.finalizers)}.`,'');
const output=lines.join('\n');
const target=new URL('docs/skill-matrix.md',root);
if(process.argv.includes('--check')){
  const current=await readFile(target,'utf8').catch(()=>null);
  if(current!==output)throw new Error('docs/skill-matrix.md está desatualizado. Execute npm run skills:matrix.');
  console.log('Matriz de skills sincronizada.');
}else{await writeFile(target,output);console.log('docs/skill-matrix.md atualizada.');}
