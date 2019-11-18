// index.js
// Already set up for express

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// open port with a callback
var listener = app.listen("8000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
