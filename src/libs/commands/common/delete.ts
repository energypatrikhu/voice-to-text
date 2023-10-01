import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import { logLine } from '../../log';
import { sendKeys } from '../../pressKeys';
import texts, { textReplacer } from '../../texts';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig, previousOutputString: string, repeats: number, type: string | 'szó' | 'betű') => {
		if (!previousOutputString) {
			return;
		}

		try {
			switch (type) {
				case 'betű': {
					let outputString = previousOutputString.slice(0, -repeats);

					logLine(textReplacer(texts().textFeedback.commands.delete.removedChars, repeats));
					speechSynthesis(textReplacer(texts().speechFeedback.commands.delete.removedChars, repeats));

					for (let i = 0; i < repeats; i++) {
						await sendKeys('backspace');
					}
					return outputString;
				}
				case 'szó':
				default: {
					let previousOutputArray = previousOutputString.split(' ');
					let slicedPreviousOutputArray = previousOutputArray.slice(0, -repeats);
					let rawOutputString = slicedPreviousOutputArray.join(' ');
					let rightSlicedOutputString = rawOutputString.endsWith(', ') ? rawOutputString.slice(0, -2) : rawOutputString;
					let leftSlicedOutputString = rightSlicedOutputString.startsWith(',') ? rightSlicedOutputString.slice(1) : rightSlicedOutputString;

					let removedWords = previousOutputArray.slice(slicedPreviousOutputArray.length);
					let removedWordsJoined = removedWords.join(' ');

					logLine(textReplacer(texts().textFeedback.commands.delete.removedWords, repeats));
					speechSynthesis(textReplacer(texts().speechFeedback.commands.delete.removedWords, repeats));

					for (let i = 0; i < removedWordsJoined.length + 1; i++) {
						await sendKeys('backspace');
					}
					return leftSlicedOutputString;
				}
			}
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'Törlés', '!törlés | !törlés:<ismétlés> | !törlés:<ismétlés>:<szó/betű>', 'törlés', texts().textFeedback.commands.delete.description],
);
