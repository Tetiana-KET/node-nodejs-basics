/**
 *  implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { pipeline } from 'node:stream';

const compress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
	const compressedFile = path.join(__dirname, 'files', 'archive.gz');

	try {
		await fs.promises.access(fileToCompress);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.error(`File does not exist! 🕵️ `);
		}
	}

	try {
		const readableStream = fs.createReadStream(fileToCompress);
		const writableStream = fs.createWriteStream(compressedFile);
		const gzip = zlib.createGzip();

		pipeline(readableStream, gzip, writableStream, err => {
			if (err) {
				console.error('An error occurred:', err);
				process.exitCode = 1;
			} else {
				console.log('File successfully compressed to archive.gz  👏');
				fs.promises.unlink(fileToCompress);
			}
		});
	} catch (err) {
		console.error('An unexpected error occurred:', err);
	}
};

await compress();
