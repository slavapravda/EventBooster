import { fetchCardsByName, fetchCardsByCountry } from './search-api';
import listCountries from '../templates/list-сountries.hbs';
import * as listCountriesJson from '../json/countries-list.json';

const formEl = document.querySelector('.search__form');

formEl.lastElementChild.insertAdjacentHTML(
  'beforeend',
  listCountries(listCountriesJson)
);

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
    console.log(events);
    //!!! events-передає масив об*єктів
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', onSearchFormSubmit);
formEl.elements.countrySelect.addEventListener('change', onSearchFormSubmit);
