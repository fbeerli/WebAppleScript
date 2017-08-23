const express = require('express')
const app = express()
const exec = require('child_process').exec;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

// app.get('/', function (req, res) {
// 	//createHtml();
// 	console.log( getDateTime() + " -> (GET) " + req.url );
// 	res.sendFile(__dirname + '/public/index.html');
// })
app.get('/', function (req, res) {
    console.log( getDateTime() + " -> (GET) " + req.url );
    res.render('index');
})

app.get('/:id', function(req, res) {
	//console.log('User-Agent: ' + req.headers['user-agent']);
	console.log( getDateTime() + " -> (GET) " + req.url );
	exec( "osascript ./apple_script/" + req.params.id );
    res.end();      // otherwise Safari makes request all 2 Minutes
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})




function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + "  " + hour + ":" + min + ":" + sec;
}

function createHtml(){
    console.log("createHtml function");
    const testFolder = './script/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    })
}
