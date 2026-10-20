/**
 * Modelo de gerador de llms.txt e llms-full.txt para sites Astro.
 *
 * Copie para `scripts/generate-llms.mjs` no site consumidor e ajuste
 * SITE_URL, SUMMARY e COLLECTIONS ao projeto. Uso:
 * `node scripts/generate-llms.mjs` gera os arquivos;
 * `node scripts/generate-llms.mjs --check` falha quando há divergência.
 *
 * Contrato: mesma fonte das páginas canônicas, só conteúdo publicado,
 * URLs absolutas do domínio de produção, ordenação estável. Não edite os
 * arquivos gerados à mão; corrija a fonte e regenere.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { glob } from 'tinyglobby'

const siteRoot = process.cwd()
const contentDirectory = path.join(siteRoot, 'src/content')
const summaryPath = path.join(siteRoot, 'public/llms.txt')
const fullPath = path.join(siteRoot, 'public/llms-full.txt')

/** Troque pelo domínio de produção do site. */
const SITE_URL = 'https://exemplo.com'

/** Resumo curto exibido no topo dos dois arquivos. Ajuste ao projeto. */
const SUMMARY_LINES = [
	'# Exemplo',
	'',
	'> Resumo curto do site em uma frase, com o assunto principal e o público.',
	'',
	'## Recursos principais',
	'',
	'- [Início](https://exemplo.com/): o que o visitante encontra aqui.',
	`- [Conteúdo integral](https://exemplo.com/llms-full.txt): versão completa do conteúdo publicado.`
]

/**
 * Coleções incluídas no integral. Ajuste `pattern`, o filtro de publicados
 * e os campos de título, descrição e data ao schema do projeto.
 */
const COLLECTIONS = [
	{
		heading: '## Artigos',
		pattern: 'blog/**/*.md',
		url: (item) => `/blog/${item.slug}/`,
		sort: 'date-desc'
	}
]

function pageUrl(route) {
	return `${SITE_URL}${route.endsWith('/') ? route : `${route}/`}`
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

export function extractFrontmatter(markdown) {
	const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u)
	if (!match) return { front: '', body: markdown }
	return { front: match[1], body: markdown.slice(match[0].length) }
}

export function readField(front, field) {
	const match = front.match(new RegExp(`^${escapeRegExp(field)}:[ \\t]*(.*?)[ \\t]*$`, 'mu'))
	if (!match) return ''
	const value = match[1].trim()
	if (/^['"]/u.test(value)) {
		const closingQuote = value.indexOf(value[0], 1)
		if (closingQuote !== -1) return value.slice(1, closingQuote)
	}
	return value.replace(/\s+#.*$/u, '').trim()
}

export function cleanBody(body) {
	return body
		.split('\n')
		.filter((line) => !/^import\s/u.test(line.trim()))
		.filter((line) => !/^<\/?[A-Za-z][^>]*>$/u.test(line.trim()))
		.join('\n')
		.replace(/\n{3,}/gu, '\n\n')
		.trim()
}

export function renderEntry({ title, url, description, date, body }) {
	const metadata = [`- URL: ${url}`]
	if (date) metadata.push(`- Publicado em: ${date}`)
	if (description) metadata.push(`- Descrição: ${description}`)
	const content = body ? `\n\n${body}` : ''
	return `### ${title}\n\n${metadata.join('\n')}${content}\n`
}

async function readCollection(pattern) {
	const files = await glob(pattern, { cwd: contentDirectory, absolute: false, dot: false })
	return Promise.all(
		files.sort().map(async (file) => {
			const raw = await readFile(path.join(contentDirectory, file), 'utf8')
			const { front, body } = extractFrontmatter(raw)
			return { file, front, body }
		})
	)
}

async function buildCollectionEntries(collection) {
	const entries = await readCollection(collection.pattern)
	const items = entries
		.filter(({ front }) => {
			const status = readField(front, 'status')
			if (status) return status !== 'draft'
			return readField(front, 'draft') !== 'true'
		})
		.map(({ file, front, body }) => ({
			slug: path.basename(file).replace(/\.mdx?$/u, ''),
			title: readField(front, 'title'),
			description: readField(front, 'description'),
			date: readField(front, 'pubDate') || readField(front, 'publishedAt') || readField(front, 'date'),
			body: cleanBody(body)
		}))
		.filter((item) => item.title)

	if (collection.sort === 'date-desc') {
		return items.sort((left, right) => {
			const leftDate = new Date(left.date).getTime() || 0
			const rightDate = new Date(right.date).getTime() || 0
			return rightDate - leftDate || left.slug.localeCompare(right.slug)
		})
	}
	return items.sort((left, right) => left.title.localeCompare(right.title, 'pt-BR', { sensitivity: 'base' }))
}

export async function buildLlmsSummary() {
	return `${SUMMARY_LINES.join('\n')}\n`
}

export async function buildLlmsFullText() {
	const summary = (await buildLlmsSummary()).trim()
	const sections = []
	for (const collection of COLLECTIONS) {
		const items = await buildCollectionEntries(collection)
		sections.push(
			[
				collection.heading,
				'',
				...items.map((item) =>
					renderEntry({
						title: item.title,
						url: pageUrl(collection.url(item)),
						description: item.description,
						date: item.date,
						body: item.body
					})
				)
			].join('\n')
		)
	}
	const intro = [
		'# Conteúdo integral',
		'',
		'Este arquivo reúne o texto integral do conteúdo publicado no site.',
		'Cada seção informa a URL absoluta da página correspondente.'
	].join('\n')
	return `${summary}\n\n---\n\n${intro}\n\n---\n\n${sections.join('\n\n---\n\n')}\n`
}

async function main() {
	const checkOnly = process.argv.includes('--check')
	const summary = await buildLlmsSummary()
	const full = await buildLlmsFullText()

	if (checkOnly) {
		let currentSummary = ''
		let currentFull = ''
		try {
			currentSummary = await readFile(summaryPath, 'utf8')
		} catch (error) {
			if (error?.code !== 'ENOENT') throw error
		}
		try {
			currentFull = await readFile(fullPath, 'utf8')
		} catch (error) {
			if (error?.code !== 'ENOENT') throw error
		}
		if (currentSummary !== summary || currentFull !== full) {
			throw new Error('llms.txt ou llms-full.txt desatualizados. Execute `node scripts/generate-llms.mjs`.')
		}
		console.log('llms.txt e llms-full.txt em sincronia com o conteúdo publicado.')
		return
	}

	await writeFile(summaryPath, summary)
	await writeFile(fullPath, full)
	console.log(`llms.txt gerado com ${summary.length} caracteres; llms-full.txt com ${full.length} caracteres.`)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
	await main()
}
