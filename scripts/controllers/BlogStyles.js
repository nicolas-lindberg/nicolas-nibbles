
/**
 * Set up assistive features for blog
 */
function BlogStyles(element) {

  element.querySelectorAll('.post-list__item').forEach(function(postItem) {
    postItem.querySelectorAll('.permalink').forEach(function(link) {

      link.addEventListener('mouseover', function() {
        postItem.classList.add('hover');
      });

      link.addEventListener('mouseout', function() {
        postItem.classList.remove('hover');
      });

    });
  });


  element.querySelectorAll('.text-highlighted, .image-caption').forEach(function(el) {
    el.innerHTML = el.textContent.split(' ').map(function(text) { return '<span>' + text + '</span>'; }).join(' ');
  });


  element.querySelectorAll('.post-title > *').forEach(function(heading) {

    var headingText = heading.textContent;
    var words = headingText.split(' ');

    if (words[words.length - 1].length > 10 && window.innerWidth < 768 ) return;

    var lastWords = [
      words[words.length - 2],
      words[words.length - 1],
    ];
    delete words[words.length - 2];
    delete words[words.length - 1];

    heading.innerHTML = words.join(' ') + '<span style="white-space: nowrap">' + lastWords.join(' ') + '</span>';

  });

}

export default BlogStyles;
