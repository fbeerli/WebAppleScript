const express = require('express')
const app = express()
const exec = require('child_process').exec;


app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

app.get('/', function (req, res) {
	console.log( "GET request (/) ");
	res.sendFile(__dirname + '/public/index.html');
})
app.get('/camera', function (req, res) {
	console.log( "GET request (/camera) ");
	exec("osascript ./script/camera.app");
	res.send('executed script for camera');
})
app.get('/raspberry', function (req, res) {
	console.log( "GET request (/raspberry) ");
	exec("osascript ./script/raspberry.app");
})
app.get('/tja_20', function (req, res) {
	console.log( "GET request (/tja_20) ");
	exec("osascript ./script/tja_20.app");
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})
