/** Painel de check-up com o shell visual e os atalhos do contrato de TUI Promovaweb. */
import blessed from 'neo-blessed';
import type { Widgets } from 'blessed';
import { checkProject, projectStatus, recordReview } from '../core/runner.js';
import { discoverRoot } from '../core/discovery.js';
import { persistReport } from '../core/reports.js';
import { itemDetail } from './item-detail.js';
import { overviewText } from './overview.js';
import { localReferences, readLocalReference } from '../core/references.js';
import { type ChecklistItem, type RunOptions, VERSION } from '../core/types.js';
export const TUI_THEME={background:'#000A0E',surface:'#001117',surfaceRaised:'#03212A',text:'#F2F8F9',textMuted:'#B2C6CE',border:'#5F7D8C',accent:'#C4B5FD',activeBackground:'#5EEDE1',activeText:'#001117',selectedBackground:'#6D28D9',selectedText:'#F2F8F9',primaryBackground:'#15626A',primaryText:'#F2F8F9',focusBackground:'#5EEDE1',focusText:'#001117',warning:'#FCD34D'};
export const TUI_TABS=[{id:'overview',label:'Visão geral',key:'C-h'},{id:'items',label:'Itens',key:'C-l'},{id:'about',label:'Sobre',key:'C-o'}];
export const TUI_BINDINGS={'C-q':'Sair',q:'Sair',escape:'Voltar','C-u':'Atualizar','/':'Buscar',enter:'Detalhe',r:'Executar',e:'Exportar',m:'Revisão manual',a:'Abrir referência',tab:'Próximo foco','S-tab':'Foco anterior'};
export interface TuiOptions extends RunOptions { screen?:Widgets.Screen }
/** Monta sem executar checks; ações persistentes são invocadas explicitamente pelo teclado. */
export async function startTui(initialRoot:string,options:TuiOptions={}):Promise<void> {
  const screen=options.screen??blessed.screen({smartCSR:true,title:'Astrofy',fullUnicode:true});
  const colors=options.noColor?Object.fromEntries(Object.keys(TUI_THEME).map(key=>[key,key.toLowerCase().includes('background')||['surface','surfaceRaised'].includes(key)?'black':'white'])):TUI_THEME;
  const normal={fg:colors.text,bg:colors.background,border:{fg:colors.border},focus:{bg:colors.focusBackground,fg:colors.focusText}};
  let root=initialRoot,items:ChecklistItem[]=[],filtered:ChecklistItem[]=[],query='',active='overview',busy=false,prompting=false;
  let operation:AbortController|undefined;
  let referenceItem='',referenceIndex=0;
  const header=blessed.box({parent:screen,top:0,height:1,width:'100%',align:'center',content:'Astrofy: check-up do projeto',style:{fg:colors.selectedText,bg:colors.selectedBackground}});
  const project=blessed.textbox({parent:screen,top:1,left:1,right:21,height:3,label:' Projeto ',border:'line',inputOnFocus:false,style:normal,value:root});
  const update=blessed.button({parent:screen,top:1,right:1,width:19,height:3,content:'^U Atualizar',align:'center',border:'line',mouse:true,keys:true,style:{...normal,bg:colors.primaryBackground,fg:colors.primaryText}});
  blessed.line({parent:screen,top:5,orientation:'horizontal',style:{fg:colors.border}});
  const content=blessed.box({parent:screen,top:6,left:1,right:1,bottom:4,style:normal});
  const status=blessed.box({parent:screen,bottom:2,height:1,width:'100%',style:{fg:colors.textMuted,bg:colors.surface}});
  blessed.box({parent:screen,bottom:1,height:1,width:'100%',content:'/ Buscar  Enter Detalhe  r Executar  e Exportar  m Revisar  a Referência',style:{fg:colors.accent,bg:colors.background}});
  blessed.box({parent:screen,bottom:0,height:1,width:'100%',content:'^Q Sair  Esc Voltar/cancelar  Tab Foco',style:{fg:colors.text,bg:colors.surface}});
  const list=blessed.list({parent:content,top:0,left:0,width:'45%',height:'100%',border:'line',label:' Itens ',keys:true,vi:true,mouse:true,scrollable:true,style:{...normal,selected:{bg:colors.selectedBackground,fg:colors.selectedText}},scrollbar:{ch:'│'}});
  const detail=blessed.box({parent:content,top:0,left:'45%',right:0,height:'100%',border:'line',label:' Detalhe ',scrollable:true,keys:true,vi:true,mouse:true,alwaysScroll:true,scrollbar:{ch:'│'},style:normal});
  const overview=blessed.box({parent:content,top:0,left:0,width:'100%',height:'100%',border:'line',label:' Visão geral ',scrollable:true,keys:true,style:normal});
  const cards=['Passaram','Falharam','Pendentes','Não avaliados'].map(label=>blessed.box({parent:content,top:0,height:4,border:'line',label:` ${label} `,align:'center',style:{...normal,bg:colors.surfaceRaised}}));
  const tabs=TUI_TABS.map((tab,index)=>{
    const button=blessed.button({parent:screen,top:4,left:1+index*19,width:18,height:1,content:tab.label,keys:true,mouse:true,style:normal});
    button.on('press',()=>show(tab.id));screen.key(tab.key,()=>show(tab.id));return button;
  });
  const error=(failure:unknown)=>{status.setContent(failure instanceof Error?failure.message:'Não foi possível concluir a operação.');screen.render();};
  function show(id:string):void {
    active=id;
    tabs.forEach((tab,index)=>{tab.style.bg=TUI_TABS[index]!.id===id?colors.activeBackground:colors.background;tab.style.fg=TUI_TABS[index]!.id===id?colors.activeText:colors.textMuted;});
    overview.hidden=id==='items';list.hidden=id!=='items';detail.hidden=id!=='items';
    cards.forEach(card=>{card.hidden=id!=='overview';});
    layout();
    if(id==='about')overview.setContent(`Astrofy ${VERSION}\n\nAs revisões manuais exigem responsável e justificativa.\nAbrir o painel não executa código do site.\n\nFiltros: categoria:seo skill:astrofy-seo rota:/blog estado:failed\ncomponente:Header método:hybrid severidade:error\nCombine filtros com espaços.`);
    else if(id==='overview')void refresh(false);
    screen.render();
  }
  function layout():void {
    const width=Number(screen.width),height=Number(screen.height);
    const columns=width>=110?4:width>=70?2:1;
    const cardHeight=height<28?3:5;
    cards.forEach((card,index)=>{card.left=`${(index%columns)*100/columns}%`;card.width=`${100/columns}%`;card.top=Math.floor(index/columns)*cardHeight;card.height=cardHeight;});
    overview.top=active==='overview'?Math.ceil(4/columns)*cardHeight:0;
    overview.height=Number(content.height)-Number(overview.top);
    if(width<90){list.width='100%';list.height='45%';detail.left=0;detail.top='45%';detail.height='55%';}
    else{list.width='45%';list.height='100%';detail.left='45%';detail.top=0;detail.height='100%';}
  }
  screen.on('resize',()=>{layout();screen.render();});
  function selected():ChecklistItem|undefined{return filtered[(list as Widgets.ListElement & {selected:number}).selected];}
  function filter():void {
    const aliases:Record<string,string>={categoria:'category',skill:'skill',estado:'status',método:'method',severidade:'severity',rota:'route',componente:'component'};
    filtered=items.filter(item=>query.split(/\s+/).filter(Boolean).every(term=>{
      const [key,...parts]=term.split(':');
      if(parts.length&&aliases[key!]){const field=aliases[key!]!;const value=field==='route'?item.scope.type==='page'?item.scope.target:'':field==='component'?item.scope.type==='component'?item.scope.target:'':String(item[field as keyof ChecklistItem]);return value.includes(parts.join(':'));}
      return `${item.ruleId} ${item.summary} ${item.scope.target}`.toLowerCase().includes(term.toLowerCase());
    }));
    list.setItems(filtered.map(item=>`${item.status} | ${item.ruleId} | ${item.scope.target}`));showDetail();
  }
  function showDetail():void {
    const item=selected();
    if(referenceItem!==item?.id){referenceItem=item?.id??'';referenceIndex=0;}
    detail.setContent(item?itemDetail(item,root):'Nenhum item corresponde ao filtro.');screen.render();
  }
  async function refresh(showMessage=true):Promise<void> {
    try {
      const current=await projectStatus(root);items=current.items;filter();const s=current.report.summary;
      [s.passed,s.failed,s.pending,s.blocked].forEach((value,index)=>cards[index]!.setContent(String(value)));
      if(active==='overview')overview.setContent(overviewText(root,items,s));
      if(showMessage)status.setContent(`${root} | consulta concluída | somente leitura`);screen.render();
    }catch(failure){error(failure);}
  }
  async function prompt(label:string):Promise<string|null>{prompting=true;return new Promise(resolve=>{const box=blessed.prompt({parent:screen,border:'line',height:8,width:'80%',top:'center',left:'center',label,style:normal});box.input(label,'',(err,value)=>{box.destroy();prompting=false;resolve(err?null:value??null);screen.render();});});}
  list.on('select',showDetail);list.on('select item',showDetail);
  project.key('enter',()=>{prompting=true;project.readInput();});project.on('cancel',()=>{prompting=false;});project.on('submit',async value=>{prompting=false;try{root=await discoverRoot(String(value),true);project.setValue(root);await refresh();}catch(failure){error(failure);}});
  update.on('press',()=>void refresh());screen.key('C-u',()=>void refresh());
  screen.key('tab',()=>screen.focusNext());screen.key('S-tab',()=>screen.focusPrevious());
  screen.key('/',async()=>{if(prompting)return;const value=await prompt('Busca e filtros');if(value!==null){query=value;show('items');filter();list.focus();}});
  screen.key('enter',()=>{if(screen.focused===list){showDetail();detail.focus();}});
  screen.key('r',async()=>{if(prompting)return;const item=selected();if(active!=='items'||!item||busy)return;busy=true;operation=new AbortController();status.setContent(`Executando ${item.ruleId}; Esc cancela.`);screen.render();try{await checkProject(root,{...options,signal:operation.signal,rule:item.ruleId,...(item.scope.type==='page'?{page:item.scope.target}:item.scope.type==='component'?{component:item.scope.target}:{})},progress=>{status.setContent(`${progress.completed}/${progress.total} | ${progress.phase==='script'?'Script: ':''}${progress.label} | Esc cancela`);screen.render();});await refresh();}catch(failure){error(failure);}finally{busy=false;operation=undefined;}});
  screen.key('e',async()=>{if(prompting)return;try{const {report}=await projectStatus(root);const file=`.astrofy/reports/${report.runId}.json`;await persistReport(root,report);status.setContent(`Relatório exportado: ${file}`);screen.render();}catch(failure){error(failure);}});
  screen.key('a',async()=>{
    if(prompting||active!=='items')return;
    const item=selected();if(!item)return;
    try{
      const references=await localReferences(root,item);
      if(!references.length){status.setContent('Nenhuma referência local disponível para este item.');screen.render();return;}
      if(referenceItem!==item.id){referenceItem=item.id;referenceIndex=0;}
      const index=referenceIndex%references.length,reference=references[index]!;
      detail.setContent(`${reference.label}\n\n${await readLocalReference(reference)}`);
      detail.setScroll(0);detail.focus();referenceIndex=index+1;
      status.setContent(`Referência ${index+1}/${references.length} | a Próxima | Enter no item restaura o detalhe`);screen.render();
    }catch(failure){error(failure);}
  });
  screen.key('m',async()=>{if(prompting)return;const item=selected();if(!item||busy||active!=='items')return;const reviewer=await prompt('Responsável');if(!reviewer)return;const status=await prompt('Estado: passed, failed ou not_applicable');if(!['passed','failed','not_applicable'].includes(status??''))return;const reason=await prompt('Justificativa da revisão');if(!reason)return;try{await recordReview(root,item.id,status as 'passed'|'failed'|'not_applicable',reviewer,reason);await refresh();}catch(failure){error(failure);}});
  screen.key('escape',()=>{if(prompting)return;if(operation){operation.abort();return;}show('overview');});
  await refresh();show('overview');update.focus();
  await new Promise<void>(resolve=>{screen.key('C-q',()=>{operation?.abort();screen.destroy();resolve();});screen.key('q',()=>{if(prompting)return;operation?.abort();screen.destroy();resolve();});options.signal?.addEventListener('abort',()=>{operation?.abort();screen.destroy();resolve();},{once:true});});
  void header;
}
