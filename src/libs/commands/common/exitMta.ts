import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import getActiveWindowName from '../../getActiveWindowName';
import { logLine } from '../../log';
import { printText } from '../../pressKeys';
import texts from '../../texts';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			if (!['gta_sa.exe', 'proxy_sa.exe'].includes(await getActiveWindowName())) {
				logLine(texts().textFeedback.commands.exitMta.notInForeground);
				speechSynthesis(texts().speechFeedback.commands.exitMta.notInForeground);
				return;
			}

			await printText('exit', true);
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'MTA:SA Bezárás', null, ['mtabezárás', 'mtakilépés', 'closemta', 'exitmta'], texts().textFeedback.commands.exitMta.description],
);
