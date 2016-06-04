jQuery(window).load(function() {
	maxHeight();
	maxHeightSlider();
	maxLastHeight();
	maxHeightCatalog();
});

function maxHeight() {
	jQuery(".tabs_cont ul li").each(function(index, el) {
		var h = jQuery(this).find('img').height() / 2;
		jQuery(this).find('img:not(.banner)').css('margin-top', '-'+h+'px');
	});
}
function maxHeightCatalog() {
	jQuery(".content-catalog ul li").each(function(index, el) {
		var h = jQuery(this).find('img').height() / 2;
		jQuery(this).find('img').css('margin-top', '-'+h+'px');
	});
}
function maxLastHeight() {
	jQuery(".slider-unit .overlay-image").each(function(index, el) {
		var h = jQuery(this).height();
		var ih = jQuery(this).find('img').height();
		jQuery(this).find('img').css('padding-top', ((h - ih)/2)+'px');
	});
}
function maxHeightSlider() {
	jQuery(".slider-product-content .slide").each(function(index, el) {
		var h = jQuery(this).height();
		var ih = jQuery(this).find('img').height();
		jQuery(this).find('img').css('margin-top', ((h - ih)/2)+'px');
	});
}
