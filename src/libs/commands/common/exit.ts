import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import { logLine } from '../../log';
import texts from '../../texts';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			await speechSynthesis(texts().speechFeedback.commands.exit.closingApp);

			process.exit();
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'Alkalmazás bezárás', '!kilépés | !bezárás', ['kilépés', 'bezárás'], texts().textFeedback.commands.exit.description],
);
