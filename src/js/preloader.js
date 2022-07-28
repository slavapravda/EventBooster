const preloaderMask = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloaderMask.classList.add('hide');
  console.log(preloaderMask);
  setTimeout(() => {
    preloaderMask.remove();
  }, 900);
});
