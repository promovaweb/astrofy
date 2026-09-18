/** Exercita o procedimento da skill de Markdown com configuração herdada e correção repetível. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import os from 'node:os';

const execute=promisify(execFile);
const markdownlint=fileURLToPath(new URL('../../node_modules/.bin/markdownlint',import.meta.url));

test('markdownlint herdado preserva conteúdo e a segunda correção não altera o arquivo',async t=>{
  const workspace=await mkdtemp(path.join(os.tmpdir(),'astrofy-markdown-'));
  t.after(()=>rm(workspace,{recursive:true,force:true}));
  const project=path.join(workspace,'apps/site'),docs=path.join(project,'docs');
  await mkdir(docs,{recursive:true});
  const config=path.join(workspace,'.markdownlint.json');
  await writeFile(config,JSON.stringify({default:true,MD013:false,MD025:false,MD041:false}));
  const markdown=path.join(docs,'guia.md'),mdx=path.join(docs,'componente.mdx');
  await writeFile(markdown,'---\ntitle: Guia\nurl: https://example.com/docs#inicio\n---\n# Guia\n##Uso\n```ts\nconst valor = "literal";\n```\n');
  await writeFile(mdx,'export const valor = <Componente />;\n\n# MDX\n');

  await assert.rejects(execute(markdownlint,['--config',config,'docs/**/*.md'],{cwd:project}),error=>/MD022|MD018/.test(`${error.stdout??''}${error.stderr??''}${error.message??''}`));
  await execute(markdownlint,['--config',config,'--fix','docs/**/*.md'],{cwd:project});
  const corrected=await readFile(markdown,'utf8');
  assert.match(corrected,/title: Guia/);
  assert.match(corrected,/https:\/\/example\.com\/docs#inicio/);
  assert.match(corrected,/const valor = "literal";/);
  assert.equal(await readFile(mdx,'utf8'),'export const valor = <Componente />;\n\n# MDX\n');
  await execute(markdownlint,['--config',config,'docs/**/*.md'],{cwd:project});
  await execute(markdownlint,['--config',config,'--fix','docs/**/*.md'],{cwd:project});
  assert.equal(await readFile(markdown,'utf8'),corrected);
});
