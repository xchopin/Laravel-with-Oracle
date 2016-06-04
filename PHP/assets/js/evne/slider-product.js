jQuery(document).ready(function($) {
	jQuery('.init-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.nav-init',
		arrows:false
	});
	jQuery('.nav-init').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		// arrows:false,
		asNavFor: '.init-slider',
		focusOnSelect: true,
		responsive: [
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 400,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});
});