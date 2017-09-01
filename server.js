const express       = require('express');
const app           = express();
const exec          = require('child_process').exec;
const path          = require('path');
const fs            = require('fs');
const os            = require('os');
const bodyParser    = require('body-parser');
const util          = require('util');
const vServerPort   = 3000;
const vServerIp     = getServerIpAddress();


const vScriptFolder = './apple_script/';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

app.use( bodyParser.json() );                            // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies 


app.get('/', function (req, res) {
    console.log( getDateTime() + " -> GET:" + req.url );
    //res.sendFile( __dirname + '/public/index.html');
    //renderFileListForIndex( res );
    console.log( vServerIp );
    res.render( 'index', { vIp: vServerIp, vServerPort: vServerPort } );
})

app.get('/:id', function(req, res) {
    // id is the script name sent from the client to the server
	//console.log('User-Agent: ' + req.headers['user-agent']);
    console.log( getDateTime() + " -> GET: execute AppleScript) \"" + req.params.id + "\"");
    //res.sendStatus(200);
    //exec( "osascript './apple_script/" + req.params.id + "'");
    verifyScript( req, res );
});

app.post('/', function(req, res){
    //console.log( getDateTime() + " -> (POST:action) \"" + req.params.action + "\" " );
    //res.send( "State OK:\nAJAX request: " + req.params.action + "\n");
    console.log( getDateTime() + " -> POST: action = \"" + req.body.action + "\"" );
    //res.end( "action: " + req.body.action );
    validateAjaxAction( req, res );
});

app.listen(3000, function () {
    console.log('Listening on http://localhost:3000' );
})
app.listen(vServerPort, vServerIp, function () {
    console.log('Listening on http://' + vServerIp + ':' + vServerPort );
})







function validateAjaxAction( req, res ){
    if( req.body.action === 'deleteFile'){
        deleteFile( req, res )
    }else if( req.body.action === 'getList'){
        createFileListAndSendToClient( res );
    }else{
        console.log( getDateTime() + ' -> ERROR - this action: "' + req.body.action 
            + '" is not defined in function "validateAjaxAction"' );
    }
}

function deleteFile( req, res ){
    if( fs.lstatSync( vScriptFolder + req.body.filename ).isFile() ){
        fs.unlink( vScriptFolder + req.body.filename, function( err ){
            if( err ){
                console.log( getDateTime() + ' -> ERROR while try to delete file: "' + vScriptFolder + req.body.filename + '"' );
            }else{
                console.log( getDateTime() + ' -> DELETE file: "' + vScriptFolder + req.body.filename + '"' );
            }
            createFileListAndSendToClient( res );
        })
    }else if( fs.lstatSync( vScriptFolder + req.body.filename ).isDirectory() ){
        //console.log( getDateTime() + ' -> is a folder - NOT deleted: "' + vScriptFolder + req.body.filename + '"' );
        console.log( getDateTime() + ' -> DELETE folder: "' + vScriptFolder + req.body.filename + '"' );
        rmdir( vScriptFolder + req.body.filename );
        createFileListAndSendToClient( res );
    }else{
        console.log( getDateTime() + ' -> NO file nor folder (NO action): "' + vScriptFolder + req.body.filename + '"' );
        res.end();
    }
}

function renderFileListForIndex( res ){
    //console.log("renderFileListForIndex() function");
    var vIp = getServerIpAddress();

    fs.readdir(vScriptFolder, (err, files) => {
        let myList = [];
        if( err ) {
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
         files.forEach(file => {
            if( file.match(  getFileRegex( "file" )  ) ) myList.push(file);
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
    fs.readdir(vScriptFolder, (err, files) => {
        let myList = [];
        if( err ) {
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
            files.forEach(file => {
            if( file.match(  getFileRegex( "file" )  ) ) myList.push(file);
        });
            //console.log( "renderFileListForIndex(): files.length: " + files.length );
            //console.log( vIp );
            res.send( { fileList: myList, ip: vIp } );
        }else{
            console.log(" - - > renderFileListForIndex, ELSE that never should happen");
        }
    });
}

function verifyScript( req, res ){
    let vScript = req.params.id;
    if(! vScript.match( getFileRegex( "file" ) ) ){
        res.end( " - Error:\n    Not allowed character in filename \"" + vScript + "\"" );
        return;
    }
    if(! fs.existsSync( vScriptFolder + vScript ) ){
        res.end( " - Error:\n    File not found \"" + vScript + "\"" );
        return;
    }
    if( vScript.match( getFileRegex( "osascript" ))){
        executeScript( "osascript", vScript, null );
        res.send( "osascript" );
        res.end();
    }else if( vScript.match( getFileRegex( "shell" ))){
        executeScript( "bash", vScript, res );
    }else{
        res.end("this file extension is not supported \n" + vScript);
    }
}

function executeScript( vExe, vScript, res ){
    exec( "" + vExe + " './" + vScriptFolder + "/" + vScript + "'", function(error, stdout, stderr) {
        if( res && error ){
            res.end( error + "\n" + stderr );
        }else if( res && stdout ){
            res.end( stdout );
        }else if( res && stderr ){
            res.end( stderr );
        }
    });
}



//  INTERNAL FUNCTION

function getFileRegex( vType ){
    // defines the carachters allowed in files to list and execute it
    if( vType == "file" ){
        return /^[\w \.\-]+\.(scpt|scptd|app|applescript|sh|bs|bash)$/i;
    }else if( vType == "osascript" ){
        return /^[\w \.\-]+\.(scpt|scptd|app|applescript)$/i;
    }else if( vType == "shell" ){
        return /^[\w \.\-]+\.(sh|bs|bash)$/i;
    }
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

var rmdir = function( dir ) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        
        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};



