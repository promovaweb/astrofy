/** Adoção incremental: prepara arquivos internos e conserva personalizações existentes. */
import { inspect } from './discovery.js';
import { defaults, loadConfig, CONFIG_NAMES } from './config.js';
import { atomicWrite, jsonText, withLock, exists, safePath } from './filesystem.js';
import { loadChecklist, reconcile } from './checklist.js';
import type { RunOptions } from './types.js';
/** Dry-run resolve e valida o mesmo conjunto de arquivos, sem criar .astrofy. */
export async function initialize(root: string, options: RunOptions = {}): Promise<{ created: string[]; preserved: string[] }> {
  const run = async () => {
    const info = await inspect(root);
    const config = await loadConfig(root, defaults(info));
    const current = await loadChecklist(root, config);
    const checklist = reconcile(config, [], current);
    const files = new Map<string, string>();
    for (const name of CONFIG_NAMES) files.set(`.astrofy/config/${name}.json`, jsonText(config[name]));
    files.set(config.paths.checklist, jsonText(checklist));
    files.set('.astrofy/docs/index.md', '# Documentação do projeto\n\nConsulte [arquitetura](architecture.md), [arquivos](file-map.md),\n[configuração](configuration.md) e [operação](operations.md).\n');
    files.set('.astrofy/docs/architecture.md', '# Arquitetura observada\n\nO manifesto declara Astro. A inspeção inicial não executa o site.\nRevise as responsabilidades de rotas, layouts e componentes antes de alterar sua composição.\n');
    files.set('.astrofy/docs/file-map.md', '# Arquivos do projeto\n\nEntradas observadas durante a inicialização:\n\n' + info.files.filter(file => /^(src|public)\//.test(file) || /^(astro\.config|package|tsconfig)/.test(file)).map(file => `- \`${file}\``).join('\n') + '\n');
    files.set('.astrofy/docs/configuration.md', '# Configuração\n\nOs arquivos JSON de `.astrofy/config/` orientam o framework.\nOs dados públicos usados na renderização ficam em `' + config.paths.siteConfig + '`.\nCredenciais permanecem no ambiente e não devem ser adicionadas a estes arquivos.\n');
    files.set('.astrofy/docs/operations.md', '# Operação\n\nExecute `astrofy inspect` para conferir versões e caminhos.\nUse `astrofy check` para registrar verificações e `astrofy status` para consultar o estado.\nO comando de build pertence ao package.json do site; confirme-o antes de executar.\n');
    files.set('.astrofy/.gitignore', 'cache/\n');
    const created: string[] = [], preserved: string[] = [];
    for (const [file, content] of files) {
      options.signal?.throwIfAborted();
      if (await exists(await safePath(root, file))) preserved.push(file);
      else { created.push(file); if (!options.dryRun) await atomicWrite(root, file, content, { preserve: true, signal: options.signal }); }
    }
    return { created, preserved };
  };
  return options.dryRun ? run() : withLock(root, run);
}
