import { EventEmitter as nodeEventEmitter } from 'node:events';
import { Browser, EventEmitter as puppeteerEventEmitter } from 'puppeteer-core';

import speechRecognition from './chromeFunctions/speechRecognition.js';
import speechRecognitionEngine from './chromeFunctions/speechRecognitionEngine.js';
import speechSynthesis from './chromeFunctions/speechSynthesis.js';
import __app from './config.js';
import { debugLogLine } from './debugLog.js';
import texts from './texts.js';

export default async function chromeInstance(browser: Browser, speechRecognitionOptions = {}) {
	debugLogLine(texts().textFeedback.chromeInstance.chrome.navigating);
	let page = (await browser.pages())[0];
	await page.goto('chrome://version//');

	let nodeEmitter = new nodeEventEmitter();
	let pageEmitter = new puppeteerEventEmitter();

	let isSpeechSynthesisFinished = false;

	const speechSynthesisWrapper = (text: string) => {
		if (!__app.config.feedback.speech.enabled) {
			return;
		}

		nodeEmitter.emit('speechSynthesis', { text, volume: __app.config.feedback.speech.volume || 0.5, lang: __app.config.feedback.language });

		return new Promise<void>((resolve) => {
			const waitSpeechSynthesisFinish = () => {
				if (isSpeechSynthesisFinished) {
					isSpeechSynthesisFinished = false;
					return setTimeout(resolve, 500);
				}
				setTimeout(waitSpeechSynthesisFinish, 0);
			};
			waitSpeechSynthesisFinish();
		});
	};

	debugLogLine(texts().textFeedback.chromeInstance.chrome.registeringEvents);

	nodeEmitter.on('speechSynthesis', (speechSynthesisSettings: any) => speechSynthesis(page, speechSynthesisSettings));
	pageEmitter.on('speechSynthesis:finished', () => (isSpeechSynthesisFinished = true));

	nodeEmitter.on('speechRecognition:start', (outputPrefix: string | null) => speechRecognition('start', page, outputPrefix));
	nodeEmitter.on('speechRecognition:stop', () => speechRecognition('stop', page));

	pageEmitter.on('speechRecognition:info', (info: string) => speechRecognition('info', page, info));
	pageEmitter.on('speechRecognition:transcript', (transcript: string) => speechRecognition('transcript', page, transcript));

	debugLogLine(texts().textFeedback.chromeInstance.exposingPageFunctions);

	await page.exposeFunction('emitRecognitionEngineInfo', (info: string) => pageEmitter.emit('speechRecognition:info', info));
	await page.exposeFunction('emitRecognitionEngineTranscript', (transcript: string) => pageEmitter.emit('speechRecognition:transcript', transcript));
	await page.exposeFunction('speechSynthesisFinished', () => pageEmitter.emit('speechSynthesis:finished'));

	debugLogLine(texts().textFeedback.chromeInstance.speechRecognition.starting);
	await speechRecognitionEngine(page, speechRecognitionOptions);

	return { nodeEmitter, speechSynthesis: speechSynthesisWrapper };
}
