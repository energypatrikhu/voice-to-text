import { Page } from 'puppeteer-core';

export default async function speechRecognitionEngine(page: Page, speechRecognitionOptions: any) {
	await page.evaluate((speechRecognitionOptions) => {
		try {
			let pageWindowSpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
			(window as any).speechRecognition = new pageWindowSpeechRecognition();

			for (let option in speechRecognitionOptions) {
				(window as any).speechRecognition[option] = speechRecognitionOptions[option];
			}

			(window as any).speechRecognition.addEventListener('result', (e: any) => {
				let transcript = Array.from(e.results)
					.map((result: any) => result[0])
					.map((result) => result.transcript)
					.join('');

				(window as any).emitRecognitionEngineTranscript(transcript);
			});

			(window as any).speechRecognition.addEventListener('start', () => {
				if (!(window as any).speechRecognitionRestart) {
					(window as any).emitRecognitionEngineInfo('speechRecognition started');
				}
				(window as any).speechRecognitionRestart = false;
			});

			(window as any).speechRecognition.addEventListener('end', () => {
				if ((window as any).speechRecognitionEnabled) {
					(window as any).emitRecognitionEngineInfo('speechRecognition re-started');
					(window as any).speechRecognition.start();
					(window as any).speechRecognitionRestart = true;
				} else {
					(window as any).emitRecognitionEngineInfo('speechRecognition stopped');
					(window as any).speechRecognitionRestart = false;
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, speechRecognitionOptions);
}
