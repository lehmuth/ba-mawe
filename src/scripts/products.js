/** This function is used to apply parallax distances and mobile class
 *  to every product element based on the current viewport
 *
 *  It should be called initially and on every window resize to newly adjust
 *  the values.
 */
function updatePlusButtonParallaxDistance() {
  document.querySelectorAll('.product').forEach((product) => {
    // Product bounds for parallax distance
    const productStyles = getComputedStyle(product);
    const defaultFontSize = parseFloat(productStyles.fontSize);
    const productDefaultWidth =
      parseFloat(productStyles.getPropertyValue('--default-width')) *
      defaultFontSize;
    const containerPadding =
      parseFloat(productStyles.getPropertyValue('--container-padding')) *
      defaultFontSize;

    const imgHeight = product.querySelector('img').offsetHeight;

    // Check if a parallax bar exists
    const parallaxBar = product.parentNode.querySelector('.parallax-bar');
    const parallaxElement = parallaxBar?.querySelector(':first-child');

    // The space to note while calculate breakpoint is the minimum bar width if existant including 1em security offset
    // or at least the container padding
    const barMinWidth = Math.max(
      parallaxElement
        ? parseFloat(getComputedStyle(parallaxElement).minWidth) +
            defaultFontSize
        : 0,
      containerPadding
    );

    // PlusButton parallax distance is by default the full height of the picture without own height
    const parallaxPlusButton = product.querySelector('parallax-container');
    let parallaxDistance = imgHeight - parallaxPlusButton.offsetHeight;

    // Calculate if the width of product and parallax bar exceed the available width
    // Cause the bar overlaps the content padding this value needs to be noted
    const mobile =
      productDefaultWidth + barMinWidth >= product.parentNode.offsetWidth;

    // Adjust PlusButton parallax distance based on mobile or not and set css class if mobile
    if (mobile) {
      product.parentNode.classList.add('mobile');
    } else {
      product.parentNode.classList.remove('mobile');

      // PlusButton parallax distance has to note moved headline on desktop
      const productContent = product.querySelector('.product-content');
      parallaxDistance += parseFloat(
        getComputedStyle(productContent).marginTop
      );
    }

    // Apply new distance attributes to PlusButton parallax
    parallaxPlusButton.setAttribute('distance', parallaxDistance);

    // Adjust parallax distance for bar if available
    if (parallaxBar && parallaxElement) {
      parallaxBar.setAttribute(
        'distance',
        -1 * (parallaxBar.offsetHeight - parallaxElement.offsetHeight)
      );
    }
  });
}

Promise.all([
  import('../modules/page-template.js'),
  import('../modules/detailed-text.js'),
  import('../modules/plus-button.js'),
  import('../modules/parallax-container.js'),
  document.ready,
]).then(() => {
  updatePlusButtonParallaxDistance();
  window.addEventListener('resize', updatePlusButtonParallaxDistance);
});
