import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { Config, Macro } from '../_types/Config';
import getCurrentTime from './getCurrentTime';

// import { log as nodeLog } from 'node:console';
// import text from './text';

let __startupTime = getCurrentTime();
let _configError = false;

// function localLog(...message: any) {
// 	nodeLog(...message);
// }
// function localLogLine(...message: any) {
// 	localLog('');
// 	localLog(...message);
// }
// function localDebugLog(...message: any) {
// 	if (!config.logs.debug) return;
// 	nodeLog(...message);
// }
// function localDebugLogLine(...message: any) {
// 	if (!config.logs.debug) return;
// 	localDebugLog('');
// 	localDebugLog(...message);
// }

let configDefault: Config = {
	logs: {
		debug: true,
		saveToFile: true,
	},
	input: {
		holdToActivate: true,
		keyboardShortcuts: [
			{
				outputPrefix: null,
				shortcut: ['win', 'h'],
			},
		],
		autoRelease: {
			enabled: false,
			releaseTime: 60,
		},
	},
	output: {
		partial: false,
		animated: false,
		typingDelay: 50,
	},
	chromeInstallLocation: null,
	enableSounds: true,
	feedback: {
		speech: {
			enabled: true,
			volume: 0.5,
		},
		language: 'en',
	},
	speechRecognition: {
		language: 'hu-HU',
	},
	replacers: {
		punctuationMarks: true,
		gameChatPrefixes: false,
	},
	windowAllowList: {
		enabled: false,
		windows: [],
	},
	commands: {
		enabled: true,
		prefix: '!',
		splitter: ':',
	},
	updater: {
		checkOnStartup: true,
		autoCheck: true,
		checkInterval: 5 * 60,
	},
	others: {
		mtaConsoleInputMode: false,
		showActiveButtons: false,
	},
};
let config: Config = existsSync('config.json') ? JSON.parse(readFileSync('config.json', { encoding: 'utf8' })) : {};
let macros: Macro[] = existsSync('macros.json') ? JSON.parse(readFileSync('macros.json', { encoding: 'utf8' })) : [];

if (!existsSync('macros.json')) {
	// localLog(text().textFeedback.config.macro.notExists);

	writeFileSync(
		'macros.json',
		JSON.stringify(
			[
				{
					handler: 'teszt',
					text: "Ez egy teszt makró, mely kiírja a 'szépnapot' makrót: {!makró:szépnapot}",
				},
				{
					handler: 'szépnapot',
					text: 'Szép napot kívánok, hogy tetszik lenni?',
				},
			],
			null,
			2,
		),
		{ encoding: 'utf8' },
	);
}

function patchConfig(newConfig: { [x: string]: any }, oldConfig: { [x: string]: any }, defaultConfig: object) {
	for (let [key, value] of Object.entries(defaultConfig)) {
		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(newConfig, { [key]: patchConfig({}, oldConfig[key] ?? {}, value) });
		} else if (!(key in oldConfig)) {
			newConfig[key] = value;
		} else {
			newConfig[key] = oldConfig[key];
		}
	}

	return newConfig;
}

if (JSON.stringify(Object.keys(configDefault).sort()) !== JSON.stringify(Object.keys(config).sort())) {
	if (existsSync('config.json')) {
		// localLogLine(text().textFeedback.config.config.broken);
		config = patchConfig({}, config, configDefault) as Config;
	} else {
		// localLogLine(text().textFeedback.config.config.notExists);
		config = configDefault;
	}

	writeFileSync('config.json', JSON.stringify(config, null, 2), { encoding: 'utf8' });
}

// localDebugLog(text().textFeedback.config.config.wrapper);
// for (let [confName, confValue] of Object.entries(config)) {
// 	localDebugLog(` ${confName}:`, (confName.toLowerCase().endsWith('shortcut') ? confValue.join(' + ') : confValue) ?? '<empty>');
// }
// localDebugLog(text().textFeedback.config.config.wrapper);

// localDebugLogLine(text().textFeedback.config.config.loaded);

if (config.input.holdToActivate && config.output.partial) {
	_configError = true;
	// localLogLine(text().textFeedback.config.config.error.partialHoldToActivate);
}

if (config.output.partial && config.replacers.punctuationMarks) {
	_configError = true;
	// localLogLine(text().textFeedback.config.config.error.punctuationMarksPartial);
}

if (config.output.partial && config.replacers.gameChatPrefixes) {
	_configError = true;
	// localLogLine(text().textFeedback.config.config.error.gameChatPrefixesPartial);
}

if (config.output.partial && config.commands.enabled) {
	_configError = true;
	// localLogLine(text().textFeedback.config.config.error.commandsPartial);
}

while (_configError) {}

let __app = {
	version: '',
	url: '',
	urlPath: '',
	config,
	macros,
	startupDate: __startupTime,
};

export default __app;
