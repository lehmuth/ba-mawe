Promise.all([
  import('../modules/page-template.js'),
  import('../modules/bold-button.js'),
  window.ready,
]).then(() => {
  const autoNextTime = 5000;

  const news = document.querySelector('#news');
  const news1 = document.querySelector('#control1');
  const news2 = document.querySelector('#control2');
  const news3 = document.querySelector('#control3');

  news1.addEventListener('click', showNews1);
  news2.addEventListener('click', showNews2);
  news3.addEventListener('click', showNews3);

  let timer;

  function showNews1() {
    news.style.setProperty('--current-news', '0');
    news1.classList.add('active');
    news2.classList.remove('active');
    news3.classList.remove('active');
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(showNews2, autoNextTime);
  }

  function showNews2() {
    news.style.setProperty('--current-news', '1');
    news1.classList.remove('active');
    news2.classList.add('active');
    news3.classList.remove('active');
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(showNews3, autoNextTime);
  }

  function showNews3() {
    news.style.setProperty('--current-news', '2');
    news1.classList.remove('active');
    news2.classList.remove('active');
    news3.classList.add('active');
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(showNews1, autoNextTime);
  }

  showNews1();
});
