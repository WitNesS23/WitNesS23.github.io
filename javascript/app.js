// 菜单出现消失

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
	}, 1000, function(){
		// links按钮变化效果
		// 菜单折叠变化效果
		linksChange();
	});

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

function linksChange(){
	var cssrules = document.styleSheets[1].cssRules || document.styleSheets[1].rules || window.CSSRule.STYLE_RULE;
	var arr_links = [];
	for (var i = cssrules.length - 1; i >= 0; i--) {
		var _this = cssrules[i];
		if(_this.selectorText){
			if(_this.selectorText.indexOf(".links-wrap li:nth-child") == 0){
				var innerColor = _this.cssText.substring(_this.cssText.indexOf('rgb(') + 4, _this.cssText.indexOf(');'));
				arr_links.unshift(innerColor);
			}
		}
	};

	// 调试用数据
	console.log(arr_links);

	// arr_links = ["161, 178, 226", "200, 84, 243", "230, 90, 95"];

	var delayTime = 0;

	for (var i = 0; i < arr_links.length; i++) {
		var _i = i + 1,
			i_ = i;
		if(i !== 0){
			i_ = i - 1;
		}
		(function(i, _i, i_, _delayTime){
			setTimeout(function(){
				if(i !== 0){
					$(".links-wrap li:nth-child("+ i +") a").css('color', 'white').hover(function() {
						$(this).css('color', 'rgb(' + arr_links[i_] + ')');
					}, function() {
						$(this).css('color', 'white');
					});
				}
				$(".links-wrap li:nth-child("+ _i +") a").css('color', 'rgb(' + arr_links[i] + ')');

				if(_i === arr_links.length){
					setTimeout(function(){
						$(".links-wrap li:last-child a").css('color', 'white').hover(function() {
							$(this).css('color', 'rgb(' + arr_links[arr_links.length - 1] + ')');
						}, function() {
							$(this).css('color', 'white');
						});
					}, 500);
				}
			}, _delayTime);
			delayTime += 500;
		})(i, _i, i_, delayTime);
	}
}

function linksChangeHandler(index, colorHover){
	this.find('a').animate({
		textIndent: 0}, {
			step : function(now, fx){
				$(this).css('color', colorHover);
			},
			duration: '400',
			complete: function() {
				$(this).css('color', 'white');
				$(this).hover(function() {
					$(this).css('color', colorHover);
				}, function() {
					$(this).css('color', 'white');
				});
			}
		});
}

// 页面整体滚动

// 浏览器兼容性问题
var isFF = navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;

// 当前显示界面
var showSection = 0;
var maxSection = $("section").length;

var scrollType = true;

var srcollHeight = $(window).height();

// 代码优化 避免浏览器判断
// $(document).on("mousewheel DOMMouseScroll", changeSection);
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

if (document.addEventListener) {
	document.addEventListener('DOMMouseScroll', changeSection, false);
} //W3C
window.onmousewheel = document.onmousewheel = changeSection; //IE/Opera/Chrom

// 滚轮滚动页面变化函数
function changeSection(e) {
	if (scrollType) {
		e = e || event;
		e.preventDefault();
		if (isFF) {
			// 处理Firefox浏览器下情况
			if (e.detail > 0) {
				// 向下滚动
				sectionDown(0);
			} else {
				// 向上滚动
				sectionUp(0);
			}
		} else {
			// 处理其他浏览器下的情况
			if (e.wheelDelta > 0) {
				// 向上滚动
				sectionUp(0);
			} else {
				// 向下滚动
				sectionDown(0);
			}
		}
	}
}

function sectionDown(changeNum) {
	if(changeNum == 0){
		if(maxSection === showSection + 1){
			// 已经是最后一页
			return false;
		}else{
			scrollType = false;
			$(".page-wrap").animate({
					'top': '-=' + srcollHeight
				},
				600,
				function() {
					scrollPageCallBack(changeNum, false);
			});
		}
	}else{
		if(changeNum < showSection){
			sectionUp(changeNum);
		}else if(changeNum == showSection){
			// 跳回目前的画面
			return false;
		}else{
			scrollType = false;
			$(".page-wrap").animate({
					'top': '-=' + srcollHeight * (changeNum - showSection)
				},
				600 * (changeNum - showSection) ,
				function() {
					scrollPageCallBack(changeNum, false);
			});
		}
	}

	// scrollType = false;
	// $(".page-wrap").css({
	// 	'transition' : 'all 600ms',
	// 	'transform' : "translate3d(" + "0px, " + "-" + srcollHeight + "px, 0px" + ")"
	// });
}

function sectionUp(changeNum) {
	if(changeNum == 0){
		if(showSection === 0){
			// 已经是第一页
			return false;
		}else{
			scrollType = false;
			$(".page-wrap").animate({
					'top': '+=' + srcollHeight
				},
				600,
				function() {
					scrollPageCallBack(changeNum, true);
			});
		}
	}else{
		scrollType = false;
		$(".page-wrap").animate({
				'top': '+=' + srcollHeight * (showSection - changeNum)
			},
			600 * (showSection - changeNum) ,
			function() {
				scrollPageCallBack(changeNum, true);
		});
	}
}

// 翻页效果的回调函数
function scrollPageCallBack(changeNum, up){
	scrollType = true;
	showSection = changeNum == 0 ? (up == true ? showSection - 1 : showSection + 1) : changeNum;
	switch(showSection){
		case 1:
			// 技能树展示页面回调函数
			skillCallbackFun();
			break;
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

$(".sec-welcome .more-wrap").on('click', function(event){
	sectionDown(0);
});

$(".nav-wrap").on('click', 'li', function(event) {
	event.preventDefault();
	sectionDown($(this).index() + 1);
});

// 技能树页面

var config = {
	'container' : $('.sec-skilltree .typed-container'),
	'inputWords' : 'This is my Learning Process:|  · Learn C++, HTML in the first year of college|  · Understand data structure and T-SQL in the following year|  · Begin use C# and ASP.NET to finish the project|  · Now, HTML CSS JavaScript Node.JS, they are my lover ! ',
	'keyword' : '|',
	'classStyle' : 'font: normal 22px/2 \"Comic Sans MS\", cursive; color: white;',
	'animateInterval' : 100,
	'blinkInterval' : '0.2s'
};

var keyboardInputTime = 0;

function skillCallbackFun(){
	if(keyboardInputTime == 0){
		$(".sec-skilltree .typed-container").keyboardInput(config);
		keyboardInputTime++;
	}
	eyeBlinkWrap();
}

