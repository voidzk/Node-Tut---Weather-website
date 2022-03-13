'use strict';
const request = require('postman-request');
const path = require('path');

require('dotenv').config({
	path: path.join(__dirname, '.env'),
});

//------
const forecast = (lat, lng, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK}&query=${lat},${lng}`;
	request({ url, json: true }, (error, { body }) => {
		if (error) callback(error);
		else
			callback(
				undefined,
				`weatherDescription is ${body.current.weather_descriptions[0]} , currentWeather is ${body.current.temperature} , feelsLike: ${body.current.feelslike}`
			);
	});
};
module.exports = forecast;
