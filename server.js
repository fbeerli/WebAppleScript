const express = require('express')
const app = express()
const exec = require('child_process').exec;


app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
})
app.get('/camera', function (req, res) {
  exec("osascript ./script/camera.app");
})
app.get('/raspberry', function (req, res) {
  exec("osascript ./script/raspberry.app");
})
app.get('/tja_20', function (req, res) {
  exec("osascript ./script/tja_20.app");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
