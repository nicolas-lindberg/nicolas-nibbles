import ScrollReveal from 'scrollreveal';

function ContentRevealer(element) {

  var style = element.dataset.reveal;
  var target = element.dataset.revealTarget;
  var duration = parseInt(element.dataset.revealDuration);
  var delay = parseInt(element.dataset.revealDelay);
  
  target = target || element;

  const animation = {
    fade: {
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    },
    move: {
      viewFactor: .1,
      distance: '20px',
      duration: 400,
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
      interval: 100,
    },
    zoom: {
      viewFactor: .4,
      scale: '.95',
      distance: '20px',
      duration: 2000,
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    },
  }

  var options = animation.move;
  
  if (style == 'zoom') options = animation.zoom;

  if (duration) options.duration = duration;
  if (delay) options.delay = delay;

  ScrollReveal().reveal(target, options);
  
}

export default ContentRevealer;
