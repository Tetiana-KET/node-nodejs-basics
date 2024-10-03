/**
 *  implement function that copies folder files files with all its content into folder files_copy 
 * at the same level (if files folder doesn't exists or files_copy has already been created Error 
 * with message FS operation failed must be thrown)
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const srcFolder = path.join(__dirname, 'files');
    const destFolder = path.join(__dirname, 'files_copy');

    const doesSrcExist = await fs.promises.stat(srcFolder)
        .catch(() => false);
    const doesDestExist = await fs.promises.stat(destFolder)
        .catch(() => false);
    
    if (!doesSrcExist) {
        throw new Error('FS operation failed. The folder does not exist!');
    }

    if (doesDestExist) {
        throw new Error('FS operation failed. The folder ALREADY exist!');
    }

    await fs.promises.mkdir(destFolder);
    
    try {
        await fs.promises.cp(srcFolder, destFolder, { recursive: true });
        console.log('directory copied');
    } catch (err) {
        console.log(err);
    }

};

await copy();
