jQuery(document).ready(function($) {
	jQuery('.slick-bind').slick({
		dots:true,
		arrows:false,
		autoplay:true,
		speed:1000,
		cssEase:'cubic-bezier(0.86, 0, 0.07, 1)'
	});
	jQuery('.slider-product-content').slick({
		speed:1000,
		slidesToShow:4,
		autoplay:true,
		responsive: [
	    {
	      breakpoint: 800,
	      settings: {
	        slidesToShow: 3,
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        arrows:false
	      }
	    },
	    {
	      breakpoint: 450,
	      settings: {
	        slidesToShow: 1,
	        arrows:false
	      }
	    }
	  ]
	});
	// uncomment this section for turn on slider last order
	
	// jQuery('.slider-unit').slick({
	// 	autoplay:true,
	// 	slidesToShow:5,
	// 	speed:1000,
	// 	cssEase:'cubic-bezier(0.86, 0, 0.07, 1)',
	// 	responsive: [
	//     {
	//       breakpoint: 800,
	//       settings: {
	//         slidesToShow: 3,
	//       }
	//     },
	//     {
	//       breakpoint: 600,
	//       settings: {
	//         slidesToShow: 2,
	//       }
	//     },
	//     {
	//       breakpoint: 450,
	//       settings: {
	//         slidesToShow: 1,
	//       }
	//     }
	//   ]
	// })
});