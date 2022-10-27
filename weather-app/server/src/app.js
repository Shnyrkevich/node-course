import Logger from './utils/logger.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import hbs from 'hbs';
import { fetchWeatherInfoByLocation } from './utils/weather.js';
import { fetchLocation } from './utils/geocode.js'; 

const logger = new Logger('Server app').init();

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
		logger.info('Render index page with form to get weather');
});

app.get('/about', (req, res) => {
		res.render('about', {
				title: 'About Me',
				name: 'Eugene Shnyrkevich'
		});
		logger.info('Render about page with my excelent photo');
});

app.get('/help', (req, res) => {
		res.render('help', {
				title: 'About page',
				helpText: 'I want to share with you a link',
				link: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/'
		});
		logger.info('Render help page with link to course');
});

app.get('/weather', async (req, res) => {
		try {
			if (!req.query.address) {
				res.send({
					code: 500,
					message: 'Any address wass provided, Please provide an address'
				});
			}

			const address = req.query.address;
			const coordinates = await fetchLocation(address);
			const data = await fetchWeatherInfoByLocation(coordinates);
			res.send(data);
			logger.info(`Weather forecast was get successfully for address: ${address}`);
		} catch(e) {
			logger.error(`Get weather data Error: ${e.message}`);
		}
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Errored request',
		code: 404,
		message: 'Help article not found'
	});
	logger.info(`Move to error page, help article not found`);
})

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Errored request',
		code: 404,
		message: 'This page doesn\'t exist'
	});
	logger.info(`Move to error page: the route is not exist`);
});

app.listen(3000, () => {
	logger.info(`Server is started on route ${3000}`);
});