/** Exercita a TUI com streams de terminal e geometrias reais, sem alterar um site de produção. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PassThrough} from 'node:stream';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import blessed from 'neo-blessed';
import {initialize} from '../dist/core/init.js';
import {startTui,TUI_THEME,TUI_TABS,TUI_BINDINGS} from '../dist/cli/tui.js';
import {itemDetail} from '../dist/cli/item-detail.js';
import {overviewText} from '../dist/cli/overview.js';
import {summarize} from '../dist/core/checklist.js';
test('visão geral mostra severidades e avaliação histórica após invalidação',()=>{
 const items=[
  {status:'failed',severity:'error',reason:'Link ausente',evidence:[],history:[]},
  {status:'failed',severity:'critical',retired:true,reason:'Regra retirada',evidence:[],history:[]},
  {status:'pending',severity:'warning',reason:'Entradas alteradas desde a avaliação anterior.',evidence:[],history:[{evidence:[{checkedAt:'2026-09-17T12:00:00Z',runId:'ultima-execucao'}]}]},
 ];
 const text=overviewText('/projeto',items,summarize(items));
 assert.match(text,/critical: 0 \| error: 1 \| warning: 0 \| info: 0/);
 assert.match(text,/entradas alteradas: 1/);assert.match(text,/Última avaliação: 2026-09-17T12:00:00Z/);
 assert.match(text,/Execução: ultima-execucao/);
 assert.match(overviewText('/projeto',[],summarize([])),/Última avaliação: não registrada/);
});
test('detalhe apresenta entradas e revisão sem executar controles de terminal',()=>{
 const item={summary:'Título',status:'passed',method:'hybrid',severity:'warning',scope:{type:'page',target:'/'},reason:'Revisado',skill:'astrofy-seo',checkedAt:'2026-09-01T00:00:00Z',inputFingerprint:'hash-atual',notes:['Nota\x1b[2Jpreservada'],history:[{}],evidence:[{verifier:'manual',version:'0.1.0',runId:'execucao-local',checkedAt:'2026-09-01T00:00:00Z',reviewer:'Equipe',result:'Título conferido',environment:{node:'22.12.0',platform:'linux'},report:'.astrofy/reports/local.json',inputs:['src/pages/index.astro','dist/index.html']}]};
 const detail=itemDetail(item,'/projeto');
 for(const text of ['Responsável: Equipe','Título conferido','node=22.12.0','src/pages/index.astro','dist/index.html','.astrofy/reports/local.json','hash-atual','histórico: 1','Notapreservada'])assert.ok(detail.includes(text),text);
 assert.ok(!detail.includes('\x1b'));
 const empty=itemDetail({...item,evidence:[],checkedAt:null,inputFingerprint:null,notes:[],history:[]},'/projeto');
 assert.match(empty,/Nenhuma avaliação registrada/);assert.match(empty,/não avaliado/);
});
function luminance(hex){const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];}
test('paleta preserva contraste e atalhos não colidem',()=>{
 for(const [fg,bg]of [['text','background'],['textMuted','background'],['focusText','focusBackground']]){const a=luminance(TUI_THEME[fg]),b=luminance(TUI_THEME[bg]);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5);}
 assert.deepEqual(TUI_TABS.map(tab=>tab.id),['overview','items','about']);
 assert.equal(TUI_BINDINGS['C-q'],'Sair');assert.equal(new Set(TUI_TABS.map(tab=>tab.key)).size,TUI_TABS.length);
});
for(const [columns,rows]of [[80,24],[129,44],[160,50]])test(`shell ${columns}x${rows} mostra conteúdo e responde ao teclado`,{timeout:10000},async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-tui-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));await initialize(root);
 const input=new PassThrough(),output=new PassThrough();input.isTTY=true;input.setRawMode=()=>{};output.isTTY=true;output.columns=columns;output.rows=rows;
 output.on('data',()=>{});
 const screen=blessed.screen({input,output,terminal:'xterm-256color',smartCSR:false});
 const task=startTui(root,{screen,noColor:true});
 // A leitura inicial é assíncrona. Aguarda a renderização real com o rótulo da consulta.
 const deadline=Date.now()+5000;
 while(!screen.screenshot().includes('consulta concluída')&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,20));
 const initial=screen.screenshot();
 assert.match(initial,/Astrofy: check-up/);assert.match(initial,/Atualizar/);assert.match(initial,/Visão geral/);assert.match(initial,/Sair/);
 screen.program.emit('keypress','',{name:'l',ctrl:true,full:'C-l'});screen.render();assert.match(screen.screenshot(),/Itens/);
 screen.program.emit('keypress','a',{name:'a',full:'a'});
 const referenceDeadline=Date.now()+2000;
 while(!screen.screenshot().includes('Referência 1/2')&&Date.now()<referenceDeadline)await new Promise(resolve=>setTimeout(resolve,20));
 assert.match(screen.screenshot(),/Referência 1\/2/);
 screen.program.emit('keypress','a',{name:'a',full:'a'});
 const nextDeadline=Date.now()+2000;
 while(!screen.screenshot().includes('Referência 2/2')&&Date.now()<nextDeadline)await new Promise(resolve=>setTimeout(resolve,20));
 assert.match(screen.screenshot(),/Referência 2\/2/);
 screen.program.emit('keypress','',{name:'escape',full:'escape'});
 screen.program.emit('keypress','q',{name:'q',full:'q'});await task;assert.equal(screen.destroyed,true);
 input.destroy();output.destroy();
});
