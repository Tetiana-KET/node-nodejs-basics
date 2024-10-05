/**
 * implement function that creates number of worker threads (equal to the number of host machine logical CPU cores)
 *  from file worker.js and able to send data to those threads and to receive result of the computation from them.
 * You should send incremental number starting from 10 to each worker.
 * For example: on host machine with 4 cores you should create 4 workers and send 10 to first worker,
 * 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish,
 * function should log array of results into console.
 * The results are array of objects with 2 properties:
 * status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
 * data - value from worker in case of success or null in case of error in worker
 * The results in the array must be in the same order that the workers were created
 */

import { Worker, isMainThread } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const performCalculations = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const workerFile = path.join(__dirname, 'worker.js');

	if (isMainThread) {
		const CPUCoresNum = os.cpus().length;
		const results = new Array(CPUCoresNum);

		let completed = 0;

		function createWorker(index, incrementalNumber) {
			const worker = new Worker(workerFile, {
				workerData: incrementalNumber,
			});

			worker.on('message', message => {
				results[index] = message;
				completed++;

				if (completed === CPUCoresNum) {
					console.log('Results from workers:', results);
				}
			});
		}

		for (let i = 0; i < CPUCoresNum; i++) {
			createWorker(i, 10 + i);
			// Comment function call at line 48 and Uncomment line 50 to simulate an Error
			// createWorker(i, i % 2 === 0 ? -1 : 10 + i);
		}
	}
};

await performCalculations();
