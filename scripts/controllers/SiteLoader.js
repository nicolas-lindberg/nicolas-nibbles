import controller from '@squarespace/controller';
import { Lifecycle, Tweak } from '@squarespace/core';
import Mercury from '@squarespace/mercury';
import toggleMenu from '../hamburger-menu';

function SiteLoader(element) {

  const isAjaxEnabled = Tweak.getValue('tweak-site-ajax-loading-enable') === 'true' ? true : false;

  // Exceptions: external links, hash links
  const onClickExceptions = [
    '[data-no-ajax]'
  ];

  // Exceptions after making the request. Does a string match for any of these
  // in the responseText
  const onRequestExceptions = [
    'sqs-slide-container'
  ];

  // updateMatrix indicates which elements need to be updated on load. You can
  // choose whether to update attributes, replace HTML, or both.
  const updateMatrix = [
    { selector: 'title', updateHTML: true },
    { selector: 'meta[property="og:title"]', updateAttrs: true },
    { selector: 'meta[property="og:latitude"]', updateAttrs: true },
    { selector: 'meta[property="og:longitude"]', updateAttrs: true },
    { selector: 'meta[property="og:url"]', updateAttrs: true },
    { selector: 'meta[property="og:type"]', updateAttrs: true },
    { selector: 'meta[property="og:description"]', updateAttrs: true },
    { selector: 'meta[property="og:image"]', updateAttrs: true },
    { selector: 'meta[itemprop="name"]', updateAttrs: true },
    { selector: 'meta[itemprop="url"]', updateAttrs: true },
    { selector: 'meta[itemprop="description"]', updateAttrs: true },
    { selector: 'meta[itemprop="thumbnailUrl"]', updateAttrs: true },
    { selector: 'meta[itemprop="image"]', updateAttrs: true },
    { selector: 'meta[name="twitter:title"]', updateAttrs: true },
    { selector: 'meta[name="twitter:image"]', updateAttrs: true },
    { selector: 'meta[name="twitter:url"]', updateAttrs: true },
    { selector: 'meta[name="twitter:card"]', updateAttrs: true },
    { selector: 'meta[name="twitter:description"]', updateAttrs: true },
    { selector: 'meta[name="twitter:url"]', updateAttrs: true },
    { selector: 'meta[name="description"]', updateAttrs: true },
    { selector: 'link[rel="canonical"]', updateAttrs: true },
    { selector: 'link[rel="image_src"]', updateAttrs: true },
    { selector: 'link[rel="alternate"]', updateAttrs: true },
    { selector: 'body', updateAttrs: true },
    { selector: '.site-menu', updateHTML: true },
    { selector: '.footer-nav', updateHTML: true },
    { selector: '.content-container', updateHTML: true, updateAttrs: true }
  ];

  if (isAjaxEnabled) {
    const mercury = new Mercury({
      enableCache: true,
      updateMatrix: updateMatrix,
      onClickExceptions: onClickExceptions,
      onRequestExceptions: onRequestExceptions,
      onLoadDelay: 500,
      onLoad: () => {
        document.documentElement.setAttribute('data-mercury-loading', 'done');

        setTimeout(function() {
          document.documentElement.removeAttribute('data-mercury-loading');
        }, 500);

        Lifecycle.init();

        controller.refresh();
      },
      onUnload: (e) => {
        document.documentElement.setAttribute('data-mercury-loading', 'start');

        Lifecycle.destroy();
      },
      onNavigate: () => {
        document.documentElement.setAttribute('data-mercury-loading', '');

        toggleMenu(false);
      }
    });
  }

  window.addEventListener('template:blogList.load', function() {
    mercury.commitCacheEntry(window.location.pathname + window.location.search, '.content-container');
  });

}

export default SiteLoader;
