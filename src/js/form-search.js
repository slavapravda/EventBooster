'use strict';

import { fetchCardsByName } from './search-api';
import listCountries from '../templates/list-сountries.hbs';
import cardsRender from '../templates/cards-render.hbs';
import * as listCountriesJson from '../json/countries-list.json';
import swal from 'sweetalert';

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
  })
  .catch(error => console.log(error));

const onSearchFormSubmit = async event => {
  event.preventDefault();
  console.log(event.currentTarget);

  const query = formEl.elements.query.value;
  const locale = formEl.elements.countrySelect.value;

  try {
    const { data } = await fetchCardsByName(query, locale);
    const result = data._embedded;

    if (result !== undefined) {
      conteinerEl.innerHTML = cardsRender(result.events);
      formEl.reset();

      return;
    }
    swal('There are no events in this country', {
      closeOnClickOutside: true,
      closeOnEsc: true,
      buttons: false,
    });
    if (data.page.totalElements === 0) {
      swal('There are no events in this country', {
        closeOnClickOutside: true,
        closeOnEsc: true,
        buttons: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', onSearchFormSubmit);
formEl.elements.countrySelect.addEventListener('change', onSearchFormSubmit);
