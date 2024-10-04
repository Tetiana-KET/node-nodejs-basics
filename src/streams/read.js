// /*read.js - implement function that reads file fileToRead.txt content using Readable Stream
// and prints it's content into process.stdout*/
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');
	const readableStream = fs.createReadStream(fileToRead);

	readableStream.on('data', chunk => process.stdout.write(chunk));

	readableStream.on('error', error => console.log('Error', error.message));

	readableStream.on('end', () =>
		console.log('\nFile was read successfully! 👏')
	);
};

await read();
