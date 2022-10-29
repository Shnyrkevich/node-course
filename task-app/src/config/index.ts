const getEnvVar = (key: string, defaultValue?: any) => {
	const value = process.env[key];
	if (!value && !defaultValue) {
		throw new Error(`Env variable ${key} is missing`);
	}
	return value || defaultValue;
};

export default {
	mongoUrl: getEnvVar('MONGODB_URL'),

	port: getEnvVar('PORT', 3000),
};
