import { readFile, rename } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import AdmZip from 'adm-zip';
import { config } from 'dotenv';

config();

const SRC_BASE = resolve('./pkg');
const DEST_BASE_TMP = process.env.DEST_BASE_TMP ?? '';
const DEST_BASE = process.env.DEST_BASE ?? '';
const BUILD_TIME = await readFile('buildTime.log', { encoding: 'utf8' });
const VERSION = 'voice-to-text ver.' + BUILD_TIME + '.zip';
const FILE_PATH = join(DEST_BASE_TMP, VERSION);
const ADMZIP = new AdmZip();

console.log('App Version:', BUILD_TIME);

// @ts-ignore
await ADMZIP.addLocalFolderPromise(SRC_BASE);

for (const entry of ADMZIP.getEntries()) {
	entry.header.flags |= 0x0800;
}

await ADMZIP.writeZipPromise(FILE_PATH);

await rename(FILE_PATH, join(DEST_BASE, VERSION));
