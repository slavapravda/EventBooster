const preloaderMask = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloaderMask.classList.add('hide');

  setTimeout(() => {
    preloaderMask.remove();
  }, 900);
});
