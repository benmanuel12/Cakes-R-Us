var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

// Allows images to be displayed at http://localhost:8080/public/filename.extension
app.use(express.static('public'));

// Used in file uploading
app.use(bodyParser.urlencoded({extended: false}));

// Used in the submission form page
app.get('/index.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "index.htm");
})

app.get('/process_get', function(req, res) {
  //Prepare output in JSON format
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name,
    nick_name:req.query.nick_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

// This responds with instructions on the homepage
app.get('/', function(req, res) {
  console.log("Got a GET request for the homepage");

  // Move inline style onto CSS file
  res.sendFile(path.join(__dirname + '/homepage.html'));
  app.use(express.static('public'));

})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
  console.log("Got a GET request for the /list_user page.")
  res.send('<h1> <strong> Users: </strong> HAL, Ben, Gavin</h1>')
})

// This responds a GET request for abcd, abxcd, ab123cd and so on
app.get('/ab*cd', function(req, res) {
  console.log("Got a GET requesr for /ab*cd");
  res.send('Page Pattern Match');
})

  var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
