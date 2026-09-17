/** Validação offline dos contratos fechados em JSON Schema 2020-12. */
import { Ajv2020 } from 'ajv/dist/2020.js';
import addFormatsModule from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { AstrofyError } from '../core/types.js';
const ajv = new Ajv2020({ allErrors: true, strict: true });
const addFormats = addFormatsModule as unknown as (instance: Ajv2020) => void;
addFormats(ajv);
const validators = new Map<string, ReturnType<Ajv2020['compile']>>();
/** Falhas retornam somente caminho e regra, evitando revelar valores secretos. */
export function validate<T>(name: string, value: unknown): asserts value is T {
  let validator = validators.get(name);
  if (!validator) {
    const file = fileURLToPath(new URL(`../../packages/schemas/${name}.schema.json`, import.meta.url));
    validator = ajv.compile(JSON.parse(readFileSync(file, 'utf8'))); validators.set(name, validator);
  }
  if (!validator(value)) {
    throw new AstrofyError(`${name}: ${validator.errors?.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')}`);
  }
}
