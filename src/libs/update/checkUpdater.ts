import AdmZip from 'adm-zip';
import { createWriteStream, existsSync } from 'node:fs';
import { mkdir, readdir, rm } from 'node:fs/promises';
import { ClientHttp2Stream } from 'node:http2';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import __app from '../config';
import { logLine } from '../log';
import texts from '../texts';
import http2Wrapper from './http2Wrapper';
import updaterWrapper from './updaterWrapper';

async function handleUpdate() {
	return new Promise<void>(async (promiseResolve) => {
		logLine(texts().textFeedback.update.checkUpdater.notUpToDate);

		let responseStream = (await http2Wrapper(__app.urlPath, 'stream')) as ClientHttp2Stream;

		let tmpPath = join(tmpdir(), 'voice-to-text');
		let zipFilePath = join(tmpPath, 'voice-updater-latest.zip');

		if (!existsSync(tmpPath)) {
			await mkdir(tmpPath, { recursive: true });
		} else {
			let tmpFiles = await readdir(tmpPath);
			for (let tmpFilename of tmpFiles) {
				await rm(join(tmpPath, tmpFilename));
			}
		}

		if (existsSync('voice-updater.exe')) {
			await rm('voice-updater.exe');
		}

		let zipFileWriteStream = createWriteStream(zipFilePath);

		responseStream.pipe(zipFileWriteStream);
		logLine(texts().textFeedback.update.checkUpdater.downloading);

		zipFileWriteStream.on('finish', () => {
			responseStream.close();
			zipFileWriteStream.close();
		});

		zipFileWriteStream.on('close', async () => {
			logLine(texts().textFeedback.update.checkUpdater.unzipping);

			let admZip = new AdmZip(zipFilePath);

			admZip.extractAllTo('.', true);

			promiseResolve();
		});
	});
}

export default async function checkUpdater() {
	return new Promise<void>(async (resolve) => {
		if (!existsSync('voice-updater.exe')) {
			await handleUpdate();

			logLine(texts().textFeedback.update.checkUpdater.updated);

			setTimeout(resolve, 1000);
		} else {
			updaterWrapper(
				async (updateChecker, data) => {
					try {
						let lines = data.split('\n');
						for (let line of lines) {
							if (line.includes('Up to date!')) {
								updateChecker.kill();

								logLine(texts().textFeedback.update.checkUpdater.upToDate);

								setTimeout(resolve, 1000);

								return;
							} else if (line.includes('Versions does not match!')) {
								updateChecker.kill();

								await handleUpdate();

								logLine(texts().textFeedback.update.checkUpdater.updated);

								setTimeout(resolve, 1000);

								return;
							}
						}
					} catch (error) {
						logLine(error);
					}
				},
				[0, 0, true],
			);
		}
	});
}
