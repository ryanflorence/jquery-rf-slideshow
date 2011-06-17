(function (jQuery){

var _map = {
	horizontal: { l: 'left', g: 'right'},
	vertical:   { l: 'up',   g: 'down' }
};

jQuery.widget( 'rf.slideshownav', jQuery.rf.slideshow, {
	options: {
		selector: '> div > *',
		navSelector: '> ul > li > a',
		transition: 'push(#{direction})',
		mode: 'horizontal',
		getTransition: function( index ){
			var direction = this.current < index ? _map[this.options.mode].l : _map[this.options.mode].g,
				transition = this.options.transition.replace( /#\{direction\}/g, direction );
			return { transition: transition };
		},
		autoPlay: false
	},

	setup: function(){
		var self = this;
		jQuery.rf.slideshow.prototype.setup.apply( this, arguments ); // apply super

		this.navs = this.element.find( this.options.navSelector )
			.map(function( index, node ){
				var el = jQuery( node );
				if (self.current === index) el.addClass( self.widgetBaseClass + '-current-nav' );
				return el.bind( 'click.' + self.widgetEventPrefix, function( event ){
					event.preventDefault();
					self._trigger('click');
					self.show( index, self.options.getTransition.call( self, index ) );
				});
			});

		// would rather have events for the widget, not totally excited
		// about routing through the element ... when in Rome :\
		this.element.bind({
			// there's a good chance these event names kill kittens ;_;
			'slideshownavshow': function( event, params ){
				self.navs[params.next.index].addClass( params.instance.widgetBaseClass + '-next-nav' );
				self.navs[params.previous.index]
					.removeClass( params.instance.widgetBaseClass + '-current-nav' )
					.addClass( params.instance.widgetBaseClass + '-previous-nav' );
			},

			// another kitten just died T_T
			'slideshownavcomplete': function( event, params ){
				self.navs[params.next.index]
					.removeClass( params.instance.widgetBaseClass + '-next-nav' )
					.addClass( params.instance.widgetBaseClass + '-current-nav' );
				self.navs[params.previous.index]
					.removeClass( params.instance.widgetBaseClass + '-previous-nav' );
				
			}
		});
	}

});

})(jQuery);