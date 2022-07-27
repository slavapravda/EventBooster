const colorChanger = () => {
  const body = document.body;
  const wasColorChanger = localStorage.getItem('colorChanger') === 'true';

  localStorage.setItem('colorChanger', !wasColorChanger);
  body.classList.toggle('dark-mode', !wasColorChanger);
};

document
  .querySelector('.btn-theme-switcher')
  .addEventListener('click', colorChanger);
