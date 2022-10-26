import Logger from './utils/logger.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import hbs from 'hbs';
import { fetchWeatherInfoByLocation } from './utils/weather.js';
import { fetchLocation } from './utils/geocode.js'; 

const logger = new Logger('Weather app').init();

// async function getWeatherData() {
// 	try {
// 		// input your address via command line
// 		const address = process.argv[2];  ь

// 		if (!address) {
// 			throw new Error('Any address wass provided, Please provide an address');
// 		}

// 		const coordinates = await fetchLocation('Minsk');
// 		const data = await fetchWeatherInfoByLocation(coordinates);
// 		console.log(data);
// 	} catch(e) {
// 		logger.error(`Get weather data Error: ${e.message}`);
// 	}
// }

// getWeatherData();

const app = express();

// Way to get __filename, __diranme varibales by using module structure
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating paths to related folder with static/dinamic files
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set view engine to hbs type instead of html for dynamic rendering
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
		res.render('index', {
				title: 'Weather app',
				name: 'Eugene Shnyrkevich'
		});
});

app.get('/about', (req, res) => {
		res.render('about', {
				title: 'About Me',
				name: 'Eugene Shnyrkevich'
		});
});

app.get('/help', (req, res) => {
		res.render('help', {
				title: 'About page',
				helpText: 'I want to share with you a link',
				link: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/'
		});
});

app.get('/weather', (req, res) => {
		res.send({
				title: 'Weather by location',
				forecast: 'It is snowing',
				location: 'Philadelphia'
		});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Errored request',
		code: 404,
		message: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Errored request',
		code: 404,
		message: 'This page doesn\'t exist'
	})
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});