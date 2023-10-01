import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import getActiveWindowName from '../../getActiveWindowName';
import { logLine } from '../../log';
import texts, { textReplacer } from '../../texts';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		let activeWindow = await getActiveWindowName();

		logLine(textReplacer(texts().textFeedback.commands.activeWindow.activeWindow, activeWindow));
		speechSynthesis(textReplacer(texts().speechFeedback.commands.activeWindow.activeWindow, activeWindow));
	},
	['both', 'Aktív Ablak', '!aktívablak', 'aktívablak', texts().textFeedback.commands.activeWindow.description],
);
