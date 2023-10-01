import __app from './config';
import { log, logLine } from './log';

export function debugLog(...message: any) {
	if (!__app.config.logs.debug) {
		return;
	}
	log('::debug::', ...message);
}

export function debugLogLine(...message: any) {
	if (!__app.config.logs.debug) {
		return;
	}
	logLine('::debug::', ...message);
}
