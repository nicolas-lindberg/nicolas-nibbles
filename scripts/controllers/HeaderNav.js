
/**
 * Functionality for header navigation
 */
function HeaderNav(element) {

  element.querySelector('#mobile-nav-toggle').addEventListener('click', function(el) {
    el.target.classList.toggle('is-visible');
    element.querySelector('#site-nav').classList.toggle('is-visible');
    document.body.classList.toggle('no-scroll');
  });

}

export default HeaderNav;