jQuery.ui.slideshow.defineTransition( 'push', function (params, direction, ease){
	var nextAnimation = {},
		prevAnimation = {},
		css = { 'z-index': 2 },
		prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top',
		invert = ( direction === 'left' || direction === 'up' );

	nextAnimation[prop] = '0%';
	css[prop] = invert ? '100%' : '-100%';
	params.next
		.css( css )
		.animate( nextAnimation, params.duration, ease );

	prevAnimation[prop] = invert ? '-100%' : '100%';
	params.previous.animate( prevAnimation, params.duration, ease );
});