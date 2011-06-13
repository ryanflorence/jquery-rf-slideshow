(function ( jQuery ){

jQuery.widget('ui.slideshow', {

	options: {
		transition: 'fade',
		selector: '> *',
		initialIndex: 0,
		autoStyle: true,
		autoPlay: true,
		delay: 3000,
		duration: 400
	},

	_init: function(){
		if ( this.options.autoStyle ){
			if ( this.element.css('position') === 'static' ) {
				this.element.css( 'position', 'relative' );
			}
			this.element.css( 'overflow', 'hidden' );
		}
		this.transitioning = false;
		this.setup();
		if ( this.options.autoPlay ) this.play();
	},

	setup: function(){
		this.slides = this.element.find( this.options.selector ).map(function( i, node ){
			return jQuery( node );
		});
		this.current = this.current || this.options.initialIndex;
		this._setupSlides();
	},

	show: function( what, options ){
		var index = ( typeof what === 'number' ) ? what : this['_' + what]();
		if ( this.transitioning || this.current === index ) return;

		var opts = jQuery.extend( {}, this.options, options ),
			trans = this._parseTransition( opts.transition ),
			next = this._prepNext( index ),
			prev = this._prepPrevious( this.current );
			eventData = {
				previous: {
					element: prev,
					index: prev.data( 'slideshow:index' )
				},
				next: {
					element: next,
					index: index
				}
			};

		this.transitioning = true;
		this.current = index;

		next.addClass( 'ui-slideshow-next' );
		prev.addClass( 'ui-slideshow-previous' );
		this.element.addClass( 'ui-slideshow-transitioning' );

		trans.args.unshift({
			previous: prev,
			next: next,
			duration: opts.duration,
			instance: this
		});

		this._trigger( 'show', null, eventData );
		_transitions[trans.name].apply( _transitions, trans.args );

		setTimeout(jQuery.proxy(function(){
			this.transitioning = false;
			next.removeClass( 'ui-slideshow-next' )
				.addClass( 'ui-slideshow-current' );
			prev.removeClass( 'ui-slideshow-previous' )
				.css( 'display', 'none' );
			this.element.removeClass( 'ui-slideshow-transitioning' );
			this._trigger( 'showComplete', null, eventData );
		}, this), opts.duration);

		return this;
	},

	play: function( now ){
		this.timer = setInterval(jQuery.proxy(function(){
			this.show( 'next' );
		}, this), this.options.delay);
		if ( now ) this.show( 'next' );
		return this;
	},

	stop: function(){
		clearInterval( this.timer );
		return this;
	},

	// internal & private, no backwards compatibily promised, use/extend at own risk
	_parseTransition: function( transition ){
		var matches = transition.match( /(.+)(\((.+)\))|(.+)/ );
		return matches[4] ? {
			name: matches[4],
			args: []
		} : {
			name: matches[1],
			args: jQuery.map( matches[3].split( ',' ), function( arg ){
				var trimmed = jQuery.trim( arg ),
					parsed = parseFloat( trimmed );
				if ( trimmed === 'true' ) return true;
				if ( trimmed === 'false' ) return false;
				if ( trimmed === '' || trimmed === 'undefined' ) return undefined;
				if ( trimmed === 'null' ) return null;
				if ( !isNaN( parsed ) ) return parsed;
				return trimmed;
			})
		};
	},

	_next: function(){
		return this.current === this.slides.length - 1 ? 0 : this.current + 1;
	},

	_previous: function(){
		return this.current === 0 ? this.slides.length - 1 : this.current - 1;
	},

	_styles: { left: 0, top: 0, position: 'absolute' },

	_prepNext: function( i ){
		var slide = this.slides[i],
			style = slide.data( 'slideshow:style' ),
			css = {
				display: '',
				'z-index': 0
			};
		if ( this.options.autoStyle ) jQuery.extend( css, this._styles );
		return slide.attr( 'style', style ).css( css );
	},

	_prepPrevious: function( i ){
		this._storeStyles( i );
		return this.slides[i].css( 'z-index', 1 );
	},

	_storeStyles: function( i ){
		this.slides[i].data( 'slideshow:style', this.slides[i].attr( 'style' ) || '' );
	},

	_setupSlides: function(){
		for ( var i = 0, l = this.slides.length, slide; i < l; i++ ) {
			slide = this.slides[i];
			this._storeStyles( i );
			slide.data( 'slideshow:index', i );
			if ( this.options.autoStyle ) slide.css( this._styles );
			slide.css( 'display', i === this.current ? '' : 'none' );
		}
	}

});

// transition definition "static" methods
var _transitions = {};

jQuery.ui.slideshow.defineTransition = function( name, transition ){
	_transitions[name] = transition;
};

jQuery.ui.slideshow.defineTransitions = function( transitions ){
	jQuery.each( transitions, function ( name, transition ){
		jQuery.ui.slideshow.defineTransition( name, transition );
	});
};

// default transitions
jQuery.ui.slideshow.defineTransitions({

	none: function( params ){
		params.previous.css( 'display', 'none' );
	},

	fade: function( params ){
		params.previous.fadeOut( params.duration );
	},

	crossfade: function ( params ){
		params.next.hide().fadeIn( params.duration );
		params.previous.fadeOut( params.duration );
	},

	fadeThroughBackground: function ( params ){
		var half = params.duration / 2;
		params.next.hide();
		params.previous.fadeOut( half );
		setTimeout(function (){
			params.next.fadeIn( half );
		}, half);
	},

	blind: function( params, direction, fade, ease ){
		var animation = {},
			css = { 'z-index': 2 },
			prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top';
		animation[prop] = '0%';
		css[prop] = ( direction === 'left' || direction === 'up' ) ? '100%' : '-100%';
		params.next.css( css ).animate( animation, params.duration, ease );
		if (fade) this.fade.apply( this, arguments );
	},

	slide: function ( params, direction, fade, ease ){
		var animation = {},
			prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top';
		animation[prop] = ( direction === 'left' || direction === 'up' ) ? '-100%' : '100%';
		if (fade) animation.opacity = 0;
		params.previous.animate( animation, params.duration, ease );
	},

	push: function (params, direction, ease){
		var nextAnimation = {},
			prevAnimation = {},
			css = { 'z-index': 2 },
			prop = ( direction === 'left' || direction === 'right' ) ? 'left' : 'top',
			invert = ( direction === 'left' || direction === 'up' );

		nextAnimation[prop] = '0%';
		css[prop] = invert ? '100%' : '-100%';
		prevAnimation[prop] = invert ? '-100%' : '100%';

		params.next.css( css ).animate( nextAnimation, params.duration, ease );
		params.previous.animate( prevAnimation, params.duration, ease );
	}
});

})(jQuery);
