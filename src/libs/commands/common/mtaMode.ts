import { writeFile } from 'node:fs/promises';

import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import __app from '../../config';
import { logLine } from '../../log';
import texts from '../../text';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			__app.config.others.mtaConsoleInputMode = !__app.config.others.mtaConsoleInputMode;

			await writeFile('config.json', JSON.stringify(__app.config, null, 2), { encoding: 'utf8' });

			if (__app.config.others.mtaConsoleInputMode) {
				logLine(texts().textFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
				speechSynthesis(texts().speechFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
			} else {
				logLine(texts().textFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
				speechSynthesis(texts().speechFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
			}
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'MTA:SA Mód', '!mtamód', 'mtamód', texts().textFeedback.commands.mtaMode.description],
);
