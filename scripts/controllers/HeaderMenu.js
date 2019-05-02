
/**
 * Functionality for header menu
 */
function HeaderMenu(element) {

  const menu = element.querySelector('.site-menu');
  const menuToggle = element.querySelectorAll('.mobile-menu-toggle');
  const hamburgerMenu = element.querySelector('#hamburger-menu');

  function toggleMenu() {
    // Toggle visibility state
    element.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');

    // Set scaling
    if (element.classList.contains('is-open')) {

      // Calculate scaling
      const buttonHeight = hamburgerMenu.offsetHeight;
      const windowHeight = window.innerHeight;
      const scaling = windowHeight / buttonHeight;

      // Open menu. Literally.
      hamburgerMenu.style.transform = 'scale(' + scaling + ')';

    } else {

      hamburgerMenu.style.transform = null;

    }
  }

  document.addEventListener('click', function (e) {
    
    if (e.target.matches('.mobile-menu-toggle')) toggleMenu();
  
  }, false);

}

export default HeaderMenu;