const express       = require('express');
const app           = express();
const exec          = require('child_process').exec;
const path          = require('path');
const fs            = require('fs');
const os            = require('os');
const bodyParser    = require('body-parser');
const util          = require('util');


const folder = './apple_script/';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

app.use( bodyParser.json() );                            // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies 


app.get('/', function (req, res) {
    console.log( getDateTime() + " -> (GET) " + req.url );
    renderFileListForIndex( res );
})

app.get('/:id', function(req, res) {
	//console.log('User-Agent: ' + req.headers['user-agent']);
    executeScript( req, res );
});

app.post('/', function(req, res){
    //console.log( getDateTime() + " -> (POST:action) \"" + req.params.action + "\" " );
    //res.send( "State OK:\nAJAX request: " + req.params.action + "\n");
    console.log( getDateTime() + " -> POST: action = \"" + req.body.action + "\"" );
    //res.end( "action: " + req.body.action );
    createFileListAndSendToClient( res );
});

app.listen(3000, function () {
	console.log('Listening on http://localhost:3000')
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

function renderFileListForIndex( res ){
    //console.log("renderFileListForIndex() function");
    var vIp = getServerIpAddress();

    fs.readdir(folder, (err, files) => {
        let myList = [];
        if( err ) {
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
         files.forEach(file => {
            if( file.match(  getFileRegex()  ) ) myList.push(file);
        });
            //console.log( "renderFileListForIndex(): files.length: " + files.length );
            //console.log( vIp );
            res.render( 'index', { posts: myList, ip: vIp } );
        }else{
            console.log(" - - > renderFileListForIndex, ELSE that never should happen");
        }
    });
}

function createFileListAndSendToClient( res ){
    var vIp = getServerIpAddress();
    fs.readdir(folder, (err, files) => {
        let myList = [];
        if( err ) {
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
            files.forEach(file => {
            if( file.match(  getFileRegex()  ) ) myList.push(file);
        });
            //console.log( "renderFileListForIndex(): files.length: " + files.length );
            //console.log( vIp );
            res.send( { fileList: myList, ip: vIp } );
        }else{
            console.log(" - - > renderFileListForIndex, ELSE that never should happen");
        }
    });
}

function getServerIpAddress(){
    var vIp = 0;
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                // console.log(ifname + ':' + alias, iface.address);
                //return iface.address;
            } else {
                // this interface has only one ipv4 adress
                // console.log("AAAA: ", iface.address);
                vIp = iface.address;
                // console.log("IP: ", vIp);
            }
            ++alias;
        });
    });
    return vIp;
}

function executeScript( req, res ){
    let vScript = req.params.id;
    if( vScript.match(  getFileAppleScriptRegex()  ) && fs.existsSync( folder + vScript ) ){
        console.log( getDateTime() + " -> (GET:Execute AppleScript) \"" + vScript + "\"");
        exec( "osascript './apple_script/" + vScript + "'", function(error, stdout, stderr) {
            res.send( "State OK:\n + Script \"" + vScript + "\" has been execueted\n" );
            res.send( "stderr: " + stderr );
            res.end( stdout );
        });
    }else if( vScript.match(  getFileBashRegex()  ) && fs.existsSync( folder + vScript ) ){
        console.log( getDateTime() + " -> (GET:Execute bash script) \"" + vScript + "\"");
        //var vBashResult = exec( "bash './apple_script/" + vScript + "'" ); 
        
        exec( "bash './apple_script/" + vScript + "'", function(error, stdout, stderr){ 
            res.send( "stderr:\n" + stderr );
            res.end( stdout );
            // res.end() - otherwise Safari makes request all 2 Minutes
        });

    }else if( vScript.match( getFileRegex() ) && !fs.existsSync( folder + vScript ) ){
        console.log( getDateTime() + " -> (GET:Execute) \"" + vScript + "\" file not available" );
        res.send( "State Error:\n - Script \"" + vScript + "\" not available\n" );
        res.end();      // otherwise Safari makes request all 2 Minutes
    }else{
        console.log( getDateTime() + " -> (GET:Execute) \"" + vScript + "\" " );
        res.send( "State Error:\n - Script \"" + vScript + "\" invalid character in filename\n" );
        res.end();      // otherwise Safari makes request all 2 Minutes
    }
}

function getFileRegex(){
    // defines the carachters allowed in files to list and execute it
    return /^[\w \-]+\.(scpt|scptd|app|applescript|bs)$/;
}

function getFileAppleScriptRegex(){
    // defines the carachters allowed in files to list and execute it
    return /^[\w \-]+\.(scpt|scptd|app|applescript)$/;
}

function getFileBashRegex(){
    // defines the carachters allowed in files to list and execute it
    return /^[\w \-]+\.(bash|bs)$/;
}



