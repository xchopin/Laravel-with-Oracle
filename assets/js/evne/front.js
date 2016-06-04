

jQuery(document).ready(function($) {


    // $('.list-mode').click(function(event) {
    // 	event.preventDefault();
    // 	$(this).addClass('active');
    // 	$('.grid-mode').removeClass('active');
    // });
    // $('.grid-mode').click(function(event) {
    // 	event.preventDefault();
    // 	$(this).addClass('active');
    // 	$('.list-mode').removeClass('active');
    // });

    // $('.choose-category').click(function(event) {
    // 	event.preventDefault();
    // 		var ob = $('.sub-categories');

	   //  	if(ob.hasClass('animation-sub') || ob.hasClass('back-animation-sub')){
		  //   	if(ob.hasClass('back-animation-sub'))
		  //   	{
		  //   		ob.removeClass('back-animation-sub').addClass('active animation-sub');
		  //   	}
		  //   	else{
			 //    	var el = ob;
				// 		el.removeClass('animation-sub').addClass('back-animation-sub');

				// 		setTimeout(function() {
				// 			el.removeClass('active back-animation-sub');
				// 		}, 900);
		  //   	}
	   //  	}
	   //  	else{
	   //  		ob.addClass('active animation-sub');
	   //  	}

    // 	$('.row-category').toggleClass('active');
    // });



	
	// $('.display-mobile').click(function(event) {
	// 	event.preventDefault();
	// 	$('.search-nav').toggleClass('active');
	// });
	// $('.mobile-cart').click(function(event) {
	// 	event.preventDefault();
	// 	$('.cart').toggleClass('active');
	// });
	// $('.mobile-enter').click(function(event) {
	// 	event.preventDefault();
	// 	$('.enter').toggleClass('active');
	// });

	// $('.all-categories').click(function(event) {
	// 	event.preventDefault();
	// 	$(this).toggleClass('active');
	// 	$('.main-nav-categories').toggleClass('active');
	// });

	//dropdown
	

});
// $(document).on('click', '.actionTab', function(event) {
// 	event.preventDefault();
// 	maxHeight();
// });
// $('.dropdown-toggle').dropdown();



// $(window).scroll(function(event) {

// 		if($("body").is(".about")) {
// 			if  ( $(this).scrollTop() > ( $('.about').offset().top - $('.about').height() -300 ) )  {
// 				$('.ico').addClass('active');
// 				$('.row-about').addClass('active');
// 			}
// 		}
// });
						//НУэно разобраться



// $('.sub-categories li a').click(function(event) {
// 	if($(window).width()<1000){
// 		event.preventDefault();
// 		var text = $(this).find('span').html();
// 		$('.change-name').html(text);
// 	}
// });
// $('.show-sort').click(function(event) {
// 	event.preventDefault();
// 	$(this).closest('.sort-by').find('.sort-content').toggleClass('active');
// 	$(this).closest('.sort-by').find('.sort-result').toggleClass('active');

// });
// $(document).on('click', '.sort-content a', function(event) {
// 	event.preventDefault();
// 	var text = $(this).html();
// 	$(this).closest('.sort-by').find('.sort-result').html(text);
// 	$(this).closest('.sort-by').find('.sort-content').removeClass('active');
// 	$(this).closest('.sort-by').find('.sort-result').toggleClass('active');
// });
// /***checkbox***/
// $(document).on('click', '.select-button', function(event) {
// 	event.preventDefault();
// 	var link = $(this).closest('.filter ').find('.name-filter .data');
// 	var data = $(this).closest('.filter-content.active').find('input[type=checkbox]:checked');
// 	link.html("");
// 	if(data.length == 0)
// 	{
// 		$(this).closest('.filter').removeClass('select-filter');
// 	}
// 	else {
// 		$(this).closest('.filter').addClass('select-filter');
// 		data.each(function(index, el) {
// 			var id = $(this).attr('id'),
// 				tx = $('label[for="'+id+'"]').html();
// 			if(index == 0)
// 				link.html(link.html() + ':' + tx);
// 			else {
// 				link.html(link.html() + ',' + tx);
// 			}
// 		});
// 		link.html(link.html() + '<img src="img/close.png" class="remove-filter">');
// 	}
// 	$(this).closest('.filter').find('.drop-filter').click();
// });
// /***remove checkbox***/
// $(document).on('click', '.remove-filter', function(event) {
// 	event.preventDefault();
// 	var ob = $(this).closest('a.drop-filter');
// 	var link = $(this).closest('.filter').removeClass('select-filter').find('.name-filter .data');
// 	$(this).closest('.filter').find('.filter-content').find('input[type=checkbox]:checked').click();
// 	link.html('');
// 	ob.click();
// });

// $('.drop-filter').click(function(event) {
// 	var flag = 0;
// 	if($(this).closest('.filter').hasClass('active')) {
// 		var flag = 1;
// 	}
// 	$('.filter').removeClass('active');
// 	$('.filter-content').removeClass('active');
// 	if(flag == 0)
// 		$(this).closest('.filter').addClass('active').find('.filter-content').addClass('active');
// });