const getEnvVar = (key, defaultValue) => {
	const value = process.env[key];
	if (!value && !defaultValue) {
		throw new Error(`Env variable ${key} is missing`);
	}
	return value || defaultValue;
};

export default {
	weatherStackToken: getEnvVar('WEATHERSTACK_TOKEN'),
	
	geolocationToken: getEnvVar('GEOLOCATION_TOKEN'),

	port: getEnvVar('PORT', 3000),

	apiUrl: getEnvVar('API_URL')
};
