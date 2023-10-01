import cmd from '../../commandHandler';
import { log, logLine } from '../../log';
import texts from '../../text';

cmd.registerCommand(() => {
	let availabilityMap = {
		both: texts().textFeedback.commands.commandList.availabilityMap.both,
		text: texts().textFeedback.commands.commandList.availabilityMap.text,
		speech: texts().textFeedback.commands.commandList.availabilityMap.speech,
	};

	logLine(texts().textFeedback.commands.commandList.list.wrapper);

	for (let [index, { name, syntax, availability, description }] of cmd.commandList.entries()) {
		log(texts().textFeedback.commands.commandList.list.name, name);
		log(texts().textFeedback.commands.commandList.list.availability, availabilityMap[availability]);
		log(texts().textFeedback.commands.commandList.list.syntax, syntax);
		log(texts().textFeedback.commands.commandList.list.description, description);
		if (index < cmd.commandList.length - 1) {
			log('');
		}
	}

	log(texts().textFeedback.commands.commandList.list.wrapper);
}, ['both', 'Parancsok', '!parancsok', 'parancsok', texts().textFeedback.commands.commandList.description]);
