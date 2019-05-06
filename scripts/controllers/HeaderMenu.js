import toggleMenu from '../hamburger-menu';

/**
 * Functionality for header menu
 */
function HeaderMenu(element) {

  document.addEventListener('click', function (e) {
    if (e.target.matches('.mobile-menu-toggle')) {
      toggleMenu();
    }
  }, false);

}

export default HeaderMenu;
