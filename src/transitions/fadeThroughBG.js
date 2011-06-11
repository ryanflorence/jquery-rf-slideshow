jQuery.ui.slideshow.defineTransition('fadeThrougBG', function (params){
	var half = params.duration / 2;
	params.next.hide();
	params.previous.fadeOut(half);
	setTimeout(function (){
		params.next.fadeIn(half);
	}, half);
});
