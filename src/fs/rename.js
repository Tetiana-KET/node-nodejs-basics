/*rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md 
(if there's no file wrongFilename.txt or properFilename.md already exists,
Error with message FS operation failed must be thrown)*/
import fs from 'fs';
import path from 'path';

import { getFileAndDirName } from '../utils/getFileAndDirName.js';

const rename = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const wrongFilename = path.join(__dirname, 'files', 'wrongFilename.txt');
	const properFilename = path.join(__dirname, 'files', 'properFilename.md');

	try {
		await fs.promises.access(wrongFilename);
		try {
			await fs.promises.access(properFilename);
			throw new Error(`FS operation failed.  🐈  File ALREADY exist!`);
		} catch (err) {
			if (err.code !== 'ENOENT') {
				throw err;
			}
		}

		await fs.promises.rename(wrongFilename, properFilename);
		console.log(`file wrongFilename.txt was renamed to properFilename.md  👏`);
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`FS operation failed.  🕵️  File does not exist!`);
		}
	}
};

await rename();
