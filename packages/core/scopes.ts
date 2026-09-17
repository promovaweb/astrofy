/** Identidade de escopos independente da barra final de rota e do separador de arquivos. */
import path from 'node:path';
import { AstrofyError, type Scope } from './types.js';

export function scopeTarget(scope:Scope):string {
  const target=scope.target;
  if(target==='.')return target;
  if(scope.type==='page'){
    if(!target.startsWith('/')||target.startsWith('//')||target.includes('\\'))throw new AstrofyError('Escopo de página deve ser uma rota local iniciada por /.');
    return new URL(target,'https://astrofy.local').pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'')||'/';
  }
  if(scope.type==='component')return path.posix.normalize(target.replaceAll('\\','/'));
  return target;
}
export function sameScope(first:Scope,second:Scope):boolean {
  return first.type===second.type&&scopeTarget(first)===scopeTarget(second);
}
