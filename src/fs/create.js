/* implement function that creates new file fresh.txt with content I am fresh and young inside of 
the files folder (if file already exists Error with message FS operation failed must be thrown)*/
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';

const create = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const file = path.join(__dirname, 'files', 'fresh.txt');

	try {
		await fs.promises.access(file);
		throw new Error('FS operation failed.  🎃  The file already exists');
	} catch (err) {
		if (err.code === 'ENOENT') {
			await fs.promises.writeFile(file, 'I am fresh and young');
			console.log('file fresh.txt has been created');
		} else {
			throw err;
		}
	}
};

await create();
