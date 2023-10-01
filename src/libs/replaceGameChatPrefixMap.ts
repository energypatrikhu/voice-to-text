import __app from './config';
import { debugLogLine } from './debugLog';
import { logLine } from './log';

let SEEGAME_CHAT_PREFIX_MAP = {
	'/r': ['rádió chat', 'voki toki', 'rádió'],
	'/b': ['ócsai chat', 'oké chat', 'külső chat', 'bécset', 'pécsett'],
	'/s': ['kiabáló chat', 'ordító chat', 'kiáltás chat', 'felszólító chat'],
	'/me': ['tevékenység', 'cselekedet', 'tett', 'cselekvés', 'me'],
	'/do': ['történés', 'eset', 'esemény', 'do'],
	'/szint': ['szint'],
	'/handsup': ['kezek fel'],
	'/fall': ['fekvés'],
	'/fallfront': ['hasra', 'hasalás'],
};

export default function replaceGameChatPrefixMap(text: string) {
	try {
		if (!__app.config.replacers.gameChatPrefixes) {
			return text;
		}
		if (text == '') {
			return text;
		}

		for (let [replacer, searchedTexts] of Object.entries(SEEGAME_CHAT_PREFIX_MAP)) {
			for (let _text of searchedTexts) {
				if (text.startsWith(_text + ' ')) {
					let prefix = __app.config.others.mtaConsoleInputMode ? replacer.slice(1) : replacer;
					debugLogLine('replacer', replacer);
					debugLogLine('_text', _text);
					debugLogLine('prefix', prefix);

					return prefix + text.slice(_text.length);
				}
			}
		}

		if (__app.config.others.mtaConsoleInputMode && !text.startsWith(__app.config.commands.prefix)) {
			if (text.startsWith('/')) {
				return text.slice(1);
			}

			return 'say ' + text;
		}

		return text;
	} catch (error) {
		logLine(error);
	}
}
