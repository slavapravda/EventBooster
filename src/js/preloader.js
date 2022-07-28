const preloaderMask = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloaderMask.classList.add('hide');
  console.log(preloaderMask);
  setTimeout(() => {
    preloaderMask.remove();
  }, 600);
});

// window.onload = function () {
//   document.body.classList.add('loaded_hiding');
//   window.setTimeout(function () {
//     document.body.classList.add('loaded');
//     document.body.classList.remove('loaded_hiding');
//   }, 500);
// };
