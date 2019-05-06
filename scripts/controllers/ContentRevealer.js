import ScrollReveal from 'scrollreveal';
import { toArray } from '../utils';

function ContentRevealer(element) {

  var target = element.dataset.revealTarget;
  var style = element.dataset.reveal;
  var duration = element.dataset.revealDuration;
  var delay = element.dataset.revealDelay;

  if (target) {
    target = target.split(', ');
  } else {
    target = [];
    target.push('.' + toArray(element.classList).join('.'));
  }
  if (style) style = style.split(', ');
  if (duration) duration = duration.split(', ');
  if (delay) delay = delay.split(', ');


  const animation = {
    fade: {
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    },
    move: {
      duration: 400,
      interval: 100,
      viewFactor: .1,
      distance: '20px',
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    },
    zoom: {
      duration: 2000,
      viewFactor: .3,
      scale: '.95',
      distance: '20px',
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    },
    drop: {
      duration: 400,
      origin: 'top',
      distance: '20px',
      easing: 'cubic-bezier(0.5, 0, .3, 1)',
    }
  };


  var options = animation.move;

  target.forEach(function(name, i) {

    function pickAttribute(attribute) {
      var a;

      if (attribute) {
        if (attribute[i]) {
          a = attribute[i];
        } else if (attribute[0]) {
          a = attribute[0];
        }
      }

      return a;
    }

    var s = pickAttribute(style);

    if (s) {
      if (s == 'zoom') options = animation.zoom;
      if (s == 'drop') options = animation.drop;
    }

    if (duration) options.duration = parseInt(pickAttribute(duration));
    if (delay) options.delay = parseInt(pickAttribute(delay));

    ScrollReveal().reveal(name, options);

  });
}

export default ContentRevealer;
