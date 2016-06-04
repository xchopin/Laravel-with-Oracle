jQuery(document).ready(function($) {
	jQuery('.input input').focus(function(event) {
    	jQuery('.cursor').removeClass('active');
    });
    jQuery('.input input').blur(function(event) {
    	jQuery('.cursor').addClass('active')
    });
});