jQuery.ui.slideshow.defineTransitions({

	slide: function ( params, direction, ease ){
		var animation = {},
			prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top';
		animation[prop] = ( direction === 'left' || direction === 'up' ) ? '-100%' : '100%';
		params.previous.animate( animation, params.duration, ease );
	},

	slideFade: function( params, direction, ease){
		var animation = { opacity: 0 },
			prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top';
		animation[prop] = ( direction === 'left' || direction === 'up' ) ? '-100%' : '100%';
		params.previous.animate( animation, params.duration, ease );
	}

});
