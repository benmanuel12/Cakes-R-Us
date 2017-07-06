var express = require('express');
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var jsonfile = require('jsonfile')

var app = express();

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
  console.log('HERE');
  var user = {
    first_name:req.query.first_name,
    last_name:req.query.last_name,
    nick_name:req.query.nick_name
  };
  console.log(user);
  var file = 'users.json'
  jsonfile.writeFile(file, user, {flag: 'a'}, function (err) {
    console.error(err)
  })
  res.end('done');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
  console.log("Got a GET request for the /list_user page.")
  var file = 'users.json'
  var user_list = jsonfile.readFileSync(file);
  res.send('<h1> <strong> Users: </strong></h1>' + JSON.stringify(user_list));
})

// This responds a GET request for abcd, abxcd, ab123cd and so on
app.get('/ab*cd', function(req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match');
})

// This responds with instructions on the homepage
app.get('/', function(req, res) {
  console.log("Got a GET request for the homepage");
  res.sendFile(path.join(__dirname + '/homepage.html'));
})

  var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
