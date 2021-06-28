Promise.all([
  import('../modules/page-template.js'),
  import('../modules/bold-button.js'),
  import('../modules/radio-button-group.js'),
  import('../modules/range-slider.js'),
  import('../modules/progress-bar.js'),
  window.ready,
]).then(() => {
  const rewards = document.querySelector('#anim');
  setInterval(() => {
    let curr = +getComputedStyle(rewards).getPropertyValue('--reward-count');
    rewards.style.setProperty('--reward-count', (curr + 1) % 4);
  }, 2000);

  const specific = document.querySelector('#donate-specific');
  const all = document.querySelector('#donate-all');
  const me = document.querySelector('#donate-me');
  const donationTargetSelect = document.querySelector(
    '#donation-target-select'
  );
  const donationTargetDisplay = document.querySelector(
    '#donation-target-display'
  );
  const donationRepetitionDisplay = document.querySelector(
    '#donation-repetition-display'
  );
  const donationGroup = document.querySelector('#donate-group');
  const finishButton = document.querySelector('#finish');
  const pricesSection = document.querySelector('#prices');

  function updateFromSelect() {
    donationTargetDisplay.innerHTML = `${donationTargetSelect.value}`;
  }

  specific.addEventListener('click', () => {
    specific.classList.add('active');
    all.classList.remove('active');
    me.classList.remove('active');
    donationTargetDisplay.innerHTML = `${donationTargetSelect.value}`;
    donationTargetSelect.addEventListener('change', updateFromSelect);
  });

  all.addEventListener('click', () => {
    specific.classList.remove('active');
    all.classList.add('active');
    me.classList.remove('active');
    donationTargetSelect.removeEventListener('change', donationTargetSelect);
    donationTargetDisplay.innerHTML = `ALLE`;
  });

  me.addEventListener('click', () => {
    specific.classList.remove('active');
    all.classList.remove('active');
    me.classList.add('active');
    donationTargetSelect.removeEventListener('change', donationTargetSelect);
    donationTargetDisplay.innerHTML = `ALLE und das LABEL`;
  });

  donationGroup.addEventListener('change', (event) => {
    if (event.detail.value !== 'never') {
      donationRepetitionDisplay.innerHTML = event.detail.value;
      pricesSection.classList.remove('hidden');
      finishButton.classList.remove('hidden');
    } else {
      pricesSection.classList.add('hidden');
      finishButton.classList.add('hidden');
    }
  });

  const rangeSlider = document.querySelector('range-slider');
  const donationSum = document.querySelector('#sum-donations');
  donationSum.innerHTML = `${rangeSlider.value} €`;
  rangeSlider.addEventListener('change', (event) => {
    donationSum.innerHTML = `${event.detail.value} €`;
  });

  finishButton.addEventListener('click', () => {
    window.location.href = '/index.html';
  });
});
