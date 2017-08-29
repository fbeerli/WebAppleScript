const express   = require('express')
const app       = express()
const exec      = require('child_process').exec;
const path      = require('path');
const fs        = require('fs');
const os        = require( 'os');

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
    //console.log("getFileList() function");
    const folder = './apple_script/';
    var vIp = getServerIpAddress();

    fs.readdir(folder, (err, files) => {
        let myList = [];
        if( err ) { 
            console.log( " - - > Error while reading directory: " + err );
        }else if( files ){
         files.forEach(file => {
            let regex = /^[a-zA-Z0-9 _-]+\.(scpt|scptd|app|applescript)$/;
            if( file.match( regex ) ) myList.push(file);
        });
            //console.log( "getFileList(): files.length: " + files.length );
            //console.log( vIp );
            res.render( 'index', { posts: myList, ip: vIp } );
        }else{
            console.log(" - - > getFileList, ELSE that never should happen");
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



