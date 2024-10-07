/*
calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt 
and logs it into console as hex using Streams API*/
import fs from 'fs';
import { createHash } from 'node:crypto';
import path from 'path';

const calculateHash = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const fileToCalculateHashFor = path.join(
		__dirname,
		'files',
		'fileToCalculateHashFor.txt'
	);

	const hash = createHash('sha256');
	const readStream = fs.createReadStream(fileToCalculateHashFor);

	readStream.on('data', chunk => {
		hash.update(chunk);
	});
	readStream.on('end', () => {
		console.log(hash.digest('hex'));
	});
	readStream.on('error', err => {
		throw new Error(err.message);
	});
};

await calculateHash();
