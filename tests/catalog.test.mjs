/** Confere o catálogo distribuído e a recusa de definições ambíguas ou incompatíveis. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {readRuleCatalog} from '../dist/checks/catalog.js';
const source=JSON.parse(await readFile(new URL('../packages/checks/catalog.json',import.meta.url),'utf8'));

test('catálogo distribuído mantém as 90 regras e suas identidades únicas',()=>{
 const rules=readRuleCatalog(source);
 assert.equal(rules.length,90);assert.equal(new Set(rules.map(rule=>rule.id)).size,90);
});

test('catálogo recusa duplicação, método inválido e versões incompatíveis',()=>{
 const duplicate=structuredClone(source);duplicate.rules.push({...duplicate.rules[0]});
 assert.throws(()=>readRuleCatalog(duplicate),/duplicado/);
 const invalid=structuredClone(source);invalid.rules[0].method='qualquer';
 assert.throws(()=>readRuleCatalog(invalid),/rule-catalog/);
 const future=structuredClone(source);future.catalogVersion='9.0.0';
 assert.throws(()=>readRuleCatalog(future),/incompatível/);
 const extra=structuredClone(source);extra.rules[0].unknown=true;
 assert.throws(()=>readRuleCatalog(extra),/additional properties/);
 assert.throws(()=>readRuleCatalog(source.rules),/object/);
});
