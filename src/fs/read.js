/**implement function that prints content of the fileToRead.txt into console 
 * (if there's no file fileToRead.txt Error with message FS operation failed must be thrown) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const readableStream = fs.createReadStream(
		path.join(__dirname, 'files', 'fileToRead.txt'),
		'utf8'
	);

	let data = '';
	readableStream.on('data', chunk => (data += chunk));
	readableStream.on('end', () => console.log(data));
	readableStream.on('error', () =>
		console.log(
			'Error: FS operation failed! \nPlease check if such file exist!'
		)
	);
};

await read();
