import __app from './config';

export default function keyboardShortcutMapper(pressedKeys: { [key: string]: boolean }) {
	// return !shortcutConfig.map((button) => pressedKeys[button] ?? false).includes(false);
	for (let { outputPrefix, shortcut } of __app.config.input.keyboardShortcuts) {
		if (!shortcut.map((button) => pressedKeys[button] ?? false).includes(false)) {
			return { match: true, outputPrefix };
		}
	}

	return { match: false, outputPrefix: null };
}
