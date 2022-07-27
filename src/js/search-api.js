'use strict';
import axios from 'axios';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = '5S5NkxMGWeNakzGTl4GGmpGuG9BFHdLG';

export const fetchCardsByName = (keyword, locale) => {
  const params = {
    apikey: API_KEY,
    keyword: keyword,
  };
  if (locale.length) {
    params.locale = locale;
  }
  return axios.get(`${BASE_URL}`, { params });
};
