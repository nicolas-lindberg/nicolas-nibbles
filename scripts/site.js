
/**
 * This script wrapped in a Immediately-Invoked Function Expression (IIFE) to
 * prevent variables from leaking onto the global scope. For more information
 * on IIFE visit the link below.
 * @see http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
 */

(function() {
  'use strict';

  // Load all images via Squarespace's Responsive ImageLoader
  function loadAllImages() {
    var images = document.querySelectorAll('img[data-src]');
    for (var i = 0; i < images.length; i++) {
      ImageLoader.load(images[i], {load: true});
    }
  }

  // The event subscription that loads images when the page is ready
  document.addEventListener('DOMContentLoaded', loadAllImages);

  // The event subscription that reloads images on resize
  window.addEventListener('resize', loadAllImages);


  document.getElementById('mobile-nav-toggle').addEventListener('click', function(el) {
    el.target.classList.toggle('is-visible');
    document.getElementById('site-nav').classList.toggle('is-visible');
    document.body.classList.toggle('no-scroll');
  });


  document.querySelectorAll('.text-highlighted, .image-caption').forEach(function(el) {
    el.innerHTML = el.innerText.split(' ').map(function(text) { return '<span>' + text + '</span>' }).join(' ');
  });


  document.querySelectorAll('.post-list__item').forEach(function(postItem) {
    postItem.querySelectorAll('.permalink').forEach(function(link) {

      link.addEventListener('mouseover', function() {
        postItem.classList.add('hover');
      });

      link.addEventListener('mouseout', function() {
        postItem.classList.remove('hover');
      });

    });
  });


}());
