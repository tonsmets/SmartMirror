var express = require('express');
var router = express.Router();

var ns = require('../data/ns');
var nu = require('../data/nu');
var weather = require('../data/weather');

router.get('/', function(req, res) {
	res.send("Hi, you reached the data endpoint!");
	res.end();
});

/* NS.nl (Dutch Railways) data */
router.get('/ns', function(req, res) {
	ns.getDisrupts(function(data) {
		res.send(data);
		res.end();
	});
});

/* NU.nl (Dutch news site) data */
router.get('/nu', function(req, res) {
	nu.getHighlights(5, function(data) {
		res.send(data);
		res.end();
	});
});

/* Weather from OpenWeatherMap */
router.get('/weather', function(req, res) {
	weather.getWeatherCurrent(2747203, function(data) {
		res.send(data);
		res.end();
	});
});

/* Weather from OpenWeatherMap */
router.get('/weatherforecast', function(req, res) {
	weather.getWeatherForecast(2747203, function(data) {
		res.send(data);
		res.end();
	});
});

module.exports = router;