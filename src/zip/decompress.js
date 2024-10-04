/*
 * implement function that decompresses archive.gz back to the fileToCompress.txt
 * with same content as before compression using zlib and Streams API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { pipeline } from 'node:stream';

const decompress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const fileToDecompress = path.join(__dirname, 'files', 'archive.gz');
	const decompressedFile = path.join(__dirname, 'files', 'fileToCompress.txt');

	try {
		await fs.promises.access(fileToDecompress);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.error(`File does not exist! 🕵️ `);
		}
	}

	try {
		const readableStream = fs.createReadStream(fileToDecompress);
		const writableStream = fs.createWriteStream(decompressedFile);
		const gunzip = zlib.createGunzip();

		readableStream.on('error', err => {
			console.error('Error in readable stream:', err);
		});

		pipeline(readableStream, gunzip, writableStream, err => {
			if (err) {
				console.error('An error occurred during decompression:', err);
				process.exitCode = 1;
			} else {
				console.log(
					'The file was successfully decompressed back to fileToCompress.txt  👏'
				);
				fs.promises.unlink(fileToDecompress);
			}
		});
	} catch (err) {
		console.error('An unexpected error occurred:', err);
	}
};

await decompress();
