import { writeFile } from 'node:fs/promises';

import { SpeechSynthesisConfig } from '../../../_types/SpeechSynthesisConfig';
import cmd from '../../commandHandler';
import __app from '../../config';
import { debugLog, debugLogLine } from '../../debugLog';
import { logLine } from '../../log';

// function textTreePath(lang: any, textPath: string[]) {
// 	if (textPath.length == 1) {
// 		return lang[textPath.pop()];
// 	}
// 	return textTreePath(lang[textPath.pop()], textPath);
// }

function getSettingValueType(value: string) {
	if (value === 'true' || value === 'false') {
		return 'boolean';
	} else if (Number.isInteger(parseInt(value))) {
		return 'number';
	} else if (value.startsWith('[') && value.endsWith(']')) {
		return 'array';
	} else if (value.startsWith('"[') && value.endsWith(']"')) {
		return 'array';
	} else if (value.startsWith('{') && value.endsWith('}')) {
		return 'object';
	} else if (value.startsWith('"{') && value.endsWith('}"')) {
		return 'object';
	} else {
		return 'string';
	}
}

function parseSettingValue(value: any) {
	let typeOfValue = getSettingValueType(value);

	if (typeOfValue === 'boolean') {
		return value === 'true';
	} else if (typeOfValue === 'number') {
		return parseInt(value);
	} else if (typeOfValue === 'array') {
		return JSON.parse(value);
	} else if (typeOfValue === 'object') {
		return JSON.parse(value);
	} else if (typeOfValue === 'string') {
		return value;
	}
}

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig, settingName: string, settingValue: string) => {
		try {
			if (!(settingName in __app.config)) {
				logLine(`Setting by name '${settingName}' does not exists!`);
				speechSynthesis(`Setting by name '${settingName}' does not exists!`);
				return;
			}

			let settingOriginalValue = JSON.stringify(__app.config[settingName]);
			let settingNewValue = settingValue;

			let parsedSettingOriginalValue = parseSettingValue(settingOriginalValue);
			let parsedSettingOriginalValueType = getSettingValueType(settingOriginalValue);

			let parsedSettingNewValue = parseSettingValue(settingNewValue);
			let parsedSettingNewValueType = getSettingValueType(settingNewValue);

			debugLog('settingOriginalValue:', settingOriginalValue);
			debugLog('parsedSettingOriginalValue:', parsedSettingOriginalValue);
			debugLog('parsedSettingOriginalValueType:', parsedSettingOriginalValueType);
			debugLogLine('settingNewValue:', settingNewValue);
			debugLog('parsedSettingNewValue:', parsedSettingNewValue);
			debugLog('parsedSettingNewValueType:', parsedSettingNewValueType);

			if (parsedSettingOriginalValueType !== parsedSettingNewValueType) {
				logLine('New setting value', parsedSettingNewValue, 'does not match original type', parsedSettingOriginalValueType);
				speechSynthesis(`New setting value ${parsedSettingNewValue} does not match original type ${parsedSettingOriginalValueType}`);
				return;
			}

			__app.config[settingName] = parsedSettingNewValue;

			await writeFile('config.json', JSON.stringify(__app.config, null, 2), { encoding: 'utf8' });

			logLine(`Setting value of '${settingName}' was changed from`, parsedSettingOriginalValue, 'to', __app.config[settingName]);
			speechSynthesis(`Setting value of '${settingName}' was changed from ${parsedSettingOriginalValue} to ${__app.config[settingName]}`);
		} catch (error) {
			logLine(error);
		}
	},
	['text', 'Beállítások', '!settings:<beállítás neve>:<érték>', 'settings', 'Beállítások megváltoztatása az alkalmazáson belül'],
);
