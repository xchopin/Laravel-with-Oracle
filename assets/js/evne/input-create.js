jQuery(document).ready(function($) {

	jQuery('input').focus(function(event) {
		if(jQuery(this).closest('.my-account').length == 0) {
			jQuery(this).siblings('.placeholder').hide();

			var value = jQuery(this).val();

			if (value.length > 0) {
				jQuery(this).siblings('.placeholder').hide();
			};
		}
	});

	jQuery('input').blur(function(event) {
		if(jQuery(this).closest('.my-account').length == 0)
		{
			jQuery(this).siblings('.placeholder').show();

			var value = jQuery(this).val();

			if(value.length > 0) {
				jQuery(this).siblings('.placeholder').hide();
			};
		}
	});


	// chech all input for all time
	if(jQuery('.my-account').length == 0)
	{
		setInterval(function(){
			jQuery('input').each(function(){
				jQuery(this).siblings('.placeholder').show();

				var value = jQuery(this).val();

				if(value.length > 0) {
					jQuery(this).siblings('.placeholder').hide();
				};
			});
		}, 1000);
	}
});