'use strict';
const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config({
	path: path.join(__dirname, '.env'),
});

//----------------------------
const request = require('postman-request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
//------
//=========SECTION  defines path for express==================
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//
//
//------
//=========SECTION setup handlebars and view location================
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//
//------
//=========SECTION Setup static directory to serve==================
app.use(express.static(publicDirPath));
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Voider',
	});
});
//
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Voider',
	});
});
//
app.get('/help', (req, res) => {
	res.render('help', {
		message: 'help page rendering',
		title: 'Help',
		name: 'voider',
	});
});
//------
//=========SECTION ==================
//--
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'no address is provided',
		});
	}

	const address = req.query.address;
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forcast: forecastData,
				location,
				address,
			});
		});
	});
	// res.send({
	// 	forecast: 'It is snowing',
	// 	location: 'Philadelphia',
	// 	address,
	// });
});

app.get('/products', (req, es) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term',
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

//------
//========= ==================
//--

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 error',
		message: 'Help article not found.',
		name: 'voider',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 error',
		message: 'Page not found',
		name: 'voider',
	});
});
//
app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
//
//
// app.get('', (req, res) => {
// 	res.send('Hello Express!');
// });

// app.get('/help', (req, res) => {
// 	res.send('help page');
// });
// app.get('/about', (req, res) => {
// 	res.send('about page');
// });
