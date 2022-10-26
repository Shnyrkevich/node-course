import Logger from './utils/logger.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
const viewsPath = path.join(__dirname, '../templates')

// Set view engine to hbs type instead of html for dynamic rendering
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
		res.render('index', {
				title: 'Weather',
				name: 'Eugene Shnyrkevich'
		});
})

app.get('/about', (req, res) => {
		res.render('about', {
				title: 'About Me',
				name: 'Eugene Shnyrkevich'
		});
})

app.get('/help', (req, res) => {
		res.render('help', {
				helpText: 'This is some helpful text.'
		});
})

app.get('/weather', (req, res) => {
		res.send({
				forecast: 'It is snowing',
				location: 'Philadelphia'
		});
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});