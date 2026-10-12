/** Confere os contratos persistidos e o roteamento modular das skills de página. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validate} from '../dist/schemas/index.js';
import {skillCatalog} from '../dist/core/skills.js';
import {VERSION} from '../dist/core/types.js';

const specification={
  schemaVersion:'1.0.0',id:'produto-exemplo',type:'product',status:'approved',
  title:'Produto Exemplo',route:'/produtos/exemplo/',objective:'Solicitar demonstração',
  audience:{status:'approved',value:'Equipes de atendimento'},
  primaryAction:{status:'approved',label:'Solicitar demonstração',href:'/contato/'},
  sections:[{id:'hero',type:'hero',status:'approved',purpose:'Apresentar o produto',content:{heading:'Produto Exemplo'},actions:[{label:'Solicitar demonstração',href:'/contato/',kind:'link',status:'approved'}],media:[],sourceNotes:['Texto fornecido pela pessoa.']}],
  assets:[],behaviors:[],openItems:[],sources:['brief fornecido'],approvedAt:'2026-09-18T12:00:00.000Z',
  seo:{title:'Produto Exemplo',description:null,canonical:'/produtos/exemplo/',indexable:true},integrations:[],
  accessibility:{landmarks:true,keyboard:true,mediaAlternatives:true},tests:['renderização da rota']
};

test('especificação aceita o percurso completo e a tarefa de plano usa o contrato de sitespec',()=>{
  validate('page-spec',specification);
  const task={schemaVersion:'1.0.0',id:'0001',slug:'produto-exemplo-route',title:'Criar a rota do produto',summary:'Tarefa "route" do plano de implementação da página produto-exemplo.',status:'draft',createdAt:'2026-09-18T12:10:00.000Z',updatedAt:'2026-09-18T12:10:00.000Z',primarySkill:'astrofy-routing',reviewSkills:[],relatedFiles:['src/pages/produtos/exemplo.astro'],dependsOn:[],page:'produto-exemplo',task:'route',source:'Gerado por astrofy plan a partir de .astrofy/pages/produto-exemplo/page-spec.json.'};
  validate('sitespec',task);
  assert.throws(()=>validate('page-spec',{...specification,status:'done'}),/page-spec/);
  assert.throws(()=>validate('sitespec',{...task,primarySkill:'routing'}),/sitespec/);
  assert.throws(()=>validate('sitespec',{...task,task:'route',page:undefined}),/sitespec/);
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
