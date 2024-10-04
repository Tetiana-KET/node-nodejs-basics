/*
calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt 
and logs it into console as hex using Streams API*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'node:crypto';

const calculateHash = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const fileToCalculateHashFor = path.join(
		__dirname,
		'files',
		'fileToCalculateHashFor.txt'
	);

	const hash = createHash('sha256');
	const readStream = fs.createReadStream(fileToCalculateHashFor);
	try {
		await fs.promises.access(fileToCalculateHashFor);

		readStream.on('data', chunk => {
			hash.update(chunk);
		});
		readStream.on('end', () => {
			console.log(hash.digest('hex'));
		});
		readStream.on('error', err => {
			console.error('Error reading file:', err);
		});
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`FS operation failed.  🕵️  File does not exist!`);
		}
	}
};

await calculateHash();
