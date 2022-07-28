import { fetchCardsByName, fetchCardsByCountry } from './search-api';
import listCountries from '../templates/list-сountries.hbs';
import * as listCountriesJson from '../json/countries-list.json';
import customSelect from 'custom-select';

const formEl = document.querySelector('.search__form');
const selectEl = document.querySelector('.search__select');
formEl.lastElementChild.insertAdjacentHTML(
  'beforeend',
  listCountries(listCountriesJson)
);

customSelect('select');
const cstSel = document.querySelector('.customSelect').customSelect;

const onSearchFormSubmit = async event => {
  event.preventDefault();
  const query = formEl.elements.query.value;
  const locale = formEl.elements.countrySelect.value;

  try {
    const { data } = await fetchCardsByName(query, locale);

    console.log(data);
    if (data.page.totalElements === 0) {
      console.log('Такого імені не знайдено');
    }
    //!!! events-передає масив об*єктів
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', onSearchFormSubmit);
selectEl.addEventListener('change', onSearchFormSubmit);
