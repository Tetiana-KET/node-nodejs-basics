/**implement function that prints all array of filenames from files folder into console 
(if files folder doesn't exists Error with message FS operation failed must be thrown) */
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';

const list = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);
	const filesFolder = path.join(__dirname, 'files');

	try {
		await fs.promises.access(filesFolder);
		const files = await fs.promises.readdir(filesFolder);
		console.log(files);
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`FS operation failed.  🕵️  File does not exist!`);
		}
	}
};

await list();
