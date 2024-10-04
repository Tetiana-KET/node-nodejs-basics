/*implement function that parses environment variables with prefix RSS_ and prints them to the console 
in the format RSS_name1=value1; RSS_name2=value2*/

const parseEnv = () => {
	const envVariables = process.env;
	const RSS_variables = Object.entries(envVariables)
		.filter(([key]) => {
			return key.startsWith('RSS_');
		})
		.map(([key, value]) => {
			return `${key}=${value}`;
		})
		.join('; ');
	console.log(RSS_variables);
};

parseEnv();
