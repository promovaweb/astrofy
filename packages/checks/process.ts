/** Ciclo de vida de processos Node com encerramento dos descendentes antes da conclusão. */
import {spawn,execFile} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {AstrofyError} from '../core/types.js';

/** Encerra o grupo POSIX ou a árvore Windows sem interpolar comandos no shell. */
async function terminateTree(pid:number):Promise<void>{
  if(process.platform==='win32'){
    await new Promise<void>((resolve,reject)=>{
      execFile('taskkill.exe',['/pid',String(pid),'/t','/f'],{timeout:2000,windowsHide:true},error=>{
        if(!error){resolve();return;}
        try{process.kill(pid,0);reject(new AstrofyError('Não foi possível encerrar a árvore do processo.',3));}
        catch(failure){if((failure as NodeJS.ErrnoException).code==='ESRCH')resolve();else reject(failure);}
      });
    });
    return;
  }
  const send=(signal:NodeJS.Signals)=>{
    try{process.kill(-pid,signal);}
    catch(error){if((error as NodeJS.ErrnoException).code!=='ESRCH')throw error;}
  };
  send('SIGTERM');
  // Descendentes podem ignorar SIGTERM ou continuar após o término do gerenciador.
  await delay(500);send('SIGKILL');
}

/** Descarta logs do projeto e só resolve cancelamentos após encerrar o grupo iniciado. */
export async function runNodeProcess(root:string,entry:string,args:string[],timeoutMs:number,signal?:AbortSignal):Promise<{code:number|null;timedOut:boolean}>{
  signal?.throwIfAborted();
  return new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,[entry,...args],{cwd:root,shell:false,stdio:'ignore',detached:process.platform!=='win32',windowsHide:true});
    let closed=false,settled=false,stopping=false,timedOut=false,code:number|null=null;
    const cleanup=()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);};
    const finish=()=>{
      if(settled||!closed||stopping)return;
      settled=true;cleanup();
      if(signal?.aborted)reject(signal.reason);else resolve({code,timedOut});
    };
    const stop=async()=>{
      if(stopping||settled)return;stopping=true;
      try{if(child.pid)await terminateTree(child.pid);stopping=false;finish();}
      catch{settled=true;cleanup();reject(new AstrofyError('Não foi possível concluir o encerramento do processo.',3));}
    };
    const abort=()=>{void stop();};
    const timer=setTimeout(()=>{timedOut=true;void stop();},timeoutMs);
    signal?.addEventListener('abort',abort,{once:true});
    if(signal?.aborted)abort();
    child.once('error',()=>{if(!settled){settled=true;cleanup();reject(new AstrofyError('Não foi possível iniciar o processo Node.',3));}});
    child.once('close',exitCode=>{closed=true;code=exitCode;finish();});
  });
}
