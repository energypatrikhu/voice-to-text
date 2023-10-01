import { Page } from 'puppeteer-core';

import { logLine } from '../log';

export default async function speechSynthesis(page: Page, speechSynthesisSettings: { volume: number; text: string; lang: string }) {
	try {
		await page.evaluate((speechSynthesisSettings) => {
			try {
				let voices = Array.from(window.speechSynthesis.getVoices());

				speechSynthesisSettings.lang = speechSynthesisSettings.lang || voices.filter((voice) => voice.default)[0].lang;
				let _voice = voices.filter((voice) => voice.lang.includes(speechSynthesisSettings.lang))[0];

				if (window.speechSynthesis.speaking) {
					window.speechSynthesis.cancel();
				}

				let utterance = new SpeechSynthesisUtterance(speechSynthesisSettings.text);

				utterance.voice = _voice;
				utterance.volume = speechSynthesisSettings.volume || 0.5;

				window.speechSynthesis.speak(utterance);

				utterance.addEventListener('end', (window as any).speechSynthesisFinished);
			} catch (error) {
				console.log(error);
			}
		}, speechSynthesisSettings);
	} catch (error) {
		logLine(error);
	}
}
