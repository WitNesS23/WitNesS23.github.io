+function(){
	// g(".photo")[0].addEventListener("click", function(e){
	// 	turn(this);
	// }, false);
	
	addPhotos();

	var photo_length = g(".photo").length;
	for (var i = photo_length - 1; i >= 0; i--) {
		g(".photo")[i].addEventListener("click" ,function(e){
			turn(this);
		}, false);
	}

}();

// 1. 翻面控制
function turn(ele) {
	var cls = ele.className;
	var n = ele.id.split("_")[1];

	if( !/photo_center/.test(cls) ){
		return rsort(n);
	}

	if( /photo_front/.test(cls) ){
		cls = cls.replace(/photo_front/, 'photo_back');
		g("#nav_" + n).className += ' i_back ';
	}else{
		cls = cls.replace(/photo_back/, 'photo_front');
		g("#nav_" + n).className = g("#nav_" + n).className.replace(/\s*i_back\s*/, ' ');
	}
	return ele.className = cls;
}

// 3. 通用函数
function g(selector){
	var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}

// 4. 输出所有的海报
var data = data;
function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html = [];
	var nav = [];

	for(s in data){
		var _html = template
						.replace("{{index}}", s)
						.replace("{{img}}", data[s].img)
						.replace("{{caption}}", data[s].caption)
						.replace("{{desc}}", data[s].desc);
		html.push(_html);

		nav.push('<span id="nav_' + s + '" class="i" onclick = "turn( g(\'#photo_' + s + '\') )" >&nbsp;</span>');
	}

	html.push('<div class = "nav">' + nav.join(' ') + '</div>');

	g('#wrap').innerHTML = html.join(' ');

	rsort(ranNum([0, data.length - 1]));
}

// 5. 排序海报
function rsort(n){

	var _photo = g(".photo");
	var photoArr = [];

	for (var i = 0; i < _photo.length; i++) {
		_photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/, " ");
		_photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/, " ");
		_photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/, " ");

		_photo[i].className += ' photo_front';

		_photo[i].style.left = "";
		_photo[i].style.top = "";
		_photo[i].style["-webkit-transform"] = 'rotate(0deg) scale(1.3)';

		photoArr.push(_photo[i]);
	};

	var photo_center = g("#photo_" + n);
	photo_center.className += ' photo_center';

	photoArr.splice(n, 1);

	// 把海报分为左右两个部分
	var photos_left = photoArr.splice(0, Math.ceil(photoArr.length/2))
		photos_right = photoArr;

	var ranges = range();

	for (s in photos_left) {
		var photo = photos_left[s];

		photo.style.left = ranNum(ranges.left.x) + 'px';
		photo.style.top = ranNum(ranges.left.y) + 'px';

		photo.style['-webkit-transform'] = 'rotate(' + ranNum([-150,150]) + 'deg) scale(1)';
	};

	for (s in photos_right) {
		var photo = photos_right[s];

		photo.style.left = ranNum(ranges.right.x) + 'px';
		photo.style.top = ranNum(ranges.right.y) + 'px';

		photo.style['-webkit-transform'] = 'rotate(' + ranNum([-150,150]) + 'deg) scale(1)';
	}

	var navs = g('.i');
	for (var i = navs.length - 1; i >= 0; i--) {
		navs[i].className = navs[i].className.replace(/\s*i_current\s*/, ' ');
		navs[i].className = navs[i].className.replace(/\s*i_back\s*/, ' ');
	};

	g("#nav_" + n).className += ' i_current ';
}

// 6. 计算左右分区的范围 { left:{ x:[min, max], y: []}, right:{ x:[min, max], y[]} }
function range(){
	var range = { left:{ x:[], y:[]}, right:{ x:[], y:[]} };

	var wrap = {
			w : g("#wrap").clientWidth,
			h : g("#wrap").clientHeight
		},
		photo = {
			w : g(".photo")[0].clientWidth,
			h : g(".photo")[0].clientHeight
		};

	range.left.x = [ 0 - photo.w/2, wrap.w/2 - photo.w/2],
	range.left.y = [ 0 - photo.h/2, wrap.h - photo.h/2],
	range.right.x = [ wrap.w/2 + photo.w/2  , wrap.w + photo.w/2],
	range.right.y = [ 0 - photo.h/2, wrap.h - photo.h/2];


	return range;
}

// 随机数生成函数
function ranNum(intArr){
	var intMax = Math.max(intArr[0], intArr[1])
		intMin = Math.min(intArr[0], intArr[1]);

	if(intMax == intMin){
		return intMax;
	}else{
		return Math.round(Math.random() * (intMax - intMin) + intMin);
	}
}


// function picGallery(options){
// 	var defaultConfig = {
// 		picArr : null,
// 		animateTime : 300,
// 		transitionTime : 600
// 	};

// 	var config = options && defaultConfig;
// }