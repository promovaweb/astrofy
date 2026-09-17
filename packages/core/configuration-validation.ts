/** Regras entre campos aplicadas à configuração carregada e ao resultado de migração. */
import { safePath } from './filesystem.js';
import { AstrofyError, CONTRACT_VERSION, type Configuration } from './types.js';

/** Confere valores já validados pelos schemas sem gravar ou executar código do site. */
export async function validateConfigurationSemantics(root: string, config: Configuration): Promise<void> {
  if (config.project.contractVersion !== CONTRACT_VERSION) throw new AstrofyError(`Contrato ${config.project.contractVersion} requer migração; suportado: ${CONTRACT_VERSION}.`);
  for (const [name, value] of Object.entries(config.paths)) if (name !== 'schemaVersion') await safePath(root, value);
  if(!config.paths.designSystemCss.endsWith('.css'))throw new AstrofyError('paths.designSystemCss deve apontar para um arquivo .css.');
  if(!config.paths.checklist.endsWith('.json')||/[\\/]/.test(config.paths.checklist))throw new AstrofyError('A checklist JSON deve ficar diretamente na raiz do projeto.');
  for(const provider of Object.values(config.integrations.providers)){
    const url=new URL(provider.url);
    if(url.username||url.password)throw new AstrofyError('URLs de integração não podem conter credenciais. Use credentialEnv.');
  }
  for (const exception of config.exceptions.items) {
    if (Date.parse(exception.expiresAt) <= Date.parse(exception.createdAt)) throw new AstrofyError('exceptions: expiresAt deve ser posterior a createdAt.');
  }
}
