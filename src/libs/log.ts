import { log as nodeLog } from 'node:console';
import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import __app from './config';
import getCurrentTime from './getCurrentTime';

export function saveToLogFile(type: '::debug::' | '::normal::', ...messageArray: Array<any>) {
	if (__app.config.logs.saveToFile) {
		let basepath = join('logs');

		if (!existsSync(basepath)) {
			mkdirSync(basepath, { recursive: true });
		}

		let filepath = join(basepath, __app.startupDate + '.log');

		let message = messageArray.map(function (_msg: string | object) {
			if (typeof _msg === 'object') {
				return JSON.stringify(_msg, null, 4);
			}

			return _msg;
		});

		switch (type) {
			case '::debug::':
				if (message.length) {
					appendFileSync(filepath, ['[' + getCurrentTime() + ']', '[DEBUG]', ...message, EOL].join(' '));
				}
				nodeLog('[DEBUG]', ...message);
				break;
			case '::normal::':
				if (message.length) {
					appendFileSync(filepath, ['[' + getCurrentTime() + ']', '[LOG]', ...message, EOL].join(' '));
				}
				nodeLog(...message);
				break;
		}
	}
}

export function log(...message: any) {
	saveToLogFile(message[0].startsWith('::') && message[0].endsWith('::') ? message[0] : '::normal::', ...(message[0].startsWith('::') && message[0].endsWith('::') ? message.slice(1) : message));
}

export function logLine(...message: any) {
	log('');
	log(...message);
}
