// products add
jQuery(document).on('click', '.product-item a.button-bay, .list-catalog .one-item .price-product .buy', function(event) {
	event.preventDefault();
	var ob  	= jQuery(this),
		url 	= ob.attr('href'), // url
        title   = jQuery.trim(ob.parent().find('span.name').text()), // name
        addqt      = 1, // qt
        // braked info
        totalqt = parseFloat(ob.data('qty')),
        options = parseInt(ob.data('option')),
        // !!!
        sucMess = ' was added to your shopping cart.',
        errMess = ' was not added to your shopping cart.';

    if(ob.parent().find('.sale-product-price').length > 0) {
        // special price
        var cost = parseInt(jQuery.trim(ob.parent().find('.sale-product-price span.price').text())) + parseFloat('0.' + jQuery.trim(ob.parent().find('.sale-product-price span.price-small').text()));
    }
    else {
        // default price
        var cost = parseInt(jQuery.trim(ob.parent().find('span.price').text())) + parseFloat('0.' + jQuery.trim(ob.parent().find('span.price-small').text()));
    }

    // allready success


    if(options > 0) {
        // redirect to item
        return window.location.href = url;
    }

    if(totalqt > 0) {
        // send to cart
        jQuery.get(url);
        // show success message
        alert(title + sucMess, 'Product added to cart');
        // update cart qty
        jQuery('.cart .count-product span.color-count').html( parseInt(jQuery('.cart .count-product span.color-count').html()) + addqt );
        // update cart price
        var newCost = number_format( (parseFloat( jQuery.trim( jQuery('.cart .total-price span:last').html() ).replace(',', '.').replace(' ', '') ) + cost), 2, ',', ' ' );
        jQuery('.cart .total-price span:last, .fixed-header .fixed-top-header .cart .total-price span:last').html(newCost);
    }
    else {
        // show error message
        alert(title + errMess, 'The item is not added to the cart');
    }
});	

// other action link
jQuery(document).on('click', '.image-holder .wishlist, .image-holder .compare, .short-info .links .compare, .short-info .links .favorite', function(event) {
	event.preventDefault();
	var url = jQuery(this).attr('href');

	// need login
	if(jQuery(this).is('[data-login]') && jQuery(this).data('login') != 1)
		return alert("Please login to continue.");

	alert(jQuery(this).data('title') + jQuery(this).data('message'));

	jQuery.get(url, function(data, textStatus, xhr) {
		if (textStatus == 'success') {
			var smallDom = jQuery('<div></div>');
			messages = smallDom.html(xhr.responseText);
			// messages exsist
			if(messages.find('.messages').length > 0){
				// error massage .error-msg
				if(messages.find('.messages').find('.error-msg').length > 0) {
					var text = "";
					messages.find('.messages').find('.error-msg').each(function(index, el) {
						text = "<p>"+strip_tags(jQuery(this).html())+"</p>";
					});
					return alert(text);
				}
			}
		}
		else {
			return window.location.href = url;
		}
	});
});

// show alert notify

function alert(text, title) {
	var modal = jQuery('#modalvindow'),
		overlay = jQuery('#modaloverlay'),
		modalTitle = modal.find('.modalContent').find('h2'),
		modalText  = modal.find('.modalContent').find('.content');

	if(!title) title = 'Alert';

	modalTitle.html(title);

	modalText.html(text);

	modal.fadeIn(300); 
	overlay.fadeIn(300);

}

// global function strip_tags

function strip_tags(str, allowed_tags) { 
	var key = '', allowed = false; 
	var matches = []; 
	var allowed_array = []; 
	var allowed_tag = ''; 
	var i = 0; 
	var k = ''; 
	var html = ''; 

	var replacer = function(search, replace, str) { 
	  return str.split(search).join(replace); 
	}; 

	// Build allowes tags associative array 
	if (allowed_tags) { 
	  allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi); 
	} 

	str += ''; 

	// Match tags 
	matches = str.match(/(<\/?[\S][^>]*>)/gi); 

	// Go through all HTML tags 
	for (key in matches) { 
	  if (isNaN(key)) { 
	      // IE7 Hack 
	      continue; 
	  } 

	  // Save HTML tag 
	  html = matches[key].toString(); 

	  // Is tag not in allowed list? Remove from str! 
	  allowed = false; 

	  // Go through all allowed tags 
	  for (k in allowed_array) { 
	      // Init 
	      allowed_tag = allowed_array[k]; 
	      i = -1; 

	      if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');} 
	      if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');} 
	      if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;} 

	      // Determine 
	      if (i == 0) { 
	          allowed = true; 
	          break; 
	      } 
	  } 

	  if (!allowed) { 
	      str = replacer(html, "", str); // Custom replace. No regexing 
	  } 
	} 

	return str; 
}
console.info('EVNE DEVELOPERS http://evnedevelopers.com');