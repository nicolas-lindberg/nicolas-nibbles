
/**
 * Functionality for header navigation
 */
function HeaderNav(element) {

  document.getElementById('mobile-nav-toggle').addEventListener('click', function(el) {
    el.target.classList.toggle('is-visible');
    document.getElementById('site-nav').classList.toggle('is-visible');
    document.body.classList.toggle('no-scroll');
  });

}

export default HeaderNav;