/*jslint	browser: true, continue: true,
	devel: true, indent: 2, maxerr: 50,
	newcap: true, nomen: true, plusplus: true,
	regexp: true, sloppy: true, vars: false,
	white: true
*/

$('.js-xhr').on('click', function(e) {
	e.preventDefault();
	var link = $(this).data('path');
	//alert("class js-xhr click: " + link);
	$.ajax({ type: 'GET', url: link,
		success: function(resp) {
			console.log(resp);
		},
		error: function(err) {
			console.log(err);
		}
	});
});

$('.btn_execute').on('click', function(e) {
	e.preventDefault();
	var link = $(this).data('path');
	//alert("class btn_execute click: " + link);
	$.ajax({ type: 'GET', url: link,
		success: function(resp) {
			console.log(resp);
		},
		error: function(err) {
			console.log(err);
		}
	});
});


$('.btn_copy').on('click', function(e) {
	e.preventDefault();
	var link = $(this).data('path');
	var link = encodeURI(link); 
	// var link = link.replace(/ /g, "%20");
	alert("class btn_click click: " + link);
	link.toString();
  	var vInput = document.createElement("input");
  	document.body.appendChild( vInput );
  	vInput.setAttribute("id", "ipt_url");
  	document.getElementById("ipt_url").value=link;  
  	ipt_url.select();
  	document.execCommand("copy");
  	document.body.removeChild(ipt_url);
});


$('.td_url').on('click', function(e) {
	e.preventDefault();
	//$(this).select();
});
