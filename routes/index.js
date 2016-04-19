var express = require('express');
var router = express.Router();

var ns = require('../data/ns');
var nu = require('../data/nu');

router.get('/', function(req, res) {
	res.send("Hi!");
	res.end();
});

/* NS.nl (Dutch Railways) data */
router.get('/ns', function(req, res) {
	res.send(ns.getFaults());
	res.end();
});

/* NU.nl (Dutch news site) data */
router.get('/nu', function(req, res) {
	nu.getHighlights(5, function(data) {
		res.send(data);
		res.end();
	});
});

module.exports = router;