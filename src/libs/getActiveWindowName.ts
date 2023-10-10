import activeWindow from 'active-win';

export default async function getActiveWindowName() {
	const result = await activeWindow();

	if (!result) {
		return '';
	}

	return result.title;
}
