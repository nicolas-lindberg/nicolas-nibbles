
/**
 * Set up assistive features for blog
 */
function BlogLayout (element) {

  document.querySelectorAll('.post-list__item').forEach(function(postItem) {
    postItem.querySelectorAll('.permalink').forEach(function(link) {

      link.addEventListener('mouseover', function() {
        postItem.classList.add('hover');
      });

      link.addEventListener('mouseout', function() {
        postItem.classList.remove('hover');
      });

    });
  });

  document.querySelectorAll('.text-highlighted, .image-caption').forEach(function(el) {
    el.innerHTML = el.innerText.split(' ').map(function(text) { return '<span>' + text + '</span>'; }).join(' ');
  });

}

export default BlogLayout;
