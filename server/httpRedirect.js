// set up plain http server
var express = require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);

// set up a route to redirect http to https
app.get('*', function(req, res) {
  res.redirect('https://' + req.headers.host + req.url);
})

// have it listen on 80
server.listen(80);