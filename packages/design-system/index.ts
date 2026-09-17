/** Resolução tipada de tokens DTCG no envelope Astrofy e geração determinística de CSS. */
import { validate } from '../schemas/index.js';
import { AstrofyError, VERSION, type Configuration, type RunOptions } from '../core/types.js';
import { atomicWrite, exists, hash, jsonText, readJson, safePath, withLock } from '../core/filesystem.js';
import { readFile } from 'node:fs/promises';
import { tailwindAdapter } from '../adapters/index.js';
import { inspect } from '../core/discovery.js';
export interface Token { $type: string; $value: unknown; $description?: string }
export interface DesignSystem {
  schemaVersion: string; name: string; tokenFormat: string; defaultMode: 'light' | 'dark';
  assets: Record<string, Record<string, string>>; tokens: Record<string, unknown>;
  modes: { light: { overrides: Record<string, unknown> }; dark: { overrides: Record<string, unknown> } };
}
interface ResolvedToken extends Token { css: string; variable: string }
export interface TokenBuild { css: string; manifest: { schemaVersion: string; generatorVersion: string; adapter: string; inputHash: string; outputs: { path: string; hash: string }[] } }
const fail = (where: string, detail: string): never => { throw new AstrofyError(`Token ${where}: ${detail}`); };
const object = (value: unknown, where: string): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(where, 'objeto esperado.');
  return value as Record<string, unknown>;
};
const number = (value: unknown, where: string, min = -Infinity, max = Infinity): number => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) fail(where, `número finito entre ${min} e ${max} esperado.`);
  return value as number;
};
function keys(value: Record<string, unknown>, required: string[], optional: string[], where: string): void {
  if (required.some(key => !(key in value)) || Object.keys(value).some(key => !required.includes(key) && !optional.includes(key))) fail(where, `campos esperados: ${[...required,...optional].join(', ')}.`);
}
const quoted = (value: unknown, where: string): string => {
  if (typeof value !== 'string' || !value.trim() || /[\x00-\x1f{};]/.test(value)) fail(where, 'texto CSS inválido.');
  return JSON.stringify(value);
};
/** Nomes são ASCII normalizados; duas entradas que produzam o mesmo nome são recusadas. */
export function variableName(name: string): string {
  const normalized = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!normalized) fail(name, 'nome vazio após normalização.');
  return `--astrofy-${normalized}`;
}
function flatten(group: Record<string, unknown>, prefix = '', inherited?: string, output = new Map<string, Token>()): Map<string, Token> {
  const groupType = typeof group.$type === 'string' ? group.$type : inherited;
  for (const [key, raw] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}.${key}` : key;
    const child = object(raw, name);
    if ('$value' in child) {
      const type = typeof child.$type === 'string' ? child.$type : groupType;
      if (!type) fail(name, '$type ausente no token e no grupo.');
      output.set(name, { $type: type!, $value: child.$value });
    } else flatten(child, name, groupType, output);
  }
  return output;
}
/** Converte valores já resolvidos, validando campos e unidades antes de emitir CSS. */
export function cssValue(type: string, value: unknown, where: string): string {
  const component = (type: string, value: unknown, key: string) => cssValue(type, value, `${where}.${key}`);
  switch (type) {
    case 'number': return String(number(value, where));
    case 'dimension': case 'duration': {
      const data = object(value, where); keys(data, ['value','unit'], [], where);
      const allowed = type === 'dimension' ? ['px','rem'] : ['ms','s'];
      if (!allowed.includes(String(data.unit))) fail(where, `unidade deve ser ${allowed.join(' ou ')}.`);
      return `${number(data.value, where, type === 'duration' ? 0 : -Infinity)}${data.unit}`;
    }
    case 'color': {
      const data = object(value, where); keys(data, ['colorSpace','components'], ['alpha','hex'], where);
      const space = String(data.colorSpace);
      const spaces = ['srgb','srgb-linear','display-p3','a98-rgb','prophoto-rgb','rec2020','xyz-d50','xyz-d65','hsl','hwb','lab','lch','oklab','oklch'];
      if (!spaces.includes(space) || !Array.isArray(data.components) || data.components.length !== 3) fail(where, 'espaço de cor ou componentes inválidos.');
      const values = (data.components as unknown[]).map((v, i) => v === 'none' ? 'none' : String(number(v, `${where}.components.${i}`)));
      const alpha = data.alpha === undefined ? 1 : number(data.alpha, `${where}.alpha`, 0, 1);
      if (space === 'srgb' && !values.includes('none')) {
        for (const channel of data.components as number[]) number(channel, where, 0, 1);
        return `rgb(${values.map(v => Number((Number(v)*255).toFixed(6))).join(' ')} / ${alpha})`;
      }
      if (['hsl','hwb'].includes(space)) return `${space}(${values[0]} ${values[1]}% ${values[2]}% / ${alpha})`;
      if (['lab','lch','oklab','oklch'].includes(space)) return `${space}(${values.join(' ')} / ${alpha})`;
      return `color(${space} ${values.join(' ')} / ${alpha})`;
    }
    case 'fontFamily': {
      const families = Array.isArray(value) ? value : [value];
      if (!families.length) fail(where, 'ao menos uma família é obrigatória.');
      const generic = ['serif','sans-serif','monospace','system-ui','cursive','fantasy','ui-serif','ui-sans-serif','ui-monospace'];
      return families.map(v => typeof v === 'string' && generic.includes(v) ? v : quoted(v, where)).join(', ');
    }
    case 'fontWeight': {
      if (typeof value === 'number') return String(number(value, where, 1, 1000));
      const weights: Record<string, number> = { thin:100, hairline:100, 'extra-light':200, 'ultra-light':200, light:300, normal:400, regular:400, book:400, medium:500, 'semi-bold':600, 'demi-bold':600, bold:700, 'extra-bold':800, 'ultra-bold':800, black:900, heavy:900, 'extra-black':950, 'ultra-black':950 };
      if (typeof value !== 'string' || !weights[value]) fail(where, 'peso tipográfico inválido.');
      return String(weights[value as string]);
    }
    case 'cubicBezier': {
      if (!Array.isArray(value) || value.length !== 4) fail(where, 'quatro coordenadas esperadas.');
      const data = value as unknown[];
      return `cubic-bezier(${data.map((v,i) => number(v, where, i===0||i===2 ? 0 : -Infinity, i===0||i===2 ? 1 : Infinity)).join(', ')})`;
    }
    case 'strokeStyle': {
      if (typeof value === 'string' && ['solid','dashed','dotted','double','groove','ridge','outset','inset'].includes(value)) return value;
      const data = object(value, where); keys(data, ['dashArray','lineCap'], [], where);
      if (!Array.isArray(data.dashArray) || !['butt','round','square'].includes(String(data.lineCap))) fail(where, 'traçado inválido.');
      // Traçados customizados pertencem a SVG; CSS de borda não preserva essa semântica.
      fail(where, 'strokeStyle customizado requer exportação SVG; CSS de borda não o suporta.');
    }
    case 'border': {
      const data = object(value, where); keys(data, ['color','width','style'], [], where);
      return `${component('dimension', data.width, 'width')} ${component('strokeStyle', data.style, 'style')} ${component('color', data.color, 'color')}`;
    }
    case 'transition': {
      const data = object(value, where); keys(data, ['duration','delay','timingFunction'], [], where);
      return `${component('duration', data.duration, 'duration')} ${component('cubicBezier', data.timingFunction, 'timingFunction')} ${component('duration', data.delay, 'delay')}`;
    }
    case 'shadow': {
      const shadows = Array.isArray(value) ? value : [value];
      if (!shadows.length) fail(where, 'sombra vazia.');
      return shadows.map((shadow, i) => {
        const data = object(shadow, where); keys(data, ['color','offsetX','offsetY','blur','spread'], ['inset'], where);
        if (data.inset !== undefined && typeof data.inset !== 'boolean') fail(where, 'inset deve ser booleano.');
        const dimensions = ['offsetX','offsetY','blur','spread'].map(k => component('dimension', data[k], `${i}.${k}`));
        if (Number(object(data.blur, where).value) < 0) fail(where, 'blur não pode ser negativo.');
        return `${data.inset ? 'inset ' : ''}${dimensions.join(' ')} ${component('color', data.color, `${i}.color`)}`;
      }).join(', ');
    }
    case 'gradient': {
      if (!Array.isArray(value) || value.length < 2) fail(where, 'gradiente requer ao menos duas paradas.');
      return `linear-gradient(${(value as unknown[]).map((stop,i) => {
        const data = object(stop, where); keys(data, ['color','position'], [], where);
        return `${component('color', data.color, `${i}.color`)} ${number(data.position, where, 0, 1)*100}%`;
      }).join(', ')})`;
    }
    case 'typography': {
      const data = object(value, where); keys(data, ['fontFamily','fontSize','fontWeight','letterSpacing','lineHeight'], [], where);
      component('dimension', data.letterSpacing, 'letterSpacing');
      return `${component('fontWeight', data.fontWeight, 'fontWeight')} ${component('dimension', data.fontSize, 'fontSize')}/${number(data.lineHeight, where, 0)} ${component('fontFamily', data.fontFamily, 'fontFamily')}`;
    }
    default: return fail(where, `tipo ${type} não suportado.`);
  }
}
/** Aplica o modo antes de resolver aliases; detecta referências ausentes e ciclos por DFS. */
export function resolveTokens(design: DesignSystem, mode: 'light' | 'dark'): Map<string, ResolvedToken> {
  validate('design-system', design);
  const tokens = flatten(design.tokens), resolved = new Map<string, ResolvedToken>(), visiting = new Set<string>(), names = new Set<string>();
  if (!tokens.size) fail('tokens', 'nenhum token definido.');
  for (const [key, value] of Object.entries(design.modes[mode].overrides)) {
    const token = tokens.get(key); if (!token) fail(key, 'override aponta para token ausente.');
    tokens.set(key, { ...token!, $value: value });
  }
  function resolve(name: string): ResolvedToken {
    if (resolved.has(name)) return resolved.get(name)!;
    const token = tokens.get(name); if (!token) fail(name, 'referência ausente.');
    if (visiting.has(name)) fail(name, `ciclo: ${[...visiting, name].join(' -> ')}.`);
    visiting.add(name);
    const dereference = (value: unknown, expected?: string): unknown => {
      if (typeof value === 'string' && /^\{[^{}]+\}$/.test(value)) {
        const target = resolve(value.slice(1,-1));
        if (expected && target.$type !== expected) fail(name, `alias ${value} possui tipo ${target.$type}, esperado ${expected}.`);
        return target.$value;
      }
      if (Array.isArray(value)) return value.map(v => dereference(v));
      if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,v]) => [key,dereference(v)]));
      return value;
    };
    const value = dereference(token!.$value, token!.$type);
    const css = cssValue(token!.$type, value, name), variable = variableName(name);
    if (names.has(variable)) fail(name, `colisão de nome CSS ${variable}.`);
    names.add(variable); visiting.delete(name);
    const result = { ...token!, $value: value, css, variable }; resolved.set(name, result); return result;
  }
  for (const name of [...tokens.keys()].sort()) resolve(name);
  return new Map([...resolved.entries()].sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0));
}
/** Mapeia categorias DTCG e convenções de dimensão para namespaces Tailwind 4. */
function utility(name: string, token: ResolvedToken): string | null {
  const parts = name.split('.');
  const level = parts[0];
  if (['primitive','semantic','component'].includes(parts[0]!)) parts.shift();
  const type = token.$type;
  const categories: Record<string, string> = { color:'color',fontFamily:'font',fontWeight:'font-weight',shadow:'shadow',cubicBezier:'ease' };
  let prefix = categories[type];
  if (type === 'dimension') {
    const category = parts[0]?.toLowerCase();
    prefix = ({ spacing:'spacing', radius:'radius', breakpoint:'breakpoint', breakpoints:'breakpoint', container:'container', fontSize:'text', fontsize:'text', tracking:'tracking', letterspacing:'tracking', size:'spacing' } as Record<string,string>)[category ?? ''];
  }
  if (!prefix) return null;
  if (parts[0]?.toLowerCase() === type.toLowerCase() || ['spacing','radius','breakpoints','breakpoint','container','fontSize','tracking','letterSpacing','size'].includes(parts[0]!)) parts.shift();
  const namespace = level === 'primitive' && type === 'color' ? 'primitive-' : level === 'component' ? 'component-' : '';
  return `--${prefix}-${namespace}${parts.join('-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
}
/** Emite CSS sem timestamps; metadados e ativos nunca viram declarações CSS. */
export function generate(design: DesignSystem, output = 'designsystem.css', adapter = 'tailwind4'): TokenBuild {
  if (adapter !== 'tailwind4') throw new AstrofyError(`Adaptador não suportado: ${adapter}`);
  const light = resolveTokens(design,'light'), dark = resolveTokens(design,'dark');
  const declarations = (tokens: Map<string, ResolvedToken>, indent = '  ') => [...tokens].flatMap(([name,token]) => {
    const values = [`${indent}${token.variable}: ${token.css};`];
    if (token.$type === 'typography') values.push(`${indent}${token.variable}-letter-spacing: ${cssValue('dimension',object(token.$value,name).letterSpacing,name)};`);
    return values;
  }).join('\n');
  const mappings = new Map<string,string>();
  for (const [name, token] of light) {
    const key = utility(name, token); if (!key) continue;
    if (mappings.has(key)) fail(name, `colisão de utilitário Tailwind ${key}.`);
    // Breakpoints são valores estáticos durante a compilação de media queries.
    mappings.set(key, key.startsWith('--breakpoint-') ? token.css : `var(${token.variable})`);
    if (key.startsWith('--breakpoint-') && dark.get(name)!.css !== token.css) fail(name, 'breakpoint não pode variar por tema.');
  }
  const defaultTokens = design.defaultMode === 'light' ? light : dark;
  const css = `/* Gerado pelo Astrofy ${VERSION}. Edite o design-system.json. */\n@import "tailwindcss";\n\n@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));\n\n:root {\n  color-scheme: ${design.defaultMode};\n${declarations(defaultTokens)}\n}\n\n:root[data-theme="light"] {\n  color-scheme: light;\n${declarations(light)}\n}\n\n:root[data-theme="dark"] {\n  color-scheme: dark;\n${declarations(dark)}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme]) {\n    color-scheme: dark;\n${declarations(dark, '    ')}\n  }\n}\n\n@theme inline {\n${[...mappings].map(([key,value]) => `  ${key}: ${value};`).join('\n')}\n}\n\n@layer base {\n  body {\n    ${light.has('semantic.color.surface') ? `background: var(${light.get('semantic.color.surface')!.variable});` : ''}\n    ${light.has('semantic.color.content') ? `color: var(${light.get('semantic.color.content')!.variable});` : ''}\n  }\n  @media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after { scroll-behavior: auto; }\n  }\n}\n`;
  return { css, manifest: { schemaVersion:'1.0.0', generatorVersion:VERSION, adapter, inputHash:hash(jsonText(design)), outputs:[{path:output,hash:hash(css)}] } };
}
/** Operação de tokens usa a mesma validação para build, check e dry-run. */
export async function tokensCommand(root: string, config: Configuration, command: 'validate'|'build'|'check', options: RunOptions = {}): Promise<{ synchronized: boolean; artifacts: string[]; build?: TokenBuild }> {
  const run = async () => {
    const design = await readJson<DesignSystem>(root, config.paths.designSystem);
    resolveTokens(design,'light'); resolveTokens(design,'dark');
    if (command === 'validate') return { synchronized:true, artifacts:[] };
    const info = await inspect(root);
    const build = generate(design,config.paths.designSystemCss,tailwindAdapter(info.versions.tailwindcss));
    const output = await safePath(root,config.paths.designSystemCss), manifestPath = '.astrofy/design/build-manifest.json';
    const cssMatches = await exists(output) && await readFile(output,'utf8') === build.css;
    const manifestMatches = await exists(await safePath(root,manifestPath)) && jsonText(await readJson(root,manifestPath)) === jsonText(build.manifest);
    if (command === 'build' && !options.dryRun) {
      await atomicWrite(root,config.paths.designSystemCss,build.css,{signal:options.signal});
      await atomicWrite(root,manifestPath,jsonText(build.manifest),{signal:options.signal});
    }
    return { synchronized:command === 'build' && !options.dryRun || cssMatches && manifestMatches, artifacts:[config.paths.designSystemCss,manifestPath], build };
  };
  return command === 'build' && !options.dryRun ? withLock(root,run) : run();
}
