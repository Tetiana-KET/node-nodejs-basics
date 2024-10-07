/**
 * extend given function to work with data received from main thread
 * and implement function which sends result of the computation to the main thread
 * status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
 * data - value from worker in case of success or null in case of error in worker
 */

import { parentPort, workerData } from 'worker_threads';
// n should be received from main thread
const nthFibonacci = n => {
	if (n < 0)
		throw new Error(
			'Invalid input: Fibonacci is not defined for negative numbers'
		);
	return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const sendResult = () => {
	try {
		const result = nthFibonacci(workerData);

		parentPort.postMessage({
			status: 'resolved',
			data: result,
		});
	} catch (error) {
		parentPort.postMessage({
			status: 'error',
			data: null,
		});
	}

	parentPort.on('error', () => {
		parentPort.postMessage({
			status: 'error',
			data: null,
		});
	});
};

sendResult();
