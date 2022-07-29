import modal from '../templates/modal.hbs';
import { fetchCardById, fetchCardsByName } from './search-api';
import cardsRender from '../templates/cards-render.hbs';

const eventEl = document.querySelector('.event');
const modalBackdropEl = document.querySelector('.backdrop');
const conteinerEl = document.querySelector('.event .event__container');
let currentAuthor;

const openModal = event => {
  const eventCardEl = event.path.find(elem => {
    return elem.classList?.contains('event__item');
  });

  if (eventCardEl) {
    modalBackdropEl.classList.remove('is-hidden');

    fetchCardById(eventCardEl.dataset.eventId)
      .then(response => {
        const result = response.data._embedded.events[0];
        const formatData = {
          info: result.name,
          when: result.dates.start.localDate,
          whenTime: `${result.dates.start.localTime.slice(
            0,
            -3
          )} (${result.dates.timezone?.replace('_', ' ')})`,
          where: `${result._embedded.venues[0].city.name}, ${result._embedded.venues[0].country.name}`,
          whereName: result._embedded.venues[0].name,
          who: result._embedded.attractions
            ? result._embedded.attractions[0].name
            : '',
          prices: result.priceRanges?.map(({ max, min, type, currency }) => {
            return { title: `${type} ${min}-${max} ${currency}` };
          }),
          image: result.images[0].url,
        };

        currentAuthor = result._embedded.attractions[0].name;
        modalBackdropEl.innerHTML = modal(formatData);
      })
      .catch(error => console.log(error));
  }
};

eventEl.addEventListener('click', openModal);

function closeModal() {
  modalBackdropEl.innerHTML = '';
  modalBackdropEl.classList.add('is-hidden');
}

modalBackdropEl.addEventListener('click', event => {
  const isBackdrop = event.target.classList.contains('backdrop');
  const isModalButtonClose = event.path.some(elem => {
    return elem.classList?.contains('modal__btn-close');
  });

  if (isModalButtonClose || isBackdrop) {
    closeModal();
  }
});

modalBackdropEl.addEventListener('click', async event => {
  const isMoreButton = event.path.some(elem => {
    return elem.classList?.contains('more-btn');
  });

  if (isMoreButton) {
    const response = await fetchCardsByName(currentAuthor, '');
    const result = response.data._embedded.events;
    conteinerEl.innerHTML = cardsRender(result);
    closeModal();
  }
});
