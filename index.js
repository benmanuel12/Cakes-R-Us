var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer = require('multer');

// Allows images to be displayed at http://localhost:8080/public/filename.extension
app.use(express.static('public'));

// Used in file uploading
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest:'/public/'}).single('singleInputFileName'));

// Used in the submission form page
app.get('/index.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "index.htm");
})

// Used in the file_upload page
app.get('/file_upload.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "file_upload.htm");
})

app.post('/file_upload', function (req, res) {
  console.log(req.files.file.name);
  console.log(req.files.file.path);
  console.log(req.files.file.path);
  var file = __dirname + "/" + req.files.file.name;

  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.files.file.name
        };
      }
    console.log(response);
    res.end(JSON.stringify(response ) );
  });
});
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

// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello World');
  app.use(express.static('public'));

})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
  console.log("Got a GET request for the /list_user page.")
  res.send('<h1> <strong> Users: <\strong> HAL, Ben, Gavin<\h1>')
})

// This responds a GET request for abcd, abxcd, ab123cd and so on
app.get('/ab*cd', function(req, res) {
  console.log("Got a GET requesr for /ab*cd");
  res.send('Page Pattern Match');
})

  var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
