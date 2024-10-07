/**
 *  implement function that copies folder files files with all its content into folder files_copy
 * at the same level (if files folder doesn't exists or files_copy has already been created Error
 * with message FS operation failed must be thrown)
 */
import fs from 'fs';
import path from 'path';
import { getFileAndDirName } from '../utils/getFileAndDirName.js';
import { FSOperationError } from '../CustomError/FSOperationError.js';

const copy = async () => {
	const { __dirname } = getFileAndDirName(import.meta.url);

	const srcFolder = path.join(__dirname, 'files');
	const destFolder = path.join(__dirname, 'files_copy');

	const doesDestExist = await fs.promises.stat(destFolder).catch(() => false);

	if (doesDestExist) {
		throw new FSOperationError();
	}

	await fs.promises.mkdir(destFolder);

	try {
		await fs.promises.cp(srcFolder, destFolder, { recursive: true });
		console.log('directory copied');
	} catch (err) {
		throw new FSOperationError();
	}
};

await copy();
