import { iconsData } from './icons-mapping.js';

class App {
	apiUrl = '/weather';
	
	form;

	forecastSection;

	iconsData;

	constructor() {
		this.form = document.getElementById('address-form');
		this.forecastSection = document.querySelector('.weather-forecast');
		this.forecastSection.classList.add('hidden');
	}

	start() {
		this.initFormActions();
	}

	initFormActions() {
		this.form.addEventListener('submit', async (e) => {
			e.preventDefault();
				const formData = new FormData(this.form);
				const address = formData.get('address');
	
				const weather = await this.getWeather(address);
				this.renderForecastSection(weather);
		});
	}

	async getWeather(address) {
		const parcedAddress = encodeURIComponent(address);
		const response = await fetch(`${this.apiUrl}?address=${parcedAddress}`);
		const data = await response.json();
		return data;
	}

	renderForecastSection(weather) {
		const {
			country,
			description,
			feelslike,
			humidity,
			name,
			region,
			temperature,
			weather_code,
			wind_speed,
			is_day
		} = weather;

		let lastChild = this.forecastSection.lastElementChild;
		while(lastChild) {
			this.forecastSection.removeChild(lastChild);
			lastChild = this.forecastSection.lastElementChild;
		}

		const locationBlock = document.createElement('div');
		locationBlock.classList.add('weather-location-container');
		const countryEl = document.createElement('span');
		countryEl.innerHTML = `<b>Country:</b> ${country}`;
		const regionEl = document.createElement('span');
		regionEl.innerHTML = `<b>Region:</b> ${region}`;
		const nameEl = document.createElement('span');
		nameEl.innerHTML = `<b>Place:</b> ${name}`;
		locationBlock.appendChild(countryEl);
		locationBlock.appendChild(regionEl);
		locationBlock.appendChild(nameEl);

		const forecastBlock = document.createElement('div');
		forecastBlock.classList.add('weather-forecast-container');
		const weahterDetails = document.createElement('div');
		weahterDetails.classList.add('weather-details');
		weahterDetails.appendChild(locationBlock);

		const weatherIcon = document.createElement('img');
		weatherIcon.classList.add('weather-icon');
		const iconData = iconsData.find(data => data.code === weather_code);
		weatherIcon.src = `/img/icons/${is_day === 'yes' ? iconData.dayIcon : iconData.nightIcon}`;
		weahterDetails.appendChild(weatherIcon);

		const weatherInformation = document.createElement('div');
		weatherInformation.classList.add('weather-forecast-info');
		const tempContainer = document.createElement('div');
		const tempText = document.createElement('span');
		tempText.textContent = `The temperature is ${temperature}, feels like ${feelslike}`;
		const tempIcon = document.createElement('img');
		tempIcon.src = '/img/icons/celsius.svg';
		tempContainer.appendChild(tempText);
		tempContainer.appendChild(tempIcon);
		const windContainer = document.createElement('div');
		const windText = document.createElement('span');
		windText.textContent = `Wind speed is ${wind_speed} m/s`;
		const windIcon = document.createElement('img');
		windIcon.src = '/img/icons/wind.svg';
		windContainer.appendChild(windText);
		windContainer.appendChild(windIcon);
		const humContainer = document.createElement('div');
		const humText = document.createElement('span');
		humText.textContent = `Humidity is ${humidity}`;
		const humIcon = document.createElement('img');
		humIcon.src = '/img/icons/humidity.svg';
		humContainer.appendChild(humText);
		humContainer.appendChild(humIcon);
		const descriptionEl = document.createElement('p');
		descriptionEl.textContent = description;
		weatherInformation.appendChild(descriptionEl);
		weatherInformation.appendChild(tempContainer);
		weatherInformation.appendChild(humContainer);
		weatherInformation.appendChild(windContainer);

		forecastBlock.appendChild(weahterDetails);
		forecastBlock.appendChild(weatherInformation);
		this.forecastSection.appendChild(forecastBlock);
		this.forecastSection.classList.remove('hidden');
	}
}

const app = new App();
app.start();