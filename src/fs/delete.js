/*implement function that deletes file fileToRemove.txt 
(if there's no file fileToRemove.txt Error with message FS operation failed must be thrown)*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const remove = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const fileToDelete = path.join(__dirname, 'files', 'fileToRemove.txt');

	try {
		await fs.promises.access(fileToDelete);
		fs.promises.unlink(fileToDelete);
		console.log(`fileToRemove.txt was successfully removed! 👏`);
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`FS operation failed.  🕵️  File does not exist!`);
		}
	}
};

await remove();
