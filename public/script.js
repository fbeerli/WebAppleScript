/*jslint	browser: true, continue: true,
	devel: true, indent: 2, maxerr: 50,
	newcap: true, nomen: true, plusplus: true,
	regexp: true, sloppy: true, vars: false,
	white: true
*/


var vAdminMode = false;
var vServerIP;
var vServerPort;

$( document ).ready( function (){
	//vServerAddress = location.host;
	vServerIp = $('#ipt_ip').val();
	vServerPort = $('#ipt_port').val();
	$.ajax({ 
		type: 'POST', 
		data: { action: 'getList' },
		success: function(resp) {
			createNewFileList( resp.fileList, resp.ip );
		},
		error: function(err) {
			console.log(err);
		}
	});
	enableEventListener();
	keyboardEventHandler();
});

function keyboardEventHandler(){
    $(document).unbind().keydown();
    $(document).unbind().keyup();
   	$(document).keyup(function(event) {
        event = event || window.event;
        event.stopPropagation();
        if( event.keyCode == 27 ) switchAdminMode( false );                                 // 27 == ESC
        if( event.keyCode == 69 ) switchAdminMode(); 										// 69 == e == edit == admin mode
        if( event.keyCode == 82 ) $('#div_reload').click();									// 82 == r == reload
    });
}

function createNewFileList( vFileList, ip ){
	$('.div_list').empty().hide();
	var vContent = '' + 
		'<table class="tbl_list">' +
            '<tr id="tr_header">' +
	            '<th>AppleScript' +
	            	'<div id="div_reload" title="Reload Directory"><img src="/img/reload.png"></div>' +
	            	'<img id="add_file" class="cls_admin" src="/img/add.png">' +
	            '</th>' +
                '<th>Copy Link</th><th>Start</th>' +
            '</tr>';
    for( var i = 0; i < vFileList.length; i++ ){
    	vContent += 
    		'<tr>' +
    			//'<td class="js-xhr td_as" data-path="http://' + vServerIp + ':' + vServerPort + '/' + vFileList[i] + '">' +
    			'<td class="js-xhr td_as" data-path="' + vFileList[i] + '">' +
                    '<a href="" data-path="' + vFileList[i] + '" class="js-xhr">' + vFileList[i] + '</a>' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="btn_copy" data-path="http://' + vServerIp + ":" + vServerPort + '/' + vFileList[i] + '">' +
                        'Copy URL' +
                    '</button>' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="js-xhr" data-path="'+ vFileList[i] + '">' +
                        'Execute' +
                    '</button>' +
                '</td>' +
                '<td class="cls_admin cls_edit">' +
                    '<img data-path="'+ vFileList[i] + '" src="/img/edit.png">' +
                '</td>' +
                '<td class="cls_admin cls_delete">' +
                    '<img class="" data-path="'+ vFileList[i] + '" src="/img/delete.png">' +
                '</td>' +
           	'</tr>';
    }
    vContent += '</table>'; 
	$(".div_list").append( vContent ).show();
	enableEventListener();
};
function createReloadFinished(){
	// change the relaod button so the user knows that something is going on
	var vContent = '' + 
        '<th>AppleScript<div id="div_reload" style="color:green;">OK</div></th>' +
        '<th>Copy Link</th><th>Start</th>';
	$('#tr_header').empty().append( vContent ).show();
}
function createReloadButton(){
	var vContent = '' + 
        '<th>AppleScript' +
        	'<div id="div_reload" title="Reload Directory"><img src="/img/reload.png"></div>' +
        	'<img id="add_file" class="cls_admin" src="/img/add.png">' +
        '</th>' +
        '<th>Copy Link</th><th>Start</th>';
	$('#tr_header').empty().append( vContent ).show();
	if(vAdminMode){
		vAdminMode = false;
		switchAdminMode();
	}
}

function enableEventListener(){
	$('.js-xhr').unbind();
	$('.js-xhr').on('click', function(e) {
		var link = $(this).data('path');
		//alert( "click js-xhr: " + link );
		e.preventDefault();
		e.stopPropagation();
		//alert("Function \"" + enableEventListener.name + "()\" " + link);
		$.ajax({ type: 'GET', url: link,
			success: function(resp) {
				// do not show an alert if an osascript has been executed
				if( resp != "osascript" ) alert( resp );
				console.log(resp);
			},
			error: function (jqXHR, exception) {
				errorHandlingAjax( jqXHR, exception );
				console.log(jqXHR);
				}
		});
	});
	$('.btn_copy').unbind();
	$('.btn_copy').on('click', function(e) {
		e.preventDefault();
		var link = $(this).data('path');
		//alert( link );
		link = encodeURI(link); 
		link.toString();
		var vInput = document.createElement("input");
		document.body.appendChild( vInput );
		vInput.setAttribute("id", "ipt_url");
		document.getElementById("ipt_url").value=link;  
		ipt_url.select();
		document.execCommand("copy");
		document.body.removeChild(ipt_url);
	});
	$('#div_reload').unbind();
	$('#div_reload').on('click', function(e){
		$.ajax({ 
			type: 'POST', 
			data: { action: 'getList' },
			success: function(resp) {
				console.log(resp);
				createNewFileList( resp.fileList, resp.ip );
				createReloadFinished();
				setTimeout(function(){ createReloadButton(), enableEventListener() }, 1000);
			},
			error: function (jqXHR, exception) {
				errorHandlingAjax( jqXHR, exception );
				console.log(jqXHR);
				}
		});
	});
	$('#add_file').unbind();
	$('#add_file').on('click', function(e){
		alert( "Add new File to list - is not yet implemented") ;
	});
	$('.cls_edit').unbind();
	$('.cls_edit').on('click', function(e){
		alert( "Edit File is not yet implemented") ;
	});
	$('.cls_delete').unbind();
	$('.cls_delete').on('click', function(e){
		var link = $(this).children().data('path');
		if( confirm( 'Delete file: "' + link + '" on WEB-SERVER?') ){
			$.ajax({ 
				type: 'POST', 
				data: { action: 'deleteFile', filename: link },
				success: function(resp) {
					console.log(resp);
					createNewFileList( resp.fileList, resp.ip );
					createReloadFinished();
					setTimeout(function(){ createReloadButton(), enableEventListener() }, 1000);
				},
				error: function (jqXHR, exception) {
					errorHandlingAjax( jqXHR, exception );
					console.log(jqXHR);
					}
			});
		}
	});
}

function errorHandlingAjax( jqXHR, exeption ){
	var msg = '';
	if (jqXHR.status === 0) {
		msg = 'Not connect.\nVerify Webserver is running.';
	} else if (jqXHR.status == 404) {
		msg = 'Requested page not found. [404]';
	} else if (jqXHR.status == 500) {
		msg = 'Internal Server Error [500].';
	} else if (exception === 'parsererror') {
		msg = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		msg = 'Time out error.';
	} else if (exception === 'abort') {
		msg = 'Ajax request aborted.';
	} else {
		msg = 'Uncaught Error.\n' + jqXHR.responseText;
	}
	alert(msg);
	console.log(jqXHR);
}

function switchAdminMode( newAdminMode ){                 // ADMIN MODE is to switch website in an EDIT MODE
    //  switch edit mode on/off
    if( newAdminMode === false ){
    	vAdminMode = true;
    }else if( newAdminMode === true ){
    	vAdminMode = false;
    }
    if( vAdminMode ){ 
        vAdminMode = false;
        $('.cls_admin').hide();
    }else{ 
        vAdminMode = true;
        $('.cls_admin').show(); 
    };
}
