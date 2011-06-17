// crazy awesome custom transition
// slideshow ships with plenty of defaults
// (push, slide, blind, fade, crossfade, etc.)
// but you can define your own for awesome
$.rf.slideshow.defineTransition( 'food', function( params, direction ){
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

  var el = $('#slideshow');

  // create a slideshownav instance and then pull the instance
  // out of the element data
  slideshow = el.slideshownav({
    transition: 'food(left)',
    selector: '.slide',
    duration: 1500,
    delay: 4000,
    autoPlay: true
  }).data('slideshownav');

  // bind the click event of the slideshownav object on the element
  el.bind('slideshownavclick', function (){
    // manage the state of the slideshow object
    // (after click, quit autoplay)
    slideshow.stop();
    // dynamically figure out the direction
    slideshow.options.transition = 'food(#{direction})';
  });

});