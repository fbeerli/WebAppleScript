/*jslint	browser: true, continue: true,
	devel: true, indent: 2, maxerr: 50,
	newcap: true, nomen: true, plusplus: true,
	regexp: true, sloppy: true, vars: false,
	white: true
*/

$( document ).ready( function (){
	eventClickReload();
});

$('#div_reload').on('click', function(e){
	//alert( "click on reload - function not yet implemented" );
	$.ajax({ 
		type: 'POST', 
		url: "http://localhost:3000", 
		data: { action: 'getList' },
		success: function(resp) {
			console.log(resp);
			//alert( "AJAX success: \n" + resp.ip );
			createNewFileList( resp.fileList, resp.ip );
		},
		error: function(err) {
			console.log(err);
		}
	});
});

function createNewFileList( vFileList, vIp ){
	$('.div_list').empty().hide();
	var vContent = '' + 
		'<table class="tbl_list">' +
            '<tr><th>AppleScript<div id="div_reload" title="Reload Directory"><img src="/img/reload.png"></div></th>' +
                '<th>Copy Link</th><th>Start</th>' +
            '</tr>';
    for( var i = 0; i < vFileList.length; i++ ){
    	vContent += '<tr>' +
    				'<td class="js-xhr td_as" data-path="http://' + vIp + ':3000/' + vFileList[i] + '">' +
                        '<a href="" data-path="' + vFileList[i] + '" class="js-xhr">' + vFileList[i] + '</a>' +
                    '</td>' +
                    '<td>' +
                        '<button type="button" class="btn_copy" data-path="http:// ' + vIp + ':3000/' + vFileList[i] + '">' +
                            'Copy URL' +
                        '</button>' +
                    '</td>' +
                    '<td>' +
                        '<button type="button" class="js-xhr" data-path="'+ vFileList[i] + '">' +
                            'Execute' +
                        '</button>' +
                    '</td>' +
                   	'</tr>';
    }
    vContent += '</table>'; 
	$(".div_list").append( vContent ).show();
	eventClickReload();
};

$('.btn_copy').on('click', function(e) {
	e.preventDefault();
	var link = $(this).data('path');
	var link = encodeURI(link); 
	// var link = link.replace(/ /g, "%20");
	//alert("class btn_click click: " + link);
	link.toString();
  	var vInput = document.createElement("input");
  	document.body.appendChild( vInput );
  	vInput.setAttribute("id", "ipt_url");
  	document.getElementById("ipt_url").value=link;  
  	ipt_url.select();
  	document.execCommand("copy");
  	document.body.removeChild(ipt_url);
});

function eventClickReload(){
	$('.js-xhr').unbind();
	$('.js-xhr').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var link = $(this).data('path');
		alert("class js-xhr click: " + link);
		$.ajax({ type: 'GET', url: link,
			success: function(resp) {
				alert( resp );
				console.log(resp);
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
}


