import __app from './config.js';
import { debugLogLine } from './debugLog.js';
import { logLine } from './log.js';
import texts from './text.js';

export default function soundWrapper() {
	try {
		if (!__app.config.enableSounds) {
			return;
		}
		debugLogLine(texts().textFeedback.soundWrapper.playingSound);
		process.stdout.write('\x07');
	} catch (error) {
		logLine(error);
	}
}
