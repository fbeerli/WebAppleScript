const express = require('express')
const app = express()
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/public', express.static('public'));
app.use('/img', express.static('img'));


app.get('/', function (req, res) {
    console.log( getDateTime() + " -> (GET) " + req.url );
    getFileList( res );
})

app.get('/:id', function(req, res) {
	//console.log('User-Agent: ' + req.headers['user-agent']);
	console.log( getDateTime() + " -> (GET) " + req.url );
    let as = req.params.id;
    console.log(as);

	exec( "osascript './apple_script/" + as + "'" );           // put the file name in simple quotation marks
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

function getFileList( res ){
    console.log("getFileList() function");
    const folder = './apple_script/';

    fs.readdir(folder, (err, files) => {
        if( err ) { 
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
            // files.forEach(file => {
            //     console.log( file );
            // });
            //console.log( "getFileList(): files.length: " + files.length );
            res.render( 'index', { posts: files } );
        }else{
            console.log(" - - > getFileList, ELSE that never should happen");
        }
    });
}
