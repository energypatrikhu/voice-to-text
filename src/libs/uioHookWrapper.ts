import { EventType, uIOhook, UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi';

let uiohookKeys = {
	14: 'backspace',
	15: 'tab',
	28: 'enter',
	3612: 'enter',
	58: 'capsLock',
	1: 'escape',
	57: 'space',
	3657: 'pageUp',
	3665: 'pageDown',
	3663: 'end',
	3655: 'home',
	57419: 'arrowLeft',
	57416: 'arrowUp',
	57421: 'arrowRight',
	57424: 'arrowDown',
	3666: 'insert',
	3667: 'delete',
	11: '0',
	2: '1',
	3: '2',
	4: '3',
	5: '4',
	6: '5',
	7: '6',
	8: '7',
	9: '8',
	10: '9',
	30: 'a',
	48: 'b',
	46: 'c',
	32: 'd',
	18: 'e',
	33: 'f',
	34: 'g',
	35: 'h',
	23: 'i',
	36: 'j',
	37: 'k',
	38: 'l',
	50: 'm',
	49: 'n',
	24: 'o',
	25: 'p',
	16: 'q',
	19: 'r',
	31: 's',
	20: 't',
	22: 'u',
	47: 'v',
	17: 'w',
	45: 'x',
	21: 'y',
	44: 'z',
	39: 'é',
	13: 'ó',
	53: 'ü',
	41: 'ö',
	26: 'ő',
	43: 'ű',
	27: 'ú',
	40: 'á',
	3654: 'í',
	82: 'numpad0',
	79: 'numpad1',
	80: 'numpad2',
	81: 'numpad3',
	75: 'numpad4',
	76: 'numpad5',
	77: 'numpad6',
	71: 'numpad7',
	72: 'numpad8',
	73: 'numpad9',
	55: 'numpadMultiply',
	78: 'numpadAdd',
	74: 'numpadSubtract',
	83: 'numpadDecimal',
	3637: 'numpadDivide',
	59: 'f1',
	60: 'f2',
	61: 'f3',
	62: 'f4',
	63: 'f5',
	64: 'f6',
	65: 'f7',
	66: 'f8',
	67: 'f9',
	68: 'f10',
	87: 'f11',
	88: 'f12',
	91: 'f13',
	92: 'f14',
	93: 'f15',
	99: 'f16',
	100: 'f17',
	101: 'f18',
	102: 'f19',
	103: 'f20',
	104: 'f21',
	105: 'f22',
	106: 'f23',
	107: 'f24',
	51: 'comma',
	12: 'minus',
	52: 'period',
	29: 'ctrl',
	3613: 'ctrl',
	56: 'alt',
	3640: 'alt',
	42: 'shift',
	54: 'shift',
	3675: 'win',
	3676: 'win',
	69: 'numLock',
	70: 'scrollLock',
	3639: 'printScreen',
	3653: 'pauseBreak',
};

let pressedKeys: { [key: string]: boolean } = {};

interface ioStdout {
	key: string;
	pressedKeys: typeof pressedKeys;
}

function uioHookInputParser(event: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) {
	let isKey = event.type === EventType.EVENT_KEY_PRESSED || event.type === EventType.EVENT_KEY_RELEASED;
	let isMouse = event.type === EventType.EVENT_MOUSE_PRESSED || event.type === EventType.EVENT_MOUSE_RELEASED;

	if (!isKey && !isMouse) {
		return;
	}

	let isPressed: boolean;
	let keyName: string;

	if (isKey) {
		switch (event.type) {
			case EventType.EVENT_KEY_PRESSED:
				isPressed = true;
				break;
			case EventType.EVENT_MOUSE_RELEASED:
				isPressed = false;
				break;
		}
	} else if (isMouse) {
		switch (event.type) {
			case EventType.EVENT_MOUSE_PRESSED:
				isPressed = true;
				break;
			case EventType.EVENT_MOUSE_RELEASED:
				isPressed = false;
				break;
		}
	}

	if (isKey) {
		let keyboardEvent = event as UiohookKeyboardEvent;

		if (keyboardEvent.keycode in uiohookKeys) {
			keyName = uiohookKeys[keyboardEvent.keycode];
		} else {
			keyName = `unknown[${keyboardEvent.keycode}]`;
		}
	} else if (isMouse) {
		let mouseEvent = event as UiohookMouseEvent;

		keyName = `mouse${mouseEvent.button}`;
	}

	pressedKeys[keyName] = isPressed;

	return { key: keyName, pressedKeys };
}

export default function uioHookWrapper(callbackFn: (keyEvent: ioStdout) => void) {
	uIOhook.on('input', (event) => {
		let uioHookParserData = uioHookInputParser(event);
		if (uioHookParserData) {
			callbackFn(uioHookParserData);
		}
	});
	uIOhook.start();
}
