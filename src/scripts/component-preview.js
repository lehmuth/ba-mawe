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
  import('../modules/page-template.js'),
  import('../modules/progress-bar.js'),
  import('../modules/parallax-container.js'),
  import('../modules/text-field.js'),
  import('../modules/range-slider.js'),
  import('../modules/plus-button.js'),
]).then(() => {});
