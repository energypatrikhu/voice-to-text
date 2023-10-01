import __app from './config';
import enLang from './langs/en';
import huLang from './langs/hu';

export function textReplacer(text: string, ...replacers: any[]) {
	for (let [index, replacer] of replacers.entries()) {
		text = text.replace(`{${index}}`, replacer);
	}
	return text;
}

export default function texts() {
	switch (__app.config.feedback.language) {
		case 'hu':
			return huLang;

		case 'en':
		default:
			return enLang;
	}
}
