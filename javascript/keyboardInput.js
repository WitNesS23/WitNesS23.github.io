(function($){
	$.fn.keyboardInput = function(options){
		/*
			container ： 打字效果的生效容器
			inputWords ；输入的内容
			keyword ： 换行标识符
			classStyle ： 打字效果样式情况
			animateInterval ： 新字符出现时间间隔
			blinkInterval ： 光标闪烁间隔
		*/
		var defaultConfig = {
			'container' : $(window),
			'inputWords' : null,
			'keyword' : '|',
			'classStyle' : ' white-space: nowrap;',
			'borderStyle' : '1px solid black',
			'animateInterval' : 150,
			'blinkInterval' : '0.3s'
		};

		var config = $.extend({}, defaultConfig, options || []);
		
		var arrInputWords = config.inputWords.split(config.keyword);

		var arrWordsContainer = [];

		config.classStyle += (' -webkit-animation : marker ' + config.blinkInterval + ' infinite;' + ' animation : marker ' + config.blinkInterval + ' infinite;');

		var delayTime = 0;

		for (var i = 0; i <= arrInputWords.length - 1; i++) {
			var _WP = {};

			// 不换行 注意
			_WP.dom = $('<span>', { 'id' : 'inputWordRow_' + i, 'class' : 'inputWordRow', 'style' : config.classStyle});
			config.container.append(_WP.dom).append($('<br />'));

			_WP.innerText = arrInputWords[i];

			if(i == 0){
				_WP.delayTime = 0;
				delayTime += (_WP.innerText.length + 1) * config.animateInterval;
			}else{
				_WP.delayTime = delayTime;
				delayTime += (_WP.innerText.length + 1) * config.animateInterval;
			}

			arrWordsContainer.push(_WP);
		}

		for (var i = 0; i <= arrWordsContainer.length - 1; i++){

			var _this = arrWordsContainer[i];

			(function(__this, _i){
				setTimeout(function(){
					innerIntervel(_i);
				}, __this.delayTime);
			})(_this, i);
		}

		function innerIntervel(i){
			var __index = 0;
			var _i = 2 * i + 1;
			$(".inputWordRow:nth-child("+ _i +")").css('border-right', config.borderStyle);
			var timerId = setInterval(function(){
				$(".inputWordRow:nth-child("+ _i +")").append(arrWordsContainer[i].innerText.charAt(__index));
				if(++__index === arrWordsContainer[i].innerText.length){
					timerId = null;
					if(arrInputWords.length - 1 > i ){
						$(".inputWordRow:nth-child("+ _i +")").css('border', 'none');
					}
				}
			}, config.animateInterval);
		}
	};
})(jQuery);