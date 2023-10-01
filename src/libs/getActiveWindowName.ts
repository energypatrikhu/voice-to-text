import activeWindow from 'active-win';

export default async function getActiveWindowName() {
	return (await activeWindow()).owner.name.toLowerCase().replace(/\s+/, '');
}
