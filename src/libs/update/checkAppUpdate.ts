import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

import { logLine } from '../log';
import texts from '../text';
import checkUpdater from './checkUpdater';
import updaterWrapper from './updaterWrapper';

export async function startAppUpdate(version: string) {
	return new Promise<void>(() => {
		try {
			let childProcess = spawn('cmd.exe', ['/c', 'start', '""', resolve('voice-updater.exe'), version, 'true'], { detached: true });

			childProcess.unref();

			childProcess.on('spawn', process.exit);
		} catch (error) {
			logLine(error);
		}
	});
}

export function checkAppUpdate(version: string, showLogs: boolean = true) {
	return new Promise<boolean>(async (resolve) => {
		try {
			await checkUpdater();

			if (showLogs) {
				logLine(texts().textFeedback.update.checkAppUpdate.checkingUpdate);
			}

			updaterWrapper(
				(updateChecker, data) => {
					try {
						let lines = data.split('\n');
						for (let line of lines) {
							if (line.includes('Up to date!')) {
								if (showLogs) {
									logLine(texts().textFeedback.update.checkAppUpdate.upToDate);
								}

								updateChecker.kill();
								setTimeout(() => resolve(true), 1000);
								return;
							} else if (line.includes('Versions does not match!')) {
								if (showLogs) {
									logLine(texts().textFeedback.update.checkAppUpdate.notUpToDate);
								}

								updateChecker.kill();

								setTimeout(() => resolve(false), 2000);
								return;
							}
						}
					} catch (error) {
						logLine(error);
					}
				},
				[version],
			);
		} catch (error) {
			logLine(error);
		}
	});
}
