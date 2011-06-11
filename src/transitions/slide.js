jQuery.ui.slideshow.defineTransition('slide', function (params, dir, ease){
	var animation = {},
		prop = (dir == 'left' || dir == 'right') ? 'left' : 'top';
	animation[prop] = (dir == 'left' || dir == 'up') ? '-100%' : '100%';
	params.previous.animate(animation, params.duration, ease);
});
