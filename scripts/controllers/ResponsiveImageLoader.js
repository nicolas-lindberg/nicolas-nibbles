import { ImageLoader, Tweak } from '@squarespace/core';
import { resizeEnd } from '../utils';

/**
 * Initialize Squarespace image loader
 */
function ResponsiveImageLoader(element) {

  // Load all images via Squarespace's Responsive ImageLoader
  function loadAllImages() {

    const images = element.querySelectorAll('img[data-src]');

    images.forEach(function(image)  {
      ImageLoader.load(image, {
        load: true
      });
    });
    
  }
  
  loadAllImages();

  // The event subscription that loads images when the page is ready
  document.addEventListener('DOMContentLoaded', loadAllImages);

  // Bind resize handler
  resizeEnd(loadAllImages, element);

  // Tweak handler
  const tweaksFromDOM = element.getAttribute('data-tweaks');

  if (tweaksFromDOM && tweaksFromDOM.length > 0) {

    const tweaks = tweaksFromDOM.split(',').map(function(tweakName) {
      return tweakName.trim();
    });

    Tweak.watch(tweaks, loadAllImages);

  }

}

export default ResponsiveImageLoader;
