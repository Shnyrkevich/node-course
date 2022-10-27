import axios from 'axios';
import config from '../config.js';
import Logger from './logger.js';

const logger = new Logger('geolocation api').init();

export async function fetchLocation(city) {
		if (!city) {
			throw new Error('Required propery city isn\'t provided');
		}
		const encodedCity = encodeURIComponent(city);
		const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedCity}.json?access_token=${config.geolocationToken}&limit=1`);
		
		if (!data.features.length) {
			throw new Error(`Unable to find location for request: ${city}, try another search`)
		}

		const [info] = data.features;
		const [longtitude, lattitude] = info.center;
		logger.info(`Lat: ${lattitude}, long: ${longtitude}`);

		return [lattitude, longtitude];
}