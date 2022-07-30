window.addEventListener('scroll', scrollFunction);
const btnUpEl = document.querySelector('#upBtn');

btnUpEl.addEventListener('click', topFunction);

function scrollFunction() {
  if (window.pageYOffset > 150) {
    btnUpEl.classList.remove('is-hidden');
  } else {
    btnUpEl.classList.add('is-hidden');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
