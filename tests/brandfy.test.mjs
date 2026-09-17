/** Reimportação com o formato real do Brandfy e detecção de ajustes locais. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {importBrandfy} from '../dist/adapters/brandfy.js';
const palette={name:'Exemplo',families:{primary:{500:'#2AD5BE'}},light:{background:'#FFFFFF',text:'#001117'},dark:{background:'#000A0E',text:'#F2F8F9'}};
test('exportação real normaliza modos e reimportação conserva ajuste explícito',()=>{
 const first=importBrandfy(palette,'tokens.json');
 assert.equal(first.design.tokens.semantic.color.content.$type,'color');
 assert.equal(importBrandfy(palette,'tokens.json',first.design,first.sourceMap).changed.length,0);
 first.design.tokens.semantic.color.content.$value={colorSpace:'srgb',components:[.1,.1,.1],alpha:1};
 assert.throws(()=>importBrandfy(palette,'tokens.json',first.design,first.sourceMap),/Ajuste local/);
 first.sourceMap.sources.find(entry=>entry.path==='tokens.semantic.color.content').localOverride=true;
 const merged=importBrandfy(palette,'tokens.json',first.design,first.sourceMap);
 assert.ok(merged.preserved.includes('tokens.semantic.color.content'));assert.deepEqual(merged.design.tokens.semantic.color.content.$value.components,[.1,.1,.1]);
});
test('campos presumidos e modo incompleto são recusados',()=>{
 assert.throws(()=>importBrandfy({colors:{}},'input.json'),/Esperados/);
 assert.throws(()=>importBrandfy({...palette,dark:{background:'#000A0E'}},'input.json'),/ausente/);
});
