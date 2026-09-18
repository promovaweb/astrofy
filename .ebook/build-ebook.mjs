/** Gera e confere o manual do Astrofy em PDF e EPUB. */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, "..");
const DOCS_ROOT = join(ROOT, "docs", "user");
const EBOOK_ROOT = join(ROOT, "ebook");
const BUILD_ROOT = join(SCRIPT_DIR, "build");
const ORDER_FILE = join(DOCS_ROOT, "reading-order.txt");
const VERSION_FILE = join(EBOOK_ROOT, "VERSION");
const MANIFEST = join(EBOOK_ROOT, "build.json");
const PDF_STYLE = join(SCRIPT_DIR, "pdf.css");
const EPUB_STYLE = join(SCRIPT_DIR, "epub.css");
const TEMPLATE = join(SCRIPT_DIR, "template.html");
const METADATA = join(SCRIPT_DIR, "metadata.yaml");
const LOGO = join(SCRIPT_DIR, "assets", "logo.svg");
const SCRIPT = fileURLToPath(import.meta.url);

function fail(message) { throw new Error(message); }
function rel(path) { return relative(ROOT, path).split("\\").join("/"); }
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: options.cwd ?? ROOT, encoding: "utf8", input: options.input, maxBuffer: 32 * 1024 * 1024 });
  if (result.error) fail(`${command} não pôde ser executado: ${result.error.message}`);
  if (result.status !== 0) fail(`${command} falhou: ${(result.stderr || result.stdout).trim()}`);
  return result.stdout || "";
}
async function sha256(path) { return createHash("sha256").update(await readFile(path)).digest("hex"); }
async function filesIn(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesIn(path));
    else if (entry.isFile()) result.push(path);
  }
  return result.sort();
}
function version() {
  const value = readFileSync(VERSION_FILE, "utf8").trim();
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value)) fail("ebook/VERSION deve conter SemVer estável.");
  return value;
}
async function pages() {
  const ordered = (await readFile(ORDER_FILE, "utf8")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!ordered.length) fail("docs/user/reading-order.txt está vazio.");
  const seen = new Set();
  const paths = [];
  for (const value of ordered) {
    if (!/^docs\/user\/.*\.md$/.test(value) || seen.has(value)) fail(`entrada inválida na ordem de leitura: ${value}`);
    const path = join(ROOT, value);
    await readFile(path);
    seen.add(value);
    paths.push(path);
  }
  for (const path of (await filesIn(DOCS_ROOT)).filter((item) => item.endsWith(".md"))) {
    if (!seen.has(rel(path))) fail(`página fora da ordem de leitura: ${rel(path)}`);
  }
  return paths;
}
async function sourceHash(paths) {
  const records = [];
  for (const path of paths) records.push(`${rel(path)}\0${await sha256(path)}\n`);
  return createHash("sha256").update(records.join(""), "utf8").digest("hex");
}
function outputs(value) {
  const stem = `Astrofy-Guia-do-Usuario-v${value}`;
  return {
    stem,
    pdf: join(EBOOK_ROOT, `${stem}.pdf`),
    epub: join(EBOOK_ROOT, `${stem}.epub`),
    pdfAlias: join(EBOOK_ROOT, "ebook-astrofy.pdf"),
    epubAlias: join(EBOOK_ROOT, "ebook-astrofy.epub"),
  };
}
async function preparedPages(paths) {
  const directory = join(BUILD_ROOT, "pages");
  await mkdir(directory, { recursive: true });
  const inputs = [];
  for (const path of paths) {
    const name = path.split(/[\\/]/).pop();
    let text = await readFile(path, "utf8");
    text = text.replace(/\n## Classificação\n[\s\S]*?(?=\n#|$)/g, "\n");
    text = text.replace(/(?<!!)\[([^\]]+)\]\((?!https?:|mailto:|tel:)[^)]+\)/g, "$1");
    await writeFile(join(directory, name), text);
    inputs.push(name);
  }
  return { directory, inputs };
}
function datePtBr() {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}
async function check(value, sources) {
  const paths = outputs(value);
  const packageVersion = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8")).version;
  if (packageVersion !== value) fail(`package.json (${packageVersion}) e ebook/VERSION (${value}) divergem.`);
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  if (manifest.version !== value || manifest.source_sha256 !== await sourceHash(sources)) fail("ebook/build.json está desatualizado; execute npm run ebook.");
  for (const [kind, path, alias] of [["pdf", paths.pdf, paths.pdfAlias], ["epub", paths.epub, paths.epubAlias]]) {
    const binary = await readFile(path);
    const aliasBinary = await readFile(alias);
    if (!binary.equals(aliasBinary)) fail(`alias ${kind} diverge da edição vigente.`);
    if (manifest.artifacts[kind].sha256 !== await sha256(path)) fail(`hash de ${kind} diverge do manifesto.`);
  }
  run("unzip", ["-tqq", paths.epub]);
  const text = run("pdftotext", [paths.pdf, "-"]);
  for (const title of ["Astrofy", "Visão geral", "Instalação e setup", "Solução de problemas"]) {
    if (!text.includes(title)) fail(`PDF não contém a seção: ${title}`);
  }
  console.log(`OK: ebook v${value} sincronizado com docs/user/.`);
}
async function build(value, sources, pagePaths) {
  await mkdir(BUILD_ROOT, { recursive: true });
  await mkdir(EBOOK_ROOT, { recursive: true });
  const prepared = await preparedPages(pagePaths);
  const paths = outputs(value);
  const html = join(BUILD_ROOT, `${paths.stem}.html`);
  const cover = join(BUILD_ROOT, `${paths.stem}-cover.png`);
  run("magick", [LOGO, "-background", "white", "-gravity", "center", "-extent", "1600x2560", cover]);
  const common = ["--from=markdown", "--standalone", "--file-scope", "--toc", "--toc-depth=2", `--metadata-file=${METADATA}`, "--metadata", `version=${value}`];
  run("pandoc", [...prepared.inputs, "--to=html5", ...common, `--template=${TEMPLATE}`, "--metadata", `date=${datePtBr()}`, "--output", html], { cwd: prepared.directory });
  run("weasyprint", [html, paths.pdf, "--base-url", SCRIPT_DIR, "--stylesheet", PDF_STYLE]);
  run("pandoc", [...prepared.inputs, "--to=epub3", ...common, `--css=${EPUB_STYLE}`, `--epub-cover-image=${cover}`, "--output", paths.epub], { cwd: prepared.directory });
  const manifest = {
    schema_version: 1,
    version: value,
    edition: `v${value}`,
    generated_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    source_sha256: await sourceHash(sources),
    sources: sources.map(rel).sort(),
    artifacts: {
      pdf: { file: paths.pdf.split(/[\\/]/).pop(), sha256: await sha256(paths.pdf) },
      epub: { file: paths.epub.split(/[\\/]/).pop(), sha256: await sha256(paths.epub) },
    },
  };
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  await copyFile(paths.pdf, paths.pdfAlias);
  await copyFile(paths.epub, paths.epubAlias);
  await check(value, sources);
}
async function main() {
  const onlyCheck = process.argv[2] === "--check";
  if (process.argv.length > (onlyCheck ? 3 : 2)) fail("uso: node .ebook/build-ebook.mjs [--check]");
  const value = version();
  const pagePaths = await pages();
  const sources = [...pagePaths, ORDER_FILE, VERSION_FILE, PDF_STYLE, EPUB_STYLE, TEMPLATE, METADATA, LOGO, SCRIPT].sort();
  if (onlyCheck) await check(value, sources);
  else await build(value, sources, pagePaths);
}

main().catch((error) => { console.error(`Erro: ${error.message}`); process.exitCode = 1; });
