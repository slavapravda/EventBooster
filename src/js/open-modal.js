import modal from '../templates/modal.hbs';
import { fetchCardById } from './search-api';

const eventEl = document.querySelector('.event');
const modalBackdropEl = document.querySelector('.backdrop');

const openModal = event => {
  const eventCardEl = event.path.find(elem => {
    return elem.classList?.contains('event__item');
  });

  if (eventCardEl) {
    console.log(eventCardEl.dataset.eventId);
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
          )} (${result.dates.timezone.replace('_', ' ')})`,
          where: `${result._embedded.venues[0].city.name}, ${result._embedded.venues[0].country.name}`,
          whereName: result._embedded.venues[0].name,
          who: result._embedded.attractions[0].name,
          prices: result.priceRanges?.map(({ max, min, type, currency }) => {
            return { title: `${type} ${min}-${max} ${currency}` };
          }),
        };

        modalBackdropEl.innerHTML = modal(formatData);
      })
      .catch(error => console.log(error));
  }
};

eventEl.addEventListener('click', openModal);
