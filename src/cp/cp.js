/*
 cp.js - implement function spawnChildProcess that receives array of arguments args and 
 creates child process from file script.js, passing these args to it. 
 This function should create IPC-channel between stdin and stdout of master process and child process:
 child process stdin should receive input from master process stdin
 child process stdout should send data to master process stdout
*/
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const spawnChildProcess = async args => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const childProcessFile = path.join(__dirname, 'files', 'script.js');
	// comment the line above and uncomment next line to test error handling
	// const childProcessFile = path.join(__dirname, 'files', 'notExist.js');

	const childProcess = spawn('node', [childProcessFile, ...args], {
		stdio: ['pipe', 'pipe', 'inherit'],
	});

	process.stdin.pipe(childProcess.stdin);
	childProcess.stdout.pipe(process.stdout);

	childProcess.on('exit', code => {
		if (code === 0) {
			console.log(`Child process exited successfully!`);
		} else {
			console.error(`Child process exited with code ${code}`);
		}
	});

	childProcess.on('error', error => {
		console.error(`Error occurred in child process: ${error.message}`);
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
