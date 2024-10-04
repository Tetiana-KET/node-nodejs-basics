/*implement function that parses command line arguments 
(given in format --propName value --prop2Name value2, you don't need to validate it)
 and prints them to the console in the format propName is value, prop2Name is value2*/
const parseArgs = () => {
	const CL_arguments = process.argv.slice(2);
	const result = [];
	for (let i = 0; i < CL_arguments.length; i += 2) {
		const key = CL_arguments[i].replace('--', '');
		const value = CL_arguments[i + 1];
		result.push(`${key} is ${value}`);
	}
	console.log(result.join(', '));
};

parseArgs();
