

const header = document.querySelector('.site-header');
const menu = header.querySelector('.site-menu');
const menuToggle = header.querySelectorAll('.mobile-menu-toggle');
const hamburgerMenu = header.querySelector('#hamburger-menu');

function toggleMenu(state) {

  // Toggle visibility state
  header.classList.toggle('is-open', state);
  document.body.classList.toggle('no-scroll', state);

  // Set scaling
  if (header.classList.contains('is-open')) {

    // Calculate scaling
    const buttonWidth = hamburgerMenu.offsetWidth;
    const buttonHeight = hamburgerMenu.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scalingX = windowWidth / buttonWidth * 1.1;
    const scalingY = windowHeight / buttonHeight;

    // Open menu. Literally.
    hamburgerMenu.style.transform = 'scale(' + scalingX + ',' + scalingY + ')';

    // Load images
    const images = menu.querySelectorAll('img[data-src]');

    images.forEach(function(image)  {
      ImageLoader.load(image, {
        load: true
      });
    });

  } else {

    hamburgerMenu.style.transform = null;

  }
  
}

export default toggleMenu;