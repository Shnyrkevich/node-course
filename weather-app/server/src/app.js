import Logger from './utils/logger.js';
import { fetchWeatherInfoByLocation } from './utils/weather.js';
import { fetchLocation } from './utils/geocode.js'; 

const logger = new Logger('Weather app').init();

async function getWeatherData() {
	try {
		// input your address via command line
		const address = process.argv[2];

		if (!address) {
			throw new Error('Any address wass provided, Please provide an address');
		}

		const coordinates = await fetchLocation('Minsk');
		const data = await fetchWeatherInfoByLocation(coordinates);
		console.log(data);
	} catch(e) {
		logger.error(`Get weather data Error: ${e.message}`);
	}
}

getWeatherData();