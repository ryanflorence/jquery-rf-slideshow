jquery.ui.slideshow
-------------------

**Unreleased!** A fully supported version 1.0 is nigh, yeah, even at the doors.

Built upon the jQuery UI library, jquery.ui.slideshow is a super flexible, low-level slideshow.

Code is pretty much done, docs and demos forthcoming.

Copyright (c) Ryan Florence, MIT Style License

Quick Look
----------

### Instantiation

First you need some simple markup

```html
<!-- styling the height and width is important for some transitions -->
<div id="slideshow" style="width: 400px; height: 200px">
  <img src="../img/one.jpg">
  <img src="../img/two.jpg">
  <img src="../img/three.jpg">
  <img src="../img/four.jpg">
  <img src="../img/five.jpg">
</div>
```

Just like any other jQuery UI widget:

```javascript
$('#el').slideshow({
  duration: 400,
  delay: 3000,
  selector: '> img',
  transition: 'push(up, bounce)'
});
```

### Transitions

You can create your own transitions, which is what makes this script so awesome.

```javascript
jQuery.ui.slideshow.defineTransition('slide', function (params, dir, ease){
  var animation = {},
      prop = (dir == 'left' || dir == 'right') ? 'left' : 'top';
  animation[prop] = (dir == 'left' || dir == 'up') ? '-100%' : '100%';
  params.previous.animate(animation, params.duration, ease);
});
```

The name of a transition works like a function, but it's just a string.  You can allow for any number of arguments when creating a transition.

For instance, with the slide example:

```javascript
'slide(left)'
'slide(right)'
'slide(up)'
'slide(down)'
'slide(left, linear)'
'slide(left, bounce)'
// in other words
'slide([direction], [easing])'
```

Before this is released there will be a plethora of transitions to choose from.

### Methods

```javascript
var el = $('#el');
el.slideshow();
// I prefer to work with the object directly
var slideshow = el.data('slideshow');

// show an arbitrary slide by index
el.slideshow('show', 3);
// or
slideshow.show(3);

// show next slide
el.slideshow('show', 'next');
slideshow.show('next');

// show previous slide
el.slideshow('show', 'previous');
slideshow.show('previous');

// show and override the instance options
// note, this is one-time only, the instance options are not rewritten
el.slideshow('show', {transition: 'slide(left)', duration: 1000});
slideshow.show({transition: 'slide(left)', duration: 1000});

// play
el.slideshow('play');
slideshow.play();

// stop
el.slideshow('stop');
slideshow.stop();

// if you've added elements to the slideshow dynamically, set it up again
el.slideshow('setup');
slideshow.setup();

```
