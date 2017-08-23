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
