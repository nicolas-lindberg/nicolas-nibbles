import scrollToElement from '../scroll-to-element';

function BlogItem(element) {

  console.log(scrollToElement);

  scrollToElement({
    destination: element,
    duration: 1000,
    delay: 1000,
  });

}

export default BlogItem;