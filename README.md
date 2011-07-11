jquery.rf.slideshow
-------------------

Built upon the jQuery UI library, jquery.rf.slideshow is a super flexible, low-level slideshow.

Copyright (c) Ryan Florence, MIT Style License

Demos / Docs
------------

* [Online Demos](http://ryanflorence.com/jquery-slideshow/).
* [Online Docs](http://ryanflorence.com/jquery-slideshow/docs/).

That website is just this repository, so you can clone the repository and open `index.html` in your browser as well.

Quick Look
----------

### Instantiation

First you need some simple markup

```html
<!-- styling the height and width is important for some transitions -->
<div id="slideshow" style="width: 400px; height: 200px">
  <img src="../img/one.jpg"> <!-- can have any kind of element, not just images -->
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
jQuery.rf.slideshow.defineTransition('slide', function (params, dir, ease){
  var animation = {},
      prop = (dir == 'left' || dir == 'right') ? 'left' : 'top';
  animation[prop] = (dir == 'left' || dir == 'up') ? '-100%' : '100%';
  params.previous.animate(animation, params.duration, ease);
});
```

The name of a transition works like a function, but it's just a string.  You can allow for any number of arguments when creating a transition.

Here are some example values for the transition option when using `slide`.

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
