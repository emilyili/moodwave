var express = require('express');
require('dotenv').config();
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static
app.use('/app', express.static(__dirname + '/app'));

// END SETUP =================================================

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/callback', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/util/spotify.json', function (req, res) {
  res.sendFile(__dirname + '/util/spotify.json');
});


// START SERVER ====================================================

app.listen(process.env.PORT || 8888, function () {
  console.log("I'm listening at 8888");
});