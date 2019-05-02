
/**
 * Functionality for header navigation
 */
function HeaderNav(element) {

  const mobileNavToggle = element.querySelector('#mobile-nav-toggle');

  mobileNavToggle.addEventListener('click', function(el) {
    el = el.target;

    // Toggle visibility state
    el.classList.toggle('is-visible');
    element.querySelector('#site-nav').classList.toggle('is-visible');
    document.body.classList.toggle('no-scroll');

    // Calculate scaling
    const buttonHeight = mobileNavToggle.offsetHeight;
    const windowHeight = window.innerHeight;
    const scaling = windowHeight / buttonHeight;

    // Set scaling
    if (el.classList.contains('is-visible')) {
      el.style.transform = 'scale(' + scaling + ')';
    } else {
      el.style.transform = null;
    }
  });


}

export default HeaderNav;