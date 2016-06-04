jQuery(document).on('click', '.select-button', function(event) {
	event.preventDefault();
	var link = jQuery(this).closest('.filter ').find('.name-filter .data');
	var data = jQuery(this).closest('.filter-content.active').find('input[type=checkbox]:checked');
	link.html("");
	if(data.length == 0)
	{
		jQuery(this).closest('.filter').removeClass('select-filter');
	}
	else {
		jQuery(this).closest('.filter').addClass('select-filter');
		data.each(function(index, el) {
			var id = jQuery(this).attr('id'),
				tx = jQuery('label[for="'+id+'"]').html();
			if(index == 0)
				link.html(link.html() + ':' + tx);
			else {
				link.html(link.html() + ',' + tx);
			}
		});
		link.html(link.html() + '<img src="/media/evne/close.png" class="remove-filter">');
	}
	jQuery(this).closest('.filter').find('.drop-filter').click();
	setFilter();
});
/***remove checkbox***/
jQuery(document).on('click', '.remove-filter', function(event) {
	event.preventDefault();
	var ob = jQuery(this).closest('a.drop-filter');
	var link = jQuery(this).closest('.filter').removeClass('select-filter').find('.name-filter .data');
	jQuery(this).closest('.filter').find('.filter-content').find('input[type=checkbox]:checked').click();
	jQuery(this).closest('.filter').find('.filter-content').find('input.rangePrice').val('');
	link.html('');
	ob.click();
	setFilter();
});

jQuery(document).on('click', '.drop-filter', function(event) {
	event.preventDefault();
	var flag = 0;
	if(jQuery(this).closest('.filter').hasClass('active')) {
		var flag = 1;
	}
	jQuery('.filter').removeClass('active');
	jQuery('.filter-content').removeClass('active');
	if(flag == 0)
		jQuery(this).closest('.filter').addClass('active').find('.filter-content').addClass('active');
});

jQuery(document).ready(function($) {
	jQuery('.filters .filter').each(function(index, el) {
		var link = jQuery(this).find('.name-filter .data');
		var data = jQuery(this).find('input[type=checkbox]:checked');
		link.html("");
		if(data.length == 0)
		{
			jQuery(this).removeClass('select-filter');
		}
		else {
			var i = 0;
			jQuery(this).addClass('select-filter');
			data.each(function(index, el) {
				var id = jQuery(this).attr('id'),
					tx = jQuery('label[for="'+id+'"]').html();
				if(i == 0)
					link.html(link.html() + ': ' + tx);
				else {
					link.html(link.html() + ', ' + tx);
				}
				i++;
			});
			link.html(link.html() + '<img src="/media/evne/close.png" class="remove-filter">');
		}
	});
	// special for price
	link = jQuery('.filter.priceFilter').find('.name-filter .data');

	data = jQuery('.filter.priceFilter').find('input.rangePrice');

	link.html("");

	if(data.length == 0)
	{
		jQuery('.filter.priceFilter').removeClass('select-filter');
	}
	else {
		var i = 0;
		data.each(function(index, el) {
			var pr = parseFloat(jQuery(this).val())
			if (pr) {
				var tx = jQuery(this).attr('title') +': '+pr;
				jQuery('.filter.priceFilter').addClass('select-filter');
				if(i == 0)
					link.html(link.html() + ': ' + tx);
				else {
					link.html(link.html() + '; ' + tx);
				}
				i++;
			};
		});
		if(i > 0) {
			link.html(link.html() + '<img src="/media/evne/close.png" class="remove-filter">');
		}
	}
});