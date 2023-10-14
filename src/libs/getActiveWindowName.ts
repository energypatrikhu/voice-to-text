import activeWindow from 'active-win';
import { basename } from 'path';

import { debugLogLine } from './debugLog';

export default async function getActiveWindowName() {
	const result = await activeWindow();

	if (!result) {
		return '';
	}

	debugLogLine({ result });

	return basename(result.owner.path);
}
