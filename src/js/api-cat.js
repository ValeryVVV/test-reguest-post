import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  timeout: 1000,
  headers: {
    'x-api-key':
      'live_lj4jzDMzZnRF0DA8sKf9k6cgbQ2ktxGgn4logkkmjlRgB9Z6LnBU9JJZkAJski5d',
  },
});

function fetchBreeds() {
  return instance
    .get('/breeds')
    .then(resp => resp.data)
    .catch(error => {
      throw new Error(error.response.statusText);
    });
}

function fetchCatByBreed(breedId) {
  return instance
    .get(`/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data[0])
    .catch(error => {
      throw new Error(error.response.statusText);
    });
}

console.log(fetchCatByBreed());

export { fetchBreeds, fetchCatByBreed };
