import { stdin } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { Macro } from '../_types/Config';
import { SpeechSynthesisConfig } from '../_types/SpeechSynthesisConfig';
import anyHas from './anyHas';
import __app from './config';
import { debugLogLine } from './debugLog';
import { logLine } from './log';
import texts from './text';
import textParser from './textParser';

type Command$Name = string;
type Command$Availability = 'text' | 'speech' | 'both';
type Command$Syntax = string;
type Command$Handler = string | string[];
type Command$Description = string | null;
type Command$Func = Function;

type Macro$Handler = string;

interface Command {
	name: Command$Name;
	availability: Command$Availability;
	syntax: Command$Syntax;
	handler: Command$Handler;
	description: Command$Description;
	func: Command$Func;
	marco: boolean;
}

interface CmdParsed {
	handler: Command$Handler;
	args: any;
}

class CommandHandler {
	private commands: Command[] = [];
	private macros: Macro[] = __app.macros;
	private consoleInterface = createInterface({ input: stdin });
	private speechSynthesis: SpeechSynthesisConfig;

	get commandList() {
		return this.commands;
	}
	get macroList() {
		return this.macros;
	}

	init(speechSynthesis: SpeechSynthesisConfig) {
		this.speechSynthesis = speechSynthesis;

		this.initCommands();
		this.initTextCommandHandler();
	}

	private initCommands() {
		// both
		import('./commands/common/commandList.js');
		import('./commands/common/abcTest.js');
		import('./commands/common/activeWindow.js');
		import('./commands/common/delete.js');
		import('./commands/common/exit.js');
		import('./commands/common/exitMta.js');
		import('./commands/common/mtaMode.js');
		import('./commands/common/showActiveButtons.js');
		import('./commands/common/updateApp.js');

		// text only
		// import('./commands/text/settings.js'); // idg disabled

		// speech only
	}

	registerCommand(func: Command$Func, [availability, name, syntax, handler, description]: [Command$Availability, Command$Name, Command$Syntax, Command$Handler, Command$Description]) {
		this.commands.push({
			availability,
			name,
			syntax,
			handler,
			description,
			func,
			marco: false,
		});
	}

	private async callMacro(handler: Macro$Handler, outputLocation: 'return' | 'write') {
		let filteredMacros = this.macros.filter((macro) => macro.handler === handler);

		if (filteredMacros.length > 0) {
			let macro = filteredMacros[0];

			if (outputLocation === 'return') {
				return macro.text;
			}

			if (__app.config.others.mtaConsoleInputMode) {
				return await textParser(`{f8}${macro.text}{enter}{f8}`);
			}

			return await textParser(macro.text);
		}

		this.speechSynthesis(texts().speechFeedback.commandHandler.unknownMacro);
		logLine(texts().textFeedback.commandHandler.unknownMacro);
	}

	private async callCommand(command: string, availability: Command$Availability, ...args: any[]) {
		if (!__app.config.commands.enabled) {
			return;
		}

		let commandArray = command.slice(1).replace(/\s+/g, '').split(__app.config.commands.splitter);
		let cmd: CmdParsed = {
			handler: commandArray[0],
			args: commandArray.slice(1),
		};

		debugLogLine('cmd:', cmd);

		if (typeof command === 'string' && anyHas(cmd.handler, ['makró', 'makrók', 'szöveg', 'szövegek'])) {
			return await this.callMacro(cmd.args[0], args.length ? args[0] : 'write');
		}

		let filteredCommands = this.commands.filter((_command) => (typeof _command.handler === 'object' ? anyHas(_command.handler, cmd.handler) : _command.handler === cmd.handler));

		if (filteredCommands.length > 0) {
			let command = filteredCommands[0];

			if (command.availability !== 'both') {
				if (command.availability !== availability) {
					return;
				}

				return await command.func(this.speechSynthesis, ...args, ...cmd.args);
			}

			return await command.func(this.speechSynthesis, ...args, ...cmd.args);
		}

		this.speechSynthesis(texts().speechFeedback.commandHandler.unknownCommand);
		logLine(texts().textFeedback.commandHandler.unknownCommand);
	}

	private initTextCommandHandler() {
		this.consoleInterface.on('line', async (command) => {
			if (!command || command == undefined || command == null || command == '') {
				return;
			}
			if (!command.startsWith(__app.config.commands.prefix)) {
				return;
			}

			await await this.callCommand(command, 'text');
		});
	}

	async voiceCommandHandler(command: string, ...args: any[]) {
		if (!command || command == undefined || command == null || command == '') {
			return;
		}
		if (!command.startsWith(__app.config.commands.prefix)) {
			return;
		}

		return await this.callCommand(command, 'speech', ...args);
	}

	async useCommand(command: string, ...args: any[]) {
		return await this.callCommand(command, 'both', ...args);
	}
}

let cmd = new CommandHandler();

export default cmd;
