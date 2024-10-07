/*implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream */
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';

const write = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const fileToWrite = path.join(__dirname, 'files', 'fileToWrite.txt');

	process.stdout.write('Hello!, Enter your data:\n');

	try {
		const writableStream = fs.createWriteStream(fileToWrite, {
			flags: 'a',
			encoding: 'utf8',
		});
		process.stdin.pipe(writableStream);

		writableStream.on('error', err => {
			console.error('Stream error:', err.message);
		});

		process.on('SIGINT', () => {
			console.log('\nYour input was written to the fileToWrite.');
			process.stdin.unpipe(writableStream);
			writableStream.end();
		});
	} catch (err) {
		console.log(err);
	}
};

await write();
