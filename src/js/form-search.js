'use strict';

import { fetchCardsByName } from './search-api';
import listCountries from '../templates/list-сountries.hbs';
import cardsRender from '../templates/cards-render.hbs';
import * as listCountriesJson from '../json/countries-list.json';

import swal from 'sweetalert';

import customSelect from 'custom-select';
import { pageMenu } from './pagination';


const formEl = document.querySelector('.search__form');
const selectEl = document.querySelector('.search__select');
const conteinerEl = document.querySelector('.event .event__container');

formEl.lastElementChild.insertAdjacentHTML(
  'beforeend',
  listCountries(listCountriesJson)
);

customSelect('select');
const cstSel = document.querySelector('.customSelect').customSelect;
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

      
    const response = await fetchCardsByName(query, locale);    
    console.log(response.data.page.totalElements);
    
    const pagination = pageMenu(response.data.page.totalElements);
    console.log(response);
    pagination.on('beforeMove', function(eventData) {
    console.log('Go to page ' + eventData.page + '?');
    
    });
    
    }
    console.log(data);


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
selectEl.addEventListener('change', onSearchFormSubmit);
