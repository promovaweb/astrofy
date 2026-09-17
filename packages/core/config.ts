/** Configurações por assunto, validadas antes de qualquer escrita no projeto. */
import path from 'node:path';
import { validate } from '../schemas/index.js';
import { readJson, safePath, exists } from './filesystem.js';
import { CONTRACT_VERSION, type Configuration, type Inspection } from './types.js';
import { validateConfigurationSemantics } from './configuration-validation.js';
export const CONFIG_NAMES = ['project','paths','features','policies','skills','checks','integrations','exceptions'] as const;
/** Defaults não representam validação ou aprovação do site existente. */
export function defaults(info: Inspection): Configuration {
  return {
    project: { schemaVersion: '1.0.0', contractVersion: CONTRACT_VERSION, projectId: path.basename(info.root).normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g, '-').replace(/^[^a-zA-Z0-9]+/, '') || 'site', locale: 'pt-BR', adoptionMode: 'incremental', template: null },
    paths: { schemaVersion: '1.0.0', siteConfig: 'src/config', components: 'src/components', layouts: 'src/layouts', content: 'src/content', pages: 'src/pages', globalStyles: 'src/styles/global.css', designSystem: '.astrofy/design/design-system.json', designSystemCss: 'designsystem.css', checklist: 'astrofy.checklist.json', output: 'dist', public: 'public' },
    features: { schemaVersion: '1.0.0', blog: info.features.blog ?? false, react: info.features.react ?? false, i18n: info.features.i18n ?? false, forms: info.features.forms ?? false },
    policies: { schemaVersion: '1.0.0', failOn: ['critical','error'], requireManual: false, severities: {}, strictCategories: [], tokenUsage: { allowedValues: ['0','auto','inherit','transparent','currentColor'], allowedFiles: [] } },
    checks: { schemaVersion: '1.0.0', exclude: [], baseUrl: null, timeoutMs: 10000, maxPages: 200, retention: 30, trustedExecution: false },
    skills: { schemaVersion: '1.0.0', enabled: [], disabled: [] },
    integrations: { schemaVersion: '1.0.0', providers: {} }, exceptions: { schemaVersion: '1.0.0', items: [] },
  };
}
/** Permite init incremental, mas recusa um arquivo existente que não respeite o schema. */
export async function loadConfig(root: string, fallback?: Configuration): Promise<Configuration> {
  const result: Partial<Configuration> = {};
  for (const name of CONFIG_NAMES) {
    const file = `.astrofy/config/${name}.json`;
    const value: unknown = fallback && !(await exists(await safePath(root, file))) ? fallback[name] : await readJson(root, file);
    validate(name, value);
    Object.assign(result, { [name]: name==='paths'?{output:'dist',public:'public',...(value as object)}:value });
  }
  const config = result as Configuration;
  await validateConfigurationSemantics(root, config);
  return config;
}
