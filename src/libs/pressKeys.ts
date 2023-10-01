import { KeyboardButton } from 'keysender';

import __app from './config';
import { keyboard } from './hardware';
import { logLine } from './log';

export function printText(output: string) {
	return new Promise<void>(async (resolve) => {
		try {
			if (output == '') {
				return;
			}

			let delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

			if (__app.config.others.mtaConsoleInputMode) {
				await keyboard.sendKey('f8', delay, delay);
				await keyboard.printText(output, delay, delay);
				await keyboard.sendKeys(['enter', 'f8'], delay, delay);
			} else {
				await keyboard.printText(output, delay, delay);
			}

			setTimeout(resolve, 0);
		} catch (error) {
			logLine(error);
		}
	});
}

export function sendKeys(...key: KeyboardButton[]) {
	return new Promise<void>(async (resolve) => {
		try {
			if (!key) {
				return;
			}

			let delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

			await keyboard.sendKeys(key, delay, delay);

			setTimeout(resolve, 0);
		} catch (error) {
			logLine(error);
		}
	});
}
