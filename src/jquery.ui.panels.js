(function (jQuery){

jQuery.widget( 'ui.panels', jQuery.ui.slideshow, {
	options: {
		selector: '> div > *',
		navSelector: '> ul > li > a',
		transition: 'push(#{direction})',
		getTransition: function( index ){
			var direction = this.current < index ? 'left' : 'right',
				transition = this.options.transition
					.replace( /#\{direction\}/g, direction );
			return { transition: transition };
		},
		autoPlay: false
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
					self.show( index, self.options.getTransition.call( self, index ) );
				});
			});

		this.element.bind({
			'panelsshow': function( event, params ){
				console.log(params)
				self.navs[params.next.index].addClass( params.instance.widgetBaseClass + '-next' );
				self.navs[params.previous.index]
					.removeClass( params.instance.widgetBaseClass + '-current' )
					.addClass( params.instance.widgetBaseClass + '-previous' );
			},

			'panelscomplete': function( event, params ){
				self.navs[params.next.index]
					.removeClass( params.instance.widgetBaseClass + '-next' )
					.addClass( params.instance.widgetBaseClass + '-current' );
				self.navs[params.previous.index]
					.removeClass( params.instance.widgetBaseClass + '-previous' );
				
			}
		});
	}

});

})(jQuery);