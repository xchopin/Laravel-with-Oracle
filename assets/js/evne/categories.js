jQuery(document).ready(function($) {
	toggleCategories();
});
jQuery(window).on('resize', function(event) {
	event.preventDefault();
	toggleCategories();
});	
jQuery(document).on('click', '.all-categories', function(event) {
	event.preventDefault();
	if ((jQuery(this).hasClass('active'))) {
		jQuery(this).closest('.categories').find('.main-nav-categories').slideUp();
	}
	else{
		jQuery(this).closest('.categories').find('.main-nav-categories').slideDown();
	}
	jQuery(this).toggleClass('active');
});	
function toggleCategories(){
	if (jQuery(window).width()>1085) {
		jQuery('.main-nav-categories').removeAttr('style');
	}
	else{
		jQuery('.main-nav-categories').slideUp();
	}
	jQuery('.categories .all-categories').removeClass('active');
}