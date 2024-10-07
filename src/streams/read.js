// /*read.js - implement function that reads file fileToRead.txt content using Readable Stream
// and prints it's content into process.stdout*/
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';

const read = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');
	const readableStream = fs.createReadStream(fileToRead);

	readableStream.pipe(process.stdout);

	readableStream.on('error', error => console.error('Error', error.message));

	readableStream.on('end', () =>
		console.log('\nFile was read successfully! 👏')
	);
};

await read();
