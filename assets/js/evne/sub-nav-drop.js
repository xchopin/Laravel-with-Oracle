jQuery(document).ready(function($) {
	jQuery('.main-nav-categories li').hover(function() {
		jQuery(this).find('.active-link').addClass('drop');
		jQuery(this).find('.drop-menu').addClass('active-drop-menu');
	}, function() {
		jQuery(this).find('.active-link').removeClass('drop');
		jQuery(this).find('.drop-menu').removeClass('active-drop-menu');
	});

	jQuery('.enter-catalog').hover(function() {
		jQuery(this).find('.content-enter').addClass('show-enter');
	}, function() {
		jQuery(this).find('.content-enter').removeClass('show-enter');
	});

	jQuery('.shop-category-left').hover(function() {
		jQuery(this).find('.content-shops').addClass('show');
		jQuery(this).find('.show-all').addClass('active');
	}, function() {
		jQuery(this).find('.content-shops').removeClass('show');
		jQuery(this).find('.show-all').removeClass('active');
	});

	jQuery('.show-content-select').click(function(event) {
		jQuery(this).toggleClass('active');
		jQuery('.content-select-shop').toggleClass('active');
	});
});