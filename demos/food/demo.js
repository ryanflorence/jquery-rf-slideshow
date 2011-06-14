$.ui.slideshow.defineTransition( 'food', function( params, direction ){
	var half = params.duration / 2,
		opp = direction === 'right' ? -1 : 1,
		width = params.instance.element.width();

	params.next.find( 'img' ).each(function( i, node ){
		var el = $(node),
			data = el.data( direction ).split( ':' ),
			delay = parseInt( data[1], 10 ) / 100,
			to = parseInt( data[0], 10 ) + width,
			old = parseInt( el.css( 'left' ), 10 );

		el.css('left', (to * opp) + 'px' );
		setTimeout(function (){
			el.animate( {left: old + 'px'}, half );
		}, half + (half * delay) );
	});
	
	params.previous.find( 'img' ).each(function( i, node ){
		var el = $(node),
			data = el.data( direction ).split( ':' ),
			delay = parseInt( data[1], 10 ) / 100,
			to = parseInt( data[0], 10 ) + width,
			old = el.css( 'left' );

		setTimeout(function (){
			el.animate( {left: (to * -opp) + 'px'}, half );
		}, half * delay );

		setTimeout(function (){
			el.css( 'left', old );
		}, params.duration + 15);
	});
});


var slideshow;

$(function(){
	$('html').removeClass('no-js').removeClass('not-ready');

	slideshow = $('#slideshow').slideshownav({
		transition: 'food(#{direction})',
		selector: '.slide',
		duration: 1500,
		autoPlay: false
	}).data('slideshow');
	
});