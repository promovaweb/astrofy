/** Comprova ocultação de credenciais em relatórios e conservação das fontes originais. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {redactReport,redactText} from '../dist/core/redaction.js';
import {createReport} from '../dist/core/runner.js';
import {initialize} from '../dist/core/init.js';
import {persistReport,exportReport,readReport} from '../dist/core/reports.js';

test('redação é idempotente e não altera dados de origem nem nomes de variáveis',()=>{
 const source={apiKey:'valor-api-privado',token:'valor-token-privado',credentialEnv:'API_KEY',nested:[{message:'Authorization: Bearer valor-bearer-privado; senha="valor-senha-privado" https://usuario:valor-url-privado@example.com'}],privateKey:'-----BEGIN PRIVATE KEY-----\nvalor-chave-privado\n-----END PRIVATE KEY-----'};
 const report=createReport('check');report.data=source;redactReport(report);
 const serialized=JSON.stringify(report);
 for(const value of ['valor-api-privado','valor-token-privado','valor-bearer-privado','valor-senha-privado','valor-url-privado','valor-chave-privado'])assert.ok(!serialized.includes(value),value);
 assert.equal(source.apiKey,'valor-api-privado');assert.equal(report.data.credentialEnv,'API_KEY');
 redactReport(report);assert.equal(JSON.stringify(report),serialized);
 assert.equal(redactText('Arquivo src/pages/token.astro'),'Arquivo src/pages/token.astro');
});

test('persistência, releitura e exportação mantêm credenciais ocultas',async t=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'astrofy-redaction-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{astro:'5.13.0'}}));await initialize(root);
 const report=createReport('status');report.data={password:'segredo-teste'};
 await persistReport(root,report);
 const saved=await readFile(path.join(root,`.astrofy/reports/${report.runId}.json`),'utf8');
 assert.ok(!saved.includes('segredo-teste'));assert.equal(report.data.password,'[OCULTO]');
 assert.deepEqual(await readReport(root,report.runId),report);
 const exportable=createReport('report');exportable.data={access_token:'outro-segredo'};
 await exportReport(root,exportable,'exportado.json');
 assert.ok(!(await readFile(path.join(root,'exportado.json'),'utf8')).includes('outro-segredo'));
});
