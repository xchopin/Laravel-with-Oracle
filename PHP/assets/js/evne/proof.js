jQuery(document).ready(function() {
	jQuery('.slider-last [data-slick-index="0"]').addClass('firstView');
	jQuery('.slider-unit').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		setTimeout(function(){
			jQuery('.slider-last [data-slick-index]').removeClass('firstView');
			jQuery('.slider-last [data-slick-index="'+(nextSlide)+'"]').addClass('firstView');
		}, 500);
	});
});
// cart qt counter
jQuery(document).on('click', '.cart-list .one-item .product-count .ittera-count a,.product-page .product-all .product-about .sort-one .sort-body .counts a, .list-catalog .one-item .price-product .add-to-cart-alt .ittera-count a', function(event) {
	event.preventDefault();
	var input  	= jQuery(this).siblings('input'),
		number 	= parseInt(input.val());
	// plus button
	if(jQuery(this).hasClass('plus'))
		number += 1;
	// minus button
	if(jQuery(this).hasClass('minus') && number > 1)
		number -= 1;
	return input.val(number);
});

jQuery(document).on('click', '.follow .input .ico-list', function(event) {
	event.preventDefault();
	var url = jQuery(this).closest('form').attr('action'),
		eml = jQuery(this).siblings('input').val();
	jQuery.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: {email: eml},
		success: function(data) {
			console.log(data);
		}
	})
});

function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
	// 
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +	 bugfix by: Michael White (http://crestidg.com)

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return km + kw + kd;
}

// subscrible modal 

jQuery(document).on('click', 'label[for="noShowModal"]', function(event) {
	setTimeout(function(){
		if(jQuery('#noShowModal').is(':checked')) {
			jQuery.get( "/", { 'hide-modal': 1} );
		}
		else {
			jQuery.get( "/", { 'hide-modal': 0} );
		}
		console.log(jQuery('#noShowModal').is(':checked'));
	}, 100);
});

// closed modal 

jQuery(document).on('click', '.hideModal, #modaloverlay', function(event) {
	event.preventDefault();
	jQuery('#modalvindow,#modaloverlay').fadeOut('300');
});