import { build } from 'esbuild';
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve, basename, extname } from 'node:path';
import { config } from 'dotenv';

config();

let __source = './src';
let __destination = './build';
// let __pkgDestination = './pkg';

let __version = new Intl.DateTimeFormat('hu-HU', {
	timeZone: 'Europe/Budapest',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
})
	.format(new Date())
	.replace(/(\.\s|:|,)/g, '.');

let oldEntries = (await readdir(__destination, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => join(__destination, entry.name));

for (let entry of oldEntries) {
	await rm(entry, { force: true });
}

await new Promise((r) => setTimeout(r, 1000));

let entries = (await readdir(__source, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => join(__source, entry.name));

let packageJson = JSON.parse(await readFile('./package.json', { encoding: 'utf-8' }));

await build({
	entryPoints: entries,
	bundle: true,
	platform: 'node',
	outdir: __destination,
	logLevel: 'debug',
	minify: true,
	format: 'cjs',
	external: Object.keys(packageJson.dependencies || {}),
});

await writeFile('buildTime.log', __version, { encoding: 'utf8' });

async function readfileLine(entry) {
	let buildFileName = basename(entry, extname(entry)) + '.js';
	let buildFilePath = resolve(join(__destination, buildFileName));

	let buildFileData = await readFile(buildFilePath);

	let additionalData = `let __appVersion = '${__version}';\nlet __appUrl = '${process.env.UPDATE_URL}';\nlet __appUrlPath = '${process.env.UPDATE_URL_PATH}';\n`;

	await writeFile(buildFilePath, additionalData + buildFileData);
}

for (let entry of entries) {
	await readfileLine(entry);
}
