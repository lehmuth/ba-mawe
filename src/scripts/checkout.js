Promise.all([
  import('../utils/shopping-cart.js'),
  import('../modules/shopping-cart.js'),
  import('../modules/page-template.js'),
  import('../modules/bold-button.js'),
]).then(([{ shoppingCart }]) => {
  document.querySelector('#finish').addEventListener('click', () => {
    shoppingCart.clear();
    window.location.href = '/index.html';
  });
});
