import fetch from 'node-fetch';
import config from './config.js';
import Logger from './logger.js';

const logger = new Logger('Weather app').init();

async function fetchWeatherInfoByLocation(city = 'Minsk', metrics = 'm') {
	try {
		const response = await fetch(`http://api.weatherstack.com/current?access_key=${config.weatherStackToken}&query=${city}$units=${metrics}`);
		const data = await response.json();
		const { current: { temperature, feelslike, weather_descriptions } } = data;
		logger.info(`${weather_descriptions}. The tempreature is ${temperature}, feels like ${feelslike}`);
	} catch(err) {
		logger.error(JSON.stringify(e));
	}
}

async function fetchLocation(city = 'Minsk') {
	try {
		const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${config.geolocationToken}&limit=1`);
		const data = await response.json();
		console.log(JSON.stringify(data, null, 2));
		const [info] = data.features;
		logger.info(`Lat: ${info.center[1]}, long: ${info.center[0]}`);
	} catch(e) {
		console.log(e);
	}
}

async function main() {
	await fetchWeatherInfoByLocation();
	await fetchLocation();
}

main();