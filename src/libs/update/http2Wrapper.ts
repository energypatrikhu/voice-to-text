import http2, { ClientHttp2Stream, constants } from 'node:http2';

import __app from '../config';

export default function http2Wrapper(path: string, type: 'text' | 'stream') {
	return new Promise<string | ClientHttp2Stream>((resolve) => {
		let http2Client = http2.connect(__app.url);
		let http2ClientRequest = http2Client.request({ [constants.HTTP2_HEADER_PATH]: path });

		if (type === 'text') {
			http2ClientRequest.setEncoding('utf8');
			http2ClientRequest.on('data', (data) => {
				resolve(data.slice(1, -1));
			});
			return;
		}

		resolve(http2ClientRequest);
	});
}
