Promise.all([
  import('../modules/page-template.js'),
  import('../modules/bold-button.js'),
  import('../modules/radio-button-group.js'),
  import('../modules/range-slider.js'),
  import('../modules/progress-bar.js'),
  window.ready,
]).then(() => {
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

  const rangeSlider = document.querySelector('range-slider');
  const donationSum = document.querySelector('#sum-donations');
  donationSum.innerHTML = `${rangeSlider.value} €`;
  rangeSlider.addEventListener('change', (event) => {
    donationSum.innerHTML = `${event.detail.value} €`;
  });

  document.querySelector('#finish').addEventListener('click', () => {
    window.location.href = '/index.html';
  });
});
