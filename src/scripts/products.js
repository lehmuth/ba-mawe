function updatePlusButtonParallaxDistance() {
  const maxContentWidth = document.querySelector('#content').offsetWidth;

  document.querySelectorAll('.product').forEach((product) => {
    const computedStyles = getComputedStyle(product);
    const productDefaultWidth =
      parseFloat(computedStyles.getPropertyValue('--default-width')) *
      parseFloat(computedStyles.fontSize);
    const imgHeight = product.querySelector('img').offsetHeight;
    const parallax = product.querySelector('parallax-container');

    let parallaxDistance = imgHeight - parallax.offsetHeight;
    if (productDefaultWidth >= maxContentWidth) {
      product.parentNode.classList.add('mobile');
    } else {
      product.parentNode.classList.remove('mobile');
      // Remove Headline from parallax distance if not mobile
      const productContent = product.querySelector('.product-content');
      parallaxDistance += parseFloat(
        getComputedStyle(productContent).marginTop
      );
    }
    parallax.setAttribute('distance', parallaxDistance);
  });

  document.querySelectorAll('.parallax-bar').forEach((parallaxBar) => {
    const parallaxElement = parallaxBar.querySelector('div');
    parallaxBar.setAttribute(
      'distance',
      -1 * (parallaxBar.offsetHeight - parallaxElement.offsetHeight)
    );
  });
}

Promise.all([
  import('../modules/page-template.js'),
  import('../modules/detailed-text.js'),
  import('../modules/plus-button.js'),
  import('../modules/parallax-container.js'),
]).then(() => {
  updatePlusButtonParallaxDistance();

  window.addEventListener('resize', updatePlusButtonParallaxDistance);
});
