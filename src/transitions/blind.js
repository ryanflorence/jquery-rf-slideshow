jQuery.ui.slideshow.defineTransition('blind', function (params, dir, ease){
	var animation = {},
		css = { 'z-index': 2 },
		prop = (dir == 'left' || dir == 'right') ? 'left' : 'top';
	animation[prop] = '0%';
	css[prop] = (dir == 'left' || dir == 'up') ? '100%' : '-100%';
	params.next
		.css(css)
		.animate(animation, params.duration, ease);
});