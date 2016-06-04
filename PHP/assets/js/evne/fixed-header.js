var timeoutPromise;
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 250){
		clearTimeout(timeoutPromise);
        jQuery('.fixed-header').removeClass('run').addClass('active activity');
   	} else {
		jQuery('.fixed-header').removeClass('activity').addClass('run');

		clearTimeout(timeoutPromise);
		timeoutPromise = setTimeout(function() {
			jQuery('.fixed-header').removeClass('active');
		}, 400);
	}
});