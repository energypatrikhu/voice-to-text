import { existsSync } from 'node:fs';

import __app from './config.js';
import { debugLogLine } from './debugLog.js';
import { logLine } from './log.js';
import texts from './texts.js';

let CHROME_INSTALL_PATHS = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Application/chrome.exe'];

export default function getChromeInstallLocation() {
	try {
		if (!!__app.config.chromeInstallLocation) {
			if (__app.config.chromeInstallLocation) {
				// logWrapper('found chrome @ ' + __app.config.customChromeLocation);
				return __app.config.chromeInstallLocation;
			} else {
				debugLogLine(texts().textFeedback.getChromeInstallLocation.chrome.cannotFind);
			}
		}

		for (let installPath of CHROME_INSTALL_PATHS) {
			if (existsSync(installPath)) {
				// logWrapper('found chrome @ ' + installPath);
				return installPath;
			}
		}
	} catch (error) {
		logLine(error);
	}
}
