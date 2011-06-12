jQuery.ui.slideshow.defineTransitions({

	blind: function( params, dir, ease ){
		var animation = {},
			css = { 'z-index': 2 },
			prop = ( dir === 'left' || dir === 'right' ) ? 'left' : 'top';
		animation[prop] = '0%';
		css[prop] = ( dir === 'left' || dir === 'up' ) ? '100%' : '-100%';
		params.next
			.css( css )
			.animate( animation, params.duration, ease );
	},

	blindFade: function(){
		this.blind.apply( this, arguments );
		this.fade.apply( this, arguments );
	}

});
