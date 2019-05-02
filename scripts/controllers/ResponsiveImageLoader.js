import { ImageLoader, Tweak } from '@squarespace/core';
import debounce from 'lodash/debounce';

/**
 * Initialize Squarespace image loader
 */
function ResponsiveImageLoader(element) {

  // Load all images via Squarespace's Responsive ImageLoader
  function loadAllImages() {

    const images = element.querySelectorAll('img[data-src]');

    for (var i = 0; i < images.length; i++) {
      ImageLoader.load(images[i], {
        load: true
      });
    }
    
  }

  // The event subscription that loads images when the page is ready
  document.addEventListener('DOMContentLoaded', loadAllImages);

  // Tweak handler
  const tweaksFromDOM = element.getAttribute('data-tweaks');

  if (tweaksFromDOM && tweaksFromDOM.length > 0) {

    const tweaks = tweaksFromDOM.split(',').map(function (tweakName) {
      return tweakName.trim();
    });

    Tweak.watch(tweaks, loadAllImages);

  }

  // The event subscription that reloads images on resize
  const debouncedResize = debounce(loadAllImages, 40);
  window.addEventListener('resize', debouncedResize);
}

export default ResponsiveImageLoader;
