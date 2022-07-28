'use strict';

import { fetchCardsByName, fetchCardsByCountry } from './search-api';
import listCountries from '../templates/list-сountries.hbs';
import cardsRender from '../templates/cards-render.hbs';
import * as listCountriesJson from '../json/countries-list.json';

const formEl = document.querySelector('.search__form');
const conteinerEl = document.querySelector('.event .event__container');

formEl.lastElementChild.insertAdjacentHTML(
  'beforeend',
  listCountries(listCountriesJson)
);

fetchCardsByName('', 'us')
  .then(response => {
    const result = response.data._embedded.events;
    conteinerEl.innerHTML = cardsRender(result);
    // console.log(result);
  })
  .catch(error => console.log(error));

const onSearchFormSubmit = async event => {
  event.preventDefault();
  const query = formEl.elements.query.value;
  const locale = formEl.elements.countrySelect.value;

  try {
    const {
      data: {
        _embedded: { events },
      },
    } = await fetchCardsByName(query, locale);
    conteinerEl.innerHTML = cardsRender(events);
    console.log(events);
    //!!! events-передає масив об*єктів
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', onSearchFormSubmit);
formEl.elements.countrySelect.addEventListener('change', onSearchFormSubmit);
