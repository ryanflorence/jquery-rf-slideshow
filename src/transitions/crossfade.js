jQuery.ui.slideshow.defineTransition( 'crossfade', function (params){
	params.next.hide().fadeIn( params.duration );
	params.previous.fadeOut( params.duration );
});
