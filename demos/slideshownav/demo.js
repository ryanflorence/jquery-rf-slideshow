$(function(){
  $('#slideshow').slideshownav({
    transition: 'push(#{direction})',
    mode: 'vertical',
    navSelector: '> ul > li > a',
    duration: 400,
    autoPlay: false
  });
});
