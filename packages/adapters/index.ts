/** Seleção conservadora de capacidades a partir das dependências efetivamente instaladas. */
import semver from 'semver';
import { AstrofyError } from '../core/types.js';
/** Faixas implementadas; a documentação de compatibilidade distingue combinações testadas. */
export const SUPPORTED = { node: '>=22.12.0', astro: '>=5.0.0 <8.0.0', tailwindcss: '>=4.0.0 <5.0.0', react: '>=18.0.0 <20.0.0' };
export function compatibility(versions: Record<string, string>): string[] {
  const problems: string[] = [];
  for (const [dependency, range] of Object.entries(SUPPORTED)) {
    const value = dependency === 'node' ? process.versions.node : versions[dependency];
    if (dependency === 'astro' && !value) problems.push('Versão instalada do Astro não identificada.');
    else if (value && (!semver.valid(value) || !semver.satisfies(value, range))) problems.push(`${dependency} ${value}: faixa implementada ${range}.`);
  }
  return problems;
}
export function tailwindAdapter(version?: string): 'tailwind4' {
  if (!version || !semver.valid(version) || !semver.satisfies(version, SUPPORTED.tailwindcss)) {
    throw new AstrofyError('Geração CSS requer Tailwind 4 instalado; a versão atual não possui adaptador.');
  }
  return 'tailwind4';
}
