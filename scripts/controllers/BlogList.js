import { Tweak, ImageLoader } from '@squarespace/core';
import { resizeEnd, scroll } from '../utils';

const loadEvent = new CustomEvent('template:blogList.load');

function BlogList(element) {

  // Get elements from DOM
  const blogListInner = element.querySelector('.blog-list__inner');
  const loadMoreButton = element.querySelector('.blog-list-load');

  // Load next boolean, used by load function
  let loadNext;

  // Infinite scroll value
  const infiniteScroll = Tweak.getValue('tweak-blog-list-load') === 'Infinite Scroll';

  let edge;


  // ---------------------------------


  const sync = function () {

    const posts = Array.prototype.slice.call(blogListInner.querySelectorAll('.post-list__item'));


    // var isFine = false
    // var fineIndex = 0
    // while(!isFine) {

    //   // checking each row
    //   // if something isn't fine
    //     // get replacment
    //     // set current index
    //     // continue
    //   // if everything is fine change isFine variable

    //   ..loops

    //   isFine = true
    // }

    const isFeatured = function(el) {
      return el.classList.contains('featured');
    };

    const arrayMove = function(arr, fromIndex, toIndex) {
      var el = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, el);
    };

    function organizePosts(items, columns) {

      var position = 0;

      items.forEach(function(item, i) {

        position++; // handles the item's row position

        // if need to bring up not featured post
        if (isFeatured(item)) {

          if (position === 2) {

            // switch place with post above
            var switchItem = items[i - 1]
            items[i - 1] = item;
            items[i] = switchItem;

          } else if (position !== 1) {

            // loop through next posts
            for (let n = i + 1; n < items.length; n++) {
              // if it's not featured, move up that post
              if (!isFeatured(items[n])) {
                arrayMove(items, n, i);
                break;
              }
            }

          }

        }

        // if row is full, or if it's a featured post, reset position
        if (position === columns || (isFeatured(item) && position === 1)) {
          // row is fine, reset
          position = 0;
        }

      });

    }

    if (window.innerWidth >= 768) {
      var columns = 2;

      if (window.innerWidth >= 1600) {
        columns = 3;
      }
      organizePosts(posts, columns);
    }

    posts.forEach(function(item, i) {
      item.style.order = i + 1;

      const image = item.querySelector('.post-image img[data-src]');

      if (image) {
        ImageLoader.load(image, {
          load: true
        });
      }
    });

    // Sync last page data
    if (blogListInner.querySelector('[data-last-page]')) {
      loadNext = false;
      element.setAttribute('data-last-page-reached', '');
    } else {
      loadNext = true;
    }

    // Sync load edge for infinite scroll
    if (infiniteScroll) {
      edge = blogListInner.getBoundingClientRect().bottom + window.pageYOffset;
    }

  };


  // --------------------------------


  const load = function () {

    if (!loadNext) { return false; }

    // Set loadNext to false so simultaneous loads don't happen
    loadNext = false;

    // Get offset from last blog list item on page
    const blogListItems = blogListInner.querySelectorAll('.post-list__item');
    const offset = blogListItems[blogListItems.length - 1].getAttribute('data-offset');

    // Construct URL for request
    const url = [
      window.location.pathname,
      window.location.search,
      window.location.search ? '&' : '?',
      'offset=',
      offset,
      '&format=main-content'
    ].join('');

    // Request
    const request = new XMLHttpRequest();
    request.onreadystatechange = function (e) {

      if (e.target.readyState !== XMLHttpRequest.DONE || e.target.status !== 200) {
        return;
      }

      try {

        // Insert html
        blogListInner.insertAdjacentHTML('beforeend', e.target.responseText);

        // Sync
        sync();

        // Add to mercury cache
        window.dispatchEvent(loadEvent);

        // Allow loads again if not last page
        if (!blogListInner.querySelector('[data-last-page]')) {
          loadNext = true;
        }

      } catch (err) {

        console.error('ERROR:', err);

      }

    };
    request.open('GET', url, true);
    request.send();

  };


  // ---------------------------------

  const loadMoreClick = function (e) {
    e.preventDefault();
    load();
  };


  // ---------------------------------


  const bindListeners = function () {

    Tweak.watch(sync);

    scroll(function() {
      if (infiniteScroll && window.pageYOffset + window.innerHeight * 2 > edge) {
        load();
      }
    });

    resizeEnd(sync);

    loadMoreButton.addEventListener('click', loadMoreClick);

  };


  // --------------------------------


  const destroy = function () {

    // NOTE:
    // Functionality that is bound using the Template.Util convenience methods
    // resizeEnd and scroll are automatically unbound on mercury:unload and
    // rebound on mercury:load.

    // Load on click of load more button
    loadMoreButton.removeEventListener('click', loadMoreButton);

  };


  // ---------------------------------

  // Init

  bindListeners();
  sync();

  return {

    sync: sync,
    destroy: destroy

  };

}

export default BlogList;
