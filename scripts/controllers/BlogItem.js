import scrollToElement from '../scroll-to-element';

function BlogItem(element) {

  scrollToElement({
    destination: element,
    duration: 1000,
    delay: 1000,
  });

}

export default BlogItem;