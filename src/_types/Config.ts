export interface Macro {
	handler: string;
	text: string;
}

export interface KeyboardShortcut {
	outputPrefix: string | null;
	shortcut: string[];
}

// export interface Config {
// 	debugLogs: boolean;
// 	enableSounds: boolean;
// 	customChromeLocation: string | null;
// 	speechRecognitionLanguge: string;
// 	speechFeedbackLanguge: string;
// 	useSpeechFeedback: boolean;
// 	speechFeedbackVolume: number;
// 	partialOutput: boolean;
// 	autoReleaseTime: number;
// 	autoRelease: boolean;
// 	useCommands: boolean;
// 	useReplacers: boolean;
// 	useGameChatPrefixReplacers: boolean;
// 	animatedOutput: boolean;
// 	typingDelay: number;
// 	keyboardShortcuts: KeyboardShortcut[];
// 	windowAllowList: string[];
// 	enableWindowAllowList: boolean;
// 	mtaConsoleInputMode: boolean;
// 	showActiveButtons: boolean;
// 	macros: Macro[];
// }

export interface Config {
	logs: {
		debug: boolean;
		saveToFile: boolean;
	};
	input: {
		holdToActivate: boolean;
		keyboardShortcuts: KeyboardShortcut[];
		autoRelease: {
			enabled: boolean;
			releaseTime: number;
		};
	};
	output: {
		partial: boolean;
		animated: boolean;
		typingDelay: number;
	};
	chromeInstallLocation: string | null;
	enableSounds: boolean;
	feedback: {
		speech: {
			enabled: boolean;
			volume: number;
		};
		language: 'hu' | 'en';
	};
	speechRecognition: {
		language: 'hu-HU' | 'en-US' | 'en-GB';
	};
	replacers: {
		punctuationMarks: boolean;
		gameChatPrefixes: boolean;
	};
	windowAllowList: {
		enabled: boolean;
		windows: string[];
	};
	commands: {
		enabled: boolean;
		prefix: string;
		splitter: string;
	};
	updater: {
		checkOnStartup: boolean;
		autoCheck: boolean;
		checkInterval: number;
	};
	others: {
		mtaConsoleInputMode: boolean;
		showActiveButtons: boolean;
	};
}
