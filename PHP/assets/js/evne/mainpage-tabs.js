jQuery(document).on('click', '.actionTab', function(event) {
	event.preventDefault();
	var selector = jQuery(this).attr('href'),
		tabs 	 = jQuery('.tab-content .tab-pane');

	jQuery('.nav-tabs li').removeClass('active'); jQuery(this).parent().addClass('active');
	tabs.removeClass('active').siblings(''+selector+'').addClass('active');
	maxHeight();
});