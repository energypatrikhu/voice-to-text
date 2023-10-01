import { launch } from 'puppeteer-core';

import chromeInstance from './libs/chromeInstance.js';
import cmd from './libs/commandHandler.js';
import __app from './libs/config.js';
import { debugLogLine } from './libs/debugLog.js';
import getActiveWindowName from './libs/getActiveWindowName.js';
import getChromeInstallLocation from './libs/getChromeInstallLocation.js';
import keyboardShortcutMapper from './libs/keyboardShortcutMapper.js';
import { log, logLine } from './libs/log.js';
import texts, { textReplacer } from './libs/text.js';
import uioHookWrapper from './libs/uioHookWrapper.js';
import { checkAppUpdate, startAppUpdate } from './libs/update/checkAppUpdate.js';

// @ts-ignore
__app.version = __appVersion;
// @ts-ignore
__app.url = __appUrl;
// @ts-ignore
__app.urlPath = __appUrlPath;

(async function () {
	try {
		logLine(texts().textFeedback.index.app.loading);

		logLine(textReplacer(texts().textFeedback.index.app.version, __app.version));

		if (!(await checkAppUpdate(__app.version))) {
			return await startAppUpdate(__app.version);
		}

		let chromeSpeechRecognitionOptions = {
			continuous: true,
			interimResults: false,
			lang: __app.config.speechRecognition.language ?? 'hu-HU',
			maxAlternatives: 1,
		};

		debugLogLine(texts().textFeedback.index.chrome.starting);
		let browserInstance = await launch({
			headless: 'new',
			executablePath: getChromeInstallLocation(),
		});

		debugLogLine(texts().textFeedback.index.chrome.initializing);
		let { nodeEmitter, speechSynthesis } = await chromeInstance(browserInstance, chromeSpeechRecognitionOptions);

		debugLogLine(texts().textFeedback.index.updater.starting);
		let notifiedAboutUpdate = false;
		setInterval(async () => {
			if (!(await checkAppUpdate(__app.version, false)) && !notifiedAboutUpdate) {
				notifiedAboutUpdate = true;

				debugLogLine(texts().textFeedback.index.updater.updateAvailable);
				speechSynthesis(texts().speechFeedback.index.updater.updateAvailable);
			}
		}, 5 * 60 * 1000);

		let voiceRecognitionEnabled = false;
		let autoReleaseTimer = null;
		let lastActiveButtons = [];

		const voiceRecognitionEnable = async (outputPrefix: string | null) => {
			try {
				if (__app.config.windowAllowList.enabled && !__app.config.windowAllowList.windows.includes(await getActiveWindowName())) {
					return;
				}

				voiceRecognitionEnabled = true;

				debugLogLine(textReplacer(texts().textFeedback.index.keyPressed, voiceRecognitionEnabled));

				nodeEmitter.emit('speechRecognition:start', outputPrefix);
			} catch (error) {
				logLine(error);
			}
		};

		const voiceRecognitionDisable = () => {
			try {
				voiceRecognitionEnabled = false;
				debugLogLine(textReplacer(texts().textFeedback.index.keyPressed, voiceRecognitionEnabled));

				nodeEmitter.emit('speechRecognition:stop');
			} catch (error) {
				logLine(error);
			}
		};

		debugLogLine(texts().textFeedback.index.registering.ioHook);
		uioHookWrapper((event) => {
			if (__app.config.others.showActiveButtons) {
				let activeButtons = Object.entries(event.pressedKeys)
					.filter((btn) => btn[1] === true)
					.map((btn) => btn[0]);

				if (JSON.stringify(lastActiveButtons) != JSON.stringify(activeButtons)) {
					debugLogLine(textReplacer(texts().textFeedback.index.activeButtons, activeButtons));
					lastActiveButtons = activeButtons;
				}
			}

			try {
				let keyboardShortcutMapperResult = keyboardShortcutMapper(event.pressedKeys);

				if (__app.config.input.holdToActivate) {
					if (!voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
						voiceRecognitionEnable(keyboardShortcutMapperResult.outputPrefix);
					} else if (voiceRecognitionEnabled && !keyboardShortcutMapperResult.match) {
						voiceRecognitionDisable();
					}
				} else if (!voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
					voiceRecognitionEnable(keyboardShortcutMapperResult.outputPrefix);

					clearTimeout(autoReleaseTimer);

					autoReleaseTimer = setTimeout(() => {
						if (!__app.config.input.autoRelease.enabled) {
							return;
						}
						voiceRecognitionDisable();
					}, __app.config.input.autoRelease.releaseTime * 1000);
				} else if (voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
					voiceRecognitionDisable();

					clearTimeout(autoReleaseTimer);
				}
			} catch (error) {
				debugLogLine(error);
			}
		});

		debugLogLine(texts().textFeedback.index.registering.commands);
		cmd.init(speechSynthesis);

		if (__app.config.input.holdToActivate) {
			logLine(texts().textFeedback.index.app.started.hold);
		} else {
			logLine(texts().textFeedback.index.app.started.toggle);
		}

		logLine(texts().textFeedback.index.creatorsCredits.wrapper);
		log(texts().textFeedback.index.creatorsCredits.createdBy);
		log(texts().textFeedback.index.creatorsCredits.ideaBy);
		log(texts().textFeedback.index.creatorsCredits.wrapper);

		if (__app.config.commands.enabled) {
			logLine(textReplacer(texts().textFeedback.index.commandsEnabled, __app.config.commands.prefix));
		}

		speechSynthesis(texts().speechFeedback.index.appStarted);
	} catch (error) {
		logLine(error);
	}
})();

process.on('uncaughtException', function (err: any) {
	debugLogLine('[uncaughtException]', err.toString());
});
