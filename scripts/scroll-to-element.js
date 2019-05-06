
function scrollToElement(options, callback) {

  var opt = {
    destination: null,
    duration: 200,
    delay: 0,
    easing: 'easeInOutQuad'
  };

  if (options.destination) opt.destination = options.destination;
  if (options.duration) opt.duration = options.duration;
  if (options.delay) opt.delay = options.delay;
  if (options.easing) opt.easing = options.easing;


  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  function doScroll() {

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0]
        .clientHeight;
    const destinationOffset =
      typeof destination === 'number' ? opt.destination : opt.destination.offsetTop;
    const destinationOffsetToScroll = Math.round(
      documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset
    );

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);

      if (callback) {
        callback();
      }

      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / opt.duration));
      const timeFunction = easings[opt.easing](time);

      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }

        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();

  }

  setTimeout(function() {
    doScroll();
  }, opt.delay);
}

export default scrollToElement;
