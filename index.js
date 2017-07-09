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

app.get('/form.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "form.htm");
})

app.get('/process_get', function(req, res) {
  //Prepare output in JSON format
  var cake = {
    cake_name:req.query.cake_name,
    sponge_flavour:req.query.sponge_flavour,
    cream_flavour:req.query.cream_flavour,
    topping:req.query.topping,
    shape:req.query.shape
  };
  var cakes = [];
  var file = 'cakes.json'
  jsonfile.readFile(file, cake, function (err) {
    if(cake) {
      cakes = cake;
    }
    cakes.push(cake);

    jsonfile.writeFile(file, cakes, function(err){
      res.send('done');
    })
  })
  res.end('Cake Submitted');
})

// This responds a GET request for the /cake_list page.
app.get('/cake_list', function (req, res) {
  console.log("Got a GET request for the /cake_list page.")
  var file = 'cakes.json'
  var cakes = jsonfile.readFileSync(file);
  //res.sendFile(path.join(__dirname + '/cake_list.html'));
  res.send(cakes)
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
