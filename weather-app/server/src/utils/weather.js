import fetch from 'node-fetch';
import config from '../config.js';
import Logger from './logger.js';

const logger = new Logger('weather api').init();

export async function fetchWeatherInfoByLocation(location, metrics = 'm') {
	if(!location && !Array.isArray(location)) {
		throw new Error('Location isn\'t provided, or it\'s not an array of longtitude, lattitude');
	}
	
	const placeCoordinates = location.join(',');
	const response = await fetch(`http://api.weatherstack.com/current?access_key=${config.weatherStackToken}&query=${placeCoordinates}&units=${metrics}`);
	const data = await response.json();

	const { current: { temperature, feelslike, weather_descriptions } } = data;
	logger.info(`${weather_descriptions}. The tempreature is ${temperature}, feels like ${feelslike}`);

	return {
		description: weather_descriptions,
		temperature,
		feelslike
	};
}