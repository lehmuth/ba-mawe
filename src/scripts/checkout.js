Promise.all([
  import('../utils/shopping-cart.js'),
  import('../modules/shopping-cart.js'),
  import('../modules/page-template.js'),
  import('../modules/bold-button.js'),
  import('../modules/radio-button-group.js'),
  import('../modules/range-slider.js'),
  window.ready,
]).then(([{ shoppingCart, products }]) => {
  document.querySelector('#finish').addEventListener('click', () => {
    shoppingCart.clear();
    window.location.href = '/index.html';
  });

  const specific = document.querySelector('#donate-specific');
  const all = document.querySelector('#donate-all');
  const me = document.querySelector('#donate-me');

  specific.addEventListener('click', () => {
    specific.classList.add('active');
    all.classList.remove('active');
    me.classList.remove('active');
  });

  all.addEventListener('click', () => {
    specific.classList.remove('active');
    all.classList.add('active');
    me.classList.remove('active');
  });

  me.addEventListener('click', () => {
    specific.classList.remove('active');
    all.classList.remove('active');
    me.classList.add('active');
  });

  let sum = 0;
  shoppingCart.getAllIds().forEach((id) => {
    sum += products[id].price * shoppingCart.get(id).amount;
  });
  document.querySelector('#sum').innerHTML = `${sum} €`;

  const donationSum = document.querySelector('#sum-donations');
  const rangeSlider = document.querySelector('range-slider');
  const total = document.querySelector('#total');
  rangeSlider.addEventListener('change', (event) => {
    donationSum.innerHTML = `${event.detail.value} €`;
    total.innerHTML = `${event.detail.value + sum} €`;
  });

  donationSum.innerHTML = `${rangeSlider.value} €`;
  total.innerHTML = `${rangeSlider.value + sum} €`;
});
