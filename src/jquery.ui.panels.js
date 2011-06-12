(function (jQuery){

jQuery.widget( 'ui.panels', jQuery.ui.slideshow, {
	options: {
		selector: '> div > *',
		navSelector: '> ul > li > a',
		transition: 'push(#{direction})',
		autoplay: false
	}
});

// janky, widget ought to provide some way to call super
// or some sort of method duck-punching
var proto = jQuery.ui.panels.prototype,
	__setup = proto.setup;

jQuery.extend(proto, {

	setup: function(){
		__setup.apply(this, arguments); // apply super
		var self = this;

		this.navs = this.element.find( this.options.navSelector )
			.map(function( index, node ){
				return jQuery( node ).bind( 'click.panels', function( event ){
					event.preventDefault();
					var t = self.calculateTransition( index );
					self.show( index, t );
				});
			});

		this.element.bind({
			show: function( params ){
				self.navs[params.next.index].addClass( 'ui-panels-next' );
				self.navs[params.previous.index]
					.removeClass( 'ui-panels-current' )
					.addClass( 'ui-panels-previous' );
			},

			showComplete: function( params ){
				self.navs[params.next.index]
					.removeClass( 'ui-panels-next' )
					.addClass( 'ui-panels-current' );
				self.navs[params.previous.index]
					.removeClass( 'ui-panels-previous' );
				
			}
		});
	},

	calculateTransition: function( index ){
		var direction = this.current < index ? 'left' : 'right',
			transition = this.options.transition
				.replace( /#\{direction\}/g, direction );
		return { transition: transition };
	}

});

})(jQuery);