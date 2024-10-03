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
