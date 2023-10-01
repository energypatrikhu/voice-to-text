import __app from './config';
import { logLine } from './log';

let CHAR_MAP = {
	'!': ['felkiáltójel'],
	'?': ['kérdőjel'],
	';': ['pontosvessző'],
	':': ['kettőspont'],
	',': ['vessző'],
	'.': ['pont'],
	'/': ['perjel', 'per'],
	'*': ['csillag'],
	'_': ['alsó kötőjel'],
	'-': ['kötőjel'],
	'+': ['plusz'],
	' ': ['space', 'szóköz'],
	'[': ['szögletes zárójel nyitás', 'szögletes zárójel nyit'],
	']': ['szögletes zárójel zárás', 'szögletes zárójel zár'],
	'[[]]': ['dupla szögletes zárójel'],
	'[]': ['szögletes zárójel'],
	'{': ['kapcsos zárójel nyitás', 'kapcsos zárójel nyit'],
	'}': ['kapcsos zárójel zárás', 'kapcsos zárójel zár'],
	'{{}}': ['dupla kapcsos zárójel'],
	'{}': ['kapcsos zárójel'],
	'(': ['zárójel nyitás', 'zárójel nyit'],
	')': ['zárójel zárás', 'zárójel zár'],
	'(())': ['dupla zárójel'],
	'()': ['zárójel'],
};

export default function replaceCharMap(text: string) {
	try {
		if (!__app.config.replacers.punctuationMarks) {
			return text;
		}
		if (text == '') {
			return text;
		}

		for (let [replacer, searchedWords] of Object.entries(CHAR_MAP)) {
			for (let _word of searchedWords) {
				text = text.replace(new RegExp('.?' + _word + ' ', 'g'), replacer + ' ');

				if (text.endsWith(' ' + _word)) {
					text = text.slice(0, -(_word.length + 1)) + replacer;
				}

				if (text == _word) {
					text = text.slice(0, -_word.length) + replacer;
				}
			}
		}

		return text;
	} catch (error) {
		logLine(error);
	}
}
