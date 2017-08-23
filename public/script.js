$('.js-xhr').on('click', function(e) {
	//alert("class js-xhr click");
	e.preventDefault();
	var link = $(this).prop('href');
	$.ajax({ type: 'GET', url: link,
		success: function(resp) {
			console.log(resp);
		},
		error: function(err) {
			console.log(err);
		}
	});
});
