const express = require('express');
const app = express();

// Static
app.use('/app', express.static(__dirname + '/app'));

// END SETUP =================================================

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/callback', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});


// START SERVER ====================================================

app.listen(process.env.PORT || 8888, function () {
  console.log("I'm listening at 8888");
});
