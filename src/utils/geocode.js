'use strict';
//------
const request = require('postman-request');
const path = require('path');

require('dotenv').config({
	path: path.join(__dirname, '.env'),
});

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token={process.env.MAPBOX}`;
	request({ url, json: true }, (error, { body }) => {
		if (error) callback('unable to connect to location!');
		else if (body.features.length === 0)
			callback('unable to find  location!');
		else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
