/* implement function that creates new file fresh.txt with content I am fresh and young inside of 
the files folder (if file already exists Error with message FS operation failed must be thrown)*/
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';
import { FSOperationError } from '../CustomError/FSOperationError.js';

const create = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const pathToNewFile = path.join(__dirname, 'files', 'fresh.txt');

	try {
		await fs.promises.access(pathToNewFile);
		throw new FSOperationError();
	} catch (err) {
		if (err.code === 'ENOENT') {
			await fs.promises.writeFile(pathToNewFile, 'I am fresh and young');
			console.log('file fresh.txt has been created');
		} else {
			throw err;
		}
	}
};

await create();
