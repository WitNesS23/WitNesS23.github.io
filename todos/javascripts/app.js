var main_list_dels = document.getElementsByClassName('main_list_del');
var main_list_ul = document.getElementsByClassName('main_list_ul')[0];

for(var i = 0; i < main_list_dels.length; i++){
	var main_list_del = main_list_dels[i];
	main_list_del.addEventListener('click',function(e){
		var main_list_item = e.parentNode;
		main_list_item.parentNode.removeChild(main_list_item);
	},false);
}