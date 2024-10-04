/*implement function that reads data from process.stdin, reverses text using Transform Stream 
and then writes it into process.stdout*/

import { Transform } from 'stream';

const reverseStream = new Transform({
	transform(chunk, _encoding, callback) {
		const reversedChunk = chunk.toString().split('').reverse().join('');
		callback(null, reversedChunk);
	},
});

const transform = async () => {
	process.stdout.write('Hello!, Enter your data:\n');
	process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
