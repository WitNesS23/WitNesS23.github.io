$(".photo").on('click', function(event) {
	event.preventDefault();
	turn(this);
});	

// 1. 翻面控制
function turn(ele) {
	var cls = ele.className;
	if( /photo_front/.test(cls) ){
		cls = cls.replace(/photo_front/, 'photo_back');
	}else{
		cls = cls.replace(/photo_back/, 'photo_front');
	}
	return ele.className = cls;
}

// 3. 通用函数
function g(selector){
	var method = selector.substr(0,1) == '.'?'getElementByClassName':'getElementById';
	return document[method](selector.substr(1));
}

// 4. 输出所有的海报
var data = data;
function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html = [];

	for(s in data){
		var _html = template
						.replace("{{index}}", s)
						.replace("{{img}}", data[s].img)
						.replace("{{caption}}", data[s].caption)
						.replace("{{desc}}", data[s].desc);
		html.push(_html);
	}

	g('#warp').innerHTML = html.join(' ');

	rsort(2);
}
addPhotos();

// 5. 排序海报
function rsort(n){
	var photo_center = g("#photo_" + n);
	photo_center.className += 'photo_center';
}