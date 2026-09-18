/** Confere os contratos persistidos e o roteamento modular das skills de página. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validate} from '../dist/schemas/index.js';
import {skillCatalog} from '../dist/core/skills.js';
import {VERSION} from '../dist/core/types.js';

const specification={
  schemaVersion:'1.0.0',id:'produto-exemplo',type:'product',status:'approved',
  title:'Produto Exemplo',route:'/produtos/exemplo/',objective:'Solicitar demonstração',
  audience:{status:'approved',value:'Equipes de atendimento'},
  primaryAction:{status:'approved',label:'Solicitar demonstração',href:'/contato/'},
  sections:[{id:'hero',type:'hero',status:'approved',purpose:'Apresentar o produto',content:{heading:'Produto Exemplo'},actions:[{label:'Solicitar demonstração',href:'/contato/',kind:'link',status:'approved'}],media:[],sourceNotes:['Texto fornecido pela pessoa.']}],
  assets:[],behaviors:[],openItems:[],sources:['brief fornecido'],approvedAt:'2026-09-18T12:00:00.000Z'
};

test('especificação e plano aceitam o percurso completo e recusam estados desconhecidos',()=>{
  validate('page-spec',specification);
  const fingerprint=createHash('sha256').update(JSON.stringify(specification)).digest('hex');
  const plan={schemaVersion:'1.0.0',pageSpec:'.astrofy/pages/produto-exemplo/page-spec.json',pageSpecFingerprint:fingerprint,status:'planned',generatedAt:'2026-09-18T12:10:00.000Z',phases:[{id:'foundation',title:'Fundação',status:'ready',dependsOn:[],tasks:[{id:'product-route',title:'Criar rota do produto',status:'ready',primarySkill:'astrofy-routing',reviewSkills:['astrofy-page-design'],sourceItems:['route'],checklistItems:[],files:['src/pages/produtos/exemplo.astro'],dependsOn:[],estimateMinutes:60,estimateBasis:'expectativa técnica',steps:['Criar a rota com o layout existente.'],validations:['npm run check'],manualChecks:['Abrir a rota no navegador.'],completion:'A rota responde e apresenta o conteúdo aprovado.'}]}],openItems:[]};
  validate('implementation-plan',plan);
  assert.throws(()=>validate('page-spec',{...specification,status:'done'}),/page-spec/);
  assert.throws(()=>validate('implementation-plan',{...plan,phases:[{...plan.phases[0],tasks:[{...plan.phases[0].tasks[0],primarySkill:'routing'}]}]}),/implementation-plan/);
});

test('orquestradora documenta todas as especialistas registradas no catálogo',async()=>{
  const catalog=new Set((await skillCatalog()).map(skill=>skill.name));
  const technical=await readFile(new URL('../skills/astrofy-page-planner/references/technical.md',import.meta.url),'utf8');
  const specialists=['astrofy-plan-sales-page','astrofy-plan-product-page','astrofy-plan-service-page','astrofy-plan-homepage','astrofy-plan-about-page','astrofy-plan-contact-page','astrofy-plan-pricing-page'];
  for(const name of specialists){assert.ok(catalog.has(name));assert.match(technical,new RegExp('`'+name+'`'));}
});

test('versão do CLI acompanha manifesto e arquivo canônico',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
  const canonical=(await readFile(new URL('../VERSION',import.meta.url),'utf8')).trim();
  assert.equal(VERSION,manifest.version);
  assert.equal(VERSION,canonical);
});
