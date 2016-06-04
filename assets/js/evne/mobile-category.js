jQuery(document).ready(function($) {
	MobileNav();
});
jQuery(window).on('resize', function(event) {
	event.preventDefault();
	MobileNav();
});	
jQuery(document).on('click', '.mobile-category', function(event) {
	event.preventDefault();
	if ((jQuery(this).hasClass('active'))) {
		jQuery(this).closest('.category').find('.look-mobile').slideUp();
	}
	else{
		jQuery(this).closest('.category').find('.look-mobile').slideDown();
	}
	jQuery(this).toggleClass('active');
});	
function MobileNav(){
	if (jQuery(window).width()>1085) {
		jQuery('.look-mobile').removeAttr('style');
	}
	else{
		jQuery('.look-mobile').slideUp();
	}
	jQuery('.category .mobile-category').removeClass('active');
}