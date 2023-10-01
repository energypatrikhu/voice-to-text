import { spawn } from 'node:child_process';

export default function updaterWrapper(cb: (...args: any[]) => void, args: any[]) {
	let updaterProcess = spawn('voice-updater.exe', args);

	updaterProcess.stdout.setEncoding('utf8');
	updaterProcess.stdout.on('data', (...data) => cb(updaterProcess, ...data));
}
