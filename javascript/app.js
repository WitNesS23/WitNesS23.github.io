var menu_dispaly = false;

$("header nav ul li:last-child a").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	if(!menu_dispaly){
		menu_dispaly = true;
		showMenu()
	}else{
		menu_dispaly = false;
		hideMenu();
	}
	// event.stopPropagation();
});

$(document).on('click', 'section', function(event) {
	event.preventDefault();
	/* Act on the event */
	if(menu_dispaly){
		menu_dispaly = false;
		hideMenu();
	}
});

function showMenu(){
	$(".menu").animate({
			left : '80%' },1000);

	$(".btn-ham-wrap div:last-child").animate({ textIndent: 0}, {
		step: function(now, fx){
			$(this).css('-webkit-animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('-ms-animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
		},
		duration: 'slow'
	}, 1000);

	$(".btn-ham-wrap div").eq(1).animate({
		'opacity' : '0'
	}, 1000);

	$(".btn-ham-wrap div:first-child").animate({ textIndent: 0}, {
		step: function(now, fx){
			$(this).css('-webkit-animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('-ms-animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
		},
		duration: 'slow'
	}, 1000);
}

function hideMenu(){
	$(".menu").animate({
			left : '100%' },1000);

	$(".btn-ham-wrap div:last-child").animate({ textIndent: 0}, {
		step: function(now, fx){
			$(this).css('-webkit-animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('-ms-animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
		},
		duration: 'slow'
	}, 1000);

	$(".btn-ham-wrap div").eq(1).animate({
		'opacity' : '1'
	}, 1000);

	$(".btn-ham-wrap div:first-child").animate({ textIndent: 0}, {
		step: function(now, fx){
			$(this).css('-webkit-animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('-ms-animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
			$(this).css('animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards'); 
		},
		duration: 'slow'
	}, 1000);
}