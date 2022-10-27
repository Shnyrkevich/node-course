### App description

Test server application with ui generation on server side.
The main idea it's getting weather forecast by address.
This application use [weatherforecast API](https://weatherstack.com/) to get weather info by location and
[mapbox API](https://docs.mapbox.com/) to get location point.

Server build on express nodeJS libriary and has one main enpoint: {apiUrl}/weather?address={string} to get location and weather data.

Another endpoints were made to test hbs logic and page rendering.

Used nodeJS course source: [course Link](https://www.udemy.com/course/the-complete-nodejs-developer-course-2)