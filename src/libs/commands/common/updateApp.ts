import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import __app from '../../config';
import { logLine } from '../../log';
import texts from '../../texts';
import { checkAppUpdate, startAppUpdate } from '../../update/checkAppUpdate';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		logLine(texts().textFeedback.commands.updateApp.checkingUpdate);

		if (!(await checkAppUpdate(__app.version, false))) {
			logLine(texts().textFeedback.commands.updateApp.updateAvailabe);
			await speechSynthesis(texts().speechFeedback.commands.updateApp.updateAvailabe);
			await startAppUpdate(__app.version);
			return;
		}

		logLine(texts().textFeedback.commands.updateApp.noUpdateAvailabe);
	},
	['both', 'Alkalmazás frissítés', '!frissítés', 'frissítés', texts().textFeedback.commands.updateApp.description],
);
