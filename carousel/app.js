// Carousle类是整个界面的抽象
function Carousel(id) {
	this.ref = document.getElementById(id);

	this.index = 1;
	this.init();
}

// 对象初始化工具
Carousel.prototype.init = function(){

	var _carousel = this;

	$('.change-btns').on('click', 'div', function(e) {
		var changeBtnNum = this.innerHTML;
		if(_carousel.index > changeBtnNum){
			// 向后退效果
			_carousel.back(changeBtnNum);
		}else{
			// 向前进效果
			_carousel.forward(changeBtnNum, false);
		}
	});

	var t = setInterval(function(){
		_carousel.forward(++_carousel.index, true);
	}, 3000);
}

// 后退事件
Carousel.prototype.back = function(i){
	var _carousel = this;
	var changeLength = 300*(this.index - i);
	var changeLengthStr = '+=' + changeLength + 'px';
	$('.carousel-item').animate({ left : changeLengthStr},
		1000, function() {
			_carousel.index = i;
	});
}

// 前进事件
Carousel.prototype.forward = function(i, ai){
	var _carousel = this;
	if(i === 6){
		_carousel.index = 5;
		_carousel.back(1);
	}else{
		if(ai === true){
			var changeLength = 300;
		}else{
			var changeLength = 300*(i - this.index);
		}
		var changeLengthStr = '-=' + changeLength + 'px';
		$('.carousel-item').animate({ left : changeLengthStr},
			1000, function() {
				_carousel.index = i;
		});
	}
}