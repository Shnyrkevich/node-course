import axios from 'axios';
import config from '../config.js';
import Logger from './logger.js';

const logger = new Logger('weather api').init();

export async function fetchWeatherInfoByLocation(location, metrics = 'm') {
	if(!location && !Array.isArray(location)) {
		throw new Error('Location isn\'t provided, or it\'s not an array of longtitude, lattitude');
	}
	
	const placeCoordinates = location.join(',');
	const { data } = await axios.get(`http://api.weatherstack.com/current?access_key=${config.weatherStackToken}&query=${placeCoordinates}&units=${metrics}`);

	if (!data.success && data.error) {
		throw new Error(`Error with code ${data.error.code}, ${data.error.info}`);
	}

	const {
		current:{
			temperature,
			feelslike,
			weather_descriptions,
			weather_code,
			humidity,
			wind_speed,
			is_day
		},
		location: {
			country,
			region,
			name
		}
	} = data;
	logger.info(`Successfully got weather data`);

	return {
		description: weather_descriptions,
		temperature,
		feelslike,
		weather_code,
		humidity,
		wind_speed,
		country,
		region,
		name,
		is_day
	};
}