import http from 'http';
import config from '../config.js';

http.get(`http://api.weatherstack.com/current?access_key=${config.weatherStackToken}&query=London`, (response) => {
	const data = [];

	response.on('data', (chunk) => {
		data.push(chunk.toString());
	});

	response.on('end', () => {
		console.log(JSON.parse(data.join('')));
	});
}).end();