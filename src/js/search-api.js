import axios from 'axios';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = '5S5NkxMGWeNakzGTl4GGmpGuG9BFHdLG';

export const fetchCardsByName = (keyword, countyCode) => {
  const params = {
    apikey: API_KEY,
    keyword: keyword,
  };
  if (countyCode.length) {
    params.countyCode = countyCode;
  }
  return axios.get(`${BASE_URL}`, { params });
};
