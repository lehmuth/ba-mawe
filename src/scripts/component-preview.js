function add(value) {
  const bar = document.querySelector('#bar-1');
  bar.current += value;
}

function reset() {
  const bar = document.querySelector('#bar-1');
  bar.reset();
}

Promise.all([
  import('../modules/bold-button.js'),
  import('../modules/burger-menu.js'),
  import('../modules/color-changing-text.js'),
  import('../modules/progress-bar.js'),
  import('../modules/parallax-container.js'),
]).then(() => {});
