/** Executa grupos de testes explícitos para manter Chromium fora da suíte unitária. */
import {readdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';

const group=process.argv[2]??'unit';
const all=(await readdir(new URL('../tests/',import.meta.url))).filter(file=>file.endsWith('.test.mjs')).sort();
const browser=new Set(['browser.test.mjs']);
const files=(group==='browser'?all.filter(file=>browser.has(file)):group==='all'?all:all.filter(file=>!browser.has(file))).map(file=>`tests/${file}`);
if(!['unit','browser','all'].includes(group)||!files.length)throw new Error(`Grupo de testes inválido: ${group}.`);
const child=spawn(process.execPath,['--test',...files],{stdio:'inherit'});
child.once('error',error=>{throw error;});
child.once('exit',code=>{process.exitCode=code??1;});
