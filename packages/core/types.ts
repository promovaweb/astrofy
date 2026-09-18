/** Contratos compartilhados entre configuração, verificadores e interfaces. */
export const VERSION = '0.5.4';
export const CONTRACT_VERSION = '1.0.0';
export const CATALOG_VERSION = '1.0.0';
export type Status = 'pending' | 'passed' | 'failed' | 'blocked' | 'not_applicable';
export type Severity = 'critical' | 'error' | 'warning' | 'info';
export type Method = 'automatic' | 'manual' | 'hybrid';
export interface Scope { type: 'project' | 'page' | 'component' | 'collection'; target: string }
export interface Evidence {
  verifier: string; version: string; runId: string; checkedAt: string;
  inputs: string[]; result: string; environment: Record<string, string>; report: string;
  reviewer?: string;
}
export interface HistoryEntry {
  status: Status; checkedAt: string | null; inputFingerprint: string | null;
  evidence: Evidence[]; reason: string;
}
export interface ChecklistItem extends HistoryEntry {
  id: string; ruleId: string; category: string; skill: string; scope: Scope;
  severity: Severity; method: Method; summary: string; notes: string[];
  history: HistoryEntry[]; retired?: boolean;
}
export interface Checklist {
  schemaVersion: string; catalogVersion: string; projectId: string; items: ChecklistItem[];
}
export interface Rule {
  id: string; category: string; skill: string; summary: string; method: Method;
  severity: Severity; scope: Scope['type']; feature?: string; version: string;
}
export interface Paths {
  schemaVersion: string; siteConfig: string; components: string; layouts: string;
  content: string; pages: string; globalStyles: string; designSystem: string;
  designSystemCss: string; checklist: string; output: string; public: string;
}
export interface ProjectConfig {
  schemaVersion: string; contractVersion: string; projectId: string; locale: string;
  adoptionMode: 'incremental' | 'strict'; template: { name: string; version: string } | null;
}
export interface Policies {
  schemaVersion: string; failOn: Severity[]; requireManual: boolean;
  severities: Record<string, Severity>; strictCategories: string[];
  tokenUsage: { allowedValues: string[]; allowedFiles: string[] };
}
export interface Exception {
  ruleId: string; scope: Scope; reason: string; owner: string; createdAt: string;
  expiresAt: string; reviewCondition?: string;
}
export interface Configuration {
  project: ProjectConfig; paths: Paths; features: { schemaVersion: string; blog: boolean; react: boolean; i18n: boolean; forms: boolean };
  policies: Policies; checks: { schemaVersion: string; exclude: string[]; baseUrl: string | null; timeoutMs: number; maxPages: number; retention: number; trustedExecution: boolean };
  skills: { schemaVersion: string; enabled: string[]; disabled: string[] };
  integrations: { schemaVersion: string; providers: Record<string, { url: string; credentialEnv?: string }> };
  exceptions: { schemaVersion: string; items: Exception[] };
}
export interface Inspection {
  root: string; packageManager: string | null; lockfile: string | null;
  versions: Record<string, string>; declared: Record<string, string>;
  features: Record<string, boolean>; files: string[]; limitations: string[];
}
export interface Finding {
  ruleId: string; scope: Scope; status: Status; severity: Severity; message: string;
  files: string[]; suggestion: string;
}
export interface Summary {
  passed: number; failed: number; pending: number; blocked: number; not_applicable: number;
  applicable: number; evaluated: number; coverage: number | null; approval: number | null;
}
export interface Report {
  schemaVersion: string; command: string; runId: string; status: 'completed' | 'failed' | 'blocked' | 'cancelled';
  createdAt: string; version: string; environment: Record<string, string>;
  requestedScope: Record<string, unknown>; coveredScope: Scope[];
  summary: Summary; findings: Finding[]; artifacts: string[];
  data?: unknown;
}
export interface RunOptions {
  root?: string; json?: boolean; ci?: boolean; offline?: boolean; noColor?: boolean;
  dryRun?: boolean; category?: string; rule?: string; page?: string; component?: string;
  changed?: boolean; signal?: AbortSignal;
}
/** Erro público com código estável; mensagens não incluem conteúdo de arquivos. */
export class AstrofyError extends Error {
  constructor(message: string, public readonly exitCode: 2 | 3 | 130 = 2) { super(message); }
}
