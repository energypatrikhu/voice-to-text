import { logLine } from './log';

let appendixMap = ['t', 'e', 'ban', 'ben', 'ra', 're', 'ból', 'ből', 'ból', 'ből', 'tó', 'től', 'val', 'vel', 'vá', 'vé', 'nak', 'nek', 'hoz', 'hez', 'höz', 'on', 'en', 'ön'];

export default function appendixPrefixer(text: string) {
	try {
		if (text == '') {
			return text;
		}

		for (let appendix of appendixMap) {
			text = text.replace(new RegExp(' ' + appendix + ' ', 'g'), appendix + ' ');

			if (text.endsWith(appendix)) {
				text = text.slice(0, -appendix.length) + appendix;
			}
		}

		return text;
	} catch (error) {
		logLine(error);
	}
}
