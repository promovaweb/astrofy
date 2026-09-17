/** Exercita aliases, compostos, temas e determinismo com entradas alteradas. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { generate, resolveTokens, cssValue } from '../dist/design-system/index.js';
const fixture=JSON.parse(await readFile(new URL('../fixtures/design-system.json',import.meta.url),'utf8'));
test('aliases refletem o modo antes da resolução e a geração é determinística',()=>{
  const light=resolveTokens(fixture,'light'),dark=resolveTokens(fixture,'dark');
  assert.equal(light.get('semantic.color.surface').css,'rgb(255 255 255 / 1)');
  assert.equal(dark.get('semantic.color.surface').css,'rgb(15.3 22.95 40.8 / 1)');
  const first=generate(fixture),second=generate(structuredClone(fixture));
  assert.deepEqual(first,second); assert.match(first.css,/@theme inline/);
  assert.match(first.css,/--color-surface: var\(--astrofy-semantic-color-surface\)/);
  assert.doesNotMatch(first.css,/logo-light|"name"/);
});
test('referência ausente, ciclo e tipo diferente são recusados',()=>{
  const design=structuredClone(fixture);
  design.tokens.semantic.color.surface.$value='{absent}';
  assert.throws(()=>generate(design),/referência ausente/);
  design.tokens.semantic.color.surface.$value='{semantic.color.content}';
  design.tokens.semantic.color.content.$value='{semantic.color.surface}';
  assert.throws(()=>generate(design),/ciclo/);
  design.tokens.semantic.color.surface.$value='{primitive.spacing.4}';
  assert.throws(()=>generate(design),/tipo dimension/);
});
test('override desconhecido, unidade inválida e colisão CSS não produzem arquivo',()=>{
  const design=structuredClone(fixture);
  design.modes.dark.overrides.unknown=1;
  assert.throws(()=>generate(design),/override aponta/);
  delete design.modes.dark.overrides.unknown;
  design.tokens.primitive.spacing['4'].$value.unit='em';
  assert.throws(()=>generate(design),/unidade/);
  design.tokens.primitive.spacing['4'].$value.unit='rem';
  design.tokens['semantic-color-surface']={$type:'number',$value:1};
  assert.throws(()=>generate(design),/colisão/);
});
test('tipos compostos têm valores CSS válidos e não aceitam injeção',()=>{
  const color=fixture.tokens.primitive.color.white.$value;
  assert.equal(cssValue('border',{width:{value:1,unit:'px'},style:'solid',color},'border'),'1px solid rgb(255 255 255 / 1)');
  assert.match(cssValue('shadow',{offsetX:{value:0,unit:'px'},offsetY:{value:2,unit:'px'},blur:{value:8,unit:'px'},spread:{value:0,unit:'px'},color},'shadow'),/^0px 2px 8px/);
  assert.throws(()=>cssValue('fontFamily','x; } body { display:none','font'),/inválido/);
  assert.throws(()=>cssValue('cubicBezier',[2,0,1,1],'ease'),/número finito/);
});
test('herança de tipo no grupo funciona sem $type local',()=>{
  const design=structuredClone(fixture);
  design.tokens.primitive.spacing.$type='dimension';
  delete design.tokens.primitive.spacing['4'].$type;
  assert.equal(resolveTokens(design,'light').get('primitive.spacing.4').css,'1rem');
});
