var express = require('express');
var morgan = require('morgan');

var app = express()
var routes = require('./routes');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));

// Serve public things like images from this folder
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  );
});

// All routes that fetch data will use the /data prefix
app.use('/data/', routes);

app.listen(3000);