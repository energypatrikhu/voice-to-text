import { writeFile } from 'node:fs/promises';

import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import __app from '../../config';
import { logLine } from '../../log';
import texts from '../../texts';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		__app.config.others.showActiveButtons = !__app.config.others.showActiveButtons;

		await writeFile('config.json', JSON.stringify(__app.config, null, 2), { encoding: 'utf8' });

		if (__app.config.others.showActiveButtons) {
			logLine(texts().textFeedback.commands.showActiveButtons.showActiveButtons.enabled);
			speechSynthesis(texts().speechFeedback.commands.showActiveButtons.showActiveButtons.enabled);
		} else {
			logLine(texts().textFeedback.commands.showActiveButtons.showActiveButtons.disabled);
			speechSynthesis(texts().speechFeedback.commands.showActiveButtons.showActiveButtons.disabled);
		}
	},
	['both', 'Aktív Gombok', '!aktívgombok', 'aktívgombok', texts().textFeedback.commands.showActiveButtons.description],
);
