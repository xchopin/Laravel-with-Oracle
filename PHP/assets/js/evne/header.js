jQuery(document).ready(function($) {
	toggleMenu();
});
jQuery(window).on('resize', function(event) {
	event.preventDefault();
	toggleMenu();
});	
jQuery(document).on('click', '.show-navs', function(event) {
	event.preventDefault();
	if ((jQuery(this).hasClass('active'))) {
		jQuery(this).closest('.header').find('.nav-list').slideUp();
	}
	else{
		jQuery(this).closest('.header').find('.nav-list').slideDown();
	}
	jQuery(this).toggleClass('active');
});	
function toggleMenu(){
	if (jQuery(window).width()>1085) {
		jQuery('.nav-list').removeAttr('style');
	}
	else{
		jQuery('.nav-list').slideUp();
	}
	jQuery('.header .show-navs').removeClass('active');
}