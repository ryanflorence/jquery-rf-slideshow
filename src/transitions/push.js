jQuery.ui.slideshow.defineTransition( 'blind', function (params, dir, ease){
	var prevAnimation = {},
		nextAnimation = {},
		prop = ( dir === 'left' || dir === 'right' ) ? 'left' : 'top',
		invert = ( dir === 'left' || dir === 'up' ) ? 1 : -1;

	next[prop] = '0%';
	prev[prop] = invert ? '-100%' : '100%';

	params.next
		.css( prop, invert ? '100%', '-100%' )
		.animate( prevAnimation, params.duration, ease );
	params.previous.animate( nextAnimation, params.duration, ease );
});