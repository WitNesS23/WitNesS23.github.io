var menu_dispaly = false;

$("header nav ul li:last-child a").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	if (!menu_dispaly) {
		menu_dispaly = true;
		showMenu();
	} else {
		menu_dispaly = false;
		hideMenu();
	}
	// event.stopPropagation();
});

$(document).on('click', 'section', function(event) {
	event.preventDefault();
	/* Act on the event */
	if (menu_dispaly) {
		menu_dispaly = false;
		hideMenu();
	}
});

function showMenu() {
	$(".menu").animate({
		left: '80%'
	}, 1000);

	$(".btn-ham-wrap div:last-child").animate({
		textIndent: 0
	}, {
		step: function(now, fx) {
			$(this).css('-webkit-animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('-ms-animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('animation', 'rotateL 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
		},
		duration: 'slow'
	}, 1000);

	// $(".btn-ham-wrap div:last-child").addClass('rotateL-addClass');

	$(".btn-ham-wrap div").eq(1).animate({
		'opacity': '0'
	}, 1000);

	$(".btn-ham-wrap div:first-child").animate({
		textIndent: 0
	}, {
		step: function(now, fx) {
			$(this).css('-webkit-animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('-ms-animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('animation', 'rotateR 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
		},
		duration: 'slow'
	}, 1000);
}

function hideMenu() {
	$(".menu").animate({
		left: '100%'
	}, 1000);

	$(".btn-ham-wrap div:last-child").animate({
		textIndent: 0
	}, {
		step: function(now, fx) {
			$(this).css('-webkit-animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('-ms-animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('animation', 'rotateL_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
		},
		duration: 'slow'
	}, 1000);

	// $(".btn-ham-wrap div:last-child").removeClass('rotateL-addClass');

	$(".btn-ham-wrap div").eq(1).animate({
		'opacity': '1'
	}, 1000);

	$(".btn-ham-wrap div:first-child").animate({
		textIndent: 0
	}, {
		step: function(now, fx) {
			$(this).css('-webkit-animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('-ms-animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
			$(this).css('animation', 'rotateR_back 1s cubic-bezier(0.5, 0.2, 0.2, 1) forwards');
		},
		duration: 'slow'
	}, 1000);
}

// 浏览器兼容性问题
var isFF = navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;

// 当前显示界面
var showSection = 0;
var maxSection = $("section").length;

var scrollType = true;

var srcollHeight = $(window).height();

if (document.addEventListener) {
	document.addEventListener('DOMMouseScroll', changeSection, false);
} //W3C
window.onmousewheel = document.onmousewheel = changeSection; //IE/Opera/Chrome

// 滚轮滚动页面变化函数
function changeSection(e) {
	if (scrollType) {
		e = e || event;
		e.preventDefault();
		if (isFF) {
			// 处理Firefox浏览器下情况
			if (e.detail > 0) {
				// 向下滚动
				sectionDown();
			} else {
				// 向上滚动
				sectionUp();
			}
		} else {
			// 处理其他浏览器下的情况
			if (e.wheelDelta > 0) {
				// 向上滚动
				sectionUp();
			} else {
				// 向下滚动
				sectionDown();
			}
		}
	}
}

// 代码优化 避免浏览器判断
// function changeSection(e) {
// 	if(scrollType) {
// 		e = e || event;
// 		e.preventDefault();
// 		var wheelDirection = e.detail || -e.wheelDelta;
// 		if(wheelDirection){
// 			// 向下滚动
// 		}else{
// 			// 向上滚动
// 		}
// 	}
// }

function sectionDown() {
	if (maxSection === showSection + 1) {
		return false;
	} else {
		scrollType = false;
		$(".page-wrap").animate({
				'top': '-=' + srcollHeight + "px"
			},
			600,
			function() {
				showSection++;
				scrollType = true;
			});
	}
}

function sectionUp() {
	if (showSection === 0) {
		return false;
	} else {
		scrollType = false;
		$(".page-wrap").animate({
				'top': '+=' + srcollHeight
			},
			600,
			function() {
				showSection--;
				scrollType = true;
			});
	}
}

function throttle(fn, delay) {
	var timer = null;
	return function() {
		var context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, args);
		}, delay);
	};
};