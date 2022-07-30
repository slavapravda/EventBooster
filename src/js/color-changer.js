const colorChanger = () => {
  const body = document.body;
  const wasColorChanger = localStorage.getItem('colorChanger') === 'true';

  localStorage.setItem('colorChanger', !wasColorChanger);
  body.classList.toggle('light-mode', !wasColorChanger);
};

document
  .querySelector('.btn-theme-switcher')
  .addEventListener('click', colorChanger);

const onLoad = () => {
  document.body.classList.toggle(
    'light-mode',
    localStorage.getItem('colorChanger') === 'true'
  );
};

document.addEventListener('DOMContentLoaded', onLoad);
