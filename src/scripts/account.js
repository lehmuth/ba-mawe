Promise.all([
  import('../modules/page-template.js'),
  import('../modules/progress-bar.js'),
  import('../modules/range-slider.js'),
  import('../modules/radio-button-group.js'),
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

  // reward slider
  const rewards = document.querySelector('#rewards');
  const backward = rewards.querySelector('#backward');
  const foreward = rewards.querySelector('#foreward');
  const rewardCount = rewards.querySelector('#slider').children.length;
  backward.addEventListener('click', () => {
    const rewardsStyles = getComputedStyle(rewards);
    let currFirst = +rewardsStyles.getPropertyValue('--current-reward');
    if (currFirst > 0) {
      currFirst--;
      foreward.classList.remove('invisible');
    }
    if (currFirst <= 0) {
      backward.classList.add('invisible');
    }
    rewards.style.setProperty('--current-reward', currFirst);
  });
  foreward.addEventListener('click', () => {
    const rewardsStyles = getComputedStyle(rewards);
    let currFirst = +rewardsStyles.getPropertyValue('--current-reward');
    const visibleRewards = +rewardsStyles.getPropertyValue('--reward-count');
    if (currFirst < rewardCount) {
      currFirst++;
      backward.classList.remove('invisible');
    }
    if (currFirst + visibleRewards >= rewardCount) {
      foreward.classList.add('invisible');
    }
    rewards.style.setProperty('--current-reward', currFirst);
  });
});
