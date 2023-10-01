import { Page } from 'puppeteer-core';

import appendixPrefixer from '../appendixPrefixer';
import cmd from '../commandHandler';
import __app from '../config';
import { debugLogLine } from '../debugLog';
import { logLine } from '../log';
import { printText } from '../pressKeys';
import replaceCharMap from '../replaceCharMap';
import replaceGameChatPrefixMap from '../replaceGameChatPrefixMap';
import soundWrapper from '../soundWrapper';
import texts, { textReplacer } from '../texts';
import uioHookWrapper from '../uioHookWrapper';

let _output: string = '';
let _partialOutput: string = '';
let partialOutput: string = '';
let outputPrefix: string | null;
let partialOutputMatrix: string[][] = [];
let partialOutputIndex = 0;
let stopOutput = false;
let stopTimer = null;

uioHookWrapper((event) => {
	if (!event.pressedKeys['escape']) {
		return;
	}
	if (stopOutput) {
		return;
	}

	debugLogLine(texts().textFeedback.chromeFunctions.speechRecognition.outputStopped);

	_output = '';
	_partialOutput = '';
	partialOutput = '';
	stopOutput = true;
});

export default async function speechRecognition(mode: 'start' | 'stop' | 'info' | 'transcript', page: Page, ...args: any) {
	try {
		switch (mode) {
			case 'start':
				return await speechRecognitionStart(page, args[0]);
			case 'stop':
				return await speechRecognitionStop(page);
			case 'info':
				return await speechRecognitionInfo(args[0]);
			case 'transcript':
				return await speechRecognitionTranscript(args[0]);
		}
	} catch (error) {
		logLine(error);
	}
}

async function speechRecognitionStart(page: Page, _outputPrefix: string) {
	try {
		stopOutput = true;
		_partialOutput = '';
		partialOutput = '';
		outputPrefix = _outputPrefix ? _outputPrefix + ' ' : '';
		partialOutputMatrix = [];
		partialOutputIndex = 0;
		clearTimeout(stopTimer);

		debugLogLine(textReplacer(texts().textFeedback.chromeFunctions.speechRecognition.start.outputPrefix, _outputPrefix));

		await page.evaluate(() => {
			try {
				(window as any).speechRecognition.start();
				(window as any).speechRecognitionEnabled = true;
			} catch (error) {
				console.log(error);
			}
		});
	} catch (error) {
		logLine(error);
	}
}

async function speechRecognitionStop(page: Page) {
	try {
		stopOutput = false;

		await page.evaluate(() => {
			try {
				(window as any).speechRecognition.stop();
				(window as any).speechRecognitionEnabled = false;
			} catch (error) {
				console.log(error);
			}
		});
	} catch (error) {
		logLine(error);
	}
}

async function speechRecognitionInfo(info: string) {
	try {
		soundWrapper();

		switch (info) {
			case 'speechRecognition started':
				debugLogLine('speechRecognitionInfo:', texts().textFeedback.chromeFunctions.speechRecognition.info.started);
				break;
			case 'speechRecognition stopped':
				debugLogLine('speechRecognitionInfo:', texts().textFeedback.chromeFunctions.speechRecognition.info.stopped);
				break;
		}

		clearTimeout(stopTimer);
		stopTimer = setTimeout(async () => {
			if (info == 'speechRecognition stopped' && !stopOutput) {
				let replacedChar = replaceCharMap(outputPrefix + partialOutput);
				let replacedGameChatPrefix = replaceGameChatPrefixMap(replacedChar);
				let replacedAppendixPrefix = appendixPrefixer(replacedGameChatPrefix);

				if (replacedAppendixPrefix == '') {
					return;
				}

				let isCommand = replacedAppendixPrefix.startsWith(__app.config.commands.prefix);
				let output = replacedAppendixPrefix.replace(/\shogy\s/g, ', hogy ');

				if (__app.config.others.mtaConsoleInputMode && !output.startsWith('/')) {
					output = output.replace('say, ', 'say ');
				}

				if (isCommand && __app.config.commands.enabled) {
					_output = (await cmd.voiceCommandHandler(replacedAppendixPrefix, _output)) || _output;
					return;
				} else {
					_output = output;
				}

				debugLogLine(textReplacer(texts().textFeedback.chromeFunctions.speechRecognition.info.output, output));

				if (__app.config.output.partial) {
					return;
				}

				await printText(output);
			}
		}, 500);
	} catch (error) {
		logLine(error);
	}
}

async function speechRecognitionTranscript(transcript: string) {
	try {
		let transcriptLowerCase = transcript.toLowerCase();

		if (partialOutputMatrix[partialOutputIndex] == undefined) {
			partialOutputMatrix[partialOutputIndex] = [transcriptLowerCase];
		} else if (transcriptLowerCase.startsWith(partialOutputMatrix[partialOutputIndex].join(' '))) {
			partialOutputMatrix[partialOutputIndex].push(transcriptLowerCase.slice(partialOutputMatrix[partialOutputIndex].join(' ').length + 1));
		} else {
			partialOutputIndex++;
			partialOutputMatrix[partialOutputIndex] = [transcriptLowerCase];
		}

		partialOutput = partialOutputMatrix.map((o) => o.join(', ')).join(', ');

		if (__app.config.output.partial) {
			await printText(partialOutput.slice(_partialOutput.length));
		}

		debugLogLine(textReplacer(texts().textFeedback.chromeFunctions.speechRecognition.transcript.partialOutput, partialOutput));
	} catch (error) {
		debugLogLine(error);
	}
}
